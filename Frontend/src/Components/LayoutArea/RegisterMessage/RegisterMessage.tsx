import { useNavigate } from "react-router-dom";
import styles from "./RegisterMessage.module.css";

export function RegisterMessage(): React.ReactElement {
  const navigate = useNavigate();

  function register() {
    navigate("/register");
  }

  return (
    <div className={styles.RegisterMessage}>
      <span>New Here?</span>
      <p>Sign up and discover a great amount of new opportunity</p>

      <button onClick={register}>Sign Up</button>
    </div>
  );
}
