import express from "express";
import "dotenv/config";
import ConnectDataBase from "./Config/DataBase.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import user from "./Routes/userRoute.js";
import "./MiddleWares/passport.js";
import passport from "passport";
import ai from "./Routes/aiRoute.js";
import session from "express-session";

const app = express();

ConnectDataBase();

const corsOptions = {
  origin: "https://alfred-ai-uyj1.onrender.com",
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(
  session({
    secret: "157283bdhwydnf",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Api is Hot");
});

app.use("/api/v1", user);
app.use("/api/v1", ai);

app.listen(process.env.PORT, () => {
  console.log(`server Running on Port : ${process.env.PORT}`);
});
