import { login, signup, insertStudent} from "./actions";

export default function LoginPage() {
  return (
    <div className="font-orienta h-screen bg-[#F8F7F4] px-12 pt-20 pb-12 flex gap-9 text-black justify-center items-center">
      <form className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          className="border border-black"
          id="email"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className="border border-black"
          id="password"
          name="password"
          type="password"
          required
        />
        <button
          className="bg-[#1F8FBF] rounded-[12px] hover:bg-[#CDCDCD] mt-5 mb-2"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="bg-[#1F8FBF] rounded-[12px] hover:bg-[#CDCDCD]"
          formAction={signup}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
