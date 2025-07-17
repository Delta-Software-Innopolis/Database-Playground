import startTriangleImg from "@/assets/startTriangle.svg";
import { templateStore } from "@/shared/store/templateStore";
import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./TemplateChoice.module.css";
import { queryResultsStore } from "../playground/queryResultsStore";
import { schemasStore } from "../playground/schemasStore";
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

  const navigate = useNavigate();

  const { template, updateTemplate } = templateStore();
  const { updateError, updateResults } = queryResultsStore();
  const { updateSchemas } = schemasStore();

  useEffect(() => {
    console.log("fetching templates from server...");
    const run = async () => {
      const json = await api<Template[]>({ path: "template/" });
      setTemplates(json);
      console.log(json, "templates json");
    };

    run();
  }, []);

  const onChoice = async () => {
    if (!choice) return;

    await api({
      path: "session/info/",
      method: "PATCH",
      body: { template: choice.id },
    });

    await api({
      path: "db/",
      method: "PUT",
    });

    updateError("");
    updateResults([]);
    updateSchemas([]);

    updateTemplate(choice.name);
    navigate("/playground");

    onClose();
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
