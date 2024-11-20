import { useState, useEffect, useRef } from 'react';
import { saveChat } from '../../saveChat/actions';
import TextBubble from './TextBubble';
import Suggestions from './Suggestions';

export default function Chat({ selectedNum, selectedQuestion }) {
    const [userInput, setUserInput] = useState(''); 
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    
    const [systemPrompt, setSystemPrompt] = useState({
      role: "system",
      content: "You are a middle school teacher. You address your user as your student."
            + "You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer."
            + "If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions." 
            + "You can give hints when the user responds with \"I don't know\" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it almost right."
            + "Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses." 
            + `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${selectedQuestion}`
    });

    useEffect(() => {
        setSystemPrompt({
            role: "system",
            content: `You are a middle school teacher. You address your user as your student.`
            + `You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer.`
            + `If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions.` 
            + `You can give hints when the user responds with "I don't know" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it almost right.`
            + `Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses.` 
            + `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${selectedQuestion}`
        });
    }, [selectedQuestion, setSystemPrompt]); // Add setSystemPrompt to the dependency array
    
    console.log(`selected question:  ${selectedQuestion}`)
    useEffect(() => {
      scrollToLastChat();
    }, [chat])

    const lastChatRef = useRef(null);

    const scrollToLastChat = () => {
      if (lastChatRef.current)
      {
        lastChatRef.current.scrollIntoView();
      }
    }

    /*
    useEffect(() => {
        setSystemPrompt(() => ({
            role: "system",
            content: "please print 'hello i am chatgpt' and stop"
        }));
    }, [selectedQuestion])
    */
   
    // useEffect(() => {
    //   setSystemPrompt(prev => ({
    //     ...prev,
    //     content: `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${selectedQuestion}`
    //   }));
    // }, [selectedQuestion])
    
    const handleSendMessage = async () => {
        if (!userInput.trim()) return

        setChat(prev => [...prev, { role: 'user', content: userInput }])
        setUserInput('')
        setLoading(true)

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [systemPrompt, ...chat, { role: 'user', content: userInput }] }),
        })

        if (response.ok) {
        const result = await response.json()
        //const result = await response
        setChat(prev => [...prev, result.message])
        }
        setLoading(false);
        
    }
    
    const handleSaveChat = () => {
      saveChat(chat, selectedNum);
    }

    const suggestions = ["Can you give an example?", "Can you explain in a different way?", "I'm not sure"];

    const handleUseSuggestion = (text) => {
        setUserInput(text);
        handleSendMessage();
    }

    /*
    const handleClick = (num) => {
        setSelectedNum(num); // Update the selected number
        setSelectedQuestion(questions[num]); // Update the selected question

        // Reset the chat for a new session
        setChat([]); // Clear the existing chat history

        // Update the system prompt with the new question
        setSystemPrompt(prev => ({
            ...prev,
            content: "You are a middle school teacher. You address your user as your student."
            + "You always reply with guiding questions that help them reach the answer by meeting students where they are, and NEVER directly give the correct answer."
            + "If the user asks for the answer or demands that you tell them, DO NOT UNDER ANY CIRCUMSTANCES tell them the answer. You are only allowed to give leading questions." 
            + "You can give hints when the user responds with \"I don't know\" or a similar response. Only allow yourself to give one hint. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it almost right."
            + "Only consider a student's answer as correct if they are able to send you the definition/answer. Do not compile the correct answer from previous user responses." 
            + `Once the student’s answer is deemed correct you can stop replying until further prompting. Here is the question that the student is trying to answer: ${questions[num]}`
        }));
    }
        */

    return(
        <div className="text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between w-auto text-lg flex-grow overflow-hidden">
            {/* chat */}
            <div className="flex gap-6 overflow-y-auto max-h-auto flex-col">
                {chat.map((message, index) => {
                  return <TextBubble ref={index == chat.length - 1 ? lastChatRef : null} key={index} message={message}/>;
                })}
            </div>
            {/* user inputs*/}
            <div className="flex flex-col gap-2 mt-5 p-0">
              {/* suggestion bubbles */}
              <div className="w-auto flex gap-2 flex-wrap">
                {suggestions.map((text, index) => {
                  return <Suggestions key={index} text={text} onClick={() => handleUseSuggestion(text)} />
                })}
              </div>
              {/* input bar */}
              <div className="flex gap-4">
                <input value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder = "Type here" className="w-[80%] flex-grow border-2 rounded-[12px] p-2 border-[#D7D7D7]"></input>
                <button className={`${userInput.trim() ? 'bg-[#1F8FBF]' : 'bg-[#CDCDCD]'}  hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white`} onClick={handleSendMessage} disabled={loading} type="submit">Send</button>
                <button className="bg-[#CDCDCD] hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white" onClick={handleSaveChat} disabled={loading} type="submit">Submit</button>
              </div>
            </div>
        </div>
    );
}

