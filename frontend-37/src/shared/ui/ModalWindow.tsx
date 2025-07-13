import { ReactNode } from "react";
import styles from "./ModalWindow.module.css";

interface ModalWindowProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

export function ModalWindow({ isOpen, setIsOpen, children }: ModalWindowProps) {
  if (!isOpen) {
    setIsOpen(true);
    return (
      <div className={styles.modalWindowWrapper}>
        {children}
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      </div>
    );
  } else {
    setIsOpen(false);
    return;
  }
}
