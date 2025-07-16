import { Button } from "@/shared/ui/Button";
import styles from "./Upload.module.css";
import { schemasStore } from "./schemasStore";

export function Upload() {
  const { schemas } = schemasStore();

  const onClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Upload data from CSV</div>
      </div>
      <div>
        <input type="file" />
        <select>
          {schemas.map((schema) => (
            <option value={schema.name}>{schema.name}</option>
          ))}
        </select>
        <Button onClick={onClick}>submit</Button>
      </div>
    </div>
  );
}
