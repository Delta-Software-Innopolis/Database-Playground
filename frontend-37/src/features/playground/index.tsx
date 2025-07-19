import { ModalWindow } from "@/shared/ui/ModalWindow";
import { api } from "@/shared/utils/api";
import { DBType } from "@/types/DBType";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./Playground.module.css";
import { templateStore } from "../../shared/store/templateStore";
import { TemplateChoice } from "../template-choice";
import { Template } from "../template-choice/types";
import { PlaygroundTopBar } from "./TopBar";
import { Upload } from "./Upload";
import { QueryInput } from "./query-input";
import { QueryResultList } from "./query-result-list";
import { SchemaPanel } from "./schema-panel";
import { MongoSchema } from "./schema-panel/MongoSchema";
import { schemasStore } from "./schemasStore";
import { DBSchema } from "./types";

interface SchemaResponse {
  tables: DBSchema[];
}

interface SessionResponse {
  id: number;
  session: string;
  db_name: string;
  template: number;
}

export function Playground() {
  const [templateType, setTemplateType] = useState("" as DBType);
  const [showUpload, setShowUpload] = useState(false);
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);
  const [loading, setLoading] = useState(true);

  const { updateSchemas } = schemasStore();
  const { template, updateTemplate } = templateStore();

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const schema = await api<SchemaResponse>({ path: "db/schema/" });
      console.log(schema, "schema json");
      updateSchemas(schema.tables);

      const sessionInfo = await api<SessionResponse>({ path: "session/info/" });
      console.log(sessionInfo, "session info");

      const template = await api<Template>({
        path: `template/${sessionInfo.template}`,
      });
      console.log(template, "template info");

      updateTemplate(template.name);
      setTemplateType(template.type);
      setLoading(false);
    };
    run();
  }, [template]);

  if (loading) return;

  return (
    <>
      {templateType == "PSQL" ? (
        <div className={styles.pageContainer}>
          <PlaygroundTopBar
            handleUpload={() => setShowUpload(true)}
            handleSave={() => {}}
            handleTemplateChoice={() => setShowTemplateChoice(true)}
          />

          <div className={`fira ${styles.contentContainer}`}>
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
                    <QueryInput templateType={templateType} />
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
            <PlaygroundTopBar
              handleUpload={() => setShowUpload(true)}
              handleSave={() => {}}
              handleTemplateChoice={() => setShowTemplateChoice(true)}
            />
          </div>
          <div className={`fira ${styles.contentContainer}`}>
            <PanelGroup
              direction="horizontal"
              style={{
                display: "flex",
                marginBottom: 15,
              }}
            >
              <Panel className={styles.topContentPanel}>
                <QueryInput templateType={templateType} />
              </Panel>

              <PanelResizeHandle className={styles.verticalResizeHandle} />

              <Panel
                className={styles.topContentPanel}
                style={{ border: "none" }}
              >
                <PanelGroup direction="vertical" style={{ marginBottom: 0 }}>
                  <div className={styles.mongoSchemaWrapper}>
                    <MongoSchema />
                  </div>
                  <div className={styles.mongoQueryResult}>
                    <QueryResultList />
                  </div>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      )}

      <ModalWindow isOpen={showUpload} setIsOpen={setShowUpload}>
        <Upload />
      </ModalWindow>
      <ModalWindow
        isOpen={showTemplateChoice}
        setIsOpen={setShowTemplateChoice}
      >
        <TemplateChoice
          onClose={() => setShowTemplateChoice(false)}
          isPlayground={true}
        />
      </ModalWindow>
    </>
  );
}
