import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./loginContext";
import { LoginWithOpenidButton } from "./loginWithOpenidButton";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loadUser } = useContext(LoginContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong! err: " + res.statusText);
    }
    await loadUser();
    navigate("/");
  }

  return (
    <>
      <LoginWithOpenidButton />
      <form onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Log in</button>
        </div>
        <pre>{JSON.stringify({ username, password })}</pre>
      </form>
    </>
  );
}
