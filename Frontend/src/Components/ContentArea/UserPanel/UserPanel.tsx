import styles from "./UserPanel.module.css";
import { ResetPassword } from "../ResetPassword/ResetPassword";
import { ChangeEmail } from "../ChangeEmail/ChangeEmail";
import { UserMenu } from "../../UserArea/UserMenu/UserMenu";

export function UserPanel(): React.ReactElement {
  return (
    <div className={styles.UserPanel}>
      <div className={styles.Container}>
        <div className={styles.Box}>
          <UserMenu />
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
