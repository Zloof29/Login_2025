import { NavLink, useNavigate } from "react-router-dom";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { notify } from "../../../Utils/Notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { userService } from "../../../Services/UserService";

export function Login(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsModel>({ mode: "onChange" });

  const navigate = useNavigate();

  async function send(credentials: CredentialsModel) {
    try {
      await userService.login(credentials);
      notify.success("Welcome back!");
      navigate("/userPanel");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.Login}>
      <h1>Login to Your Account</h1>

      <form onSubmit={handleSubmit(send)}>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format.",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
            maxLength: {
              value: 12,
              message: "Password must be maximum 12 characters long.",
            },
            validate: (value) =>
              /[0-9]/.test(value) ||
              "Password must include at least one number",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button>Sign In</button>

        <span className={styles.RegisterForSmallScreen}>
          Don't have a account?
          <NavLink className={styles.RegisterLink} to={"/register"}>Register</NavLink>
        </span>
      </form>
    </div>
  );
}
