import React from "react";
import ChatRoom from "./ChatRoom";

const MyFeeds = () => {
  return (
    <div className="w-screen h-screen flex justify-center  ">
      <div className="h-[600px] bg-[#9FB3DF] w-[300px] rounded-bl-2xl flex flex-col gap-2 shadow-md shadow-gray-500 z-10">
        <div className="w-full h-[50px] bg-[#FFF1D5] flex rounded-md">
          <div className="h-full w-[17%] bg-white rounded-full mx-3"></div>
          <div className="my-auto">Room Name</div>
        </div>
        <div className="w-full h-[50px] bg-[#FFF1D5] flex rounded-md">
          <div className="h-full w-[17%] bg-white rounded-full mx-3"></div>
          <div className="my-auto">Room Name</div>
        </div>
        <div className="w-full h-[50px] bg-[#FFF1D5] flex rounded-md">
          <div className="h-full w-[17%] bg-white rounded-full mx-3"></div>
          <div className="my-auto">Room Name</div>
        </div>
      </div>
      <div className=" w-screen sm:w-[600px]  shadow-md shadow-gray-500 z-10 flex flex-col min-h-screen ">
        <div className=" w-full h-[100px] flex items-end bg-[#9FB3DF] text-white ">
          <div className="flex-1  flex ">
            <input
              type="text"
              className="ml-1 h-min p-1 w-full text-black rounded-md focus:outline-none focus:ring-2 focus:rounded-md focus:ring-blue-500"
            />
            <p className="mx-3 bg-green-400 p-2 rounded-md">Search</p>
          </div>
          <div>
            <button className="min-h-10  mx-2 rounded-lg p-1 bg-[#FFF1D5] text-black">
              Join/Create Room
            </button>
          </div>
        </div>

        <div className="bg-pink-600 flex-grow flex overflow-hidden">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
};

export default MyFeeds;
