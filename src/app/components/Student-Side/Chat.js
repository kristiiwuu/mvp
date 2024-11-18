import { useState, useEffect } from 'react';
import { saveChat } from '../../saveChat/actions';
import TextBubble from './TextBubble';

export default function Chat({ selectedQuestion }) {
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
   
    // useEffect(() => {
    //   console.log("CHAT:", JSON.stringify(chat));
    // }, [chat])
    
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
        setLoading(false)
    }
    
    const handleSaveChat = () => {
      saveChat(chat);
    }

    return(
        <div className="h-screen text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between w-auto text-lg">
            <div className="flex flex-col gap-6 overflow-y-auto max-h-[400px]"> 
                {chat.map((message, index) => (
                  <TextBubble index={index} message={message}/>
                ))}
            </div>
            <div className="flex gap-4">
                <input value={userInput} onChange={(e) => setUserInput(e.target.value)}
                    placeholder = "Type here" className="w-[80%] flex-grow border-2 rounded-[12px] p-2 border-[#D7D7D7]"></input>
                <button className="bg-[#CDCDCD] hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white" onClick={handleSendMessage} disabled={loading} type="submit">Send</button>
                <button className="bg-[#CDCDCD] hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white" onClick={handleSaveChat} disabled={loading} type="submit">Done</button>
            </div>
        </div>
    );
}