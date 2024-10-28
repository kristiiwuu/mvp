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
                        <Image src={message.role === "user" ? "/user.png" : "/bot.png"} alt="user" width={32} height={32} />
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
        <div>
            {renderReponse()}
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleInputChange}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
