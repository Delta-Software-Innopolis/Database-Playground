import saveImg from "@/assets/save.svg";
import uploadImg from "@/assets/upload.svg";
import { templateStore } from "@/shared/store/templateStore";
import { Button } from "@/shared/ui/Button";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import { NavLink } from "react-router";
import styles from "./TopBar.module.css";

interface PlaygroundTopBarProps {
  handleUpload: () => void;
  handleSave: () => void;
}

export function PlaygroundTopBar({
  handleUpload,
  handleSave,
}: PlaygroundTopBarProps) {
  const { template } = templateStore();

  return (
    <TopBar className={styles.topbar} contentClassName={styles.topbarContent}>
      <TopBarElement>
        <Button className={styles.saveButton} onClick={handleUpload}>
          <img src={uploadImg} alt="Upload"></img>
        </Button>
      </TopBarElement>
      <TopBarElement>
        <Button className={styles.saveButton} onClick={handleSave}>
          <img src={saveImg} alt="Save"></img>
        </Button>
      </TopBarElement>
      <TopBarElement>
        <NavLink to="/template" end>
          <Button className={styles.templateButton}>{template}</Button>
        </NavLink>
      </TopBarElement>
    </TopBar>
  );
}
