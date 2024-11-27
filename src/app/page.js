import { login, signup } from "../app/login/actions";
import BlueDuey from 'public/blue-duey.svg';

export default function LoginPage() {
  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] pt-[5%] pb-[5%] flex text-black justify-center items-center">
      <div className="h-full w-[40%] rounded-lg border-2 border-[#B8B7AF] bg-white shadow-custom flex flex-col justify-center items-center p-[5%]">
        <BlueDuey className=""/>
        <div className="text-[200%] text-[#226387] m-0">welcome to <i>due</i></div>
        <form className="flex flex-col text-[#A1A1A1] self-stretch mt-[2%] mb-0">
          <label htmlFor="email" className="text-[70%]">Email:</label>
          <input
            className="bg-[#EBEAE6] rounded-[6px] h-[12%]"
            id="email"
            name="email"
            type="email"
            required
          />
          <label className="mt-3 text-[70%]" htmlFor="password">Password:</label>
          <input
            className="bg-[#EBEAE6] rounded-[6px] h-[12%]"
            id="password"
            name="password"
            type="password"
            required
          />
          <button
            className="self-center w-[40%] h-[15%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[12px] mt-[4%] mb-[2%] flex justify-center items-center"
            formAction={signup}
          >
            Sign up
          </button>
          <button
            className="self-center w-[40%] h-[15%] px-5 py-3 text-white bg-[#1F8FBF] rounded-[12px] hover:bg-[#58B6DF] flex justify-center items-center"
            formAction={login}
          >
            Log in
          </button>
      </form> 
      </div>
    </div>
  );
}
