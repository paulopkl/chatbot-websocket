"use client";

import { randomBytes, randomUUID } from "crypto";
import {
    KeyboardEvent,
    KeyboardEventHandler,
    useEffect,
    useState,
} from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3333", { transports: ["websocket"] });

type Message = {
    author: string;
    message: string;
};

const socket = io("http://localhost:3333", { transports: ["websocket"] });
// const userId = randomBytes(20).toString("hex");

export default function Core() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [logged, setLogged] = useState<boolean>(false);
    const [isInChat, setIsInChat] = useState<boolean>(false);
    const [waitList, setWaitList] = useState<boolean>(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Array<Message>>([]);

    useEffect(() => {
        //     (async () => {
        //         // We just call it because we don't need anything else out of it
        //         await fetch("/api/socket");
        //         socket = io();
        //         socket.on("newIncomingMessage", (msg: Message) => {
        //             setMessages((currentMsg) => [
        //                 ...currentMsg,
        //                 { author: msg.author, message: msg.message },
        //             ]);
        //             console.log(messages);
        //         });
        //     })();

        socket.on("message", (data) => {
            console.log(data);

            if (data.userId === socket.id) {
                setMessages(data.messages);
            }
        });

        socket.on("move_waiting_list", (data) => {
            console.log(data);
            console.log(socket.id);

            if (!window.localStorage.getItem("room")) {
                setLogged(false);
                setIsInChat(false);
                setWaitList(false);
            }

            if (data.userId === socket.id) {
                setWaitList(false);
                handleSubject(window.localStorage.getItem("room") as string);
            }
        });
    }, [socket]);

    // useEffect(() => {}, []);

    const handleSubject = (roomName: string): void => {
        // console.log({ room });
        socket.emit(
            "connect_room",
            {
                // chatId: socket.id,
                userId: socket.id,
                // userId,
                userName,
                email,
                roomName,
            },
            (response: any) => {
                console.log(response);
                setWaitList(true);
            }
        );

        // setRoomName(roomName);
        window.localStorage.setItem("room", roomName);
        setIsInChat(true);


        // setMessages((currentMsg) => [
        //     ...currentMsg,
        //     { author: chosenUsername, message },
        // ]);
    };

    const sendMessage = async () => {
        const roomName = window.localStorage.getItem("room");

        socket.emit("message", {
            userId: socket.id,
            roomName,
            userName,
            message,
        });

        setMessage("");
    };

    const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (message.length > 0) {
                sendMessage();
            }
        }
    };

    function handleOnforward() {
        if (
            userName.length > 3 &&
            email.length > 3 &&
            email.includes("@") &&
            email.includes(".")
        ) {
            setLogged(true);
        }
    }

    function renderRequestUserInfo() {
        return (
            <>
                <span className="text-lg">Informe seus dados abaixo</span>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Digite seu email"
                        className="py-2 px-4 rounded-t-md border-light-yellow border-b-2"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="username" className="font-bold">
                        Nome
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Digite seu nome"
                        className="py-2 px-4 rounded-t-md border-light-yellow border-b-2"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="shadow-lg py-2 text-lg uppercase rounded-md font-bold text-light-gray bg-light-yellow hover:bg-yellow-600"
                    onClick={handleOnforward}
                >
                    Prosseguir
                </button>
            </>
        );
    }

    function renderChat() {
        return isInChat ? (
            waitList ? (
                <div className="flex flex-col h-[300px] max-w-xs">
                    <div className="flex flex-col items-center justify-around h-full">
                        <p className="text-2xl font-bold">Favor aguardar...</p>
                        <p className="break-words">
                            Todos os nossos atendentes estão ocupados no momento
                        </p>
                        <div className="w-full flex justify-center">
                            <svg
                                className="animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 4335 4335"
                                width="75"
                                height="75"
                            >
                                <path
                                    fill="#008DD2"
                                    d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-end h-[300px] max-w-xs gap-5">
                    <div className="h-full flex flex-col gap-3 overflow-y-scroll">
                        {messages.map((msg: any, index) => (
                            <p
                                key={index}
                                className="bg-blue-500 px-4 py-2 rounded-t-xl rounded-bl-xl text-white"
                            >
                                {msg.text}
                            </p>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Digite sua mensagem"
                        className="px-4 py-2 rounded-t-md border-light-yellow border-b-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyUp={handleKeypress}
                    />
                </div>
            )
        ) : (
            <>
                <span className="text-lg">Qual assunto se trata?</span>
                <button
                    className="px-4 py-2 bg-white border-b-2 border-light-yellow rounded-md text-xl font-light cursor-pointer duration-300 hover:bg-gray-200"
                    onClick={() => handleSubject("cardProblem")}
                >
                    Problemas com cartão
                </button>
                <button
                    className="px-4 py-2 bg-white border-b-2 border-light-yellow rounded-md text-xl font-light cursor-pointer duration-300 hover:bg-gray-200"
                    onClick={() => handleSubject("loan")}
                >
                    Contratação de empréstimo
                </button>
                <button
                    className="px-4 py-2 bg-white border-b-2 border-light-yellow rounded-md text-xl font-light cursor-pointer duration-300 hover:bg-gray-200"
                    onClick={() => handleSubject("other")}
                >
                    Outros Assuntos
                </button>
            </>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {logged ? renderChat() : renderRequestUserInfo()}
        </div>
    );
}
