import { useState } from 'react';
import Student from './Student';

export default function StudentList() {
    const [searchTerm, setSearchTerm] = useState('');
    const students = ["Aditya Hariharan", "Advik Unni", "Akhil Pullela", "Alex Forgosh", "Amrita Arun", "Atticus Kim", 
        "Bodie Currier", "Bryan Phillips", "Christine Lai", "Cody Chen", "Cole Gawin", "Daniel Gao", "David Han", "Evan Adami", 
        "Haha Shi", "Iris Leung", "Isabella Eiliya", "Jacqueline Guo", "James Zhou", "Jeremy Sedillo", "Jerry Zhang", "Jon Powers",
         "Joseph Solomon", "Josephine Onggowarsito", "Josheta Srinivasan", "Kristi Wu", "Lauryn Kinsella", "Megan Phi", "Mira Bhatt", 
         "Mohamed Ahmed", "Naysa Bhargava", "Riya Shenoy", "Sarah Kwang", "Shruti Natala", "Sky Lam", "Swayam", "Yeji Seo", "Zuhair Lakhani"];      
    
    const filteredStudents = students.filter(student => 
        student.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="w-[30%] text-black border-2 rounded-[6px] border-[#D7D7D7] bg-[#FFF] px-9 py-6 flex flex-col justify-start text-lg gap-5 overflow-y-scroll min-h-screen max-h-screen">
            <input 
                type="text" 
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2 px-2 py-1 border rounded-[6px]"
            />
            {filteredStudents.map((name, index) => {
                return (
                    <Student key={index} num={index} name={name}/>
                );
            })}
        </div>
    );
}