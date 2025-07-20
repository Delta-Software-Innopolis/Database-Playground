import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
  const [access, setAccess] = useState(!!localStorage.getItem("access_token"));

  useEffect(() => {
    setAccess(!!localStorage.getItem("access_token"));
  }, [localStorage.getItem("access_token")]);

  const onLogoutClick = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAccess(false);
    toast.success("Logged out successfully!");
  };

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
        {access ? (
          <Button
            className={[styles.button, styles.buttonAccent].join(" ")}
            onClick={onLogoutClick}
          >
            Logout
          </Button>
        ) : (
          <Button
            className={[styles.button, styles.buttonAccent].join(" ")}
            onClick={onLoginClick}
          >
            Login
          </Button>
        )}
      </div>
    </TopBar>
  );
}
