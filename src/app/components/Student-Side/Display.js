import Question from "./Question";
import Chat from "./Chat";

export default function Display({ selectedQuestion }) {
    return(
        <div className="w-screen flex flex-col gap-5">
            <Question selectedQuestion ={selectedQuestion}/>
            <Chat selectedQuestion={selectedQuestion}/>
        </div>
    );
}