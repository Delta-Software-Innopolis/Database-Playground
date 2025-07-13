import { NavLink } from "react-router";
import styles from "./TopBar.module.css";
import dropdownImg from "../../assets/topbarDropdown.svg";
import { Button } from "../../shared/ui/Button";
import { TopBar } from "../../shared/ui/TopBar";
import { TopBarElement } from "../../shared/ui/TopBarElement";

interface MainTopBarProps {
  onPlaygroundClick: () => void;
  onClassroomClick: () => void;
  onLoginClick: () => void;
}

export function MainTopBar({
  onPlaygroundClick,
  onClassroomClick,
  onLoginClick,
}: MainTopBarProps) {
  return (
    <TopBar className={styles.topbar} contentClassName={styles.content}>
      <TopBarElement className={styles.dropdownButton}>
        <img src={dropdownImg} />
      </TopBarElement>
      <div className={styles.dropdownContent}>
        <Button className={styles.button} onClick={onPlaygroundClick}>
          Playground
        </Button>
        <Button className={styles.button} onClick={onClassroomClick}>
          Classrooms
        </Button>
        <Button
          className={[styles.button, styles.buttonAccent].join(" ")}
          onClick={onLoginClick}
        >
          Login
        </Button>
      </div>
    </TopBar>
  );
}
