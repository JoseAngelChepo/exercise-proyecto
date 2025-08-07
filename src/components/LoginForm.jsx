import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "./Loader";
import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schemeSignIn = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "Correo inválido")
    .required("Correo requerido"),
  password: yup.string().required("Contraseña requerida"),
});

const LoginForm = (props) => {
  const { isLoading, signIn } = props;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemeSignIn),
  });

  const onSubmit = (data) => {
    signIn(data);
  };
  return (
    <>
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-title">Iniciar sesión</h2>
        <p className="text-subtitle">Acceso de usuarios</p>
        <div className="input-container">
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register("email")}
            placeholder="email@email.com"
            className={errors.email ? "input-error" : ""}
            autoComplete="username"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="input-container">
          <label>Contraseña</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Contraseña"
              className={errors.password ? "input-error" : ""}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <button className="button-login" type="submit">
              Iniciar sesión
            </button>
          </>
        )}
      </form>
      <style jsx>
        {`
          .login-form-container {
            max-width: 340px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: linear-gradient(135deg, #f5f5f5 80%, #e0e0e0 100%);
            color: #222;
            padding: 50px 30px 40px 30px;
            border-radius: 18px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
            transition: box-shadow 0.3s;
          }
          .login-form-container:focus-within {
            box-shadow: 0 8px 40px 0 rgba(31, 38, 135, 0.25);
          }
          .text-title {
            font-size: clamp(1.3rem, 2.5vw, 2.1rem);
            margin: 5px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .text-subtitle {
            font-size: clamp(1rem, 1.8vw, 1.2rem);
            margin: 5px 0px 40px 0px;
            color: #555;
          }
          .input-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 14px 0px;
          }
          .input-container label {
            font-size: 16px;
            margin-bottom: 6px;
            font-weight: 500;
          }
          .input-container input {
            font-size: 17px;
            width: 100%;
            height: 38px;
            border: 1.5px solid #d1d1d1;
            border-radius: 9px;
            background-color: #fff;
            outline: none;
            color: #222;
            padding: 0px 10px;
            margin-bottom: 2px;
            transition: border 0.2s;
          }
          .input-container input:focus {
            border: 1.5px solid #888;
            background: #f9f9f9;
          }
          .input-error {
            border: 1.5px solid #e74c3c !important;
            background: #fff6f6;
          }
          .password-wrapper {
            width: 100%;
            display: flex;
            align-items: center;
            position: relative;
          }
          .password-wrapper input {
            padding-right: 38px;
          }
          .show-password-btn {
            position: absolute;
            right: 6px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2em;
            color: #888;
            padding: 0 4px;
            transition: color 0.2s;
          }
          .show-password-btn:hover {
            color: #222;
          }
          .loader-container {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0px;
          }
          .button-login {
            height: 42px;
            width: 100%;
            margin: 18px 0px 0px 0px;
            background: linear-gradient(90deg, #222 60%, #444 100%);
            transition: background 0.3s, box-shadow 0.2s;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 9px;
            color: white;
            font-weight: 700;
            font-size: 1.1em;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.08);
          }
          .button-login:hover {
            background: linear-gradient(90deg, #444 60%, #222 100%);
            box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.12);
          }
          .error-text {
            font-size: 0.9em;
            color: #e74c3c;
            font-weight: 600;
            margin: 2px 0 0 2px;
            letter-spacing: 0.1px;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          @media (max-width: 768px) {
            .login-form-container {
              padding: 20px 8px 18px 8px;
            }
            .text-subtitle {
              margin-bottom: 18px;
            }
          }
        `}
      </style>
    </>
  );
};

export default LoginForm;
