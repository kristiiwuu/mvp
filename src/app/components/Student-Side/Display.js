import Question from "./Question";
import Chat from "./Chat";

export default function Display({ selectedQuestion }) {
    return(
        <div className="w-screen h-auto flex flex-col">
            <Question selectedQuestion ={selectedQuestion}/>
            <Chat selectedQuestion={selectedQuestion}/>
        </div>
    );
}