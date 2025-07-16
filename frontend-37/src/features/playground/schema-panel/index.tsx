import { useEffect, useState } from "react";
import styles from "./SchemaPanel.module.css";
import { schemasStore } from "../schemasStore";
import { SchemaTab } from "./SchemaTab";
import { SchemaTable } from "./SchemaTable";

export function SchemaPanel() {
  const { schemas } = schemasStore();
  const [activeSchema, setActiveSchema] = useState(
    schemas[0] ? schemas[0] : null
  );

  useEffect(() => {
    if (!activeSchema || !schemas.includes(activeSchema)) {
      setActiveSchema(schemas[0] || null);
      if (!activeSchema) return;
      for (const schema of schemas) {
        if (schema.name == activeSchema.name) {
          setActiveSchema(schema);
          break;
        }
      }
    }
  }, [schemas]);

  if (schemas.length === 0 || !schemas) {
    return <div className={styles.wrapper} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {schemas.map((schema) => (
          <SchemaTab
            schema={schema}
            key={schema.name}
            selected={schema === activeSchema}
            onClick={() => setActiveSchema(schema)}
          />
        ))}
      </div>
      <div className={styles.schema}>
        {activeSchema && <SchemaTable schema={activeSchema} />}
      </div>
    </div>
  );
}
