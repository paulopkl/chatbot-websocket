import express from "express";
import http from "http";
import { Server } from "socket.io";
import attendantsController from "../controllers/attendants.controller";
import cardController from "../controllers/card.controller";
import loanController from "../controllers/loan.controller";
import otherSubjectController from "../controllers/other-subject.controller";

const app = express();
app.use(express.json());

app.use("/attendant", attendantsController);
app.use("/card", cardController);
app.use("/loan", loanController);
app.use("/other", otherSubjectController);
app.get("/heath-check", (req, res) => res.json({ ok: true }));

var serverHttp = http.createServer(app);
var io = new Server(serverHttp, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

export { serverHttp, io };
