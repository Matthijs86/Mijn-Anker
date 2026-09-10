// ======================================
// ANKER
// FIREBASE CLOUD MESSAGING
// ======================================

importScripts(
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js"
);


// ======================================
// FIREBASE CONFIGURATIE
// ======================================

firebase.initializeApp({
    apiKey: "AIzaSyBTneLdtJfL20g14RBj94Uk_FMjWxNeokI",
    authDomain: "anker-b857d.firebaseapp.com",
    projectId: "anker-b857d",
    storageBucket: "anker-b857d.firebasestorage.app",
    messagingSenderId: "347607750286",
    appId: "1:347607750286:web:c6df43738850dfd81e1bdf"
});


// ======================================
// MESSAGING
// ======================================

const messaging =
    firebase.messaging();


// ======================================
// ACHTERGROND-MELDING
// ======================================

messaging.onBackgroundMessage(
    (payload) => {

        const titel =
            payload.notification?.title ||
            "Anker";

        const opties = {
            body:
                payload.notification?.body ||
                "Hoe zit je erbij? Check je Anker even. 🌱",

            icon:
                "./anker-icon-192x192.png",

            badge:
                "./anker-icon-192x192.png"
        };

        self.registration.showNotification(
            titel,
            opties
        );

    }
);