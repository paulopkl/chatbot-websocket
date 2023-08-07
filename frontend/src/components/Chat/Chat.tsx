import Card from "./Card";
import { useState } from "react";
import Image from "next/image";
import Core from "./Core";

export default function ChatComponent() {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChat = () => {
        setOpen(true);
    };

    const handleCloseChat = () => {
        setOpen(false);
    };

    return open ? (
        <Card
            header={
                <div className="p-4 rounded-t-md gap-20 text-white font-bold text-xl bg-light-yellow flex justify-between">
                    <span>Chat - Atendimento</span>
                    <span
                        className="cursor-pointer duration-300 hover:bg-yellow-600 px-2 rounded-sm "
                        onClick={handleCloseChat}
                    >
                        X
                    </span>
                </div>
            }
        >
            <Core />
        </Card>
    ) : (
        <Image
            src="/chat.png"
            className="w-[64px] h-[64px] cursor-pointer"
            alt={""}
            width={64}
            height={64}
            onClick={handleOpenChat}
        />
    );
}
