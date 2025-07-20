import uploadImg from "@/assets/upload2.svg";
import { Dropdown } from "@/shared/ui/Dropdown";
import { useState } from "react";
import styles from "./Upload.module.css";
import { schemasStore } from "./schemasStore";
import { DBSchema } from "./types";

interface UploadData {
  file: File;
  table: DBSchema;
}

interface UploadProps {
  onUpload: (data: UploadData) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Upload({ onUpload, setShow }: UploadProps) {
  const { schemas } = schemasStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleDropdownSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (selectedFile && selectedOption !== null) {
      onUpload({
        file: selectedFile,
        table: schemas[selectedOption],
      });
    }
  };

  const isUploadDisabled = !selectedFile || selectedOption === null;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Upload data from CSV</div>
      </div>
      <div className={styles.content}>
        <Dropdown
          name="Choose table"
          options={schemas.map((schema) => schema.name)}
          onSelection={handleDropdownSelect}
        ></Dropdown>

        <input
          id="csv-input"
          type="file"
          style={{ display: "none" }}
          accept=".csv"
          onChange={handleFileChange}
        />

        <div className={styles.uploadWrapper}>
          <label htmlFor="csv-input" className={styles.uploadArea}>
            <div className={styles.uploadHint}>
              <img src={uploadImg} width="24px" height="24px" />
              <p>Upload a CSV file</p>
            </div>
          </label>
          <button
            className={`${styles.button} ${styles.buttonLeft}`}
            onClick={() => setShow(false)}
          >
            Back
          </button>
          <button
            className={`${styles.button} ${styles.buttonRight}`}
            disabled={isUploadDisabled}
            onClick={() => {
              if (!isUploadDisabled) {
                handleSubmit();
                setShow(false);
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
