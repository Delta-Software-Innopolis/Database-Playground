import crossImg from "@/assets/cross.svg";
import googleImg from "@/assets/google.jpg";
import iuImg from "@/assets/iu.jpg";
import vkImg from "@/assets/vk.jpg";
import { api } from "@/shared/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./Login.module.css";

interface LoginResponse {
  refresh?: string;
  access?: string;
}

interface LoginProps {
  onClose: () => void;
  onSwitch: () => void;
}

export function Login({ onClose, onSwitch }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const json = await api<LoginResponse>({
      path: "account/login",
      method: "POST",
      body: { email, password },
      useSession: false,
      useJwt: false,
    });

    if (json.access && json.refresh) {
      localStorage.setItem("refresh_token", json.refresh);
      localStorage.setItem("access_token", json.access);
      toast.success("Logged in successfully!");
      onClose();
    } else {
      toast.error(Object.values(json)[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalHeader} style={{ position: "relative" }}>
        Log in to unlock full functionality!
        <div style={{ position: "absolute", right: 10 }}>
          <img src={crossImg} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles.rest}>
        <p className={styles.loginVia}>Log in via</p>
        <button className={styles.loginButton}>
          <img className={styles.imgs} src={iuImg} alt="IU" />
          My University
        </button>
        <button className={styles.loginButton}>
          <img className={styles.imgs} src={googleImg} alt="Google" />
          Google
        </button>
        <button className={styles.loginButton}>
          <img className={styles.imgs} src={vkImg} alt="VK" />
          VK ID
        </button>
        <p className={styles.stay}>Or stay classy</p>
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.continueButton} onClick={onLogin}>
          Continue
        </button>
        <div
          onClick={() => {
            onClose();
            onSwitch();
          }}
          className={styles.noAccount}
        >
          Don't have an account?
        </div>
      </div>
    </div>
  );
}
