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
  isPlayground?: boolean;
}

export function TemplateChoice({
  onClose,
  isPlayground = false,
}: TemplateChoiceProps) {
  const [choice, setChoice] = useState<Template | undefined>(undefined);
  const [templates, setTemplates] = useState<Template[]>([]);

  const session_id = localStorage.getItem("session_id");
  const navigate = useNavigate();

  const { template, updateTemplate } = templateStore();

  useEffect(() => {
    const run = async () => {
      const res = await fetch(API_URL + "/template/");
      const json = (await res.json()) as Template[];
      setTemplates(json);
    };

    run();
  }, []);

  const onChoice = async () => {
    if (!choice) return;
    await fetch(`${API_URL}/session/info/`, {
      method: "PATCH",
      body: JSON.stringify({
        template: choice.id,
      }),
      headers: {
        Session: session_id!,
      },
    });

    await fetch(`${API_URL}/db/`, {
      method: "PUT",
      headers: {
        Session: session_id!,
      },
    });

    updateTemplate(choice.name);

    navigate("/playground");
  };

  return (
    <div>
      {isPlayground ? (
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            width: 1057,
            height: 40,
            marginBottom: 10,
          }}
        >
          {choice ? (
            choice?.name === template ? (
              <button className={styles.continueButton} onClick={onClose}>
                Continue
                <img
                  className={styles.startTriangle}
                  src={startTriangleImg}
                  alt="continue triangle"
                />
              </button>
            ) : (
              <button
                className={styles.startButton}
                style={{ marginBottom: 10 }}
                onClick={onChoice}
              >
                Start
                <img
                  className={styles.startTriangle}
                  src={startTriangleImg}
                  alt="start triangle"
                />
              </button>
            )
          ) : (
            <div></div>
          )}
        </div>
      ) : (
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
      )}
      <TemplateList
        data={templates}
        templateChoice={choice}
        onTemplateChoiceChange={setChoice}
        onClose={onClose}
      />
    </div>
  );
}
