import crossImg from "@/assets/cross.svg";
import { API_URL } from "@/config/env";
import { useState } from "react";
import styles from "./Register.module.css";

interface RegisterProps {
  onClose: () => void;
  onSwitch: () => void;
}

export function Register({ onClose, onSwitch }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onRegister = async () => {
    console.log(username, email, password, repeatPassword);
    if (password != repeatPassword) {
      alert("passwords do not match");
      return;
    }

    const res = await fetch(API_URL + "/account/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    const json = await res.json();
    console.log(json, "я че ебу че он возвращает свагера блять нет");
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerHeader} style={{ position: "relative" }}>
        Register, we want to know you!
        <div style={{ position: "absolute", right: 10 }}>
          <img src={crossImg} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles.rest}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className={styles.comeUpPassword}>Come up with a password</p>
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Repeat Password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
        />
        <button className={styles.continueButton}>Continue</button>
        <div
          className={styles.alreadyHaveAcc}
          onClick={() => {
            onClose();
            onSwitch();
          }}
        >
          Already have an account?
        </div>
      </div>
    </div>
  );
}
