package com.chat.Chat_app_backend.payload.MessagesRequest;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessagesRequest {

    private String content;
    private String sender;
    private String roomId;

}
