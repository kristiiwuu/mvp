import Question from "./Question";
import Chat from "./Chat";

export default function Display({ assignmentId, selectedNum, selectedQuestion, chat, setChat, systemPrompt, setSystemPrompt, saved, setSaved }) {
    return(
        <div className="w-screen flex flex-col gap-5">
            <Question selectedQuestion ={selectedQuestion}/>
            <Chat assignmentId={assignmentId} selectedNum={selectedNum} selectedQuestion={selectedQuestion} chat={chat} setChat={setChat} systemPrompt={systemPrompt} setSystemPrompt={setSystemPrompt} saved={saved} setSaved={setSaved}/>
        </div>
    );
}