import React, { useState } from 'react';
import { sendChatMessage } from '../services/aiService';
import '../styles/ChatAssistant.css';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your real estate assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setIsTyping(true);

        try {
            const response = await sendChatMessage(userMessage);
            setMessages(prev => [...prev, { text: response.message, isBot: true }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                text: "Sorry, I'm having trouble responding right now.", 
                isBot: true 
            }]);
        }
        setIsTyping(false);
    };

    return (
        <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
            {!isOpen ? (
                <button className="chat-toggle" onClick={() => setIsOpen(true)}>
                    <i className="fas fa-comments"></i> Chat with AI
                </button>
            ) : (
                <div className="chat-container">
                    <div className="chat-header">
                        <h3><i className="fas fa-robot"></i> AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="close-btn">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot typing">
                                <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSubmit} className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit" disabled={!input.trim() || isTyping}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
