// Funkcija za slanje poruka na Dialogflow putem Heroku aplikacije
function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    
    // Ovdje postavljamo API URL za tvoj Heroku backend
    var apiUrl = 'https://ime-tvog-heroku-projekta.herokuapp.com/emc2/';
    
    var message = {
        'queryInput': {
            'text': {
                'text': userInput,
                'languageCode': 'hr'  // Postavi jezik na hrvatski
            }
        }
    };

    // Poziv na Heroku API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
    .then(response => response.json())
    .then(data => {
        // Ovdje ćeš obraditi odgovor od Dialogflowa
        var botResponse = data.fulfillmentText;
        displayMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Prikazivanje korisničke poruke u chat prozoru
    displayMessage(userInput, 'user');
    document.getElementById('user-input').value = ''; // Očisti unos
}

// Funkcija za prikazivanje poruka u chat prozoru
function displayMessage(message, sender) {
    var messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    document.getElementById('messages').appendChild(messageDiv);
}
