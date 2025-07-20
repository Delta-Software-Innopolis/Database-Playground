import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { NavLink } from "react-router";
import styles from "./TopBar.module.css";

interface TopBarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  contentClassName?: string | undefined;
  contentStyle?: CSSProperties;
}

export function TopBar({
  children,
  contentClassName,
  contentStyle,
  className,
  ...props
}: TopBarProps) {
  return (
    <div className={[styles.container, className].join(" ")} {...props}>
      <div className={styles.title}>
        <p>
          <NavLink to="/" end>
            Database Playground
          </NavLink>
        </p>
      </div>
      <div
        className={[styles.content, contentClassName].join(" ")}
        style={contentStyle}
      >
        {children}
      </div>
    </div>
  );
}
