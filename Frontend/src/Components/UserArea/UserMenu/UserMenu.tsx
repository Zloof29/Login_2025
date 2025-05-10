import { useSelector } from "react-redux";
import styles from "./UserMenu.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../../../Services/AuthService";

export function UserMenu(): React.ReactElement {
  const user = useSelector<AppState, UserModel>((store) => store.user);
  const navigate = useNavigate();

  function logout() {
    userService.logout();
    navigate("/login");
  }

  useEffect(() => {
    const isTokenExpired = () => {
      console.log("Checking token expiration...");
      const token = authService.getToken();
      const isLoggedIn = authService.isLoggedIn(token);

      if (!isLoggedIn) {
        console.log("Token expired, logging out...");
        logout();
      }
    };

    isTokenExpired();
    const intervalId = setInterval(isTokenExpired, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
            Hello {user.firstName} {user.lastName} | Email: {user.email} | Role:{" "}
            {user.roleId === "2" ? "Admin" : "User"}
          </span>
          <NavLink
            className={styles.Logout}
            to="/login"
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
