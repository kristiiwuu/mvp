import { useState, useEffect, useRef } from 'react';
import { saveChat } from '../../saveChat/actions';
import TextBubble from './TextBubble';
import Suggestions from './Suggestions';
import BlueDuey from 'public/blue-duey.svg';
import UpArrow from 'public/up-arrow.svg';
import MCQCard from './MCQCard';
import FillBlankCard from './FillBlankCard';

// Custom alert component
const CustomAlert = ({ message, onClose }) => (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 pb-10 rounded shadow text-black flex flex-col justify-center items-center">
            <BlueDuey className="scale-50"/>
            <p>{message}</p>
            <button onClick={onClose} className="w-[40%] mt-2 bg-[#1F8FBF] text-white hover:bg-[#58B6DF] px-4 py-2 rounded">Close</button>
        </div>
    </div>
);

export default function Chat({ assignmentId, selectedNum, selectedAnswer, selectedQuestion, chat, setChat, systemPrompt, setSystemPrompt, saved, setSaved }) {
    const [userInput, setUserInput] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    // Update system prompt if user selects a different question
    useEffect(() => {
        setSystemPrompt({
            role: "system",
            content: `You are a kind, patient, and extremely knowledgeable middle school teacher, addressing your user as your student. Your goal is to guide the student to answer the question correctly so that you can respond with "That's correct! You're ready to move onto the next question!" Only respond with "That's correct! You're ready to move onto the next question!" one time at the end when the student answers the question correctly. Always reply with guiding questions that help the student think critically and arrive at the answer independently.
            Follow these cases and the following steps to help the student reach the final goal of answering the question independently. Here is the question the student is trying to answer: ${selectedQuestion}

            Case 1: The student demands the correct answer. NEVER directly provide the correct answer, even if the student demands it. Instead:
            1. Use open-ended questions to guide their thought process.
            2. If the student says "I don't know," you may provide ONE hint—no more.

            Case 2: The student appears to be going in circles, repeating their answers without reaching the final answer, and asking "I'm not sure" or "I don't know" more than 3 times in a row. In this case:
            1. You may provide ONE hint—no more.

            Sometimes, provide fill-in-the-blank or multiple-choice questions to guide the student. When you want to ask a multiple-choice question, format your response as JSON with the following structure:
            {
                "type": "mcq",
                "question": "Your guiding question here",
                "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
            }

            For fill-in-the-blank questions:
            {
              "type": "fillblank",
              "question": "Complete this statement: The process of photosynthesis converts sunlight into _______.",
              "answer": "energy"
            }

            For regular responses, use:
            {
                "type": "text",
                "content": "Your regular response here"
            }

            Case 3: The student works with you to achieve the correct answer, but hasn't come too close to the real answer yet..
            1. Keep asking the user questions until they get almost near the correct answer.

            Case 4: The user asks a question completely unrelated to the question they should be trying to answer.
            1. Redirect their attention to the question you have been system prompted with. DO NOT UNDER ANY CIRCUMSTRANCES stray to topics that are different from the question they should be trying to answer.

            Case 5: The user might have learned the correct answer.
            Once you feel that the user is nearing the answer, ask them the original question again.

            Only validate the student’s answer as correct if:
            - They explicitly restate and provide the correct answer/definition.
            - Their response shows clear understanding or is nearly accurate.

            Do not combine or infer correctness from prior responses from yourself or the user. Once the student’s answer is correct:
            1. Respond with "That's correct! You're ready to move onto the next question!"
            2. Stop responding unless further prompted.
            
            Assign every response the user gives with a number from 0 to 100, with 0 being very far from the answer to the question, and 100 being the exact answer to the question.
            Put this number in the beginning of your response.
            `
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
        // run similarity
        setChat(prev => [...prev, { role: 'user', content: userInput }])
        setUserInput('')
        setLoading(true)

        /*
        console.log("hi");

        const similarity = await fetch('/api/similarity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({selected_answer: selectedAnswer, user_input: userInput})
        });

        console.log(similarity.json());
        console.log(similarity);

        */

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [systemPrompt, ...chat, { role: 'user', content: userInput }] }),
        })

        if (response.ok) {
          const result = await response.json();
          setChat(prev => [...prev, result.message]);
          if(result.message.content.includes("You're ready to move onto the next question!")) {
            setIsCorrect(true);
          }
        }
        setLoading(false);
    }
    
    // save chat history in supabase
    const handleSaveChat = () => {
        if (saved) {
            setShowAlert(true);
            setAlertMessage("You already submitted your answers to this question. Please move on to the next!");
        } 
        else if (chat.length === 0){
            setShowAlert(true);
            setAlertMessage("Please attempt to answer before submitting.")
        }
        else {
            saveChat(chat, selectedNum, assignmentId);
            setSaved(true);
        }
    }
    
    useEffect(() => {
      setSaved(false);
    },[chat])

    // suggestion bubbles
    const suggestions = ["Can you give an example?", "Can you explain in a different way?", "I'm not sure", "Multiple choice question", "Fill in the blank question"];

    const handleUseSuggestion = async (text) => {
        setChat(prev => [...prev, { role: 'user', content: text }])
        setUserInput('')
        setLoading(true)

        console.log("hi there");

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
        <>
            {showAlert && <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <div className="text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between w-auto text-lg flex-grow overflow-hidden">
                {/* chat */}
                <div className="flex gap-6 overflow-y-auto max-h-auto flex-col">
                    {chat.map((message, index) => {
                        if (message.role === 'assistant') {
                            try {
                                const parsedMessage = JSON.parse(message.content);
                                if (parsedMessage.type === 'mcq') {
                                    return (
                                        <MCQCard
                                            key={index}
                                            ref={index === chat.length - 1 ? lastChatRef : null}
                                            question={parsedMessage.question}
                                            choices={parsedMessage.choices}
                                            onSelect={(choice) => {
                                                setUserInput(choice);
                                                handleSendMessage();
                                            }}
                                        />
                                    );
                                } else if (parsedMessage.type === 'fillblank') {
                                    return (
                                        <FillBlankCard
                                            key={index}
                                            ref={index === chat.length - 1 ? lastChatRef : null}
                                            question={parsedMessage.question}
                                            answer={parsedMessage.answer}
                                            onSubmit={(answer) => {
                                                setUserInput(answer);
                                                handleSendMessage();
                                            }}
                                        />
                                    );
                                }
                                return (
                                    <TextBubble
                                        ref={index === chat.length - 1 ? lastChatRef : null}
                                        key={index}
                                        message={{ ...message, content: parsedMessage.content }}
                                        isCorrect={isCorrect}
                                    />
                                );
                            } catch (e) {
                                // Fallback for non-JSON responses
                                return (
                                    <TextBubble
                                        ref={index === chat.length - 1 ? lastChatRef : null}
                                        key={index}
                                        message={message}
                                        isCorrect={isCorrect}
                                    />
                                );
                            }
                        }
                        return (
                            <TextBubble
                                ref={index === chat.length - 1 ? lastChatRef : null}
                                key={index}
                                message={message}
                                isCorrect={isCorrect}
                            />
                        );
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
                    <input 
                        value={userInput} 
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        // onPaste={(e) => e.preventDefault()}
                        placeholder="Type here" 
                        className="w-[80%] flex-grow border-2 rounded-[12px] p-2 border-[#D7D7D7]"
                    ></input>
                    <button className={`${userInput.trim() ? 'bg-[#1F8FBF]' : 'bg-[#CDCDCD]'}  hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white flex justify-center`} onClick={handleSendMessage} disabled={loading} type="submit">
                      <UpArrow/>
                    </button>
                    <button className={` ${(isCorrect || saved ) && chat.length > 0 ? 'bg-[#79d38d] hover:bg-[#79d38d]' : 'bg-[#CDCDCD] hover:bg-[#1F8FBF]'} rounded-[12px] w-[10%] px-5 py-3 text-white`} onClick={handleSaveChat} disabled={loading} type="submit">Submit</button>
                  </div>
                </div>
            </div>
        </>
    );
}

