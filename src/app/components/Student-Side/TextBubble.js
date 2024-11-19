export default function TextBubble({message}) {
    // gray bubble for duey's responses; blue bubble for user 
    return(
        <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-[12px] px-8 py-5 max-w-[70%] ${message.role === 'user' ? 'bg-[#D5E6ED] text-[#084762]' : 'bg-gray-200'}`}>
                {message.content}
            </div>
        </div>
    );
}