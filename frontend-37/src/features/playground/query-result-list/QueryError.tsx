import styles from "./QueryError.module.css";

interface QueryErrorProps {
  error: string;
}

export function QueryError({ error }: QueryErrorProps) {
  const a = error.slice(0, error.indexOf("LINE "));
  let b = "";
  for (let step = error.length - 3; error[step] == " "; step--) {
    b = b + " ";
  }
  b += "^";
  const c = error.slice(error.indexOf("LINE "), error.indexOf(b));
  return (
    <div className={styles.errorElement}>
      <div className={styles.wrapper}>
        <div>{a}</div>
        <div>{c}</div>
        <div style={{ whiteSpace: "pre" }}>{b}</div>
      </div>
    </div>
  );
}
