import styles from "./SchemaTable.module.css";
import { DBSchema } from "../types";

interface SchemaTableProps {
  schema: DBSchema;
}

export function SchemaTable({ schema }: SchemaTableProps) {
  // return (
  //   <div>
  //     {schema.columns.map((col) => (
  //       <div className={styles.item} key={col.name}>
  //         {col.name} {col.type} {col?.attrs}
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <table>
      <thead className={styles.head}>
        <tr>
          <th>Column Name</th>
          <th>Data Type</th>
          <th>Properties</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {schema.columns.map((col, id) => (
          <tr className={styles.item} key={id}>
            <td>{col.name}</td>
            <td>{col.type}</td>
            <td>{col.attrs}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
