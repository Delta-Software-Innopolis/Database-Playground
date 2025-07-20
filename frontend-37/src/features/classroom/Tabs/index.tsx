import { useState } from "react";
import styles from "./ClassroomTabs.module.css";
import { DescriptionTab } from "./DescriptionTab";
import { SettingsTab } from "./SettingsTab";
import { StaffTab } from "./StaffTab";
import { StudentsTab } from "./StudentsTab";

type ClassroomTab = "Description" | "Students" | "Staff" | "Settings";

export function ClassroomTabs() {
  const [selectedTab, setSelectedTab] = useState<ClassroomTab>("Description");

  const tabs: Record<ClassroomTab, React.FC> = {
    Description: DescriptionTab,
    Students: StudentsTab,
    Staff: StaffTab,
    Settings: SettingsTab,
  };

  const SelectedTabComponent = tabs[selectedTab];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles.tabs}>
        {Object.keys(tabs).map((tab) => (
          <div
            key={tab}
            className={[styles.tab, tab == selectedTab && styles.selected].join(
              " "
            )}
            onClick={() => setSelectedTab(tab as ClassroomTab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <SelectedTabComponent />
    </div>
  );
}
