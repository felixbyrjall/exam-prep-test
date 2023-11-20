import express from "express";
import cookieParser from "cookie-parser";
import * as path from "path";
import dotenv from "dotenv";
import { createMoviesRouter, moviesApi } from "./moviesApi.js";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();

app.use(express.json());
// eslint-disable-next-line no-undef
app.use(cookieParser(process.env.COOKIE_SECRET));

const DISCOVERY_URL =
  "https://accounts.google.com/.well-known/openid-configuration";

app.use(async (req, res, next) => {
  const { username, access_token } = req.signedCookies;
  if (access_token) {
    const res = await fetch(DISCOVERY_URL);
    const discoveryDoc = await res.json();

    const userinfoRes = await fetch(discoveryDoc.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!userinfoRes.ok) {
      throw new Error("The error was " + userinfoRes.statusText);
    }
    const userinfo = await userinfoRes.json();

    req.user = { ...userinfo, username: userinfo.email };
  } else {
    req.user = { username };
  }
  next();
});

const loginRouter = express.Router();
loginRouter.post("", (req, res) => {
  res.cookie("username", req.body.username, { signed: true });
  res.sendStatus(204);
});

loginRouter.post("/access_token", (req, res) => {
  res.cookie("access_token", req.body.access_token, { signed: true });
  res.sendStatus(204);
});

loginRouter.get("", (req, res) => {
  res.send(req.user);
});

//clears cookies when logging out
loginRouter.delete("", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("access_token");
  res.sendStatus(204);
});

//Routes
app.use("/api/movies", moviesApi);
app.use("/api/login", loginRouter);
app.use(express.static(path.resolve("../client/dist")));

// Express middleware for default route
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

// eslint-disable-next-line no-undef
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

//connection to the sample database in mongodb
client.connect().then((connection) => {
  const db = connection.db("sample_mflix");
  createMoviesRouter(db);
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3000);
