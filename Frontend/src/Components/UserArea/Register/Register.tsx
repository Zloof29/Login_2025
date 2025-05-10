import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { UserModel } from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { userService } from "../../../Services/UserService";

export function Register(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({ mode: "onChange" });
  const navigate = useNavigate();

  async function send(user: UserModel) {
    try {
      await userService.register(user);
      notify.success("Welcome!");
      navigate("/userPanel");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  return (
    <div className={styles.Register}>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit(send)}>
        <input
          type="text"
          placeholder="First name"
          {...register("firstName", {
            required: "First name is required.",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "First name must contain only letters.",
            },
          })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <input
          type="text"
          placeholder="Last name"
          {...register("lastName", {
            required: "Last name is required.",
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Last name must contain only letters.",
            },
          })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
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
              message: "Password must ne maximum 12 characters.",
            },
            validate: (value) =>
              /[0-9]/.test(value) ||
              "Password must include at least one number.",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button>Sign Up</button>
        <span className={styles.LoginSpan}>
          Already have account?
          <NavLink className={styles.LoginLink} to={"/login"}>
            Log in
          </NavLink>
        </span>
      </form>
    </div>
  );
}
