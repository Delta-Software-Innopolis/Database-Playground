import styles from "./SelectQueryResult.module.css";
import { QueryData } from "../types";

interface SelectQueryResultProps {
  queryData: QueryData;
}

export function SelectQueryResult({ queryData }: SelectQueryResultProps) {
  if (!queryData.columns) {
    return <pre>{JSON.stringify(queryData, null, 2)}</pre>;
  }

  const nums = [];
  for (let i = 0; i < queryData.data[queryData.columns[0]].length; i++) {
    nums.push(i);
  }

  return (
    <div className={styles.wrapper}>
      <table>
        <thead className={styles.head}>
          <tr>
            {queryData.columns.map((col) => (
              <td key={col}>{col}</td>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {nums.map((index) => (
            <tr key={index}>
              {queryData.columns.map((key) => (
                <td
                  key={String(queryData.data[key][index])}
                  className={styles.item}
                >
                  {queryData.data[key][index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
