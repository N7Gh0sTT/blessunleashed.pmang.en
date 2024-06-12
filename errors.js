function initializeErrorsDiv() {
    fetch('https://e2d2-212-227-26-203.ngrok-free.app/messages')
        .then(response => response.json())
        .then(messages => {
            const errorMessagesDiv = document.getElementById('errorMessages');
            errorMessagesDiv.innerHTML = ''; 
            messages.reverse().forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');

                const contentSpan = document.createElement('div');
                contentSpan.classList.add('message-content');
                contentSpan.textContent = message.content;
                messageDiv.appendChild(contentSpan);

                if (message.image) {
                    const imageElement = document.createElement('img');
                    imageElement.src = message.image;
                    imageElement.classList.add('message-image');
                    messageDiv.appendChild(imageElement);
                }

                if (message.reactions.length > 0) {
                    const reactionsDiv = document.createElement('div');
                    reactionsDiv.classList.add('message-reactions');
                    message.reactions.forEach(reaction => {
                        const reactionSpan = document.createElement('span');
                        reactionSpan.textContent = reaction;
                        reactionsDiv.appendChild(reactionSpan);
                    });
                    messageDiv.appendChild(reactionsDiv);
                }

                errorMessagesDiv.appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Erreur:', error));
}