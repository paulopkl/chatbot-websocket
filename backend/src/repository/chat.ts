interface IMessage {
    type: "USER" | "ATTENDANT";
    text: string;
}

interface IChat {
    // chatId: string;
    userId?: string;
    attendantId?: string;
    messages: IMessage[];
}

interface IAttendant {
    attendantId: string;
    attendantName: string;
    // activeChats: IChat[];
}

interface IActiveUser {
    userId: string;
    userName: string;
    email: string;
}

interface IWaitingUser {
    requestCreatedDate: Date;
    userId: string;
    userName: string;
    email: string;
}

class ChatRepository {
    // private structure: Structure[];
    public roomId: string;
    public roomName: string;
    private _attendants: IAttendant[] = [];
    private _activeUsers: IActiveUser[] = [];
    private _activeChats: IChat[] = [];
    private _waitingUsers: IWaitingUser[] = [];

    constructor(roomId: string, roomName: string) {
        this.roomId = roomId;
        this.roomName = roomName;
        this._attendants = [
            {
                attendantId: "123ABC456",
                attendantName: "Paulo Ricardo",
            },
        ];
        this._activeUsers = [
            {
                userId: "654CBA321",
                email: "user1@email.com",
                userName: "Usuário 1 problema cartão",
            },
        ];
        this._activeChats = [
            {
                userId: "654CBA321",
                attendantId: "123ABC456",
                messages: [
                    {
                        type: "ATTENDANT",
                        text: "Olá qual o problema com seu cartão?",
                    },
                    {
                        type: "USER",
                        text: "Ele não está passando",
                    },
                ],
            },
            {
                userId: "654EFD321",
                attendantId: "123ABC456",
                messages: [],
            },
            // {
            //     chatId: "A123B456C",
            //     userId: "654HIJ321",
            //     attendantId: "123ABC456",
            //     messages: [],
            // },
        ];

        // this._waitingUsers = [
        //     {
        //         email: "",
        //         userId: "",
        //         userName: "",
        //         requestCreatedDate: ""
        //     }
        // ]
    }

    public registerAttendant({
        attendantId,
        name,
    }: {
        attendantId: string;
        name: string;
    }) {
        this._attendants.push({ attendantId, attendantName: name });
    }

    public verifyFreeAttendants(): IAttendant | undefined {
        const attendant = this._attendants.find((attendant) => {
            const participatingChatsCount = this._activeChats.map(
                (ac) => ac.attendantId === attendant.attendantId
            ).length;
            return participatingChatsCount < 3;
        });

        return attendant;
    }

    public registerUser({
        response,
        // chatId,
        email,
        userId,
        userName,
    }: {
        response: (message: { message: string }) => void;
        // chatId: string;
        email: string;
        userId: string;
        userName: string;
    }) {
        const userAlreadyExists = this._activeUsers.find(
            (au) => au.userName === userName
        );

        if (userAlreadyExists) {
            // const chatExist = this._activeChats.find(
            //     (ac) => ac.userId === userAlreadyExists.userId
            // );
            // if (chatExist) {
            //     chatExist.chatId = chatId;
            // }
        } else {
            const firstFreeAttendant = this.verifyFreeAttendants();
            // console.log(firstFreeAttendant);

            if (!firstFreeAttendant) {
                this._waitingUsers.push({
                    requestCreatedDate: new Date(),
                    email,
                    userName,
                    userId,
                });

                response({
                    message:
                        "Todos os nossos atendentes estão ocupados no momento aguarde",
                });
            } else {
                this._activeUsers.push({
                    email,
                    userName,
                    userId,
                });

                this._activeChats.push({
                    // chatId,
                    attendantId: firstFreeAttendant?.attendantId,
                    userId,
                    messages: [],
                });
            }
        }
    }

    public userPostMessage({
        userId,
        message,
    }: {
        userId: string;
        message: string;
    }) {
        this._activeChats
            .find((ac) => ac.userId === userId)
            ?.messages.push({
                type: "USER",
                text: message,
            });
    }

    public getChats(userId: string) {
        return this._activeChats.find((ac) => ac.userId === userId);
    }

    public attendantPostMessage() {}

    public listAttendants(): IAttendant[] {
        return this._attendants;
    }

    public endService({ socket, userId }: { socket: any; userId: string }) {
        // console.log(chatId, this._activeChats, this._activeUsers);

        const chatPositon = this._activeChats.findIndex(
            (ac) => ac.userId === userId
        );

        if (chatPositon >= 0) {
            const userId = this._activeChats[chatPositon].userId;

            const userPosition = this._activeUsers.findIndex(
                (au) => au.userId === userId
            );

            this._activeChats.splice(chatPositon, 1);
            this._activeUsers.splice(userPosition, 1);
        }

        console.log(this._waitingUsers);
        if (this._waitingUsers.length > 0) {
            const firstUser = this._waitingUsers[0];
            console.log(firstUser);

            socket.to(this.roomName).emit("move_waiting_list", firstUser);

            this._waitingUsers.splice(0, 1);
        }
    }
}

const chatRooms = [
    new ChatRepository("room_123", "cardProblem"),
    new ChatRepository("room_456", "loan"),
    new ChatRepository("room_789", "other"),
];

export { chatRooms };
