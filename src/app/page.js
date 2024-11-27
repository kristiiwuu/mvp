import { login, signup } from "../app/login/actions";
import BlueDuey from 'public/blue-duey.svg';

export default function LoginPage() {
  return (
    <div className="transform scale-100 font-orienta h-screen bg-[#F8F7F4] px-12 pt-20 pb-12 flex gap-9 text-black justify-center items-center">
      <div className="h-full w-[40%] rounded-lg border-2 border-[#B8B7AF] bg-white shadow-custom flex flex-col justify-center items-center p-24">
        <BlueDuey />
        <div className="text-4xl text-[#226387]">welcome to <i>due</i></div>
        <form className="flex flex-col text-[#A1A1A1] self-stretch mt-6">
        <label htmlFor="email">Email:</label>
        <input
          className="bg-[#EBEAE6] rounded-[6px] h-8"
          id="email"
          name="email"
          type="email"
          required
        />
        <label className="mt-3" htmlFor="password">Password:</label>
        <input
          className="bg-[#EBEAE6] rounded-[6px] h-8"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="self-center w-[40%] px-5 py-3 text-white bg-[#1F8FBF] hover:bg-[#58B6DF] rounded-[12px] mt-8 mb-2"
          formAction={signup}
        >
          Sign up
        </button>
        <button
          className="self-center w-[40%] px-5 py-3 text-white bg-[#1F8FBF] rounded-[12px] hover:bg-[#58B6DF]"
          formAction={login}
        >
          Log in
        </button>
      </form> 
      </div>
    </div>
  );
}
