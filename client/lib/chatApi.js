const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Fetch all conversations for a user
export const fetchConversations = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/conversations?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch conversations');
        return await response.json();
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};

// Fetch messages for a conversation
export const fetchMessages = async (conversationId, userId, limit = 50) => {
    try {
        const response = await fetch(
            `${API_URL}/messages/${conversationId}?userId=${userId}&limit=${limit}`
        );
        if (!response.ok) throw new Error('Failed to fetch messages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

// Send a message
export const sendMessage = async (conversationId, senderId, content, type = 'text') => {
    try {
        const response = await fetch(`${API_URL}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversationId,
                senderId,
                content,
                type,
            }),
        });
        if (!response.ok) throw new Error('Failed to send message');
        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Create a new conversation
export const createConversation = async (participants) => {
    try {
        const response = await fetch(`${API_URL}/conversations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ participants }),
        });
        if (!response.ok) throw new Error('Failed to create conversation');
        return await response.json();
    } catch (error) {
        console.error('Error creating conversation:', error);
        throw error;
    }
};

// Mark all messages in a conversation as read
export const markConversationAsRead = async (conversationId, userId) => {
    try {
        const response = await fetch(
            `${API_URL}/messages/conversation/${conversationId}/read`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            }
        );
        if (!response.ok) throw new Error('Failed to mark conversation as read');
        return await response.json();
    } catch (error) {
        console.error('Error marking conversation as read:', error);
        throw error;
    }
};

// Delete a conversation
export const deleteConversation = async (conversationId, userId) => {
    try {
        const response = await fetch(
            `${API_URL}/conversations/${conversationId}?userId=${userId}`,
            {
                method: 'DELETE',
            }
        );
        if (!response.ok) throw new Error('Failed to delete conversation');
        return await response.json();
    } catch (error) {
        console.error('Error deleting conversation:', error);
        throw error;
    }
};
