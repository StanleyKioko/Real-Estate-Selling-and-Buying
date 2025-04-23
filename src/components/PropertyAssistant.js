import React, { useState } from 'react';
import '../styles/PropertyAssistant.css';

const PropertyAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
        
        // Add initial bot response
        setMessages(prev => [...prev, { 
            text: "I'm here to help you find your perfect home! What are you looking for?", 
            isUser: false 
        }]);
    };

    return (
        <div className="assistant-container">
            <div className="assistant-header">
                <h3><i className="fas fa-robot"></i> Property Assistant</h3>
            </div>
            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="welcome-message">
                        Ask me about properties or get recommendations!
                    </div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about properties..."
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default PropertyAssistant;
