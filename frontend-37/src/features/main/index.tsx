import { TemplateChoice } from "@/features/template-choice/index";
import { ModalWindow } from "@/shared/ui/ModalWindow";
import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import deltaImg from "../../assets/delta.svg";
import { ClassroomList } from "../classroom/ClassroomList";
import { CreateClassroom } from "../classroom/CreateClassroom";
import { Login } from "./Login";
import { Register } from "./Register";
import { MainTopBar } from "./TopBar";

interface SessionResponse {
  session_id: string;
}

interface ValidResponse {
  valid: boolean;
}

export function Main() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);
  const [showClassrooms, setShowClassrooms] = useState(false);
  const [showCreateClassroom, setShowCreateClassroom] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!localStorage.getItem("session_id")) {
        console.log("no session_id");

        const { session_id } = await api<SessionResponse>({
          path: "session/",
          useSession: false,
          useJwt: false,
        });

        localStorage.setItem("session_id", session_id);
        console.log("new session_id:", session_id);
      } else {
        console.log("session_id already present");
        console.log("session_id:", localStorage.getItem("session_id"));

        const { valid } = await api<ValidResponse>({
          path: "session/valid/",
          useJwt: false,
        });

        console.log("session_id is valid?", valid);
        if (!valid) {
          console.log("invalid session_id, regenerating");
          localStorage.removeItem("session_id");
          await run();
        }
      }
    };

    run();
  }, []);

  return (
    <div className={styles.pageContainerOuter}>
      <div className={styles.pageContainerInner}>
        <MainTopBar
          onPlaygroundClick={() => setShowTemplateChoice(true)}
          onLoginClick={() => setShowLogin(true)}
          onClassroomClick={() => setShowClassrooms(true)}
        />
        <div className={styles.mainDivContainer}>
          <div className={styles.mainDiv}>
            <div className={styles.bigTitle}>Learn databases</div>
            <div className={styles.description}>
              Complete assignments, experiment in playground and become expert!
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Software Project Team 37</p>
          <img src={deltaImg} />
          <p>Delta-Software-Innopolis</p>
        </div>

        <ModalWindow
          isOpen={showTemplateChoice}
          setIsOpen={setShowTemplateChoice}
        >
          <TemplateChoice onClose={() => setShowTemplateChoice(false)} />
        </ModalWindow>

        <ModalWindow isOpen={showLogin} setIsOpen={setShowLogin}>
          <Login
            onClose={() => setShowLogin(false)}
            onSwitch={() => setShowRegister(true)}
          />
        </ModalWindow>

        <ModalWindow isOpen={showRegister} setIsOpen={setShowRegister}>
          <Register
            onClose={() => setShowRegister(false)}
            onSwitch={() => setShowLogin(true)}
          />
        </ModalWindow>

        <ModalWindow isOpen={showClassrooms} setIsOpen={setShowClassrooms}>
          <ClassroomList
            onCreateClassroom={() => {
              setShowClassrooms(false);
              setShowCreateClassroom(true);
            }}
            onClose={() => setShowClassrooms(false)}
          />
        </ModalWindow>

        <ModalWindow
          isOpen={showCreateClassroom}
          setIsOpen={setShowCreateClassroom}
        >
          <CreateClassroom />
        </ModalWindow>
      </div>
    </div>
  );
}
