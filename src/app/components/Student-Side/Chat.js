import { useState } from 'react';

export default function Chat() {

    const [question, setQuestion] = useState(''); // change name to userInput 
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleSendMessage = async () => {
        if (!question.trim()) return

        setChat(prev => [...prev, { role: 'user', content: question }])
        setQuestion('')
        setLoading(true)

        const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chat, { role: 'user', content: question }] }),
        })

        if (response.ok) {
        const result = await response.json()
        //const result = await response
        console.log("HIIIII response" , result)
        setChat(prev => [...prev, result.message])
        }
        setLoading(false)
    }

    return(
        <div className="h-screen text-black border-2 rounded-[12px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-between w-auto text-lg">
            <div className="flex flex-col gap-6 overflow-y-auto" style={{ maxHeight: '400px' }}> 
                {chat.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-[12px] px-8 py-5 max-w-[70%] ${message.role === 'user' ? 'bg-[#D5E6ED] text-[#084762]' : 'bg-gray-200'}`}>
                    {message.content}
                    </div>
                </div>
                ))}
            </div>
            <div className="flex gap-4">
                <input value={question} onChange={(e) => setQuestion(e.target.value)}
                    placeholder = "Type here" className="w-[80%] flex-grow border-2 rounded-[12px] p-2 border-[#D7D7D7]"></input>
                <button className="bg-[#1F8FBF] hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white" onClick={handleSendMessage} disabled={loading} type="submit">Send</button>
                <button className="bg-[#CDCDCD] hover:bg-[#1F8FBF] rounded-[12px] w-[10%] px-5 py-3 text-white" disabled={loading} type="submit">Next</button>
            </div>
        </div>
    );
}