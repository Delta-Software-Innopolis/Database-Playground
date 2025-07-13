import { ReactNode } from "react";
import styles from "./ModalWindow.module.css";

interface ModalWindowProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
}

export function ModalWindow({ isOpen, setIsOpen, children }: ModalWindowProps) {
  if (!isOpen) return;
  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
