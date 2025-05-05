import { useSelector } from "react-redux";
import styles from "./UserPanel.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";

export function UserPanel(): React.ReactElement {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  return (
    <div className={styles.UserPanel}>
      <div className={styles.Container}>
        <div className={styles.Box}>First name: {user.firstName}</div>
        <div className={styles.Box}>Last name: {user.lastName}</div>
        <div className={styles.Box}>
          Status: {user.roleId === "2" ? <>Admin</> : <>User</>}
        </div>
      </div>
    </div>
  );
}
