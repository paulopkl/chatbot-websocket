"use client";

import Chat from "@/components/Chat/Chat";

export default function Home() {
    return (
        <main className="bg-blue-950 w-screen h-screen">
            <div className="absolute right-8 bottom-8">
                <Chat />
            </div>
        </main>
    );
}
