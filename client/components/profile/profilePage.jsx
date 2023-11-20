import React, { useContext } from "react";
import { LoginContext } from "../login/loginContext";
import { useNavigate } from "react-router-dom";
import "../../resources/styles/styles.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, loadUser } = useContext(LoginContext);

  async function handleSubmitLogout(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to log out " + res.statusText);
    }
    await loadUser();
    navigate("/");
  }

  if (!user) {
    return <p>Loading...</p>; // or any other handling for not logged in state
  }

  return (
    <div>
      <h2>Profile page</h2>
      {!!user.picture ? (
        <img className={"pfp"} src={user.picture} alt={"profile picture"} />
      ) : (
        <picture>
          <source
            srcSet={require("../../resources/images/dark-pfp.jpg")}
            media="(prefers-color-scheme: dark)"
          />
          <img
            className={"pfp"}
            src={require("../../resources/images/default-pfp.jpg")}
            alt={"default profile picture"}
          />
        </picture>
      )}
      <div>Name: {user.name}</div>
      <div>Username: {user.username}</div>

      <form onSubmit={handleSubmitLogout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
