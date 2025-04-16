import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { baseURls } from "../config/AxiosHelper";
import { toast } from "react-toastify";
import { Client } from "@stomp/stompjs";


import { getMessages } from "../Services/Roomservices";
const ChatRoom = () => {
  const location=useLocation();
  const searchParams=new URLSearchParams(location.search);
  const userNameParams=searchParams.get("userName");
  const roomIdParams=searchParams.get("roomId");
  const [textarea, settextarea] = useState("");
  const chatBotRef = useRef(null);
  const [userName, setUserName] = useState(userNameParams||"");
  const [roomId,setRoomId]=useState(roomIdParams||"");
  const [stompClient, setStompClient] = useState("");
  const [chats, setChats] = useState([
    {
      sender: "Govardhan",
      content: "Hi",
    },
    {
      sender: "Vineel",
      content: "Hello",
    },
    {
      sender: "Vineel",
      content: "good morning",
    },
  ]);


  const handelChange = (e) => {
    settextarea(e.target.value);
  };

  const send = () => {
    if (textarea.trim() === "") return;
    
    // Send via WebSocket first
    sendMessage();
    
    // Clear input
    settextarea("");
  };
  
  const sendMessage = async() => {
    if(stompClient && stompClient.publish && textarea.trim()) {
      const message = {
        sender: userName,
        content: textarea,
        roomId: roomId
      };
      stompClient.publish({
        destination: `/app/sendMessage/${roomId}`,
        body: JSON.stringify(message)
      });
    } else {
      console.error("Stomp client not ready or invalid");
    }
  }


  //load messages before only

  useEffect(()=>{
    async function loadMessages(params) {
      
      try {
        const message=await getMessages(roomId);
        setChats(message)
        console.log(message);
      } catch (error) {
        
      }
    }
    loadMessages();
  },[])


  //stomp client

  useEffect(() => {
    const connectwebsocket = () => {
      const socket = new SockJS(`${baseURls}/chat`);
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000
      });
  
      client.onConnect = () => {
        setStompClient(client);
        toast.success("connected");
  
        client.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setChats((prev) => [...prev, newMessage]);
        });
      };
  
      client.activate();
    };
  
    connectwebsocket();
  }, [roomId]);
  










  
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-700 text-white h-[100px] flex justify-around items-center">
        <span>{userName}</span>
        <span>RoomId:{roomId}</span>
        <span className="bg-red-600 p-3 rounded-lg">Leave Room</span>
      </div>

      <main className="flex-1 overflow-y-auto bg-gray-600 w-full md:w-[70%] mx-auto p-4 rounded-b-md">
        {chats.map((message, index) => (
          <div
            key={index}
            className={`my-2 flex ${
              message.sender === userName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex min-w-12 w-auto max-w-[50%] ${
                message.sender === userName ? "bg-green-600" : "bg-red-600"
              } rounded-2xl`}
            >
              <div className={`flex flex-col p-2 w-full`}>
                <div className="flex flex-row w-full h-auto gap-2">
                  <img
                    src="src/components/avataaars.png"
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-center"
                  />
                  <p className="text-sm font-bold">{message.sender}</p>
                </div>
                <p className="mt-1">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Input Bar */}
      <div className="bg-gray-700 h-[50px] w-full md:w-[70%] mx-auto flex items-center px-4 text-white mb-1 rounded-md">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 rounded text-black"
          onChange={handelChange}
          value={textarea}
          onKeyDown={(e) => {
            if (e.key === "Enter" && textarea.trim() !== "") {
              send();
            }
          }}
        />
        <MdSend
          className="bg-blue-600 w-[50px] h-full m-1 p-2 rounded-full"
          onClick={send}
        />
        <MdAttachFile
          className="bg-blue-600 w-[50px] h-full m-1 p-2 rounded-full"
          onClick={send}
        />
      </div>
    </div>
  );
};

export default ChatRoom;
