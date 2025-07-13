import styles from "./QueryResultItem.module.css";
import { QueryResult } from "../types";
import { SelectQueryResult } from "./SelectQueryResult";

interface QueryResultItemProps {
  result: QueryResult;
  queryNum: number;
}

export function QueryResultItem({ result, queryNum }: QueryResultItemProps) {
  const rowsAffected = Math.max(0, result.rowcount | 0);

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

  return (
    <div>
      <details open>
        <summary>
          <span className={styles.queryTitle}>
            {queryNum}. {result.query}
          </span>
          <span className={styles.execTime}>
            {(result.execution_time * 1000).toFixed(3)}ms
          </span>
        </summary>
        <div style={{ padding: "0px 10px" }}>{content}</div>
      </details>
    </div>
  );
}
