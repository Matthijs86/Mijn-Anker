// ======================================
// ANKER
// SERVICE WORKER
// ======================================

const CACHE_NAME = "anker-v34";

const APP_BESTANDEN = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./anker-icon-192x192.png",
    "./anker-icon-512x512.png"
];


// ======================================
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
    apiKey: "AIzaSyBTneLdtJfL20g14RBj94Uk_FMjNeokI",
    authDomain: "anker-b857d.firebaseapp.com",
    projectId: "anker-b857d",
    storageBucket: "anker-b857d.firebasestorage.app",
    messagingSenderId: "347607750286",
    appId: "1:347607750286:web:c6df43738850dfd81e1bdf"
});


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


// ======================================
// INSTALL
// ======================================

self.addEventListener(
    "install",
    (event) => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then((cache) => {

                    return cache.addAll(
                        APP_BESTANDEN
                    );

                })

        );

        self.skipWaiting();

    }
);


// ======================================
// ACTIVATE
// ======================================

self.addEventListener(
    "activate",
    (event) => {

        event.waitUntil(

            caches.keys()
                .then((cacheNamen) => {

                    return Promise.all(

                        cacheNamen
                            .filter(
                                (cacheNaam) =>
                                    cacheNaam !== CACHE_NAME
                            )
                            .map(
                                (cacheNaam) =>
                                    caches.delete(cacheNaam)
                            )

                    );

                })
                .then(() => {

                    return self.clients.claim();

                })

        );

    }
);


// ======================================
// FETCH
// ======================================

self.addEventListener(
    "fetch",
    (event) => {

        // Alleen normale webrequests verwerken.
        // Andere request-types, zoals
        // chrome-extension, worden genegeerd.

        if (
            event.request.method !== "GET" ||
            !event.request.url.startsWith("http")
        ) {

            return;

        }


        event.respondWith(

            caches.match(event.request)
                .then((response) => {

                    if (response) {

                        return response;

                    }


                    return fetch(
                        event.request
                    );

                })

        );

    }
);
