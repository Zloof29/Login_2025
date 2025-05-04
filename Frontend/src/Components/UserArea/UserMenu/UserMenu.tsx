import { useSelector } from "react-redux";
import styles from "./UserMenu.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { NavLink } from "react-router-dom";

export function UserMenu(): React.ReactElement {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  function logout() {
    userService.logout();
  }

  return (
    <div className={styles.UserMenu}>
      {!user && (
        <>
          <span>Hello Guest | </span>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName}
          </span>
          <NavLink
            to="login"
            onClick={(event) => {
              const confirmLogOut = window.confirm(
                "Are you sure you want to log out?"
              );
              if (confirmLogOut) {
                logout();
              } else {
                event.preventDefault();
              }
            }}
          >
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}
