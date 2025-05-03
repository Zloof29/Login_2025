import { RegisterMessage } from "../RegisterMessage/RegisterMessage";
import { Routing } from "../Routing/Routing";
import styles from "./Layout.module.css";

export function Layout(): React.ReactElement {
  return (
    <div className={styles.Layout}>
      <div className={styles.Main1}>
        <Routing />
      </div>

      <div className={styles.Main2}></div>
      <RegisterMessage />
    </div>
  );
}
