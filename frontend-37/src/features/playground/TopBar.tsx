import saveImg from "@/assets/save.svg";
import uploadImg from "@/assets/upload.svg";
import { templateStore } from "@/shared/store/templateStore";
import { Button } from "@/shared/ui/Button";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import styles from "./TopBar.module.css";

interface PlaygroundTopBarProps {
  handleUpload: () => void;
  handleSave: () => void;
  handleTemplateChoice: () => void;
}

export function PlaygroundTopBar({
  handleUpload,
  handleSave,
  handleTemplateChoice,
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
        <Button
          className={styles.templateButton}
          onClick={handleTemplateChoice}
        >
          {template}
        </Button>
      </TopBarElement>
    </TopBar>
  );
}
