const express = require("express");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();

const users = [{ id: 1, email: "bob@bob.com" }];

app.use(
  session({
    genid: (req) => {
      console.log("1. in genid req.sessionID: ", req.sessionID);
      return uuidv4();
    },
    store: new FileStore(),
    secret: "a private key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  console.log("get / req.sessionID: ", req.sessionID);
  console.log("req.session.user: ", req.session.user);
  req.session.user = users[0];
  console.log("req.session: ", req.session);
  res.send("get index route. /");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
