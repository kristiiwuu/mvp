// "use client"
// import { useState, useEffect } from 'react';
// import { update } from "../api/updateProfile/route";
// import BlueDuey from 'public/blue-duey.svg';

// export default function ProfilePage() {

//     const [userName, setUserName] = useState('Student');
//     const [userEmail, setUserEmail] = useState('');
//     const [profileChange, setProfileChange] = useState(false);

//     useEffect(() => {
//         const fetchProfileInfo = async () => {
//             const response = await fetch('/api/getProfileInfo');
//             if (response.ok) {
//                 const data = await response.json();
//                 if(data.name){
//                     setUserName(data.name);
//                 }
//                 setUserEmail(data.email);
//             }
//         };
//         fetchProfileInfo();
//     }, [profileChange]);

//     const handleUpdate = async () => {
//         await update();
//         setProfileChange(true);
//     }

//   return (
//     <div className="font-orienta h-screen bg-[#F8F7F4] pt-[5%] pb-[5%] flex text-black justify-center items-center">
//       <div className="h-full w-[40%] rounded-lg border-2 border-[rgb(184,183,175)] bg-white shadow-custom flex flex-col justify-center items-center px-[5%]">
//         <BlueDuey className="scale-75"/>
//         <div className="text-[200%] text-[#226387] m-0">Profile</div>
//         <form className="flex flex-col text-[#A1A1A1] self-stretch mt-[2%] mb-0">
//             <>
//             <label htmlFor="name" className="text-[70%]">Name:</label>
//               <input
//                 className="bg-[#EBEAE6] rounded-[6px] h-[20%] text-black"
//                 id="name"
//                 name="name"
//                 type="text"
//                 placeholder={userName}
//               />
//               <label htmlFor="email" className="mt-3 text-[70%]">Email:</label>
//               <input
//                 className=" bg-[#EBEAE6] rounded-[6px] h-[20%] text-black"
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder={userEmail}
//               />
//               <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
//               <input
//                 className="bg-[#EBEAE6] rounded-[6px] h-[20%] text-black"
//                 id="password"
//                 name="password"
//                 type="password"
//               />
//               <button
//                 className="self-center w-[40%] h-[25%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[12px] mt-[4%] mb-[2%] flex justify-center items-center"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//             </>
//         </form>
//       </div>
//     </div>
//   );
// }
