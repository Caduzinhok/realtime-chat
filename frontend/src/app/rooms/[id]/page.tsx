"use client"
import MessageLayout from "@/components/messageLayout";
import { SendHorizontalIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function PageRoom() {
  const [messages, setMessages] = useState<Messages[]>()
  const [messageText, setMessageText] = useState('')
  const [user, setUser] = useState('')
  const [socket, setSocket] = useState<Socket>()
  const searchParams = useParams()
  const roomID = searchParams.id

  useEffect(() => {
    const socket = io('http://localhost:3333')

    socket.emit("join-room", roomID)

    setSocket(socket)

  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (message, dateMessage, userOrigin) => {
        console.log("Atualizou o Socket")
        setMessages(prevMessages => [
          ...(prevMessages || []),
          {
            "text": message,
            'datetime': dateMessage,
            "user": userOrigin
          }
        ])
      })

    }

  }, [socket])


  function handleAddNewMessage() {
    if (user === '') {
      return
    }
    const dateMessage = new Date().toLocaleString()
    setMessages(prevMessages => [
      ...(prevMessages || []),
      {
        "text": messageText,
        'datetime': dateMessage,
        "user": user
      }
    ])
    if (socket) {
      socket.emit('send-message', messageText, dateMessage, user, roomID)
    }

    setMessageText('')
  }
  return (
    <div className="p-4 flex flex-col w-screen h-screen max-h-screen space-y-2">
      <div className="h-full w-full border-2 border-black rounded-t-md space-y-2 p-4">
        {messages &&
          messages.map((message, index) => ((
            <MessageLayout 
             message={message}
             user={user}
             key={index}
            />
          )
          ))
        }
      </div>
      <input
        type="text"
        onChange={e => setUser(e.target.value)}
        className={`w-2/4 py-2 outline-none text-slate-700 border-2 px-4 ${messages && "bg-slate-100"}`}
        placeholder="Nome de Usuário"
        disabled={messages ? true : false}

      />

      <div className="flex w-full rounded-b-md border-2 px-4 ">
        <textarea
          id="message"
          value={messageText}
          className="py-2 h-32 w-full items-start text-left align-top resize-none outline-none text-slate-700"
          placeholder="Digite sua Mensagem..."
          onChange={e => setMessageText(e.target.value)}
        />
        <button onClick={handleAddNewMessage}>
          <SendHorizontalIcon />
        </button>
      </div>

    </div>
  );
}