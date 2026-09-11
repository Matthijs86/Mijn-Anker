/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */


/* =========================================================
   OPSLAG
   ========================================================= */
const OPSLAG_DAGSTATUS = "ankerDagstatus";

// Oude opslag blijft tijdelijk bestaan voor de eenmalige migratie
const OPSLAG_SAFEFOODS = "ankerSafeFoods";

const OPSLAG_OCHTEND_SAFEFOODS = "ankerOchtendSafeFoods";
const OPSLAG_AVOND_SAFEFOODS = "ankerAvondSafeFoods";

const OPSLAG_PRETTIGE_ACTIVITEITEN =
    "ankerPrettigeActiviteiten";
/* =========================================================
   FIREBASE CLOUD MESSAGING
   ========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getMessaging,
    getToken,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging.js";


const firebaseConfig = {
    apiKey: "AIzaSyBTneLdtJfL20g14RBj94Uk_FMjWxNeokI",
    authDomain: "anker-b857d.firebaseapp.com",
    projectId: "anker-b857d",
    storageBucket: "anker-b857d.firebasestorage.app",
    messagingSenderId: "347607750286",
    appId: "1:347607750286:web:c6df43738850dfd81e1bdf"
};


const firebaseApp =
    initializeApp(
        firebaseConfig
    );

const messaging =
    getMessaging(
        firebaseApp
    );

/* =========================================================
   STANDAARD PERSOONLIJKE OPTIES
   ========================================================= */

const STANDAARD_SAFEFOODS = [
    {
        id: "brood",
        tekst: "Brood / boterham",
        icoon: "🥪"
    },
    {
        id: "yoghurt",
        tekst: "Yoghurt / kwark",
        icoon: "🥣"
    },
    {
        id: "ei",
        tekst: "Ei",
        icoon: "🍳"
    },
    {
        id: "simpel",
        tekst: "Iets simpels uit de voorraad",
        icoon: "🍜"
    }
];


const STANDAARD_PRETTIGE_ACTIVITEITEN = [
    {
        id: "wandelen",
        tekst: "Stukje wandelen",
        icoon: "🚶"
    },
    {
        id: "lps",
        tekst: "LP's luisteren",
        icoon: "💿"
    },
    {
        id: "serie",
        tekst: "Een rustige serie kijken",
        icoon: "📺"
    },
    {
        id: "muziek",
        tekst: "Muziek luisteren",
        icoon: "🎧"
    }
];


/* =========================================================
   DAGSTATUS
   ========================================================= */

let dagStatus = {
    datum: "",
    afgerond: {},
    toevoegingen: {}
};


/* =========================================================
   PERSOONLIJKE OPTIES
   ========================================================= */

let ochtendSafeFoods = [];
let avondSafeFoods = [];

let prettigeActiviteiten = [];


/* =========================================================
   APP STATUS
   ========================================================= */

let huidigScherm = "hoofdScherm";
let huidigeActiviteit = null;
let huidigeBlok = null;

let huidigBasisNiveau = "lijst";

let inlineBewerking = null;

let beloningTimeout = null;


/* =========================================================
   ELEMENTEN
   ========================================================= */

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisScherm =
    document.getElementById("basisScherm");

const moeilijkeScherm =
    document.getElementById("moeilijkScherm");

const activiteitScherm =
    document.getElementById("activiteitScherm");


const basisKnop =
    document.getElementById("basisKnop");

const moeilijkKnop =
    document.getElementById("moeilijkKnop");


const basisTerugKnop =
    document.getElementById("basisTerugKnop");

const moeilijkTerugKnop =
    document.getElementById("moeilijkTerugKnop");

const activiteitTerugKnop =
    document.getElementById("activiteitTerugKnop");


const activiteitTitel =
    document.getElementById("activiteitTitel");

const activiteitSubtitel =
    document.getElementById("activiteitSubtitel");

const activiteitStatus =
    document.getElementById("activiteitStatus");

const activiteitStatusIcoon =
    document.getElementById("activiteitStatusIcoon");

const activiteitStatusTitel =
    document.getElementById("activiteitStatusTitel");

const activiteitStatusTekst =
    document.getElementById("activiteitStatusTekst");

const activiteitInhoud =
    document.getElementById("activiteitInhoud");

const activiteitKlaarKnop =
    document.getElementById("activiteitKlaarKnop");


const kortInvoerContainer =
    document.getElementById("kortInvoerContainer");

const kortInvoerTitel =
    document.getElementById("kortInvoerTitel");

const kortInvoerUitleg =
    document.getElementById("kortInvoerUitleg");

const kortInvoer =
    document.getElementById("kortInvoer");

const kortInvoerSluitenKnop =
    document.getElementById("kortInvoerSluiten");

const invoerAnnuleren =
    document.getElementById("invoerAnnuleren");

const invoerOpslaan =
    document.getElementById("invoerOpslaan");


const moeilijkOchtend =
    document.getElementById("moeilijkOchtend");

const moeilijkOchtendDetails =
    document.getElementById("moeilijkOchtendDetails");

const moeilijkOchtendOpties =
    document.getElementById("moeilijkOchtendOpties");

const ochtendOptieToevoegen =
    document.getElementById("ochtendOptieToevoegen");

const moeilijkAvond =
    document.getElementById("moeilijkAvond");

const moeilijkAvondDetails =
    document.getElementById("moeilijkAvondDetails");

const moeilijkAvondOpties =
    document.getElementById("moeilijkAvondOpties");

const avondOptieToevoegen =
    document.getElementById("avondOptieToevoegen");


const moeilijkIetsPrettigs =
    document.getElementById("moeilijkIetsPrettigs");

const moeilijkPrettigDetails =
    document.getElementById("moeilijkPrettigDetails");

const moeilijkPrettigOpties =
    document.getElementById("moeilijkPrettigOpties");

const prettigOptieToevoegen =
    document.getElementById("prettigOptieToevoegen");


const beloning =
    document.getElementById("beloning");


/* =========================================================
   BASIS CATEGORIEËN
   ========================================================= */

const basisBlokken = {

    zelfzorg: {
        titel: "Zelfzorg",
        icoon: "🧼",
        activiteiten: [
            {
                id: "douchen",
                tekst: "Douchen",
                icoon: "🚿",
                details: "Even schoon en verzorgd worden."
            },
            {
                id: "tanden",
                tekst: "Tanden poetsen",
                icoon: "🪥",
                details: "Een frisse mond is genoeg."
            },
            {
                id: "deodorant",
                tekst: "Deodorant",
                icoon: "🧴",
                details: "Even opfrissen."
            },
            {
                id: "schone-kleding",
                tekst: "Schone kleding",
                icoon: "👕",
                details: "Iets schoons aantrekken."
            }
        ]
    },


    eten: {
        titel: "Eten & drinken",
        icoon: "🍽️",
        activiteiten: [
            {
                id: "ontbijt",
                tekst: "Ontbijt",
                icoon: "🥣",
                details: "Iets eten in de ochtend."
            },
            {
                id: "lunch",
                tekst: "Lunch",
                icoon: "🥪",
                details: "Iets eten rond de middag."
            },
            {
                id: "diner",
                tekst: "Diner",
                icoon: "🍽️",
                details: "Iets eten in de avond."
            },
            {
                id: "water",
                tekst: "Water gedronken",
                icoon: "💧",
                details: "Een glas water telt."
            },
            {
                id: "ander-drinken",
                tekst: "Iets anders gedronken",
                icoon: "🥤",
                details: "Ook iets anders drinken telt."
            }
        ]
    },


    omgeving: {
        titel: "Omgeving",
        icoon: "🏠",
        activiteiten: [
            {
                id: "afwas",
                tekst: "Afwas / vaat",
                icoon: "🍽️",
                details: "Een beetje vaat wegwerken."
            },
            {
                id: "opruimen",
                tekst: "Even iets opruimen",
                icoon: "🧹",
                details: "Eén klein stukje is genoeg."
            }
        ]
    },


    beweging: {
        titel: "Beweging & buiten",
        icoon: "🚶",
        activiteiten: [
            {
                id: "buiten",
                tekst: "Even naar buiten",
                icoon: "🌳",
                details: "Even frisse lucht."
            },
            {
                id: "blokje-om",
                tekst: "Klein blokje om",
                icoon: "🚶",
                details: "Een klein rondje telt."
            },
            {
                id: "bewegen",
                tekst: "Even bewegen",
                icoon: "🤸",
                details: "Een beetje bewegen is genoeg."
            }
        ]
    },


    hoofd: {
        titel: "Hoofd & ontspanning",
        icoon: "🧠",
        activiteiten: [
            {
                id: "rust",
                tekst: "Even rust genomen",
                icoon: "🫶",
                details: "Even niets hoeven."
            },
            {
                id: "muziek",
                tekst: "Muziek geluisterd",
                icoon: "🎧",
                details: "Even luisteren naar iets fijns."
            },
            {
                id: "plezier",
                tekst: "Iets gedaan waar ik plezier aan beleef",
                icoon: "❤️",
                details: "Iets doen dat prettig voelt."
            }
        ]
    },


    borden: {
        titel: "Check mijn borden",
        icoon: "📋",
        activiteiten: [
            {
                id: "borden-bekeken",
                tekst: "Borden bekeken",
                icoon: "📋",
                details: "Even kijken wat er ligt."
            },
            {
                id: "klein-taakje",
                tekst: "Een klein taakje gedaan",
                icoon: "✓",
                details: "Eén klein taakje is genoeg."
            }
        ]
    }

};


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        dagStatusLaden();

        persoonlijkeOptiesLaden();

        basisStatusBijwerken();

        moeilijkeOptiesWeergeven();

        moeilijkeStatusBijwerken();

        schermTonen("hoofdScherm");

        serviceWorkerRegistreren();

        firebaseMeldingenInstellen();

        gebeurtenissenInstellen();
    }
);


/* =========================================================
   GEBEURTENISSEN
   ========================================================= */

function gebeurtenissenInstellen() {

    basisKnop?.addEventListener(
        "click",
        naarBasis
    );

    moeilijkKnop?.addEventListener(
        "click",
        naarMoeilijkeDag
    );

    basisTerugKnop?.addEventListener(
        "click",
        () => schermTonen("hoofdScherm")
    );

    moeilijkTerugKnop?.addEventListener(
        "click",
        () => schermTonen("hoofdScherm")
    );

    activiteitTerugKnop?.addEventListener(
    "click",
    () => {

        if (huidigScherm !== "activiteitScherm") {
            return;
        }


        /* -----------------------------------------
           Vanuit een activiteit terug naar de
           lijst met activiteiten
           ----------------------------------------- */

        if (
            huidigBasisNiveau === "detail" &&
            huidigeBlok &&
            huidigeActiviteit
        ) {

            const match =
                huidigeActiviteit.match(
                    /^basis:([^:]+):(.+)$/
                );


            if (match) {

                const blokId =
                    match[1];

                const activiteitId =
                    match[2];

                const activiteit =
                    basisBlokken[
                        blokId
                    ]?.activiteiten.find(
                        item =>
                            item.id === activiteitId
                    );


                if (activiteit) {

                    huidigBasisNiveau =
                        "lijst";

                    basisBlokOpenen(
                        blokId
                    );

                    return;
                }
            }
        }


        /* -----------------------------------------
           Vanuit de activiteitenlijst terug naar
           Basis
           ----------------------------------------- */

        huidigeActiviteit = null;
        huidigeBlok = null;
        huidigBasisNiveau = "lijst";

        schermTonen(
            "basisScherm"
        );
    }
);


    document
        .querySelectorAll(".basis-blok")
        .forEach(
            knop => {

                knop.addEventListener(
                    "click",
                    () => {

                        const blok =
                            knop.dataset.blok;

                        basisBlokOpenen(blok);
                    }
                );
            }
        );


    document
        .querySelectorAll(".moeilijk-activiteit")
        .forEach(
            knop => {

                knop.addEventListener(
                    "click",
                    () => {

                        const activiteit =
                            knop.dataset.activiteit;

                        moeilijkeActiviteitAfronden(
                            activiteit
                        );
                    }
                );
            }
        );


   moeilijkOchtend?.addEventListener(
    "click",
    () => {
        persoonlijkeSectieOpenen(
            moeilijkOchtendDetails,
            moeilijkOchtend,
            "ochtend"
        );
    }
);

moeilijkAvond?.addEventListener(
    "click",
    () => {
        persoonlijkeSectieOpenen(
            moeilijkAvondDetails,
            moeilijkAvond,
            "avond"
        );
    }
);


    moeilijkIetsPrettigs?.addEventListener(
        "click",
        () => {

          persoonlijkeSectieOpenen(
           moeilijkPrettigDetails,
            moeilijkIetsPrettigs,
              "prettig"
            );

        }
    );


    kortInvoerSluitenKnop?.addEventListener(
        "click",
        kortInvoerSluiten
    );

    invoerAnnuleren?.addEventListener(
        "click",
        kortInvoerSluiten
    );

    invoerOpslaan?.addEventListener(
        "click",
        kortInvoerOpslaan
    );


    kortInvoer?.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                kortInvoerOpslaan();
            }

            if (event.key === "Escape") {

                event.preventDefault();

                kortInvoerSluiten();
            }

        }
    );


    activiteitKlaarKnop?.addEventListener(
        "click",
        () => {

            if (huidigeActiviteit) {

                activiteitAfronden(
                    huidigeActiviteit
                );

            }

        }
    );


    prettigOptieToevoegen?.addEventListener(
        "click",
        event => {

            const knop =
                event.target.closest(
                    ".persoonlijke-toevoegen-knop"
                );

            if (!knop) return;

            const invoer =
                prettigOptieToevoegen.querySelector(
                    ".persoonlijke-toevoegen-invoer"
                );

            persoonlijkeOptieToevoegen(
                "prettig",
                invoer
            );

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                kortInvoerContainer &&
                !kortInvoerContainer.hidden
            ) {

                kortInvoerSluiten();

            }

        }
    );
}


/* =========================================================
   SCHERMEN
   ========================================================= */

function schermTonen(id) {

    document
        .querySelectorAll(".scherm")
        .forEach(
            scherm => {
                scherm.classList.remove("actief");
            }
        );


    const scherm =
        document.getElementById(id);

    if (!scherm) return;

    scherm.classList.add("actief");

    huidigScherm = id;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   NAVIGATIE
   ========================================================= */

function naarBasis() {

    huidigeBlok = null;

    schermTonen("basisScherm");

    basisStatusBijwerken();
}


function moeilijkeOptiesWeergeven() {
    persoonlijkeOptiesWeergeven("ochtend");
    persoonlijkeOptiesWeergeven("avond");
    persoonlijkeOptiesWeergeven("prettig");
}

function persoonlijkeOptiesWeergeven(
    categorie
) {
    let lijst;
    let toevoegContainer;
    let opties;

    if (categorie === "ochtend") {

        lijst = moeilijkOchtendOpties;
        toevoegContainer = ochtendOptieToevoegen;
        opties = ochtendSafeFoods;

    } else if (categorie === "avond") {

        lijst = moeilijkAvondOpties;
        toevoegContainer = avondOptieToevoegen;
        opties = avondSafeFoods;

    } else {

        lijst = moeilijkPrettigOpties;
        toevoegContainer = prettigOptieToevoegen;
        opties = prettigeActiviteiten;
    }

    if (!lijst || !toevoegContainer) return;

    lijst.innerHTML = "";

    opties.forEach(option => {

        const rij =
            persoonlijkeOptieKnop(
                option,
                categorie
            );

        lijst.appendChild(rij);
    });

    persoonlijkeToevoegRijMaken(
        categorie,
        toevoegContainer
    );
}


function naarMoeilijkeDag() {

 if (
    moeilijkOchtendDetails &&
    !moeilijkOchtendDetails.hidden
) {
    moeilijkOchtendDetails.hidden = true;

    persoonlijkePijlBijwerken(
        moeilijkOchtend,
        false
    );
}

if (
    moeilijkAvondDetails &&
    !moeilijkAvondDetails.hidden
) {
    moeilijkAvondDetails.hidden = true;

    persoonlijkePijlBijwerken(
        moeilijkAvond,
        false
    );
}


    if (
        moeilijkPrettigDetails &&
        !moeilijkPrettigDetails.hidden
    ) {

        moeilijkPrettigDetails.hidden = true;

        persoonlijkePijlBijwerken(
            moeilijkIetsPrettigs,
            false
        );
    }


    moeilijkeOptiesWeergeven();

    moeilijkeStatusBijwerken();

    schermTonen("moeilijkScherm");
}


/* =========================================================
   BASIS BLOK OPENEN
   ========================================================= */
    function basisBlokOpenen(blokId) {

    const blok =
        basisBlokken[blokId];

    if (!blok) return;

    huidigeBlok = blokId;

    huidigeActiviteit = null;

    huidigBasisNiveau = "lijst";

    activiteitTitel.textContent =
        blok.titel;

    activiteitSubtitel.textContent =
        "Kies één ding dat je wilt doen.";

    activiteitInhoud.innerHTML = "";


    const lijst =
        document.createElement("div");

    lijst.className =
        "activiteiten";


    blok.activiteiten.forEach(
        activiteit => {

            const knop =
                document.createElement("button");

            knop.type = "button";

            knop.className =
                "activiteit-knop";

            knop.dataset.activiteit =
                activiteit.id;

            const icoon =
                document.createElement("span");

            icoon.textContent =
                activiteit.icoon;

            const tekst =
                document.createElement("span");

            tekst.textContent =
                activiteit.tekst;

            knop.append(
                icoon,
                tekst
            );


            const sleutel =
                `basis:${blokId}:${activiteit.id}`;


            if (
                dagStatus.afgerond[sleutel]
            ) {

                knop.classList.add(
                    "afgerond"
                );

            }


            knop.addEventListener(
                "click",
                () => {

                    basisActiviteitOpenen(
                        blokId,
                        activiteit
                    );

                }
            );


            lijst.appendChild(knop);
        }
    );


    activiteitInhoud.appendChild(
        lijst
    );


    schermTonen(
        "activiteitScherm"
    );

    activiteitStatusBijwerken(
        `basis:${blokId}`,
        blok.icoon,
        blok.titel
    );
}


/* =========================================================
   BASIS ACTIVITEIT OPENEN
   ========================================================= */

function basisActiviteitOpenen(
    blokId,
    activiteit
) {

    huidigeBlok = blokId;

    huidigeActiviteit =
        `basis:${blokId}:${activiteit.id}`;

        huidigBasisNiveau = "detail";

    activiteitTitel.textContent =
        activiteit.tekst;

    activiteitSubtitel.textContent =
        basisBlokken[blokId].titel;

    activiteitStatusIcoon.textContent =
        activiteit.icoon;

    activiteitStatusTitel.textContent =
        dagStatus.afgerond[huidigeActiviteit]
            ? "Goed gedaan."
            : "Eén stap tegelijk.";

    activiteitStatusTekst.textContent =
        dagStatus.afgerond[huidigeActiviteit]
            ? "Deze heb je vandaag al gedaan."
            : activiteit.details;


    activiteitInhoud.innerHTML = "";


    const invoerKnop =
        document.createElement("button");

    invoerKnop.type = "button";

    invoerKnop.className =
        "activiteit-invoer-knop";

    invoerKnop.textContent =
        "＋ Iets toevoegen";

    invoerKnop.addEventListener(
        "click",
        () => {

            kortInvoerOpenen(
                huidigeActiviteit,
                activiteit.tekst
            );

        }
    );


    const extraLijst =
        document.createElement("div");

    extraLijst.className =
        "extra-lijst";


    const toevoegingen =
        dagStatus.toevoegingen[
            huidigeActiviteit
        ] || [];


    toevoegingen.forEach(
        (item, index) => {

            const rij =
                document.createElement("div");

            rij.className =
                "extra-rij";


            if (item.afgerond) {

                rij.classList.add(
                    "afgerond"
                );

            }


            const vink =
                document.createElement("button");

            vink.type = "button";

            vink.className =
                "extra-vink";

            vink.textContent =
                "✓";

            vink.setAttribute(
                "aria-label",
                "Aanvulling afvinken"
            );


            vink.addEventListener(
                "click",
                () => {

                    item.afgerond =
                        !item.afgerond;

                    dagStatusOpslaan();

                    basisActiviteitOpenen(
                        blokId,
                        activiteit
                    );

                }
            );


            const tekst =
                document.createElement("span");

            tekst.className =
                "extra-tekst";

            tekst.textContent =
                item.tekst;


            const verwijderen =
                document.createElement("button");

            verwijderen.type = "button";

            verwijderen.className =
                "extra-verwijder";

            verwijderen.textContent =
                "×";

            verwijderen.setAttribute(
                "aria-label",
                "Verwijder aanvulling"
            );


            verwijderen.addEventListener(
                "click",
                () => {

                    toevoegingen.splice(
                        index,
                        1
                    );

                    dagStatusOpslaan();

                    basisActiviteitOpenen(
                        blokId,
                        activiteit
                    );

                }
            );


            rij.append(
                vink,
                tekst,
                verwijderen
            );

            extraLijst.appendChild(
                rij
            );
        }
    );


    activiteitInhoud.appendChild(
        extraLijst
    );

    activiteitInhoud.appendChild(
        invoerKnop
    );


    activiteitStatusBijwerken(
        huidigeActiviteit,
        activiteit.icoon,
        activiteit.tekst
    );
}


/* =========================================================
   BASIS STATUS
   ========================================================= */

function basisStatusBijwerken() {

    // De status wordt direct opgebouwd
    // wanneer een blok wordt geopend.

}


/* =========================================================
   ACTIVITEIT AFRONDEN
   ========================================================= */

function activiteitAfronden(
    sleutel
) {

    if (
        dagStatus.afgerond[sleutel]
    ) {

        return;
    }


    dagStatus.afgerond[sleutel] =
        true;


    dagStatusOpslaan();


    const basisMatch =
        sleutel.match(
            /^basis:([^:]+):(.+)$/
        );


    if (basisMatch) {

        const blokId =
            basisMatch[1];

        const activiteitId =
            basisMatch[2];

        const activiteit =
            basisBlokken[
                blokId
            ]?.activiteiten.find(
                item =>
                    item.id === activiteitId
            );


        if (activiteit) {

            activiteitStatusBijwerken(
                sleutel,
                activiteit.icoon,
                activiteit.tekst
            );

            beloningTonen(
                "YES! Goed gedaan! 🎉",
                "Dit heb je gewoon gedaan! 💪"
            );

            basisBlokOpenen(
                blokId
            );

            return;
        }
    }


    activiteitStatusBijwerken(
        sleutel,
        "🌱",
        "Goed gedaan."
    );


    beloningTonen(
        "YES! Goed gedaan! 🎉",
        "Dit heb je gewoon gedaan! 💪"
    );
}


/* =========================================================
   ACTIVITEIT STATUS
   ========================================================= */

function activiteitStatusBijwerken(
    sleutel,
    icoon,
    titel
) {

    if (!activiteitStatus) return;


    activiteitStatusIcoon.textContent =
        icoon || "🌱";


    activiteitStatusTitel.textContent =
        dagStatus.afgerond[sleutel]
            ? "Goed gedaan."
            : "Eén stap tegelijk.";


    activiteitStatusTekst.textContent =
        dagStatus.afgerond[sleutel]
            ? "Deze heb je vandaag gedaan."
            : titel || "Eén stap is genoeg.";
}


/* =========================================================
   KORTE INVOER
   ========================================================= */

let huidigeInvoerSleutel = null;


function kortInvoerOpenen(
    sleutel,
    activiteitNaam
) {

    huidigeInvoerSleutel =
        sleutel;


    kortInvoerTitel.textContent =
        activiteitNaam;

    kortInvoerUitleg.textContent =
        "Een korte aanvulling is genoeg.";

    kortInvoer.value = "";

    kortInvoerContainer.hidden =
        false;


    requestAnimationFrame(
        () => {
            kortInvoer.focus();
        }
    );
}


function kortInvoerSluiten() {

    huidigeInvoerSleutel =
        null;

    kortInvoer.value = "";

    kortInvoerContainer.hidden =
        true;
}


function kortInvoerOpslaan() {

    if (!huidigeInvoerSleutel) {
        return;
    }


    const tekst =
        kortInvoer.value.trim();


    if (!tekst) {

        kortInvoer.focus();

        return;
    }


    if (
        !dagStatus.toevoegingen[
            huidigeInvoerSleutel
        ]
    ) {

        dagStatus.toevoegingen[
            huidigeInvoerSleutel
        ] = [];

    }


    dagStatus.toevoegingen[
        huidigeInvoerSleutel
    ].push({
        tekst,
        afgerond: false
    });


    dagStatusOpslaan();


    const match =
        huidigeInvoerSleutel.match(
            /^basis:([^:]+):(.+)$/
        );


    kortInvoerSluiten();


    if (match) {

        const blokId =
            match[1];

        const activiteitId =
            match[2];

        const activiteit =
            basisBlokken[
                blokId
            ]?.activiteiten.find(
                item =>
                    item.id === activiteitId
            );

        if (activiteit) {

            basisActiviteitOpenen(
                blokId,
                activiteit
            );

        }

    }
}


/* =========================================================
   MOEILIJKE DAG
   ========================================================= */

function moeilijkeActiviteitAfronden(
    activiteit
) {

    if (
        dagStatus.afgerond[activiteit]
    ) {

        return;
    }


    dagStatus.afgerond[activiteit] =
        true;


    dagStatusOpslaan();

    moeilijkeStatusBijwerken();


    beloningTonen(
        "YES! Goed gedaan! 🎉",
        moeilijkeFeedback(
            activiteit
        )
    );
}


function moeilijkeFeedback(
    activiteit
) {

    const feedback = {

        "moeilijk-iets-gedronken":
            "Iets drinken is al genoeg. 💧",

        "moeilijk-water":
            "Je hebt water gedronken. 💧",

        "moeilijk-douchen":
            "Je hebt voor jezelf gezorgd. 🚿",

        "moeilijk-wassen":
            "Een beetje zelfzorg telt. 🧼",

        "moeilijk-tanden":
            "Tanden gepoetst. 🪥",

        "moeilijk-kleding":
            "Schone kleding aan. 👕",

        "moeilijk-blokje-om":
            "Lekker. Even naar buiten geweest. 🚶",

        "moeilijk-buiten":
            "Je bent even buiten geweest. 🌳",

        "moeilijk-bewegen":
            "Je hebt even bewogen. 🤸"

    };


    return (
        feedback[activiteit] ||
        "Dit telt mee. 💚"
    );
}


function moeilijkeStatusBijwerken() {

    document
        .querySelectorAll(
            ".moeilijk-activiteit"
        )
        .forEach(
            knop => {

                const id =
                    knop.dataset.activiteit;

                knop.classList.toggle(
                    "afgerond",
                    !!dagStatus.afgerond[id]
                );

            }
        );


   if (moeilijkOchtend) {
    moeilijkOchtend.classList.toggle(
        "afgerond",
        !!dagStatus.afgerond[
            "moeilijk-ochtend"
        ]
    );
}

if (moeilijkAvond) {
    moeilijkAvond.classList.toggle(
        "afgerond",
        !!dagStatus.afgerond[
            "moeilijk-avond"
        ]
    );
}


    if (
        moeilijkIetsPrettigs
    ) {

        moeilijkIetsPrettigs.classList.toggle(
            "afgerond",
            !!dagStatus.afgerond[
                "moeilijk-iets-prettigs"
            ]
        );
    }
}


/* =========================================================
   PERSOONLIJKE SECTIE OPENEN
   ========================================================= */

function persoonlijkeSectieOpenen(
    details,
    trigger,
    categorie
) {
    if (!details || !trigger) return;

    const openen = details.hidden;

    details.hidden = !openen;

    persoonlijkePijlBijwerken(
        trigger,
        openen
    );

    if (openen) {
        persoonlijkeOptiesWeergeven(
            categorie
        );
    }
}


/* =========================================================
   PERSOONLIJKE OPTIE REGEL
   ========================================================= */

function persoonlijkeOptieKnop(
    optie,
    categorie
) {

    const rij =
        document.createElement("div");

    rij.className =
        "persoonlijke-optie-regel";


    const sleutel =
        `persoonlijk:${categorie}:${optie.id}`;


    const afgerond =
        !!dagStatus.afgerond[sleutel];


    if (afgerond) {

        rij.classList.add(
            "afgerond"
        );
    }


    const knop =
        document.createElement("button");

    knop.type = "button";

    knop.className =
        "persoonlijke-optie-knop";

    knop.setAttribute(
        "aria-label",
        optie.tekst
    );


    const icoon =
        document.createElement("span");

    icoon.className =
        "persoonlijke-optie-icoon";

    icoon.textContent =
        optie.icoon || "🍽️";


    const tekst =
        document.createElement("span");

    tekst.className =
        "persoonlijke-optie-tekst";

    tekst.textContent =
        optie.tekst;


    knop.append(
        icoon,
        tekst
    );


    knop.addEventListener(
        "click",
        () => {

            persoonlijkeOptieKlik(
                categorie,
                optie
            );

        }
    );


    const bewerk =
        document.createElement("button");

    bewerk.type = "button";

    bewerk.className =
        "persoonlijke-optie-bewerk";

    bewerk.textContent =
        "✎";

    bewerk.setAttribute(
        "aria-label",
        `${optie.tekst} bewerken`
    );


    bewerk.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            persoonlijkeOptieBewerkenInline(
                categorie,
                optie
            );

        }
    );


    rij.append(
        knop,
        bewerk
    );


    return rij;
}


/* =========================================================
   PERSOONLIJKE OPTIE AFVINKEN
   ========================================================= */

function persoonlijkeOptieKlik(
    categorie,
    optie
) {

    const sleutel =
        `persoonlijk:${categorie}:${optie.id}`;


    if (
        dagStatus.afgerond[sleutel]
    ) {

        return;
    }


    dagStatus.afgerond[sleutel] =
        true;


    if (
    categorie === "ochtend" ||
    categorie === "avond"
) {

    const ouderSleutel =
        categorie === "ochtend"
            ? "moeilijk-ochtend"
            : "moeilijk-avond";

    dagStatus.afgerond[
        ouderSleutel
    ] = true;

    beloningTonen(
        "YES! Goed gedaan! 🎉",
        `${optie.tekst} gegeten. 🍽️`
    );

} else {

    dagStatus.afgerond[
        "moeilijk-iets-prettigs"
    ] = true;

    beloningTonen(
        "YES! Goed gedaan! 🎉",
        `${optie.tekst}! ❤️`
    );
}

    dagStatusOpslaan();

    moeilijkeOptiesWeergeven();

    moeilijkeStatusBijwerken();
}


/* =========================================================
   TOEVOEGEN
   ========================================================= */

function persoonlijkeToevoegRijMaken(
    categorie,
    container
) {

    container.innerHTML = "";


    const rij =
        document.createElement("div");

    rij.className =
        "persoonlijke-toevoegen-rij";


    const invoer =
        document.createElement("input");

    invoer.type = "text";

    invoer.className =
        "persoonlijke-toevoegen-invoer";

    invoer.maxLength = 120;

    invoer.autocomplete = "off";

    if (
    categorie === "ochtend" ||
    categorie === "avond"
) {
    invoer.placeholder =
        "Nieuwe Safe Food...";

    invoer.setAttribute(
        "aria-label",
        "Nieuwe Safe Food"
    );

} else {

    invoer.placeholder =
        "Nieuwe leuke activiteit...";

    invoer.setAttribute(
        "aria-label",
        "Nieuwe leuke activiteit"
    );
}


    const knop =
        document.createElement("button");

    knop.type = "button";

    knop.className =
        "persoonlijke-toevoegen-knop";

    knop.textContent =
        "＋";

    knop.setAttribute(
        "aria-label",
        "Toevoegen"
    );


    knop.addEventListener(
        "click",
        () => {

            persoonlijkeOptieToevoegen(
                categorie,
                invoer
            );

        }
    );


    invoer.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();

            persoonlijkeOptieToevoegen(
                categorie,
                invoer
            );
        }
    );


    rij.append(
        invoer,
        knop
    );


    container.appendChild(
        rij
    );
}


function persoonlijkeOptieToevoegen(
    categorie,
    invoer
) {

    if (!invoer) return;


    const tekst =
        invoer.value.trim();


    if (!tekst) {

        invoer.focus();

        return;
    }


  let lijst;

if (categorie === "ochtend") {
    lijst = ochtendSafeFoods;

} else if (categorie === "avond") {
    lijst = avondSafeFoods;

} else {
    lijst = prettigeActiviteiten;
}


    const nieuweOptie = {

        id:
            persoonlijkeOptieIdMaken(
                tekst
            ),

        tekst,

     icoon:
    categorie === "ochtend" ||
    categorie === "avond"
        ? "🍽️"
        : "❤️" 
    };


    lijst.push(
        nieuweOptie
    );


    persoonlijkeOptiesOpslaan();


    invoer.value = "";


    persoonlijkeOptiesWeergeven(
        categorie
    );


   if (categorie === "ochtend") {

    invoer =
        ochtendOptieToevoegen.querySelector(
            ".persoonlijke-toevoegen-invoer"
        );

} else if (categorie === "avond") {

    invoer =
        avondOptieToevoegen.querySelector(
            ".persoonlijke-toevoegen-invoer"
        );

} else {

    invoer =
        prettigOptieToevoegen.querySelector(
            ".persoonlijke-toevoegen-invoer"
        );
} 


    invoer?.focus();
}


function persoonlijkeOptieIdMaken(
    tekst
) {

    const basis =
        tekst
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            )
            .slice(
                0,
                40
            ) || "optie";


    return `${basis}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;
}


/* =========================================================
   INLINE BEWERKEN
   ========================================================= */

function persoonlijkeOptieBewerkenInline(
    categorie,
    optie
) {

  let lijst;

if (categorie === "ochtend") {
    lijst = moeilijkOchtendOpties;

} else if (categorie === "avond") {
    lijst = moeilijkAvondOpties;

} else {
    lijst = moeilijkPrettigOpties;
}


    const rijen =
        Array.from(
            lijst.children
        );


    const index =
    rijen.findIndex(
        rij => {

            const tekst =
                rij.querySelector(
                    ".persoonlijke-optie-tekst"
                );

            return (
                tekst &&
                tekst.textContent ===
                optie.tekst
            );
        }
    );


    if (index < 0) {
        return;
    }


    const oudeRij =
        rijen[index];


    const bewerkRij =
        document.createElement("div");

    bewerkRij.className =
        "persoonlijke-optie-bewerk-regel";


    const icoon =
        document.createElement("span");

    icoon.className =
        "persoonlijke-bewerk-icoon";

    icoon.textContent =
        optie.icoon || "🍽️";


    const invoer =
        document.createElement("input");

    invoer.type = "text";

    invoer.className =
        "persoonlijke-bewerk-invoer";

    invoer.value =
        optie.tekst;

    invoer.maxLength = 120;

    invoer.autocomplete =
        "off";


    const opslaan =
        document.createElement("button");

    opslaan.type = "button";

    opslaan.className =
        "persoonlijke-inline-knop persoonlijke-bewerk-opslaan";

    opslaan.textContent =
        "✓";

    opslaan.setAttribute(
        "aria-label",
        "Wijziging opslaan"
    );


    const annuleren =
        document.createElement("button");

    annuleren.type = "button";

    annuleren.className =
        "persoonlijke-inline-knop persoonlijke-bewerk-annuleren";

    annuleren.textContent =
        "×";

    annuleren.setAttribute(
        "aria-label",
        "Annuleren"
    );


    const verwijderen =
        document.createElement("button");

    verwijderen.type = "button";

    verwijderen.className =
        "persoonlijke-inline-knop persoonlijke-bewerk-verwijderen";

    verwijderen.textContent =
        "🗑️";

    verwijderen.setAttribute(
        "aria-label",
        "Verwijderen"
    );


    bewerkRij.append(
        icoon,
        invoer,
        opslaan,
        annuleren,
        verwijderen
    );


    oudeRij.replaceWith(
        bewerkRij
    );


    requestAnimationFrame(
        () => {

            invoer.focus();

            invoer.select();
        }
    );


    function opslaanWijziging() {

        const nieuweTekst =
            invoer.value.trim();


        if (!nieuweTekst) {

            invoer.focus();

            return;
        }


        optie.tekst =
            nieuweTekst;


        persoonlijkeOptiesOpslaan();

        persoonlijkeOptiesWeergeven(
            categorie
        );

        inlineBewerking = null;
    }


    opslaan.addEventListener(
        "click",
        opslaanWijziging
    );


    annuleren.addEventListener(
        "click",
        () => {

            persoonlijkeOptiesWeergeven(
                categorie
            );

            inlineBewerking = null;
        }
    );


    invoer.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                opslaanWijziging();
            }

            if (event.key === "Escape") {

                event.preventDefault();

                persoonlijkeOptiesWeergeven(
                    categorie
                );
            }
        }
    );


    verwijderen.addEventListener(
        "click",
        () => {

            verwijderBevestigingTonen(
                categorie,
                optie,
                bewerkRij
            );

        }
    );


    inlineBewerking = {
        categorie,
        id: optie.id
    };
}


/* =========================================================
   VERWIJDEREN
   ========================================================= */

function verwijderBevestigingTonen(
    categorie,
    optie,
    huidigeRij
) {

    const bevestiging =
        document.createElement("div");

    bevestiging.className =
        "persoonlijke-verwijder-bevestiging";


    const tekst =
        document.createElement("div");

    tekst.className =
        "persoonlijke-verwijder-tekst";

    tekst.textContent =
        `Deze optie verwijderen?`;


    const acties =
        document.createElement("div");

    acties.className =
        "persoonlijke-verwijder-acties";


    const ja =
        document.createElement("button");

    ja.type = "button";

    ja.className =
        "persoonlijke-verwijder-ja";

    ja.textContent =
        "Ja, verwijderen";


    const nee =
        document.createElement("button");

    nee.type = "button";

    nee.className =
        "persoonlijke-verwijder-nee";

    nee.textContent =
        "Annuleren";


    acties.append(
        ja,
        nee
    );

    bevestiging.append(
        tekst,
        acties
    );


    huidigeRij.replaceChildren(
        bevestiging
    );


    ja.addEventListener(
        "click",
        () => {

            persoonlijkeOptieVerwijderen(
                categorie,
                optie
            );

        }
    );


    nee.addEventListener(
        "click",
        () => {

            persoonlijkeOptieBewerkenInline(
                categorie,
                optie
            );

        }
    );
}


function persoonlijkeOptieVerwijderen(
    categorie,
    optie
) {

   let lijst;

if (categorie === "ochtend") {
    lijst = ochtendSafeFoods;

} else if (categorie === "avond") {
    lijst = avondSafeFoods;

} else {
    lijst = prettigeActiviteiten;
} 


    const index =
        lijst.findIndex(
            item =>
                item.id === optie.id
        );


    if (index >= 0) {

        lijst.splice(
            index,
            1
        );
    }


    const sleutel =
        `persoonlijk:${categorie}:${optie.id}`;


    delete dagStatus.afgerond[
        sleutel
    ];


    persoonlijkeOptiesOpslaan();

    dagStatusOpslaan();

    persoonlijkeOptiesWeergeven(
        categorie
    );

    moeilijkeStatusBijwerken();
}


/* =========================================================
   PERSOONLIJKE OPSLAG
   ========================================================= */

function persoonlijkeOptiesLaden() {

    try {

        const opgeslagenOchtend =
            JSON.parse(
                localStorage.getItem(
                    OPSLAG_OCHTEND_SAFEFOODS
                )
            );

        const opgeslagenAvond =
            JSON.parse(
                localStorage.getItem(
                    OPSLAG_AVOND_SAFEFOODS
                )
            );

        const oudeSafeFoods =
            JSON.parse(
                localStorage.getItem(
                    OPSLAG_SAFEFOODS
                )
            );


        /*
         * Ochtend:
         * nieuwe opslag gebruiken als die bestaat.
         * Anders oude Safe Foods eenmalig overnemen.
         */

        if (
            Array.isArray(
                opgeslagenOchtend
            )
        ) {

            ochtendSafeFoods =
                opgeslagenOchtend;

        } else if (
            Array.isArray(
                oudeSafeFoods
            )
        ) {

            ochtendSafeFoods =
                oudeSafeFoods;

        } else {

            ochtendSafeFoods =
                [
                    ...STANDAARD_SAFEFOODS
                ];
        }


        /*
         * Avond begint met een eigen lege lijst.
         */

        if (
            Array.isArray(
                opgeslagenAvond
            )
        ) {

            avondSafeFoods =
                opgeslagenAvond;

        } else {

            avondSafeFoods = [];
        }


        const opgeslagenPrettig =
            JSON.parse(
                localStorage.getItem(
                    OPSLAG_PRETTIGE_ACTIVITEITEN
                )
            );


        if (
            Array.isArray(
                opgeslagenPrettig
            )
        ) {

            prettigeActiviteiten =
                opgeslagenPrettig;

        } else {

            prettigeActiviteiten =
                [
                    ...STANDAARD_PRETTIGE_ACTIVITEITEN
                ];
        }


        persoonlijkeOptiesOpslaan();


    } catch (fout) {

        console.warn(
            "Persoonlijke opties konden niet worden geladen.",
            fout
        );

        ochtendSafeFoods =
            [
                ...STANDAARD_SAFEFOODS
            ];

        avondSafeFoods = [];

        prettigeActiviteiten =
            [
                ...STANDAARD_PRETTIGE_ACTIVITEITEN
            ];
    }
}


function persoonlijkeOptiesOpslaan() {

    try {

        localStorage.setItem(
            OPSLAG_OCHTEND_SAFEFOODS,
            JSON.stringify(
                ochtendSafeFoods
            )
        );


        localStorage.setItem(
            OPSLAG_AVOND_SAFEFOODS,
            JSON.stringify(
                avondSafeFoods
            )
        );


        localStorage.setItem(
            OPSLAG_PRETTIGE_ACTIVITEITEN,
            JSON.stringify(
                prettigeActiviteiten
            )
        );


    } catch (fout) {

        console.warn(
            "Persoonlijke opties konden niet worden opgeslagen.",
            fout
        );
    }
}


/* =========================================================
   DAGSTATUS LADEN
   ========================================================= */

function vandaagDatum() {

    const nu =
        new Date();

    const jaar =
        nu.getFullYear();

    const maand =
        String(
            nu.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const dag =
        String(
            nu.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${jaar}-${maand}-${dag}`;
}


function dagStatusLaden() {

    const vandaag =
        vandaagDatum();


    try {

        const opgeslagen =
            JSON.parse(
                localStorage.getItem(
                    OPSLAG_DAGSTATUS
                )
            );


        if (
            opgeslagen &&
            opgeslagen.datum === vandaag
        ) {

            dagStatus = {

                datum: vandaag,

                afgerond:
                    opgeslagen.afgerond &&
                    typeof opgeslagen.afgerond === "object"
                        ? opgeslagen.afgerond
                        : {},

                toevoegingen:
                    opgeslagen.toevoegingen &&
                    typeof opgeslagen.toevoegingen === "object"
                        ? opgeslagen.toevoegingen
                        : {}

            };

            return;
        }

    } catch (fout) {

        console.warn(
            "Dagstatus kon niet worden geladen.",
            fout
        );
    }


    dagStatus = {

        datum: vandaag,

        afgerond: {},

        toevoegingen: {}
    };


    dagStatusOpslaan();
}


/* =========================================================
   DAGSTATUS OPSLAAN
   ========================================================= */

function dagStatusOpslaan() {

    try {

        localStorage.setItem(
            OPSLAG_DAGSTATUS,
            JSON.stringify(
                dagStatus
            )
        );

    } catch (fout) {

        console.warn(
            "Dagstatus kon niet worden opgeslagen.",
            fout
        );
    }
}


/* =========================================================
   POSITIEVE FEEDBACK
   ========================================================= */

function beloningTonen(
    hoofdtekst,
    subtekst
) {

    const bemoedigendeTeksten = [
        "Dit heb je gewoon gedaan! 💪",
        "Goed bezig, één stap tegelijk. 🌱",
        "Dit telt. Echt. ✨",
        "Je hebt het gedaan! 🎉",
        "Goed dat je even aan jezelf dacht. 💚",
        "Kijk jou eens goed voor jezelf zorgen. 🌿",
        "Mooi, weer een klein stukje voor jezelf. 💛",
        "Lekker bezig! 🙌",
        "Een kleine stap is ook een stap. 🌱",
        "Je mag hier best trots op zijn. ⭐"
    ];

    const willekeurigeTekst =
        bemoedigendeTeksten[
            Math.floor(
                Math.random() *
                bemoedigendeTeksten.length
            )
        ];

    hoofdtekst =
        hoofdtekst ||
        "YES! Goed gedaan! 🎉";

    subtekst =
        willekeurigeTekst;

    if (!beloning) {
        return;
    }

    if (beloningTimeout) {

        clearTimeout(
            beloningTimeout
        );

        beloningTimeout =
            null;
    }


    beloning.innerHTML = "";


    const ballon =
        document.createElement("div");

    ballon.className =
        "beloning-ballon";


    const decoratie =
        document.createElement("div");

    decoratie.className =
        "beloning-decoratie";

    decoratie.textContent =
        "📣 ✨ ☀️ 🎉";


    const hoofd =
        document.createElement("div");

    hoofd.className =
        "beloning-hoofdtekst";

    hoofd.textContent =
        hoofdtekst;


    const sub =
        document.createElement("div");

    sub.className =
        "beloning-subtekst";

    sub.textContent =
        subtekst ||
        "Dit telt mee. 💚";


    ballon.append(
        decoratie,
        hoofd,
        sub
    );


    beloning.appendChild(
        ballon
    );


    beloning.classList.remove(
        "toon"
    );


    void beloning.offsetWidth;


    beloning.classList.add(
        "toon"
    );


    beloningTimeout =
        setTimeout(
            () => {

                beloning.classList.remove(
                    "toon"
                );

                beloningTimeout =
                    null;

            },
            3500
        );
}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function serviceWorkerRegistreren() {

    if (
        "serviceWorker" in navigator
    ) {

        window.addEventListener(
            "load",
            () => {

                navigator.serviceWorker
                    .register("sw.js")
                    .then(
                        registratie => {

                            console.log(
                                "Anker service worker actief:",
                                registratie.scope
                            );

                        }
                    )
                    .catch(
                        fout => {

                            console.warn(
                                "Service worker kon niet worden geregistreerd.",
                                fout
                            );

                        }
                    );

            }
        );

    }
}

/* =========================================================
   FIREBASE PUSHMELDINGEN INSTELLEN
   ========================================================= */

async function firebaseMeldingenInstellen() {

    console.log("NIEUWE FIREBASE FUNCTIE");


    const isAnkerApp =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;


    // Gewone Chrome-webpagina:
// geen Firebase pushmeldingen instellen
if (!isAnkerApp) {
    return;
}

    // Alleen de geïnstalleerde Anker-app gaat hieronder verder

    if (
        !("Notification" in window)
    ) {
        return;
    }


    if (
        !("serviceWorker" in navigator)
    ) {
        return;
    }


    const toestemming =
        await Notification.requestPermission();


    if (
        toestemming !== "granted"
    ) {
        return;
    }


    try {

        const registratie =
            await navigator.serviceWorker.register(
                "./sw.js"
            );


        const token =
            await getToken(
                messaging,
                {
                    vapidKey:
                        "BAx_nTX8DZt1hqI36xOrtke_ABCWqeTDulTGhWs_d3cSfyZeJsQ1TJebPAamIxUi1fuI2Z_qiD4Fz48_mv5Xkuw",

                    serviceWorkerRegistration:
                        registratie
                }
            );

    } catch (fout) {

        console.warn(
            "Firebase meldingen konden niet worden ingesteld.",
            fout
        );

    }
}
