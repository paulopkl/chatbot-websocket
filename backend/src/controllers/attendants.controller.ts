import express from "express";
import { chatRooms } from "../repository/chat";
import { randomBytes } from "crypto";

const router = express.Router();

router.get("/list/all", (req, res) => {
    const attendants = chatRooms.map((chatRoom) => chatRoom.listAttendants());

    return res.status(200).json(attendants);
});

router.get("/list/:team", (req, res) => {
    const { team } = req.params;

    const attendants = chatRooms
        .find((chatRoom) => chatRoom.roomName === team)
        ?.listAttendants();

    return res.status(200).json(attendants);
});

router.post("/create", (req, res) => {
    const { name, team } = req.body;

    chatRooms
        .find((chatRoom) => chatRoom.roomName === team)
        ?.registerAttendant({
            attendantId: randomBytes(20).toString("hex"),
            name,
        });

    return res.status(200).json({
        message: `Atendente ${name} criado com sucesso no time: ${team}!`,
    });
});

export default router;
