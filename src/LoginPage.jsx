import React, { useState } from "react";
import Logo from "./Artwork/loginLogo.png";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!identifier || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(
        "https://lancherixstudio-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid username or password");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const app = params.get("app") || "studio";

      const redirects = {
        studio: "https://studio.lancherix.com",
        labs: "http://localhost:3000",
      };

      const redirectBase = redirects[app];

      if (!redirectBase) {
        setError("Invalid app");
        return;
      }

      // 🚀 redirect limpio
      window.location.href =
        `${redirectBase}/auth/callback?token=${data.token}`;

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="all-loginPage">
      <div className="main-registerPage">
        <img className="logo-loginPage" src={Logo} alt="Lancherix" />

        <form onSubmit={handleSubmit}>

          <div className="content-registerPage">
            <div className="input-registerPage">
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className='inputUsername-loginPage'
                spellCheck="false"
              />
            </div>

            <div className="input-registerPage">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='inputPassword-loginPage'
                spellCheck="false"
              />
              {password && (
                <span className="toggle-loginPage" onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              )}
            </div>
          </div>

          {error && <div className='error-registerPage'>{error}</div>}

          <div className="login-navigation">
            <button type="submit" className="login-navigationprimary-btn">Login</button>
            <p>
              You don't have an account?{" "}
              <button
                type="button"
                className="link-registerPage"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;