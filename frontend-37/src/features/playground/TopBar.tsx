import saveSvg from "@/assets/save.svg";
import { templateStore } from "@/shared/store/templateStore";
import { Button } from "@/shared/ui/Button";
import { TopBar } from "@/shared/ui/TopBar";
import { TopBarElement } from "@/shared/ui/TopBarElement";
import { NavLink } from "react-router";
import styles from "./TopBar.module.css";

export function PlaygroundTopBar() {
  const { template } = templateStore();
  return (
    <TopBar className={styles.topbar} contentClassName={styles.topbarContent}>
      <TopBarElement>
        <NavLink to="/" end>
          <Button className={styles.saveButton}>
            <img src={saveSvg} alt="Save button"></img>
          </Button>
        </NavLink>
      </TopBarElement>
      <TopBarElement>
        <NavLink to="/template" end>
          <Button className={styles.templateButton}>{template}</Button>
        </NavLink>
      </TopBarElement>
    </TopBar>
  );
}
