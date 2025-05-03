import { useNavigate } from "react-router-dom";
import styles from "./LoginMessage.module.css";

export function LoginMessage(): React.ReactElement {
  const navigate = useNavigate();

  function login() {
    navigate("/login");
  }

  return (
    <div className={styles.LoginMessage}>
      <span>Already a user?</span>
      <p>Log in to access your account and explore more features.</p>

      <button onClick={login}>Sign In</button>
    </div>
  );
}
