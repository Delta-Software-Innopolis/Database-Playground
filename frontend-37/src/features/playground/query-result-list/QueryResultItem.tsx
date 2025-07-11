import styles from "./QueryResultItem.module.css";
import clockImg from "../../../assets/clock.jpg";
import { SelectQueryResult } from "./SelectQueryResult";
import { QueryResult } from "../types";

interface QueryResultItemProps {
  result: QueryResult;
  queryNum: number;
}

export function QueryResultItem({ result, queryNum }: QueryResultItemProps) {
  const rowsAffected = Math.max(0, result.rowcount | 0);

  const content = !result.data ? (
    <p className={styles.affectedRows}>
      <em>
        {rowsAffected} {rowsAffected == 1 ? "row" : "rows"} affected.
      </em>
    </p>
  ) : (
    <div className={styles.resultTable}>
      <SelectQueryResult queryData={result.data} />
    </div>
  );

  return (
    <div>
      <details open>
        <summary>
          <span className={styles.queryTitle}>
            {queryNum}. {result.query}
          </span>
          <span className={styles.execTime}>
            <img
              className={styles.clockImg}
              src={clockImg}
              alt="clock"
            />
            {(result.execution_time * 1000).toFixed(3)}ms
          </span>
        </summary>
        { content }
      </details>
    </div>
  );
}
