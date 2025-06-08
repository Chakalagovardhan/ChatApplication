import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";

const MyFeeds = () => {
  const [screensize, setscreensize] = useState(window.innerWidth);
  const [activeRoom, setactiveRoom] = useState(null);
  const [sidebaropen, setsidebaropen] = useState(false);
  const [holdingvalue, setholdingvalue] = useState("");
  const [searchvalue, setsearchvalue] = useState("");

  const rooms = ["Room A", "Room B", "Room C", "Rooom c"];

  // used to track the size of the window
  useEffect(() => {
    const sizehandel = () => {
      setscreensize(window.innerWidth);
    };
    window.addEventListener("resize", sizehandel);
    return () => window.removeEventListener("resize", sizehandel);
  }, []);

  // update the sidebar

  useEffect(() => {
    if (screensize >= 700) setsidebaropen(true);
    else setsidebaropen(false);
  }, [screensize]);

  const roomClick = (room) => {
    setactiveRoom(room);
    if (screensize < 700) sidebaropen(false);
  };

  const searchClick = () => {
    setsearchvalue(holdingvalue);
  };

  const filteredRoom = rooms.filter((room) =>
    room.toLowerCase().includes(searchvalue.toLowerCase())
  );

  const toggleSidebar = () => {
    if (screensize < 700) {
      setsidebaropen((prev) => !prev);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center  ">
      {/* side bar */}
      <div
        className={`${
          sidebaropen ? "block" : "hidden"
        } w-screen h-[600px] bg-[#9FB3DF] sm:w-[300px] rounded-bl-2xl flex flex-col gap-2 shadow-md shadow-gray-500 z-20 sm:z-10 `}
      >
        {filteredRoom.length > 0
          ? filteredRoom.map((room, index) => (
              <div
                key={index}
                className="w-full h-[50px] bg-[#FFF1D5] flex rounded-md cursor-pointer"
                onClick={() => roomClick(room)}
              >
                <div className="h-full w-[17%] bg-white rounded-full mx-3"></div>
                <div className="my-auto">{room}</div>
              </div>
            ))
          : rooms.map((room, index) => (
              <div
                key={index}
                className="w-full h-[50px] bg-[#FFF1D5] flex rounded-md cursor-pointer"
                onClick={() => roomClick(room)}
              >
                <div className="h-full w-[17%] bg-white rounded-full mx-3"></div>
                <div className="my-auto">{room}</div>
              </div>
            ))}
      </div>
      <div className=" w-screen sm:w-[600px]  shadow-md shadow-gray-500 z-10 flex flex-col min-h-screen  ">
        {/* top navbar */}
        <div className="w-full h-[150px]  sm:h-[100px] flex flex-col items-start bg-[#9FB3DF] text-white justify-around ">
          <div
            className={`${
              screensize >= 700 ? "hidden" : "flex"
            } w-7 h-7 gap-2 items-center cursor-pointer`}
            onClick={toggleSidebar}
          >
            {" "}
            <img src="src/Images/navigation-bar.png" alt="" srcset="" />
            Rooms
          </div>
          <div className=" flex flex-col sm:flex-row w-full items-center gap-1">
            <div className="flex w-full">
              <input
                type="text"
                value={holdingvalue}
                onChange={(e) => setholdingvalue(e.target.value)}
                className="ml-1 p-1 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                placeholder="Enter Room to seacrh from your list"
              />
              <p
                className="mx-3 bg-green-400 p-2 rounded-md whitespace-nowrap cursor-pointer"
                onClick={searchClick}
              >
                Search
              </p>
            </div>
            <button className="min-h-10 mx-2 rounded-lg p-1 bg-[#FFF1D5] text-black whitespace-nowrap">
              Join/Create Room
            </button>
          </div>
        </div>

        <div className="bg-pink-600 flex-grow flex overflow-hidden">
          <ChatRoom room={activeRoom} />
        </div>
      </div>
    </div>
  );
};

export default MyFeeds;
