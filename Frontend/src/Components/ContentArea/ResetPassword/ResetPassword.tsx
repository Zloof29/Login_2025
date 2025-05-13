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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CredentialsModel>({ mode: "onChange" });

  const user = useSelector<AppState, UserModel>((store) => store.user);

  async function send(credentials: CredentialsModel) {
    try {
      const credentialsWithEmail = { ...credentials, email: user.email };
      await userService.resetPassword(credentialsWithEmail);
      notify.success("Password has been changed");
      reset();
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.ResetPassword}>
      <form onClick={handleSubmit(send)}>
        <h1>Reset Password</h1>
        <input
          type="password"
          placeholder="new Password"
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
            maxLength: {
              value: 12,
              message: "Password must be maximum 12 characters.",
            },
          })}
        />
        {errors.password && (
          <span className={styles.ErrorMessage}>{errors.password.message}</span>
        )}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
