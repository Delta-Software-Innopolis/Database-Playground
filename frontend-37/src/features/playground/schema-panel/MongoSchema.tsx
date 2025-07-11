import { schemasStore } from "../schemasStore";
import styles from "./MongoSchema.module.css";

export function MongoSchema() {
  const { schemas } = schemasStore();
  if (!schemas) return;

  return (
    <div className={styles.wrapper}>
      {schemas.map((schema) => (
        <div className={styles.item} key={schema.name}>
          {schema.name}
        </div>
      ))}
    </div>
  );
}
