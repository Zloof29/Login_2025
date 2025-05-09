import { useSelector } from "react-redux";
import styles from "./UserPanel.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { ChangeEmail } from "../ChangeEmail/ChangeEmail";

export function UserPanel(): React.ReactElement {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  return (
    <div className={styles.UserPanel}>
      <div className={styles.Container}>
        <div className={styles.Box}>First name: {user.firstName}</div>
        <div className={styles.Box}>Last name: {user.lastName}</div>
        <div className={styles.Box}>
          Role: {user.roleId === "2" ? <>Admin</> : <>User</>}
        </div>
      </div>

      <div className={styles.SideBySideContainer}>
        <div className={styles.PasswordContainer}>
          <div className={styles.BoxForInputs}>
            <ResetPassword />
          </div>
        </div>
        <div className={styles.EmailContainer}>
          <div className={styles.BoxForInputs}>
            <ChangeEmail />
          </div>
        </div>
      </div>
    </div>
  );
}
