const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('Bok, ja sam Putnik!');
});

// POST route za odgovaranje na godišnja doba
app.post('/season/', function (req, res) {
  console.log(JSON.stringify(req.body));

  // Preuzimanje parametra "season" iz tela zahteva
  var godisnje_doba = req.body.queryResult.parameters.godisnje_doba.toLowerCase();
  
  // Odgovor na osnovu godišnjeg doba
  var response = '';

  switch (godisnje_doba) {
    case 'proljeće':
    case 'spring':
      response = 'Na proljeće je najbolje otići u Nizozemsku zbog cvata tulipana!';
      break;
    case 'ljeto':
    case 'summer':
      response = 'Ljeto je toplo i sunčano, savršen kupanje na Mediteranskim obalama Hrvatske, ili na obalama Grčke, Italije i Španjolske!';
      break;
    case 'jesen':
    case 'fall':
      response = 'Zemlja koja savršeno opisuje jesen i koju svakako trebaš posjetiti je Engleska.';
      break;
    case 'zima':
    case 'winter':
      response = 'Zima donosi hladnoću i snijeg, vrijeme za odmor i skijanje u Austriji, Sloveniji ili za posjet skandinavskim zemljama.';
      break;
    default:
      response = 'Nisam siguran na koje godišnje doba misliš, možeš li biti precizniji?';
  }

  // Formiranje odgovora u JSON formatu
  var out = {
    fulfillmentText: response
  };

  // Slanje odgovora
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(out));
});

// Pokretanje servera
app.listen(app.get('port'), function () {
  console.log('Running on port', app.get('port'));
});
