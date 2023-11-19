import express from "express";
import cookieParser from "cookie-parser";
import * as path from "path";

const app = express();

app.use(express.json());
app.use(cookieParser());

const loginRouter = express.Router();
loginRouter.post("", (req, res) => {
  res.cookie("username", req.body.username);
  res.sendStatus(204);
});

loginRouter.get("", (req, res) => {
  const { username } = req.cookies;
  res.send({ username });
});

app.use("/api/login", loginRouter);

app.use(express.static("../client/dist"));

// Express middleware for default route
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT || 3000);
