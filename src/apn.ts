// Import the APN library
import apn from 'apn';

// Declare a variable to hold the APN provider
var service: apn.Provider;

// Function to start the APN provider
function start() {
  var options = {
    token: {
      key: 'YOUR_KEY_PATH', // Path to your private key file
      keyId: 'KEY_ID', // ID of the key
      teamId: 'TEAM_ID', // ID of your team
    },
    production: process.env.NODE_ENV === 'production' ? true : false, // Use production environment if NODE_ENV is set to 'production'
  };
  service = new apn.Provider(options); // Create a new APN provider
}

// Function to send a test notification
function sendTestNotification(device_token: string) {
  var note = new apn.Notification();

  note.expiry = Math.floor(Date.now() / 1000) + 60; // Expires 1 minute from now.
  note.badge = 1;
  note.sound = 'ping.aiff';
  note.alert = 'test notification';

  note.payload = { messageFrom: 'Testing payload' };

  note.priority = 10;
  note.topic = 'YOUR_TOPIC'; // Set the topic for the notification

  service.send(note, device_token).then((result) => {
    // Send the notification
    return console.log(JSON.stringify(result)); // Log the result
  });
}

// Export the functions as a module
export default {
  start,
  sendTestNotification,
};
