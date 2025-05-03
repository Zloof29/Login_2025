import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./Routing.module.css";
import { Page404 } from "../Page404/Page404";

export function Routing(): React.ReactElement {
  return (
    <div className={styles.Routing}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
