import { httpClient } from "../config/AxiosHelper"

export const createRooms =async(roomDetail)=>{

    const response=await httpClient.post(`/api/v1/rooms/room`,roomDetail,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
};

export const joinRooms = async(roomId)=>{
    const response=await httpClient.get(`/api/v1/rooms/${roomId}`)
    return response.data;
}
export const getMessages =async(roomId,size=50,page=0)=>{
    const reposne = await httpClient.get(`/api/v1/rooms/${roomId}/messages?size=${size}&page=${page}`);
    return reposne.data;
}