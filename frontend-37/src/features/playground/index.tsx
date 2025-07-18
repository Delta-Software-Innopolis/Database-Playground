import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./Playground.module.css";
import { API_URL } from "../../config/env";
import { templateStore } from "../../shared/store/templateStore";
import { PlaygroundTopBar } from "./TopBar";
import { QueryInput } from "./query-input";
import { QueryResultList } from "./query-result-list";
import { SchemaPanel } from "./schema-panel";
import { MongoSchema } from "./schema-panel/MongoSchema";
import { schemasStore } from "./schemasStore";

export function Playground() {
  const session_id = localStorage.getItem("session_id");
  const { updateSchemas } = schemasStore();
  const [templateType, setTemplateType] = useState("");
  const { updateTemplate } = templateStore();

  useEffect(() => {
    const run = async () => {
      const res1 = await fetch(
        `${API_URL}/db/schema/?session_id=${session_id}`,
        {
          credentials: "include",
        }
      );
      const json1 = await res1.json();
      updateSchemas(json1.tables);

      const res2 = await fetch(
        `${API_URL}/session/info/?session_id=${session_id}`
      );
      const json2 = await res2.json();

      const res3 = await fetch(`${API_URL}/template/${json2.template}`);
      const json3 = await res3.json();
      updateTemplate(json3.name);
      setTemplateType(json3.type);
    };
    run();
  }, []);

  return (
    <>
      {templateType == "PSQL" ? (
        <div className={styles.pageContainer}>
          <PlaygroundTopBar />

          <div className={`mono ${styles.contentContainer}`}>
            <PanelGroup
              direction="vertical"
              style={{
                flex: 1,
                display: "flex",
              }}
            >
              <Panel style={{ overflow: "hidden", minHeight: 200 }}>
                <PanelGroup
                  direction="horizontal"
                  style={{
                    display: "flex",
                  }}
                >
                  <Panel className={styles.topContentPanel}>
                    <QueryInput />
                  </Panel>

                  <PanelResizeHandle className={styles.verticalResizeHandle} />

                  <Panel className={styles.topContentPanel}>
                    <SchemaPanel />
                  </Panel>
                </PanelGroup>
              </Panel>

              <PanelResizeHandle className={styles.horizontalResizeHandle} />

              <Panel className={styles.bottomContentPanel}>
                <QueryResultList />
              </Panel>
            </PanelGroup>
          </div>
        </div>
      ) : (
        <div className={styles.pageContainer}>
          <div>
            <PlaygroundTopBar />
            <div className={styles.mongoSchemaWrapper}>
              <MongoSchema />
            </div>
          </div>
          <div className={`mono ${styles.contentContainer}`}>
            <PanelGroup
              direction="horizontal"
              style={{
                display: "flex",
                marginBottom: 15,
              }}
            >
              <Panel className={styles.topContentPanel}>
                <QueryInput />
              </Panel>

              <PanelResizeHandle className={styles.verticalResizeHandle} />

              <Panel className={styles.topContentPanel}>
                <QueryResultList />
              </Panel>
            </PanelGroup>
          </div>
        </div>
      )}
    </>
  );
}
