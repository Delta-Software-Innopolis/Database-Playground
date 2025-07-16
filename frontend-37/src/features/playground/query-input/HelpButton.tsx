import infoImg from "@/assets/info.svg";
import styles from "./HelpButton.module.css";

interface HelpButtonProps {
  handleClick: () => void;
}

export function HelpButton({ handleClick }: HelpButtonProps) {
  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        <p>help</p>
        <img src={infoImg} />
      </button>
    </>
  );
}
