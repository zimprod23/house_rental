const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received  from backend message: ${message}`);

    parsed_message = JSON.parse(message)
    console.log(parsed_message)

    const dataToSend = {
        user : {fname : "Ezzoubeir",
        lname : "Elasraoui",
        addr  : "#Morocco, Rabat",
        email : "ezzoubeir@team.io",
        phone : "+212 625980211",
        country : "MA"},
        claims : [true,true,true]
    }

    // You can send a message back to the client using the `send` method
    ws.send(JSON.stringify(dataToSend));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server started');
