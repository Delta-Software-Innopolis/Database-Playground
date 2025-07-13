import styles from "./QueryResultList.module.css";
import { queryResultsStore } from "../queryResultsStore";
import { QueryError } from "./QueryError";
import { QueryResultItem } from "./QueryResultItem";

export function QueryResultList() {
  const { results, error } = queryResultsStore();
  if (error) {
    return <QueryError error={error} />;
  }
  return (
    <div>
      {/* <div className={styles.listHeader}>Total {results}</div> */}
      {results!.map((result, index) => (
        <QueryResultItem result={result} queryNum={index + 1} key={index} />
      ))}
    </div>
  );
}
