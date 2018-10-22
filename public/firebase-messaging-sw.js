
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

const HUMANAPP='https://human-24b1b.firebaseapp.com'
const config= {
  apiKey:"AIzaSyDd1bmOXMc1gs1RrsygS4B-qIf22o0zaI4" ,
  authDomain: "human-24b1b.firebaseapp.com",
  databaseURL: "https://human-24b1b.firebaseio.com",
  projectId: "human-24b1b",
  storageBucket: "human-24b1b.appspot.com",
  messagingSenderId: "534180446796"
};

firebase.initializeApp(config);

var messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  switch (payload.notification.title) {
    case 'Confirm Contributer Identity':
        console.log('Message received. ', payload);
        localStorage.setItem('confirmDetails', payload.notification.body)
        console.log(payload.notification.body)
        window.alert(payload.notification.title)
        window.location.href = HUMANAPP+'/confirm';
        ; break;
    case 'You have a message from a fellow Human':
        console.log('Message received. ', payload);
        if (localStorage.getItem('chat') != null) {
            var temp = JSON.parse(localStorage.getItem('chat'));
            temp.chats.push(JSON.parse(payload.notification.body))
            localStorage.setItem('chat',  JSON.stringify(temp))
            console.log(payload.notification.body)
        } else {
            var chat = { chats: [] };
            chat.chats.push(
                {
                    roomId: payload.notification.body.roomId,
                    sender: payload.notification.body.sender
                }
            )
            localStorage.setItem('chat', JSON.stringify(chat))
        }
        window.alert(payload.notification.title)
        window.location.href =  HUMANAPP+'/chat';
        ; break;
    case 'Accepted':
        console.log('Message received. ', payload);
        // localStorage.setItem('roomId', payload.notification.body)
        console.log(payload.notification.body)
        window.alert(payload.notification.title)
        // window.location.href = 'https://human-24b1b.firebaseapp.com/chat';
        ; break;
    case 'Declined':
        console.log('Message received. ', payload);
        // localStorage.setItem('roomId', payload.notification.body)
        console.log(payload.notification.body)
        window.alert(payload.notification.title)
        // window.location.href = 'https://human-24b1b.firebaseapp.com/chat';
        ; break;
    default:
}
  
  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: 'A human has accepted your request!',
    icon: './human.png',
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };
  
  

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
// // [END background_handler]
