import styles from "./MongoSchema.module.css";
import { schemasStore } from "../schemasStore";

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
