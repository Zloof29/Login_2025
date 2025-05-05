import { Route, Routes } from "react-router-dom";
import styles from "./Routing.module.css";
import { Page404 } from "../Page404/Page404";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { UserPanel } from "../../ContentArea/UserPanel/UserPanel";

export function Routing(): React.ReactElement {
  return (
    <div className={styles.Routing}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userPanel" element={<UserPanel />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
