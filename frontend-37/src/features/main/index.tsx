import { ModalWindow } from "@/shared/ui/ModalWindow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Main.module.css";
import deltaImg from "../../assets/delta.svg";
import { API_URL } from "../../config/env";
import { Login } from "./Login";
import { Register } from "./Register";
import { MainTopBar } from "./TopBar";
import { TemplateChoice } from "@/features/template-choice/index";

export function Main() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (!localStorage.getItem("session_id")) {
        const res = await fetch(API_URL + "/session", {
          credentials: "include",
        });
        const { session_id } = await res.json();
        localStorage.setItem("session_id", session_id);
      } else {
        const res = await fetch(API_URL + "/session/valid", {
          credentials: "include",
        });
        const { valid } = await res.json();
        console.log(valid);
        if (!valid) {
          localStorage.removeItem("session_id");
          run();
        }
      }
    };

    run();
  }, []);

  const onClick = async () => {
    await fetch(
      `${API_URL}/session/info/?session_id=${localStorage.getItem("session_id")}`,
      {
        credentials: "include",
      }
    );
    navigate("/template");
  };

  return (
    <div className={styles.pageContainerOuter}>
      <div className={styles.pageContainerInner}>
        <MainTopBar
          onPlaygroundClick={() => setShowTemplateChoice(true)}
          onLoginClick={() => setShowLogin(true)}
          onClassroomClick={() => {}}
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

        <ModalWindow isOpen={showTemplateChoice} setIsOpen={setShowTemplateChoice}>
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
      </div>
    </div>
  );
}
