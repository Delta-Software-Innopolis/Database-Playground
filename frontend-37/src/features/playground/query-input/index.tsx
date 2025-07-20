import mongoImg from "@/assets/inputBgMongo.png";
import psqlImg from "@/assets/inputBgPGSQL.png";
import { templateStore } from "@/shared/store/templateStore";
import { api } from "@/shared/utils/api";
import { DBType } from "@/types/DBType";
import { useRef, useState, useEffect } from "react";
import styles from "./QueryInput.module.css";
import { queryResultsStore } from "../queryResultsStore";
import { schemasStore } from "../schemasStore";
import { QueryResult, DBSchema } from "../types";
import { HelpButton } from "./HelpButton";
import { RunButton } from "./RunButton";

export interface QueryResponse {
  detail?: string; // error
  results?: QueryResult[];
  schema?: {
    name: string;
    tables: DBSchema[];
  };
}

interface QueryInputProps {
  templateType: DBType;
}

export function QueryInput({ templateType }: QueryInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const numbersColumnRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isSelectionChangeHandlerAdded = useRef(false);
  const shiftDown = useRef(false);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [numberColumnValues, changeNumberColumnValues] = useState(["1"]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  const { updateError, updateResults } = queryResultsStore();
  const { updateSchemas } = schemasStore();
  const { template } = templateStore();

  const onQueryChange = setQuery;
  let observerObserving = false;

  const adjustSizes = () => {
    if (!numbersColumnRef.current || !textareaRef.current) return;
    numbersColumnRef.current.style.height = `${textareaRef.current.clientHeight}px`;
  };

  const containerResizeObserver = new ResizeObserver(adjustSizes);

  const getNumberRows = () => {
    return numberColumnValues.map((val, ind) => <div key={ind}>{val}</div>);
  };

  const selectionChangeHandler = (e: Event) => {
    const target = e.target as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = target;

    setSelected(
      selectionEnd > selectionStart
        ? target.value.substring(selectionStart, selectionEnd)
        : target.value
    );
  };

  const onRunClicked = async () => {
    const json = await api<QueryResponse>({
      path: "db/query/",
      method: "POST",
      body: selected ? selected : query,
      useJson: false,
    });

    if (json.results) {
      console.log("succesful, results:", json.results);
      updateResults(json.results);
    } else {
      console.log("unsuccessful, error:", json["detail"]);
      updateError(json.detail!);
    }

    if (json.schema) updateSchemas(json.schema.tables);
  };

  useEffect(() => {
    const input = textareaRef.current;

    if (input && !isSelectionChangeHandlerAdded.current) {
      input.addEventListener("selectionchange", selectionChangeHandler);
      isSelectionChangeHandlerAdded.current = true;
    }

    return () => {
      if (isSelectionChangeHandlerAdded.current && input) {
        input.removeEventListener("selectionchange", selectionChangeHandler);
        isSelectionChangeHandlerAdded.current = false;
      }

      shiftDown.current = false;
    };
  }, []);

  useEffect(() => {
    setQuery("");
  }, [template]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.bgMongo} hidden={templateType != "MGDB"}>
        <img className={styles.bgImg} src={mongoImg}></img>
      </div>
      <div className={styles.bgPSQL} hidden={templateType != "PSQL"}>
        <img className={styles.bgImg} src={psqlImg}></img>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.rowcounter} ref={numbersColumnRef}>
          {getNumberRows()}
        </div>
        <textarea
          value={query}
          spellCheck={false}
          className={styles.textarea}
          onChange={(e) => {
            onQueryChange(e.target.value);
            const rows = e.target.value.split("\n");
            const columnValues = rows.map((_, i) => `${i + 1}`);

            changeNumberColumnValues(columnValues);

            adjustSizes();

            if (containerRef.current != null && !observerObserving) {
              observerObserving = true;
              containerResizeObserver.observe(containerRef.current);
            }
          }}
          onScroll={() => {
            if (!numbersColumnRef.current || !textareaRef.current) return;
            numbersColumnRef.current.scrollTop = textareaRef.current.scrollTop;
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key == "Tab") {
              e.preventDefault();

              const textarea = e.currentTarget;
              const { selectionStart, selectionEnd } = textarea;

              const lineStart =
                textarea.value.lastIndexOf("\n", selectionStart - 1) + 1;
              let lineEnd = textarea.value
                .substring(selectionStart)
                .indexOf("\n");
              lineEnd =
                lineEnd == -1
                  ? textarea.value.length
                  : selectionStart + lineEnd;

              let actualLineStart = textarea.value
                .substring(lineStart, selectionEnd)
                .search(/\S/);

              if (actualLineStart == -1) actualLineStart = lineEnd;

              let replacement = "    ";

              if (selectionStart <= actualLineStart) {
                replacement = " ".repeat(
                  4 - ((selectionStart - lineStart) % 4)
                );
              }

              textarea.setRangeText(
                replacement,
                selectionStart,
                selectionEnd,
                "end"
              );
            }

            if (e.key == "Shift") {
              shiftDown.current = true;
            }

            if (e.key == "Enter") {
              if (shiftDown.current) {
                e.preventDefault();
                onRunClicked();
              }
            }
          }}
          onKeyUp={(e) => {
            if (e.key == "Shift") {
              shiftDown.current = false;
            }
          }}
          placeholder="WHITE YOUR QUERY HERE"
          ref={textareaRef}
        ></textarea>
      </div>
      <div className={styles.buttonsWrapper}>
        <HelpButton handleClick={() => {}} />
        <RunButton handleClick={onRunClicked} />
      </div>
    </div>
  );
}
