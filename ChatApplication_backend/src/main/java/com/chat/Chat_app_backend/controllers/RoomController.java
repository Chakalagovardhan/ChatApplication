package com.chat.Chat_app_backend.controllers;


import com.chat.Chat_app_backend.entites.Messages;
import com.chat.Chat_app_backend.entites.Room;
import com.chat.Chat_app_backend.repositeries.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomRepo roomrepo;

    @PostMapping("/room")
    public ResponseEntity<?> createRoom(@RequestBody Room room) {
        Room roomfind = roomrepo.findByRoomId(room.getRoomId());
        if (roomfind != null) {
            return new ResponseEntity<>("Room already exists", HttpStatus.BAD_REQUEST);
        }

        Room savedRoom = roomrepo.save(room);
        return new ResponseEntity<>(savedRoom, HttpStatus.CREATED);
    }


    @GetMapping("/{roomId}")
    public  ResponseEntity<?> joinRoom(@PathVariable String roomId)
    {
        Room room = roomrepo.findByRoomId(roomId);
        if(room==null)
        {
            return  new ResponseEntity<>("Room not found with this id",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(room,HttpStatus.OK);
    }

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Messages>>
    getMessage(@PathVariable String roomId,
               @RequestParam(value = "page",defaultValue = "0",required = false)Integer page,
               @RequestParam(value = "size",defaultValue = "20",required = false)Integer size)
    {
        Room room = roomrepo.findByRoomId(roomId);
        if(room==null)
        {
            return  ResponseEntity.badRequest().build();
        }

        List<Messages> messages = room.getMessages();
        int start=Math.max(0,messages.size()-(page+1)*size);
        int end=Math.min(messages.size(), start+size);
        List<Messages> paginatedmessages = messages.subList(start, end);
        return  ResponseEntity.ok(paginatedmessages);
    }



}
