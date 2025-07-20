import runImg from "@/assets/run.svg";
import styles from "./RunButton.module.css";

interface RunButtonProps {
  handleClick: () => void;
}

export function RunButton({ handleClick }: RunButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        <p>send</p>
        <img src={runImg} />
      </button>
    </>
  );
}
