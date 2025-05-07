import { useForm } from "react-hook-form";
import styles from "./ResetPassword.module.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";

export function ResetPassword(): React.ReactElement {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  const user = useSelector<AppState, UserModel>((store) => store.user);

  async function send(credentials: CredentialsModel) {
    try {
      const credentialsWithEmail = { ...credentials, email: user.email };
      await userService.resetPassword(credentialsWithEmail);
      notify.success("Password has been changed");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.ResetPassword}>
      <form onClick={handleSubmit(send)}>
        <label>
          Old Password:
          <input
            type="password"
            {...register("password", { required: "Password is required!" })}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            {...register("password", { required: "Password is required!" })}
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
