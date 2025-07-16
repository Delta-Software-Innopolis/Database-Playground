import saveImg from "@/assets/save.svg";
import uploadImg from "@/assets/upload.svg";
import { templateStore } from "@/shared/store/templateStore";
import { Button } from "@/shared/ui/Button";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import { useState } from "react";
import styles from "./TopBar.module.css";
import { TemplateChoice } from "../template-choice";

interface PlaygroundTopBarProps {
  handleUpload: () => void;
  handleSave: () => void;
}

export function PlaygroundTopBar({
  handleUpload,
  handleSave,
}: PlaygroundTopBarProps) {
  const { template } = templateStore();
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);

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
          onClick={() => setShowTemplateChoice(true)}
        >
          {template}
        </Button>
      </TopBarElement>
      <ModalWindow
        isOpen={showTemplateChoice}
        setIsOpen={setShowTemplateChoice}
      >
        <TemplateChoice
          onClose={() => setShowTemplateChoice(false)}
          isPlayground={true}
        />
      </ModalWindow>
    </TopBar>
  );
}
