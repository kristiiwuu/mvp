import BlueDuey from 'public/blue-duey.svg';

export default function TextBubble(props) {
    

    return (
        <div>
        {props.isCorrect && props.message.content.includes("That's correct") ? 
            <div>
                <BlueDuey />
                <div ref={props.ref} className={`m-0 flex ${props.message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-[12px] px-8 py-5 m-0 max-w-[70%] ${props.message.role === 'user' ? 'bg-[#D5E6ED] text-[#084762]' : 'bg-gray-200'}`}>
                        {props.message.content}
                    </div>
                </div>
            </div> :
            <div ref={props.ref} className={`m-0 flex ${props.message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-[12px] px-8 py-5 m-0 max-w-[70%] ${props.message.role === 'user' ? 'bg-[#D5E6ED] text-[#084762]' : 'bg-gray-200'}`}>
                    {props.message.content}
                </div>
            </div>
        }
        </div>
    );
}