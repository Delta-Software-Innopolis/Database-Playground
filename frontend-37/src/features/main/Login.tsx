import crossImg from "@/assets/cross.svg";
import googleImg from "@/assets/google.jpg";
import iuImg from "@/assets/iu.jpg";
import vkImg from "@/assets/vk.jpg";
import styles from "./Login.module.css";

interface LoginProps {
  onClose: () => void;
  onSwitch: () => void;
}

export function Login({ onClose, onSwitch }: LoginProps) {
  return (
    <div className={styles.loginWrapper}>
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
          required
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          required
        />
        <button className={styles.continueButton}>Continue</button>
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
