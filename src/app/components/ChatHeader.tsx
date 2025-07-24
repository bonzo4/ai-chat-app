export default function ChatHeader() {
  return (
    <div className="flex items-center justify-center space-x-4 border-b bg-gray-50 px-4 py-3">
      <div className="flex items-center space-x-3">
        {/* Profile Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
          AI
        </div>

        {/* Name and Status */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>
      <a
        href="/auth/logout"
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Logout
      </a>
    </div>
  );
}
