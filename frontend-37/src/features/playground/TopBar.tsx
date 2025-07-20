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
import { Upload } from "./Upload";

export function PlaygroundTopBar() {
  const { template } = templateStore();
  const [showUpload, setShowUpload] = useState(false);

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
        <NavLink to="/template" end>
          <Button className={styles.templateButton}>{template}</Button>
        </NavLink>
      </TopBarElement>
      <ModalWindow isOpen={showUpload} setIsOpen={setShowUpload}>
        <Upload onClose={() => setShowUpload(false)} />
      </ModalWindow>
    </TopBar>
  );
}
