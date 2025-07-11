import styles from "./RunButton.module.css";
import triangleJpg from "@/assets/triangle.jpg";

interface RunButtonProps {
  handleClick: () => void;
}

export function RunButton({ handleClick }: RunButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        <img src={triangleJpg} />
        <p>run</p>
      </button>
    </>
  );
}
