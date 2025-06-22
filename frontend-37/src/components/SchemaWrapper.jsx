import { useState } from "react";
import Schema from "./Schema";
import Tab from "./Tab";
import styles from "./SchemaWrapper.module.css";

export default function SchemaWrapper({ schemas }) {
  console.log(schemas.length);
  if (schemas.length == 0) return <div>DAUN</div>;
  const [activeSchema, setActiveSchema] = useState(schemas[0]);
  return (
    <div
      className={styles.wrapper}
      style={{ width: 700, marginLeft: 20, height: 500 }}
    >
      <div className={styles.tabs}>
        {schemas.map((schema) => (
          <Tab
            schema={schema}
            selected={schema == activeSchema}
            onClick={() => setActiveSchema(schema)}
          />
        ))}
      </div>
      <div className={styles.schema}>
        <Schema schema={activeSchema} />
      </div>
    </div>
  );
}
