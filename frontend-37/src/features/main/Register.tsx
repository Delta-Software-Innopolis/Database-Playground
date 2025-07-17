import crossImg from "@/assets/cross.svg";
import { api } from "@/shared/utils/api";
import { useState } from "react";
import styles from "./Register.module.css";

interface RegisterResponse {
  refresh: string;
  access: string;
}

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
    if (password != repeatPassword) {
      alert("passwords do not match");
      return;
    }

    const json = await api<RegisterResponse>({
      path: "account/register",
      method: "POST",
      body: {
        email,
        password,
        username,
      },
      useSession: false,
      useJwt: false,
    });

    localStorage.setItem("refresh_token", json.refresh);
    localStorage.setItem("access_token", json.access);
    console.log(json, "register json");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={{ position: "relative" }}>
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
        <button className={styles.continueButton} onClick={onRegister}>
          Continue
        </button>
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
