import { BaseButton, BaseInput } from "qore-components";
import Logo from "./images/Logo.svg";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="header-flex">
        <div className="container header-flex">
          <img src={Logo} alt="Logo" />
        </div>
      </header>

      <main className="container main-flex">
        <div className="login-texts">
          <span> Log in to your account</span>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <form className="form-flex">
          <BaseInput
            type="email"
            placeholder="Enter your email"
            label="Enter email"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <BaseInput
              type="password"
              placeholder="Enter your password"
              label="Enter password"
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "#667085",
                }}
              >
                Forgot password
              </p>
            </div>
          </div>
          <BaseButton
            text="Login"
            style={{ backgroundColor: "black" }}
            onClick={() => {
              navigate("/booking");
            }}
          />
        </form>
        <p style={{ fontSize: "0.8rem" }}>
          Qucoon. All rights reserved. © 2025
        </p>
      </main>
    </div>
  );
};
