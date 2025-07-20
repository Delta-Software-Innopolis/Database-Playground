import toggleDownImg from "@/assets/toggleDown.svg";
import toggleUpImg from "@/assets/toggleUp.svg";
import { HTMLAttributes, useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  options: Array<string>;

  onSelection: (index: number) => void;
}

export function Dropdown({
  name,
  options,
  onSelection,
  ...props
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(-1);

  return (
    <div className={styles.wrapper} {...props}>
      <div
        className={`${styles.toggle} ${open ? "" : styles.toggleClosed}`}
        aria-expanded="false"
        onClick={() => setOpen(!open)}
      >
        <p>{choice == -1 ? name : options[choice]}</p>
        <img src={open ? toggleUpImg : toggleDownImg}></img>
      </div>
      <ul
        className={`${styles.menu} ${open ? styles.open : ""}`}
        role="listbox"
      >
        {options.map((value, index) => (
          <li
            className={styles.item}
            role="option"
            tabIndex={0}
            onClick={() => {
              setChoice(index);
              setOpen(false);

              onSelection(index);
            }}
          >
            <p>{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
