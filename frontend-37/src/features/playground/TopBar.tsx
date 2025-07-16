import saveImg from "@/assets/save.svg";
import uploadImg from "@/assets/upload.svg";
import { templateStore } from "@/shared/store/templateStore";
import { Button } from "@/shared/ui/Button";
import { ModalWindow } from "@/shared/ui/ModalWindow";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./TopBar.module.css";
import { TemplateChoice } from "../template-choice";
import { Upload } from "./Upload";

export function PlaygroundTopBar() {
  const { template } = templateStore();
  const [showUpload, setShowUpload] = useState(false);
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);

  return (
    <TopBar className={styles.topbar} contentClassName={styles.topbarContent}>
      <TopBarElement>
        <Button
          className={styles.saveButton}
          onClick={() => setShowUpload(true)}
        >
          <img src={uploadImg} alt="Upload"></img>
        </Button>
      </TopBarElement>
      <TopBarElement>
        <Button className={styles.saveButton}>
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
      <ModalWindow isOpen={showUpload} setIsOpen={setShowUpload}>
        <Upload onClose={() => setShowUpload(false)} />
      </ModalWindow>
      <ModalWindow
        isOpen={showTemplateChoice}
        setIsOpen={setShowTemplateChoice}
      >
        <TemplateChoice onClose={() => setShowTemplateChoice(false)} />
      </ModalWindow>
    </TopBar>
  );
}
