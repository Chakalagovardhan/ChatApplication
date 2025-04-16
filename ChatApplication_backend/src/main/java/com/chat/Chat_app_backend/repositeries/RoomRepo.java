package com.chat.Chat_app_backend.repositeries;

import com.chat.Chat_app_backend.entites.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room,String> {

    Room findByRoomId(String roomId);

    Room roomId(String roomId);
}
