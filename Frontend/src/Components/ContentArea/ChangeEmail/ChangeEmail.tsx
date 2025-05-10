import { useForm } from "react-hook-form";
import styles from "./ChangeEmail.module.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";

export function ChangeEmail(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>({ mode: "onChange" });

  const user = useSelector<AppState, UserModel>((store) => store.user);

  async function send(credentials: CredentialsModel) {
    try {
      credentials.currentEmail = user.email;
      await userService.changeEmail(credentials);
      notify.success("Email has been changed!");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.ChangeEmail}>
      <form onSubmit={handleSubmit(send)}>
        <h1>Change Email: </h1>
        <input
          type="email"
          placeholder="new Email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <button>Change Email</button>
      </form>
    </div>
  );
}
