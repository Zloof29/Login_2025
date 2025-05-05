import { useLocation } from "react-router-dom";
import { RegisterMessage } from "../RegisterMessage/RegisterMessage";
import { Routing } from "../Routing/Routing";
import styles from "./Layout.module.css";
import { LoginMessage } from "../LoginMessage/LoginMessage";

export function Layout(): React.ReactElement {
  const location = useLocation();

  return (
    <div className={styles.Layout}>
      <div className={styles.Main1}>
        <Routing />
      </div>

      {location.pathname !== "/userPanel" && (
        <div className={styles.Main2}>
          {location.pathname === "/login" && <RegisterMessage />}
          {location.pathname === "/register" && <LoginMessage />}
        </div>
      )}
    </div>
  );
}
