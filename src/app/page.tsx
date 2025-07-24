import { auth0 } from "@/lib/auth0";
import { ChatBox } from "./components/Chatbox";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      {session?.user ? (
        <ChatBox />
      ) : (
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome to AI Chat</h1>
          <p className="mb-6 text-gray-600">Please login to start chatting</p>
          <a
            href="/auth/login"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}
