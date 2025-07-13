import { ModalWindow } from "@/shared/ui/ModalWindow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Main.module.css";
import humansImg from "../../assets/humans.jpg";
import mainImg from "../../assets/people.png";
import humanWithDeskImg from "../../assets/rectangleAndHuman.jpg";
import assignmentsImg from "../../assets/taska.jpg";
import { API_URL } from "../../config/env";
import { Login } from "./Login";
import { Register } from "./Register";
import { MainTopBar } from "./TopBar";

export function Main() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
    <div>
      <MainTopBar onClick={onClick} />
      <div className={styles.mainDiv}>
        <div>
          <h1 className={styles.bigTitle}>Learn databases</h1>
          <p className={styles.description}>
            Complete assignments, experiment in playground and become expert!
          </p>
        </div>
        <img className={styles.mainImg} src={mainImg} alt="main image" />
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <img className={styles.peopleImg} src={humansImg} alt="Humans" />
          <div>
            <p className={styles.pAboutClassrooms}>Create classrooms</p>
            <p className={styles.pAboutAdding}>And add students</p>
          </div>
        </div>
        <div className={styles.card}>
          <img
            className={styles.assignmentsImg}
            src={assignmentsImg}
            alt="Assignments"
          />
          <div>
            <p className={styles.pAboutClassrooms}>Automatic grading</p>
            <p className={styles.pAboutAdding}>For assignments</p>
          </div>
        </div>
        <div className={styles.card}>
          <img
            className={styles.humanWithDeskImg}
            src={humanWithDeskImg}
            alt="HumanWithDesk"
          />
          <div>
            <p className={styles.pAboutClassrooms}>Add TA's</p>
            <p className={styles.pAboutAdding}>To help you manage classrooms</p>
          </div>
        </div>
      </div>
      <button onClick={() => setShowLogin(true)}>sign in</button>

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
  );
}
