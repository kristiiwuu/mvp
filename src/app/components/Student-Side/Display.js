import Question from "./Question";
import Chat from "./Chat";

export default function Display({ assignmentId, selectedNum, selectedAnswer, selectedQuestion, chat, setChat, systemPrompt, setSystemPrompt, saved, setSaved, isCorrect, setIsCorrect, isCorrectArray, setIsCorrectArray}) {
    return(
        <div className="w-screen flex flex-col gap-3">
            <Question selectedQuestion ={selectedQuestion}/>
            <Chat assignmentId={assignmentId} selectedAnswer={selectedAnswer} selectedNum={selectedNum} selectedQuestion={selectedQuestion} chat={chat} setChat={setChat} systemPrompt={systemPrompt} 
            setSystemPrompt={setSystemPrompt} saved={saved} setSaved={setSaved} isCorrect={isCorrect}  setIsCorrect={setIsCorrect} isCorrectArray={isCorrectArray} setIsCorrectArray={setIsCorrectArray}/>
        </div>
    );
}