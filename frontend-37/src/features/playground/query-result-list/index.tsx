import styles from "./QueryResultList.module.css";
import { queryResultsStore } from "../queryResultsStore";
import { QueryError } from "./QueryError";
import { QueryResultItem } from "./QueryResultItem";

export function QueryResultList() {
  const { results, error } = queryResultsStore();
  if (error) {
    return <QueryError error={error} />;
  }

  let a = 0;
  if (results != undefined) {
    for (const i of results) {
      a += i.execution_time;
    }
  }
  a *= 1000;

  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div>
          Total{" "}
          <span style={{ color: "#6968FF" }}>
            {results === undefined ? 0 : results.length}
          </span>{" "}
          queries executed
        </div>
        <div>
          Total time:{" "}
          <span style={{ color: "#6968FF" }}>{a.toPrecision(4)}ms</span>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.tableList}>
          {results!.map((result, index) => (
            <QueryResultItem result={result} queryNum={index + 1} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
