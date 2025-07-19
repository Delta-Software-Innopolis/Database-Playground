import styles from "./TemplateList.module.css";
import { Template } from "./types";

interface TemplateListProps {
  data: Template[];
  templateChoice: Template | undefined;
  onTemplateChoiceChange: (choice: Template) => void;
  onClose: () => void;
}

export function TemplateList({
  data,
  templateChoice,
  onTemplateChoiceChange,
}: TemplateListProps) {
  const list = data.map((template) => {
    return (
      <li
        className={styles.item}
        key={template.id}
        onClick={() => {
          if (template.id === templateChoice?.id) {
            onTemplateChoiceChange(undefined as unknown as Template);
          } else {
            onTemplateChoiceChange(template);
          }
        }}
        style={
          template.id == templateChoice?.id
            ? { backgroundColor: "rgba(232, 232, 255, 1)" }
            : undefined
        }
      >
        <div className={styles.data}>{typeToName(template.type)}</div>
        <div className={styles.data}>{template.name}</div>
        <div className={styles.data}>{template.author}</div>
      </li>
    );
  });

  return (
    <div className={styles.templateChoiceWrapper}>
      <div className={styles.header}>
        <div className={styles.headerCol}>DBMS</div>
        <div className={styles.headerCol}>Template Name</div>
        <div className={styles.headerCol}>Author</div>
      </div>
      <ul className={styles.listWrapper}>{list}</ul>
    </div>
  );
}

function typeToName(type: string) {
  let result = "";

  switch (type) {
    case "PSQL":
      result = "PostgreSQL";
      break;
    case "MSQL":
      result = "MySQL";
      break;
    case "MGDB":
      result = "MongoDB";
      break;
    default:
      result = "Unexpected Result";
  }

  return result;
}
