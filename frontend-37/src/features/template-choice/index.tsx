import startTriangleImg from "@/assets/startTriangle.svg";
import { API_URL } from "@/config/env";
import { templateStore } from "@/shared/store/templateStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./TemplateChoice.module.css";
import { TemplateList } from "./TemplateList";
import { Template } from "./types";

interface TemplateChoiceProps {
  onClose: () => void;
}

export function TemplateChoice({ onClose }: TemplateChoiceProps) {
  const [choice, setChoice] = useState<Template | undefined>(undefined);
  const [templates, setTemplates] = useState<Template[]>([]);

  const session_id = localStorage.getItem("session_id");
  const navigate = useNavigate();

  const { updateTemplate } = templateStore();

  useEffect(() => {
    const run = async () => {
      const res = await fetch(API_URL + "/template/", {
        credentials: "include",
      });
      const json = (await res.json()) as Template[];
      setTemplates(json);
    };

    run();
  }, []);

  const onChoice = async () => {
    if (!choice) return;
    await fetch(`${API_URL}/session/info/?session_id=${session_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        template: choice.id,
      }),
      credentials: "include",
    });

    await fetch(`${API_URL}/db/?session_id=${session_id}`, {
      method: "PUT",
      credentials: "include",
    });

    updateTemplate(choice.name);

    navigate("/playground");
  };

  return (
    <div>
      <div className={styles.buttonsWrapper}>
        <button className={styles.backButton} onClick={onClose}>
          Back
        </button>
        {choice ? (
          <button className={styles.startButton} onClick={onChoice}>
            Start{" "}
            <img
              className={styles.startTriangle}
              src={startTriangleImg}
              alt="start triangle"
            />
          </button>
        ) : (
          <div></div>
        )}
      </div>
      <TemplateList
        data={templates}
        templateChoice={choice}
        onTemplateChoiceChange={setChoice}
        onClose={onClose}
      />
    </div>
  );
}
