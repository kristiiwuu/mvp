"use client";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/openai",
    });

    const chatContainer = useRef(null);

    const scroll = () => {
        const {offSetHeight, scrollHeight, scrollTop} = chatContainer.current;
        if( scrollHeight >= scrollTop + offSetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200);
        }
    }

    const renderReponse = () => {
        return (
            <div>
                {messages.map((message) => (
                    <div key={message.id}>
                        {/* <Image src={message.role === "user" ? "/user.png" : "/bot.png"} alt="user" width={32} height={32} /> */}
                        {message.role}
                        <div className="w-[100%] m-[16px]">
                            <p >{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-black flex items-center justify-center h-screen w-[100%]">
            {renderReponse()}
            <form className="w-[100%] flex justify-center gap-[10px]" onSubmit={handleSubmit}>
                <input className="text-black w-[70%]" type="text" value={input} onChange={handleInputChange}></input>
                <button className="w-[25%] bg-white text-black p-2 rounded" type="submit">Submit</button>
            </form>
        </div>
    );
}
