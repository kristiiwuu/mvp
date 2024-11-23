import { useState, useEffect, useRef } from 'react';
import { saveChat } from '../../saveChat/actions';
import TextBubble from './TextBubble';
import Suggestions from './Suggestions';
import BlueDuey from 'public/blue-duey.svg';

export default function Chat({ selectedNum, selectedQuestion, chat, setChat, systemPrompt, setSystemPrompt, setSaved }) {
    const [userInput, setUserInput] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    
    // Update system prompt if user selects a different question
    useEffect(() => {
        setSystemPrompt({
            role: "system",
            content: `You are a middle school teacher, addressing your user as your student. Your goal is to guide the student to answer the question correctly so that you can respond with "That's correct!" Only respond with "That's correct!" when the student answers the question correctly. Always reply with guiding questions that help the student think critically and arrive at the answer independently.
            NEVER directly provide the correct answer, even if the student demands it. Instead:
            1. Use open-ended questions to guide their thought process.
            2. If the student says "I don't know," you may provide ONE hint—no more.

            Only validate the student’s answer as correct if:
            - They explicitly provide the correct answer/definition.
            - Their response shows clear understanding or is nearly accurate.

            Do not combine or infer correctness from prior responses. Once the student’s answer is correct:
            1. Respond with "That's correct!"
            2. Stop responding unless further prompted.

            Here is the question the student is trying to answer: ${selectedQuestion}`
        });
        setSaved(false);
        setIsCorrect(false);
        setChat([]);
    }, [selectedNum, selectedQuestion]); 

    // Auto-scroll
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

    // Send message to duey
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
          const result = await response.json();
          setChat(prev => [...prev, result.message]);
          if(result.message.content.includes("That's correct")) {
            setIsCorrect(true);
          }
        }
        setLoading(false);
    }
    
    // save chat history in supabase
    const handleSaveChat = () => {
      saveChat(chat, selectedNum);
      setSaved(true);
      setChat([]);
    }

    // suggestion bubbles
    const suggestions = ["Can you give an example?", "Can you explain in a different way?", "I'm not sure"];

    const handleUseSuggestion = async (text) => {
        setChat(prev => [...prev, { role: 'user', content: text }])
        setUserInput('')
        setLoading(true)

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [systemPrompt, ...chat, { role: 'user', content: text }] }),
        })

        if (response.ok) {
        const result = await response.json()
        setChat(prev => [...prev, result.message])
        }
        setLoading(false);
    }

    return(
        <div className="text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between w-auto text-lg flex-grow overflow-hidden">
            {/* chat */}
            <div className="flex gap-6 overflow-y-auto max-h-auto flex-col">
                {chat.map((message, index) => {
                  return <TextBubble ref={index == chat.length - 1 ? lastChatRef : null} key={index} message={message} isCorrect={isCorrect}/>;
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
                <button className={`${chat.length > 0 ? 'bg-[#1F8FBF]' : 'bg-[#CDCDCD]'} ${isCorrect && chat.length > 0 ? 'bg-[#79d38d] hover:bg-[#79d38d]' : 'bg-[#CDCDCD] hover:bg-[#1F8FBF]'} rounded-[12px] w-[10%] px-5 py-3 text-white`} onClick={handleSaveChat} disabled={loading} type="submit">Submit</button>
              </div>
            </div>
        </div>
    );
}

