import Question from "./Question";
import Chat from "./Chat";

export default function Display() {
    return(
        <div className="w-screen h-screen flex flex-col gap-5">
            <Question />
            <Chat />
        </div>
    );
}