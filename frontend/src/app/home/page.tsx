import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-4xl font-semibold text-slate-800">
        Welcome to the Rooms Chat
      </h1>

      <p className="text-center text-slate-600 font-medium">
        Create your room as you want and share with your friends without problems.
      </p>
      <button className="border-2 border-red-500 px-4 py-2 rounded-md hover:text-white hover:bg-red-500">
        <Link href="/login">
          Start Now
        </Link>
      </button>
       
    </div>
  )
  
}
