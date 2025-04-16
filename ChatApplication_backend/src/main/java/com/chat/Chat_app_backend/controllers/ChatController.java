package com.chat.Chat_app_backend.controllers;


import com.chat.Chat_app_backend.entites.Messages;
import com.chat.Chat_app_backend.entites.Room;
import com.chat.Chat_app_backend.payload.MessagesRequest.MessagesRequest;
import com.chat.Chat_app_backend.repositeries.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@CrossOrigin("http://localhost:5173")
public class ChatController {

    @Autowired
    private RoomRepo roomrepo;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Messages sendMessge(@DestinationVariable String roomId, MessagesRequest request) {
        Room room = roomrepo.findByRoomId(request.getRoomId());
        Messages message = new Messages();
        message.setSender(request.getSender());
        message.setContent(request.getContent());
        message.setTimeStamp(LocalDateTime.now());

        if (room != null) {
            room.getMessages().add(message);
            roomrepo.save(room);
        } else {
            throw new RuntimeException("room not found");
        }
        return message;
    }



}
