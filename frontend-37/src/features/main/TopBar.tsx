import { NavLink } from "react-router";
import styles from "./TopBar.module.css";
import dropdownImg from "../../assets/topbarDropdown.svg";
import { Button } from "../../shared/ui/Button";
import { TopBar } from "../../shared/ui/TopBar";
import { TopBarElement } from "../../shared/ui/TopBarElement";

interface MainTopBarProps {
  onClick: () => void;
}

export function MainTopBar({ onClick }: MainTopBarProps) {
  return (
    <TopBar className={styles.topbar} contentClassName={styles.content}>
      <TopBarElement className={styles.dropdownButton}>
        <img src={dropdownImg} />
      </TopBarElement>
      <div className={styles.dropdownContent}>
        <Button className={styles.button} onClick={onClick}>
          Playground
        </Button>
        <Button className={styles.button} onClick={onClick}>
          Classrooms
        </Button>
        <Button
          className={[styles.button, styles.buttonAccent].join(" ")}
          onClick={onClick}
        >
          Login
        </Button>
      </div>
    </TopBar>
  );
}
