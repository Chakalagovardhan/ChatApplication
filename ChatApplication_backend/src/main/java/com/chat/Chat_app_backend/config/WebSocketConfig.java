package com.chat.Chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.lang.annotation.Annotation;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
       config.enableSimpleBroker("/topic");
//       topic/messages which clienrt subscribe
       config.setApplicationDestinationPrefixes("/app");
       //server side subscribe /app/chat
        //@MessagingMapping("/chat")
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
       registry.addEndpoint("/chat") //connection establishment
               .setAllowedOrigins("http://localhost:5173")
               .withSockJS();
    }
}
