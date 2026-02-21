document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const messagesDiv = document.getElementById('chat-messages');

    // Open/Close chatbot window (toggle on icon click)
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', function() {
            chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'flex' : 'none';
        });
    }

    // Close chatbot (separate close button)
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
        });
    }

    // Send message
    if (sendBtn && chatInput && messagesDiv) {
        sendBtn.addEventListener('click', async function() {
            const message = chatInput.value.trim();
            if (!message) return;

            // Display user message
            messagesDiv.innerHTML += `<p class="user-message"><strong>You:</strong> ${message}</p>`;
            chatInput.value = '';

            // Call Django backend API
            try {
                const response = await fetch('/chatbot-api/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value  // For CSRF protection
                    },
                    body: JSON.stringify({ message })
                });

                if (!response.ok) {
                    messagesDiv.innerHTML += `<p class="bot-message"><strong>Bot:</strong> Error: ${response.status}</p>`;
                    return;
                }

                const data = await response.json();
                const botMessage = data.bot_message;
                messagesDiv.innerHTML += `<p class="bot-message"><strong>Bot:</strong> ${botMessage}</p>`;
            } catch (error) {
                messagesDiv.innerHTML += `<p class="bot-message"><strong>Bot:</strong> Network error. Try again.</p>`;
            }

            // Auto-scroll to bottom
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    }
});