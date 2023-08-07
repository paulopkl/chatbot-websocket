import { chatRooms } from "../repository/chat";
import { io } from "./http";

// const structure: Structure[] = [
//     {
//         roomId: "123",
//         roomName: "cardProblem",
//         attendants: [
//             {
//                 attendantId: "123ABC456",
//                 attendantName: "Paulo Ricardo",
//             },
//         ],
//         activeUsers: [
//             {
//                 userId: "654CBA321",
//                 email: "user1@email.com",
//                 userName: "Usuário 1 problema cartão",
//             },
//         ],
//         activeChats: [
//             {
//                 chatId: "A123B456C",
//                 userId: "654CBA321",
//                 attendantId: "123ABC456",
//                 messages: [
//                     {
//                         type: "ATTENDANT",
//                         text: "Olá qual o problema com seu cartão?",
//                     },
//                     {
//                         type: "USER",
//                         text: "Ele não está passando",
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         roomId: "456",
//         roomName: "loan",
//         attendants: [],
//         activeUsers: [],
//         activeChats: [],
//     },
//     {
//         roomId: "789",
//         roomName: "other",
//         attendants: [],
//         activeUsers: [],
//         activeChats: [],
//     },
// ];

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("connect_room", (data, response) => {
        const { /* chatId, */ roomName, email, userId, userName } = data;
        console.log(data);

        socket.join(roomName);

        chatRooms
            .find((s) => s.roomName === roomName)
            ?.registerUser({
                response,
                // chatId,
                email,
                userId,
                userName,
            });
    });

    socket.on("message", (data) => {
        const { userId, roomName, message } = data;
        console.log({ data });

        const structure = chatRooms.find((s) => s.roomName === roomName);

        structure?.userPostMessage({
            userId,
            message,
        });

        const chat = structure?.getChats(userId);
        console.log({ chat });

        io.to(roomName).emit("message", chat);
    });

    socket.on("disconnect", (data) => {
        console.log({ data });

        chatRooms.forEach((s) => {
            s.endService({ socket: io, userId: socket.id });
        });

        // socket.rooms.size === 0
        console.log("user disconnected");

        socket.disconnect();
    });
});
