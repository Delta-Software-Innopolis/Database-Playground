import crossImg from "@/assets/cross.svg";
import styles from "./Register.module.css";

interface RegisterProps {
  onClose: () => void;
  onSwitch: () => void;
}

export function Register({ onClose, onSwitch }: RegisterProps) {
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerHeader} style={{ position: "relative" }}>
        Register, we want to know you!
        <div style={{ position: "absolute", right: 10 }}>
          <img src={crossImg} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles.rest2}>
        <input
          className={styles.inputField2}
          type="text"
          placeholder="Username"
          required
        />
        <input
          className={styles.inputField2}
          type="email"
          placeholder="Email"
          required
        />
        <p className={styles.comeUpPassword}>Come up with a password</p>
        <input
          className={styles.inputField2}
          type="password"
          placeholder="Password"
          required
        />
        <input
          className={styles.inputField2}
          type="password"
          placeholder="Repeat Password"
          required
        />
        <button className={styles.continueButton2}>Continue</button>
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
