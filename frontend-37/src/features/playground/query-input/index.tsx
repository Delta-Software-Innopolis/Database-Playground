import { API_URL } from "@/config/env";
import { useRef, useState, useEffect } from "react";
import styles from "./QueryInput.module.css";
import { queryResultsStore } from "../queryResultsStore";
import { schemasStore } from "../schemasStore";
import { QueryResult, DBSchema } from "../types";
import { RunButton } from "./RunButton";

export interface QueryResultsResponse {
  detail?: string; // error
  results?: QueryResult[];
  schema?: {
    name: string;
    tables: DBSchema[];
  };
}

export function QueryInput() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const numbersColumnRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [query, setQuery] = useState("");
  const { updateError, updateResults } = queryResultsStore();
  const { updateSchemas } = schemasStore();

  const session_id = localStorage.getItem("session_id");

  const shiftDown = useRef(false);

  const [numberColumnValues, changeNumberColumnValues] = useState(["1"]);

  const containerResizeObserver = new ResizeObserver(adjustSizes);
  let observerObserving = false;

  function getNumberRows() {
    return numberColumnValues.map((val, ind) => <div key={ind}>{val}</div>);
  }

  function adjustSizes() {
    if (!numbersColumnRef.current || !textareaRef.current) return;
    numbersColumnRef.current.style.height = `${textareaRef.current.clientHeight}px`;
  }

  function selectionChangeHandler(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const { selectionStart, selectionEnd } = target;

    onQueryChange(
      selectionEnd > selectionStart
        ? target.value.substring(selectionStart, selectionEnd)
        : target.value
    );
  }

  const onRunClicked = async () => {
    const res = await fetch(`${API_URL}/db/query/?session_id=${session_id}`, {
      method: "POST",
      body: query,
      credentials: "include",
    });

    const json = (await res.json()) as QueryResultsResponse;
    if (json.results) updateResults(json.results);
    else updateError(json.detail!);
    if (json.schema) updateSchemas(json.schema.tables);
  };

  const onQueryChange = setQuery;

  const isSelectionChangeHandlerAdded = useRef(false);

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

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.wrapper}>
        <div className={styles.rowcounter} ref={numbersColumnRef}>
          {getNumberRows()}
        </div>
        <textarea
          className={styles.textarea}
          onChange={(e) => {
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
      <RunButton handleClick={onRunClicked} />
    </div>
  );
}
