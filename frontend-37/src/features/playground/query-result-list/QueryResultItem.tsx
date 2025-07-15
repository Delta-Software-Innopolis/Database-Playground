import styles from "./QueryResultItem.module.css";
import { QueryResult } from "../types";
import { SelectQueryResult } from "./SelectQueryResult";

interface QueryResultItemProps {
  result: QueryResult;
  queryNum: number;
}

export function QueryResultItem({ result, queryNum }: QueryResultItemProps) {
  const rowsAffected = Math.max(0, result.rowcount | 0);
  console.log(result);
  const content = result.data ? (
    <div className={styles.resultTable}>
      <SelectQueryResult queryData={result.data} />
    </div>
  ) : (
    <p className={styles.affectedRows}>
      <em>
        {rowsAffected} {rowsAffected == 1 ? "row" : "rows"} affected.
      </em>
    </p>
  );

  const paddingForSummary = 15 + queryNum.toString().length * 10.4;

  return (
    <div style={{ position: "relative" }}>
      <span className={styles.queryNumber}>{queryNum}</span>
      <details open>
        <summary style={{ marginLeft: paddingForSummary }}>
          <span className={styles.queryTitle}>{result.query}</span>
          <span className={styles.execTime}>
            {(result.execution_time * 1000).toFixed(3)}ms
          </span>
        </summary>
        <div className={styles.content}>
          {" "}
          <div style={{ padding: "0 10px 10px 10px" }}>{content}</div>
        </div>
      </details>
    </div>
  );
}
