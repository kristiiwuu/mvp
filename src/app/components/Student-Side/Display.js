import Question from "./Question";
import Chat from "./Chat";

export default function Display({ selectedNum, selectedQuestion, setSystemPrompt }) {
    return(
        <div className="w-screen flex flex-col gap-5">
            <Question selectedQuestion ={selectedQuestion}/>
            <Chat selectedNum={selectedNum} selectedQuestion={selectedQuestion} setSystemPrompt={setSystemPrompt}/>
        </div>
    );
}