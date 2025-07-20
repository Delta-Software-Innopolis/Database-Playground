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
  showUpload?: boolean;
}

export function PlaygroundTopBar({
  handleUpload,
  handleTemplateChoice,
  showUpload = true,
}: PlaygroundTopBarProps) {
  const { template } = templateStore();

  return (
    <TopBar className={styles.topbar} contentClassName={styles.topbarContent}>
      {showUpload && (
        <TopBarElement>
          <Button className={styles.saveButton} onClick={handleUpload}>
            <img src={uploadImg} alt="Upload"></img>
          </Button>
        </TopBarElement>
      )}
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
