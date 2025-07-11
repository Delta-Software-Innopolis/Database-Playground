import { Button } from "@/shared/ui/Button";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import { NavLink } from "react-router";
import styles from "./TopBar.module.css";

interface TemplateChoiceTopBarProps {
  onTemplateChoose: (e: React.MouseEvent<HTMLElement>) => void;
}

export function TemplateChoiceTopBar({
  onTemplateChoose,
}: TemplateChoiceTopBarProps) {
  return (
    <TopBar className={styles.topbar} contentClassName={styles.topbarContent}>
      <TopBarElement>
        <NavLink to="/" end>
          <Button className={styles.button}>Back</Button>
        </NavLink>
      </TopBarElement>
      <TopBarElement>
        <NavLink to="/playground" onClick={onTemplateChoose} end>
          <Button className={styles.button}>Start</Button>
        </NavLink>
      </TopBarElement>
    </TopBar>
  );
}
