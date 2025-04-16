import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createRooms, joinRooms } from '../Services/Roomservices';
import { useNavigate } from 'react-router-dom';

const JoinChat = () => {
  const[formdata,setformdata] = useState({
    userName:"",
    roomId:""
  });
  const navigate = useNavigate();
  function handleformChange(event)
  {
    setformdata({
      ...formdata,
      [event.target.name]:event.target.value
    });
  };

  function validateRoom()
  {
    if(formdata.roomId==="" || formdata.userName==="")
    {
      toast.error("Invalid input");
      return false;
    }
    return true;
  }

  const createRoom = async () => {
    if (validateRoom()) {
      try {
        const response = await createRooms({ roomId: formdata.roomId });
        console.log("response", response.data);
        toast.success("Joined successfully");
      } catch (error) {
        console.log("Error:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data); // This will show "Room already exists"
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };
  

  const joinRoom =async ()=>{
    if(validateRoom())
    {
      const response=await joinRooms(formdata.roomId);
      console.log(formdata);
      toast.success("Login success");
      navigate(`chatroom?userName=${formdata.userName}&roomId=${formdata.roomId}`);
    }
  };


  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-300'>

      <div className='max-w-md   shadow-lg shadow-black min-h-[250px] rounded-lg p-6'>
        <img src="src/components/image.png" alt="" className='w-[50px] h-[50px] m-auto' />
        <h1 className='text-center text-2xl mt-2 font-bold'>Create Room / Join Room</h1>
        <div className='mt-5' >
          <form action="" method="post" className='flex flex-col gap-3 ml-2' >
          
          <div className='flex '>
          <label htmlFor="userName">UserName</label>
          <input type="text" name="userName" onChange={handleformChange} value={formdata.userName} id="" className='w-max rounded-md border-4 ml-1 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-blue-500 ' />
          
          </div>
          
          <div className='flex '>
          <label htmlFor="roomId">Room Id</label>
          <input type="text" name="roomId" id="" onChange={handleformChange} value={formdata.roomId} className='w-max  rounded-md border-4 ml-5 border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-blue-500 ' />
          
          </div>
          
          <div className='flex justify-between mt-3 '>
          <button type="button" className='bg-green-600 p-2 rounded-lg' onClick={joinRoom}>Join Room </button>
          <button type="button" className='bg-red-600 p-2 rounded-lg' onClick={createRoom}>Create Room</button>
          </div>

          </form>
        </div>

      </div>
      
    </div>
  )
}

export default JoinChat
