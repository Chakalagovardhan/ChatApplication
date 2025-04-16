package com.chat.Chat_app_backend.entites;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Messages {

    private String sender;
    private String content;
    private LocalDateTime timeStamp;

    private Messages(String sender,String content ){
        this.content=content;
        this.sender=sender;
        this.timeStamp= LocalDateTime.now();

    }
}
