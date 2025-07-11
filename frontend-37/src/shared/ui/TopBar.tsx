import { NavLink } from "react-router";
import styles from "./TopBar.module.css";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  contentStyle?: CSSProperties;
}

export function TopBar({ children, contentStyle, ...props }: TopBarProps) {
  return (
    <div className={styles.container} {...props}>
      <div className={styles.title}>
        <p>
          <NavLink to="/" end>
            Database Playground
          </NavLink>
        </p>
      </div>
      <div className={styles.content} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
