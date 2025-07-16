import { Button } from "@/shared/ui/Button";
import { schemasStore } from "./schemasStore";

export function Upload() {
  const { schemas } = schemasStore();

  const onClick = () => {};

  return (
    <div style={{ marginBottom: 20 }}>
      <div>Upload data from CSV</div>
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
