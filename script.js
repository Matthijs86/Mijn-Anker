// ======================================
// ANKER - JAVASCRIPT
// Terug naar de basis.
// ======================================


// ======================================
// OPSLAG
// ======================================

const OPSLAG_DAGSTATUS = "ankerDagstatus";
const OPSLAG_SAFEFOODS = "ankerSafeFoods";
const OPSLAG_PRETTIGE_ACTIVITEITEN =
    "ankerPrettigeActiviteiten";


// ======================================
// STANDAARD PERSOONLIJKE OPTIES
// ======================================

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


// ======================================
// DAGSTATUS
// ======================================

let dagStatus = {
    datum: "",
    afgerond: {},
    toevoegingen: {}
};


let safeFoods = [];
let prettigeActiviteiten = [];


// ======================================
// HUIDIGE STAAT
// ======================================

let huidigScherm = "hoofdScherm";

let huidigeActiviteit = null;
let huidigeBlok = null;

let huidigeBeheerCategorie = null;
let huidigeBewerkOptie = null;


// ======================================
// ELEMENTEN
// ======================================

// Hoofdscherm

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisKnop =
    document.getElementById("basisKnop");

const moeilijkKnop =
    document.getElementById("moeilijkKnop");


// Basis

const basisScherm =
    document.getElementById("basisScherm");

const basisTerugKnop =
    document.getElementById("basisTerugKnop");


// Moeilijke dag

const moeilijkScherm =
    document.getElementById("moeilijkScherm");

const moeilijkTerugKnop =
    document.getElementById("moeilijkTerugKnop");


// Moeilijke dag - persoonlijke onderdelen

const moeilijkIetsGegeten =
    document.getElementById("moeilijkIetsGegeten");

const moeilijkEtenDetails =
    document.getElementById("moeilijkEtenDetails");

const moeilijkEtenOpties =
    document.getElementById("moeilijkEtenOpties");

const etenOptieToevoegen =
    document.getElementById("etenOptieToevoegen");

const etenOptiesBeheren =
    document.getElementById("etenOptiesBeheren");


const moeilijkIetsPrettigs =
    document.getElementById("moeilijkIetsPrettigs");

const moeilijkPrettigDetails =
    document.getElementById("moeilijkPrettigDetails");

const moeilijkPrettigOpties =
    document.getElementById("moeilijkPrettigOpties");

const prettigOptieToevoegen =
    document.getElementById("prettigOptieToevoegen");

const prettigOptiesBeheren =
    document.getElementById("prettigOptiesBeheren");


// Activiteit

const activiteitScherm =
    document.getElementById("activiteitScherm");

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


// Korte invoer

const kortInvoerContainer =
    document.getElementById("kortInvoerContainer");

const kortInvoerTitel =
    document.getElementById("kortInvoerTitel");

const kortInvoerUitleg =
    document.getElementById("kortInvoerUitleg");

const kortInvoer =
    document.getElementById("kortInvoer");


// BELANGRIJK:
// Deze naam is bewust anders dan de functie
// kortInvoerSluiten().
// Zo ontstaat geen JavaScript naamconflict.

const kortInvoerSluitenKnop =
    document.getElementById("kortInvoerSluiten");


const invoerAnnuleren =
    document.getElementById("invoerAnnuleren");

const invoerOpslaan =
    document.getElementById("invoerOpslaan");


// Persoonlijke opties beheren

const persoonlijkeOptiesContainer =
    document.getElementById(
        "persoonlijkeOptiesContainer"
    );

const persoonlijkeOptiesTitel =
    document.getElementById(
        "persoonlijkeOptiesTitel"
    );

const persoonlijkeOptiesUitleg =
    document.getElementById(
        "persoonlijkeOptiesUitleg"
    );

const persoonlijkeOptiesSluiten =
    document.getElementById(
        "persoonlijkeOptiesSluiten"
    );

const persoonlijkeOptiesLijst =
    document.getElementById(
        "persoonlijkeOptiesLijst"
    );

const persoonlijkeOptieNieuw =
    document.getElementById(
        "persoonlijkeOptieNieuw"
    );


// Feedback

const beloning =
    document.getElementById("beloning");


// ======================================
// INITIALISATIE
// ======================================

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

    }
);


// ======================================
// DATUM
// ======================================

function vandaagDatum() {

    const vandaag =
        new Date();

    const jaar =
        vandaag.getFullYear();

    const maand =
        String(
            vandaag.getMonth() + 1
        ).padStart(2, "0");

    const dag =
        String(
            vandaag.getDate()
        ).padStart(2, "0");

    return `${jaar}-${maand}-${dag}`;
}


// ======================================
// DAGSTATUS LADEN
// ======================================

function dagStatusLaden() {

    const vandaag =
        vandaagDatum();

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_DAGSTATUS
            );

        if (opgeslagen) {

            const gegevens =
                JSON.parse(opgeslagen);

            if (
                gegevens &&
                gegevens.datum === vandaag
            ) {

                dagStatus = {
                    datum: vandaag,
                    afgerond:
                        gegevens.afgerond || {},
                    toevoegingen:
                        gegevens.toevoegingen || {}
                };

                return;

            }

        }

    } catch (fout) {

        console.error(
            "Fout bij laden dagstatus:",
            fout
        );

    }


    // Nieuwe dag:
    // alles wat dagelijks is begint opnieuw.

    dagStatus = {
        datum: vandaag,
        afgerond: {},
        toevoegingen: {}
    };

    dagStatusOpslaan();
}


// ======================================
// DAGSTATUS OPSLAAN
// ======================================

function dagStatusOpslaan() {

    try {

        localStorage.setItem(
            OPSLAG_DAGSTATUS,
            JSON.stringify(dagStatus)
        );

    } catch (fout) {

        console.error(
            "Fout bij opslaan dagstatus:",
            fout
        );

    }
}


// ======================================
// PERSOONLIJKE OPTIES LADEN
// ======================================

function persoonlijkeOptiesLaden() {

    try {

        const opgeslagenSafeFoods =
            localStorage.getItem(
                OPSLAG_SAFEFOODS
            );

        if (opgeslagenSafeFoods) {

            const gegevens =
                JSON.parse(
                    opgeslagenSafeFoods
                );

            if (Array.isArray(gegevens)) {

                safeFoods =
                    gegevens;

            }

        }


        const opgeslagenPrettig =
            localStorage.getItem(
                OPSLAG_PRETTIGE_ACTIVITEITEN
            );

        if (opgeslagenPrettig) {

            const gegevens =
                JSON.parse(
                    opgeslagenPrettig
                );

            if (Array.isArray(gegevens)) {

                prettigeActiviteiten =
                    gegevens;

            }

        }

    } catch (fout) {

        console.error(
            "Fout bij laden persoonlijke opties:",
            fout
        );

    }


    // Alleen bij een echt lege opslag
    // vullen we de standaardopties.

    if (!safeFoods.length) {

        safeFoods =
            STANDAARD_SAFEFOODS.map(
                optie => ({ ...optie })
            );

        persoonlijkeOptiesOpslaan(
            "eten"
        );

    }


    if (!prettigeActiviteiten.length) {

        prettigeActiviteiten =
            STANDAARD_PRETTIGE_ACTIVITEITEN.map(
                optie => ({ ...optie })
            );

        persoonlijkeOptiesOpslaan(
            "prettig"
        );

    }

}


// ======================================
// PERSOONLIJKE OPTIES OPSLAAN
// ======================================

function persoonlijkeOptiesOpslaan(
    categorie
) {

    try {

        if (categorie === "eten") {

            localStorage.setItem(
                OPSLAG_SAFEFOODS,
                JSON.stringify(
                    safeFoods
                )
            );

        }


        if (categorie === "prettig") {

            localStorage.setItem(
                OPSLAG_PRETTIGE_ACTIVITEITEN,
                JSON.stringify(
                    prettigeActiviteiten
                )
            );

        }

    } catch (fout) {

        console.error(
            "Fout bij opslaan persoonlijke opties:",
            fout
        );

    }

}


// ======================================
// SCHERM TONEN
// ======================================

function schermTonen(
    schermId
) {

    document
        .querySelectorAll(".scherm")
        .forEach(
            scherm => {

                scherm.classList.remove(
                    "actief"
                );

            }
        );


    const scherm =
        document.getElementById(
            schermId
        );

    if (!scherm) {

        console.error(
            "Scherm niet gevonden:",
            schermId
        );

        return;

    }


    scherm.classList.add(
        "actief"
    );

    huidigScherm =
        schermId;


    window.scrollTo(
        {
            top: 0,
            behavior: "instant"
        }
    );

}


// ======================================
// HOOFDPAGINA
// ======================================

function naarBasis() {

    schermTonen(
        "basisScherm"
    );

    basisStatusBijwerken();

}


function naarMoeilijkeDag() {

    schermTonen(
        "moeilijkScherm"
    );

    // Persoonlijke onderdelen altijd
    // gesloten openen.

    if (moeilijkEtenDetails) {

        moeilijkEtenDetails.hidden =
            true;

    }


    if (moeilijkPrettigDetails) {

        moeilijkPrettigDetails.hidden =
            true;

    }


    moeilijkeOptiesWeergeven();

    moeilijkeStatusBijwerken();

}


// ======================================
// TERUG
// ======================================

function naarHoofdscherm() {

    schermTonen(
        "hoofdScherm"
    );

}


function basisTerug() {

    naarHoofdscherm();

}


function moeilijkTerug() {

    naarHoofdscherm();

}


function activiteitTerug() {

    schermTonen(
        "basisScherm"
    );

    basisStatusBijwerken();

}


// ======================================
// BASIS STATUS
// ======================================

function basisStatusBijwerken() {

    document
        .querySelectorAll(
            ".activiteit-knop[data-activiteit]"
        )
        .forEach(
            knop => {

                const activiteit =
                    knop.dataset.activiteit;

                const sleutel =
                    activiteitSleutel(
                        "basis",
                        activiteit
                    );

                if (
                    isAfgerond(
                        sleutel
                    )
                ) {

                    knop.classList.add(
                        "afgerond"
                    );

                } else {

                    knop.classList.remove(
                        "afgerond"
                    );

                }

            }
        );

}


// ======================================
// SLEUTEL MAKEN
// ======================================

function activiteitSleutel(
    soort,
    activiteit
) {

    return `${soort}:${activiteit}`;

}


// ======================================
// CHECK OF AFGEROND
// ======================================

function isAfgerond(
    sleutel
) {

    return Boolean(
        dagStatus.afgerond[
            sleutel
        ]
    );

}


// ======================================
// ACTIVITEIT AFVINKEN
// ======================================

function activiteitAfronden(
    sleutel,
    feedback
) {

    if (
        isAfgerond(
            sleutel
        )
    ) {

        return false;

    }


    dagStatus.afgerond[
        sleutel
    ] = true;


    dagStatusOpslaan();


    if (feedback) {

        beloningTonen(
            feedback
        );

    }


    return true;

}


// ======================================
// FEEDBACK
// ======================================

function beloningTonen(
    tekst
) {

    if (!beloning) {

        return;

    }


    beloning.textContent =
        tekst;


    beloning.classList.remove(
        "toon"
    );


    // Forceer opnieuw starten van animatie.

    void beloning.offsetWidth;


    beloning.classList.add(
        "toon"
    );


    setTimeout(
        () => {

            beloning.classList.remove(
                "toon"
            );

        },
        2800
    );

}


// ======================================
// BASIS BLOKKEN
// ======================================

const basisBlokken = {

    zelfzorg: {

        titel: "Zelfzorg",

        subtitel:
            "Een beetje goed voor jezelf zorgen.",

        activiteiten: [

            {
                id: "douchen",
                tekst: "Douchen",
                icoon: "🚿"
            },

            {
                id: "tanden-poetsen",
                tekst: "Tanden poetsen",
                icoon: "🪥"
            },

            {
                id: "deodorant",
                tekst: "Deodorant",
                icoon: "🧴"
            },

            {
                id: "schone-kleding",
                tekst: "Schone kleding",
                icoon: "👕"
            }

        ]

    },


    eten: {

        titel: "Eten & drinken",

        subtitel:
            "Geef je lichaam wat het nodig heeft.",

        activiteiten: [

            {
                id: "ontbijt",
                tekst: "Ontbijt",
                icoon: "🍳"
            },

            {
                id: "lunch",
                tekst: "Lunch",
                icoon: "🥪"
            },

            {
                id: "diner",
                tekst: "Diner",
                icoon: "🍽️"
            },

            {
                id: "water",
                tekst: "Water gedronken",
                icoon: "💧",
                meervoudig: true
            },

            {
                id: "iets-gedronken",
                tekst: "Iets anders gedronken",
                icoon: "🥤",
                meervoudig: true
            }

        ]

    },


    omgeving: {

        titel: "Omgeving",

        subtitel:
            "Een beetje orde om je heen.",

        activiteiten: [

            {
                id: "afwas",
                tekst: "Afwas / vaat",
                icoon: "🍽️"
            },

            {
                id: "opruimen",
                tekst: "Even iets opruimen",
                icoon: "🧹"
            }

        ]

    },


    beweging: {

        titel: "Beweging & buiten",

        subtitel:
            "Even bewegen of naar buiten.",

        activiteiten: [

            {
                id: "buiten",
                tekst: "Even naar buiten",
                icoon: "🌳"
            },

            {
                id: "blokje-om",
                tekst: "Klein blokje om",
                icoon: "🚶"
            },

            {
                id: "bewegen",
                tekst: "Even bewegen",
                icoon: "🤸"
            }

        ]

    },


    hoofd: {

        titel: "Hoofd & ontspanning",

        subtitel:
            "Rust, plezier en ontspanning.",

        activiteiten: [

            {
                id: "rust",
                tekst: "Even rust genomen",
                icoon: "🧘"
            },

            {
                id: "muziek",
                tekst: "Muziek geluisterd",
                icoon: "🎧"
            },

            {
                id: "plezier",
                tekst:
                    "Iets gedaan waar ik plezier aan beleef",
                icoon: "❤️"
            }

        ]

    },


    borden: {

        titel: "Check mijn borden",

        subtitel:
            "Misschien staat er iets voor vandaag.",

        activiteiten: [

            {
                id: "borden-bekeken",
                tekst: "Borden bekeken",
                icoon: "📋"
            },

            {
                id: "klein-taakje",
                tekst: "Een klein taakje gedaan",
                icoon: "✓"
            }

        ]

    }

};


// ======================================
// BASIS BLOK OPENEN
// ======================================

function basisBlokOpenen(
    blok
) {

    const gegevens =
        basisBlokken[
            blok
        ];

    if (!gegevens) {

        return;

    }


    huidigeBlok =
        blok;


    activiteitTitel.textContent =
        gegevens.titel;

    activiteitSubtitel.textContent =
        gegevens.subtitel;


    activiteitInhoud.innerHTML =
        "";


    gegevens.activiteiten.forEach(
        activiteit => {

            const knop =
                document.createElement(
                    "button"
                );

            knop.type =
                "button";

            knop.className =
                "activiteit-knop";

            knop.dataset.activiteit =
                activiteit.id;

            knop.innerHTML = `
                <span>
                    ${activiteit.icoon}
                </span>

                <span>
                    ${activiteit.tekst}
                </span>

                <span class="activiteit-pijl">
                    →
                </span>
            `;


            if (
                isAfgerond(
                    activiteitSleutel(
                        "basis",
                        activiteit.id
                    )
                )
            ) {

                knop.classList.add(
                    "afgerond"
                );

            }


            knop.addEventListener(
                "click",
                () => {

                    basisActiviteitOpenen(
                        activiteit
                    );

                }
            );


            activiteitInhoud.appendChild(
                knop
            );

        }
    );


    schermTonen(
        "activiteitScherm"
    );


    activiteitStatusBijwerken(
        gegevens.activiteiten
    );

}


// ======================================
// BASIS ACTIVITEIT OPENEN
// ======================================

function basisActiviteitOpenen(
    activiteit
) {

    huidigeActiviteit =
        activiteit;


    activiteitTitel.textContent =
        activiteit.tekst;


    activiteitSubtitel.textContent =
        "Eén ding tegelijk is genoeg.";


    activiteitInhoud.innerHTML =
        "";


    const uitleg =
        document.createElement(
            "div"
        );

    uitleg.className =
        "activiteit-uitleg";


    uitleg.innerHTML = `
        <p>
            ${activiteit.icoon}
            Je hoeft hier alleen maar
            ${activiteit.tekst.toLowerCase()}
            te doen.
        </p>
    `;


    activiteitInhoud.appendChild(
        uitleg
    );


    // Extra details kunnen worden
    // toegevoegd bij activiteiten.

    const details =
        document.createElement(
            "div"
        );

    details.className =
        "activiteit-details";


    const detailsTitel =
        document.createElement(
            "h3"
        );

    detailsTitel.textContent =
        "Wil je iets extra's noteren?";


    details.appendChild(
        detailsTitel
    );


    const detailsUitleg =
        document.createElement(
            "p"
        );

    detailsUitleg.textContent =
        "Bijvoorbeeld bij douchen: haar gewassen of geschoren.";


    details.appendChild(
        detailsUitleg
    );


    const toevoegenKnop =
        document.createElement(
            "button"
        );

    toevoegenKnop.type =
        "button";

    toevoegenKnop.className =
        "secondary-button";

    toevoegenKnop.textContent =
        "＋ Iets toevoegen";


    toevoegenKnop.addEventListener(
        "click",
        () => {

            kortInvoerOpenen(
                activiteit
            );

        }
    );


    details.appendChild(
        toevoegenKnop
    );


    const toevoegingen =
        dagStatus.toevoegingen[
            activiteitSleutel(
                "basis",
                activiteit.id
            )
        ] || [];


    if (toevoegingen.length) {

        const lijst =
            document.createElement(
                "div"
            );

        lijst.className =
            "activiteit-toevoegingen";


        toevoegingen.forEach(
            tekst => {

                const regel =
                    document.createElement(
                        "div"
                    );

                regel.className =
                    "toevoeging";

                regel.textContent =
                    `✓ ${tekst}`;

                lijst.appendChild(
                    regel
                );

            }
        );


        details.appendChild(
            lijst
        );

    }


    activiteitInhoud.appendChild(
        details
    );


    if (
        isAfgerond(
            activiteitSleutel(
                "basis",
                activiteit.id
            )
        )
    ) {

        activiteitKlaarKnop.textContent =
            "✓ Klaar";

    } else {

        activiteitKlaarKnop.textContent =
            "✓ Klaar";

    }


    activiteitStatusBijwerken(
        [activiteit]
    );

}


// ======================================
// ACTIVITEIT STATUS
// ======================================

function activiteitStatusBijwerken(
    activiteiten
) {

    if (
        !activiteiten ||
        !activiteiten.length
    ) {

        return;

    }


    const activiteit =
        huidigeActiviteit ||
        activiteiten[0];


    if (!activiteit) {

        return;

    }


    const sleutel =
        activiteitSleutel(
            "basis",
            activiteit.id
        );


    if (
        isAfgerond(
            sleutel
        )
    ) {

        activiteitStatusIcoon.textContent =
            "🎉";

        activiteitStatusTitel.textContent =
            "Goed gedaan!";

        activiteitStatusTekst.textContent =
            "Dit heb je vandaag gedaan.";

        activiteitStatus.classList.add(
            "afgerond"
        );

    } else {

        activiteitStatusIcoon.textContent =
            activiteit.icoon || "🌱";

        activiteitStatusTitel.textContent =
            "Eén stap is genoeg.";

        activiteitStatusTekst.textContent =
            "Je hoeft niet meer te doen dan dit.";

        activiteitStatus.classList.remove(
            "afgerond"
        );

    }

}


// ======================================
// BASIS ACTIVITEIT KLAAR
// ======================================

function basisActiviteitKlaar() {

    if (
        !huidigeActiviteit
    ) {

        return;

    }


    const sleutel =
        activiteitSleutel(
            "basis",
            huidigeActiviteit.id
        );


    const nieuw =
        activiteitAfronden(
            sleutel,
            "Yes! Dit heb je gedaan. 💚"
        );


    if (nieuw) {

        activiteitStatusBijwerken(
            [huidigeActiviteit]
        );

        basisStatusBijwerken();

    }

}


// ======================================
// KORTE INVOER OPENEN
// ======================================

function kortInvoerOpenen(
    activiteit
) {

    huidigeActiviteit =
        activiteit;


    huidigeBewerkOptie =
        null;


    kortInvoerTitel.textContent =
        activiteit.tekst;


    kortInvoerUitleg.textContent =
        "Voeg eventueel iets kleins toe.";


    kortInvoer.value =
        "";


    kortInvoerContainer.hidden =
        false;


    setTimeout(
        () => {

            kortInvoer.focus();

        },
        50
    );

}


// ======================================
// KORTE INVOER SLUITEN
// ======================================

function kortInvoerSluiten() {

    kortInvoerContainer.hidden =
        true;

    kortInvoer.value =
        "";

    huidigeBewerkOptie =
        null;

}


// ======================================
// KORTE INVOER OPSLAAN
// ======================================

function kortInvoerOpslaan() {

    const tekst =
        kortInvoer.value.trim();


    if (!tekst) {

        kortInvoer.focus();

        return;

    }


    if (
        huidigeBeheerCategorie &&
        huidigeBewerkOptie
    ) {

        persoonlijkeOptieOpslaan();

        return;

    }


    if (
        !huidigeActiviteit
    ) {

        return;

    }


    const sleutel =
        activiteitSleutel(
            "basis",
            huidigeActiviteit.id
        );


    if (
        !Array.isArray(
            dagStatus.toevoegingen[
                sleutel
            ]
        )
    ) {

        dagStatus.toevoegingen[
            sleutel
        ] = [];

    }


    dagStatus.toevoegingen[
        sleutel
    ].push(
        tekst
    );


    dagStatusOpslaan();


    kortInvoerSluiten();


    basisActiviteitOpenen(
        huidigeActiviteit
    );


    beloningTonen(
        "Mooi. Ook dit kleine ding telt mee. 🌱"
    );

}


// ======================================
// MOEILIJKE DAG STATUS
// ======================================

function moeilijkeStatusBijwerken() {

    document
        .querySelectorAll(
            ".moeilijk-activiteit"
        )
        .forEach(
            knop => {

                const activiteit =
                    knop.dataset.activiteit;

                const sleutel =
                    activiteitSleutel(
                        "moeilijk",
                        activiteit
                    );


                if (
                    isAfgerond(
                        sleutel
                    )
                ) {

                    knop.classList.add(
                        "afgerond"
                    );

                } else {

                    knop.classList.remove(
                        "afgerond"
                    );

                }

            }
        );


    if (moeilijkIetsGegeten) {

        const afgerond =
            isAfgerond(
                "moeilijk:moeilijk-iets-gegeten"
            );

        moeilijkIetsGegeten.classList.toggle(
            "afgerond",
            afgerond
        );

    }


    if (moeilijkIetsPrettigs) {

        const afgerond =
            isAfgerond(
                "moeilijk:moeilijk-iets-prettigs"
            );

        moeilijkIetsPrettigs.classList.toggle(
            "afgerond",
            afgerond
        );

    }

}


// ======================================
// MOEILIJKE ACTIVITEIT
// ======================================

function moeilijkeActiviteitKlik(
    knop
) {

    const activiteit =
        knop.dataset.activiteit;


    const sleutel =
        activiteitSleutel(
            "moeilijk",
            activiteit
        );


    const feedback =
        moeilijkeFeedback(
            activiteit
        );


    activiteitAfronden(
        sleutel,
        feedback
    );


    moeilijkeStatusBijwerken();

}


// ======================================
// FEEDBACK MOEILIJKE DAG
// ======================================

function moeilijkeFeedback(
    activiteit
) {

    const feedback = {

        "moeilijk-iets-gedronken":
            "Goed. Iets drinken is al genoeg. 💧",

        "moeilijk-water":
            "Yes. Je hebt water gedronken. 💧",

        "moeilijk-douchen":
            "Yes. Je hebt voor jezelf gezorgd. 🚿",

        "moeilijk-wassen":
            "Goed gedaan. Een beetje zelfzorg telt. 🧼",

        "moeilijk-tanden":
            "Yes. Tanden gepoetst. 🪥",

        "moeilijk-kleding":
            "Schone kleding aan. Goed bezig. 👕",

        "moeilijk-blokje-om":
            "Lekker. Even naar buiten geweest. 🚶",

        "moeilijk-buiten":
            "Goed. Je bent even buiten geweest. 🌳",

        "moeilijk-bewegen":
            "Yes. Je hebt even bewogen. 🤸"

    };


    return (
        feedback[activiteit] ||
        "Goed gedaan. Dit telt mee. 💚"
    );

}


// ======================================
// PERSOONLIJKE OPTIES WEERGEVEN
// ======================================

function moeilijkeOptiesWeergeven() {

    if (moeilijkEtenOpties) {

        moeilijkEtenOpties.innerHTML =
            "";


        safeFoods.forEach(
            optie => {

                moeilijkEtenOpties.appendChild(
                    persoonlijkeOptieKnop(
                        optie,
                        "eten"
                    )
                );

            }
        );

    }


    if (moeilijkPrettigOpties) {

        moeilijkPrettigOpties.innerHTML =
            "";


        prettigeActiviteiten.forEach(
            optie => {

                moeilijkPrettigOpties.appendChild(
                    persoonlijkeOptieKnop(
                        optie,
                        "prettig"
                    )
                );

            }
        );

    }

}


// ======================================
// PERSOONLIJKE OPTIE KNOP
// ======================================

function persoonlijkeOptieKnop(
    optie,
    categorie
) {

    const knop =
        document.createElement(
            "button"
        );


    knop.type =
        "button";


    knop.className =
        "activiteit-knop persoonlijke-optie";


    const sleutel =
        `persoonlijk:${categorie}:${optie.id}`;


    if (
        isAfgerond(
            sleutel
        )
    ) {

        knop.classList.add(
            "afgerond"
        );

    }


    knop.innerHTML = `
        <span>
            ${optie.icoon || "•"}
        </span>

        <span>
            ${escapeHtml(
                optie.tekst
            )}
        </span>

        <span class="activiteit-pijl">
            ✓
        </span>
    `;


    knop.addEventListener(
        "click",
        () => {

            persoonlijkeOptieKlik(
                optie,
                categorie
            );

        }
    );


    return knop;

}


// ======================================
// PERSOONLIJKE OPTIE KLIKKEN
// ======================================

function persoonlijkeOptieKlik(
    optie,
    categorie
) {

    const sleutel =
        `persoonlijk:${categorie}:${optie.id}`;


    const nieuw =
        activiteitAfronden(
            sleutel,
            categorie === "eten"
                ? `Yes! ${optie.tekst} gegeten. 🍽️`
                : `Mooi. ${optie.tekst}. ❤️`
        );


    // Het hoofditem is ook afgerond.
    // Bijvoorbeeld: een Safe Food kiezen
    // betekent automatisch "Iets gegeten".

    if (categorie === "eten") {

        activiteitAfronden(
            "moeilijk:moeilijk-iets-gegeten"
        );

    }


    if (categorie === "prettig") {

        activiteitAfronden(
            "moeilijk:moeilijk-iets-prettigs"
        );

    }


    moeilijkeStatusBijwerken();


    moeilijkeOptiesWeergeven();


    if (
        !nieuw
    ) {

        return;

    }

}


// ======================================
// PERSOONLIJKE SECTIE OPENEN
// ======================================

function persoonlijkeSectieOpenen(
    details,
    trigger
) {

    if (
        !details ||
        !trigger
    ) {

        return;

    }


    const openen =
        details.hidden;


    details.hidden =
        !openen;


    trigger
        .querySelector(
            ".persoonlijke-trigger-pijl"
        )
        ?.replaceChildren(
            document.createTextNode(
                openen
                    ? "↑"
                    : "↓"
            )
        );


    if (!openen) {

        return;

    }


    const activiteit =
        trigger.dataset.activiteit;


    const sleutel =
        activiteitSleutel(
            "moeilijk",
            activiteit
        );


    if (
        !isAfgerond(
            sleutel
        )
    ) {

        const feedback =
            activiteit ===
            "moeilijk-iets-gegeten"

                ? "Goed. Je hebt iets gegeten. 🍽️"

                : "Yes. Je hebt iets leuks gedaan. ❤️";


        activiteitAfronden(
            sleutel,
            feedback
        );

    }


    moeilijkeStatusBijwerken();

}


// ======================================
// PERSOONLIJKE OPTIE TOEVOEGEN
// ======================================

function persoonlijkeOptieToevoegen(
    categorie
) {

    huidigeBeheerCategorie =
        categorie;

    huidigeBewerkOptie =
        null;


    kortInvoerTitel.textContent =
        categorie === "eten"
            ? "Safe Food toevoegen"
            : "Activiteit toevoegen";


    kortInvoerUitleg.textContent =
        categorie === "eten"
            ? "Voeg iets toe dat makkelijk voor je is om te eten."
            : "Voeg iets toe waar je op een moeilijke dag plezier aan beleeft.";


    kortInvoer.value =
        "";


    kortInvoerContainer.hidden =
        false;


    setTimeout(
        () => {

            kortInvoer.focus();

        },
        50
    );

}


// ======================================
// PERSOONLIJKE OPTIES BEHEREN
// ======================================

function persoonlijkeOptiesBeheren(
    categorie
) {

    huidigeBeheerCategorie =
        categorie;


    persoonlijkeOptiesTitel.textContent =
        categorie === "eten"
            ? "Safe Foods aanpassen"
            : "Prettige activiteiten aanpassen";


    persoonlijkeOptiesUitleg.textContent =
        categorie === "eten"
            ? "Deze opties blijven staan totdat jij ze verandert."
            : "Deze activiteiten blijven staan totdat jij ze verandert.";


    persoonlijkeOptiesLijst.innerHTML =
        "";


    const opties =
        categorie === "eten"
            ? safeFoods
            : prettigeActiviteiten;


    if (!opties.length) {

        const leeg =
            document.createElement(
                "p"
            );

        leeg.textContent =
            "Er zijn nog geen opties.";

        persoonlijkeOptiesLijst.appendChild(
            leeg
        );

    }


    opties.forEach(
        optie => {

            const regel =
                document.createElement(
                    "div"
                );

            regel.className =
                "persoonlijke-beheer-regel";


            const tekst =
                document.createElement(
                    "div"
                );

            tekst.className =
                "persoonlijke-beheer-tekst";

            tekst.innerHTML = `
                <span>
                    ${optie.icoon || "•"}
                </span>

                <strong>
                    ${escapeHtml(
                        optie.tekst
                    )}
                </strong>
            `;


            const acties =
                document.createElement(
                    "div"
                );

            acties.className =
                "persoonlijke-beheer-acties";


            const bewerken =
                document.createElement(
                    "button"
                );

            bewerken.type =
                "button";

            bewerken.className =
                "secondary-button";

            bewerken.textContent =
                "✎";


            bewerken.addEventListener(
                "click",
                () => {

                    persoonlijkeOptieBewerken(
                        categorie,
                        optie
                    );

                }
            );


            const verwijderen =
                document.createElement(
                    "button"
                );

            verwijderen.type =
                "button";

            verwijderen.className =
                "danger-button";

            verwijderen.textContent =
                "🗑️";


            verwijderen.addEventListener(
                "click",
                () => {

                    persoonlijkeOptieVerwijderen(
                        categorie,
                        optie
                    );

                }
            );


            acties.appendChild(
                bewerken
            );

            acties.appendChild(
                verwijderen
            );


            regel.appendChild(
                tekst
            );

            regel.appendChild(
                acties
            );


            persoonlijkeOptiesLijst.appendChild(
                regel
            );

        }
    );


    persoonlijkeOptiesContainer.hidden =
        false;

}


// ======================================
// PERSOONLIJKE OPTIE BEWERKEN
// ======================================

function persoonlijkeOptieBewerken(
    categorie,
    optie
) {

    huidigeBeheerCategorie =
        categorie;

    huidigeBewerkOptie =
        optie;


    kortInvoerTitel.textContent =
        categorie === "eten"
            ? "Safe Food aanpassen"
            : "Activiteit aanpassen";


    kortInvoerUitleg.textContent =
        "Pas de naam aan.";


    kortInvoer.value =
        optie.tekst;


    persoonlijkeOptiesContainer.hidden =
        true;


    kortInvoerContainer.hidden =
        false;


    setTimeout(
        () => {

            kortInvoer.focus();

            kortInvoer.select();

        },
        50
    );

}


// ======================================
// PERSOONLIJKE OPTIE OPSLAAN
// ======================================

function persoonlijkeOptieOpslaan() {

    const tekst =
        kortInvoer.value.trim();


    if (!tekst) {

        kortInvoer.focus();

        return;

    }


    const categorie =
        huidigeBeheerCategorie;


    if (
        !categorie
    ) {

        return;

    }


    if (
        huidigeBewerkOptie
    ) {

        huidigeBewerkOptie.tekst =
            tekst;

    } else {

        const nieuweOptie = {

            id:
                uniekeId(),

            tekst:
                tekst,

            icoon:
                categorie === "eten"
                    ? "🍽️"
                    : "❤️"

        };


        if (
            categorie === "eten"
        ) {

            safeFoods.push(
                nieuweOptie
            );

        } else {

            prettigeActiviteiten.push(
                nieuweOptie
            );

        }

    }


    persoonlijkeOptiesOpslaan(
        categorie
    );


    huidigeBewerkOptie =
        null;


    huidigeBeheerCategorie =
        null;


    kortInvoerSluiten();


    moeilijkeOptiesWeergeven();


    persoonlijkeOptiesBeheren(
        categorie
    );


    beloningTonen(
        "Opgeslagen. Je kunt dit later altijd veranderen. 🌱"
    );

}


// ======================================
// PERSOONLIJKE OPTIE VERWIJDEREN
// ======================================

function persoonlijkeOptieVerwijderen(
    categorie,
    optie
) {

    const bevestigen =
        confirm(
            `Wil je "${optie.tekst}" verwijderen?`
        );


    if (!bevestigen) {

        return;

    }


    if (
        categorie === "eten"
    ) {

        safeFoods =
            safeFoods.filter(
                item =>
                    item.id !== optie.id
            );


        persoonlijkeOptiesOpslaan(
            "eten"
        );

    } else {

        prettigeActiviteiten =
            prettigeActiviteiten.filter(
                item =>
                    item.id !== optie.id
            );


        persoonlijkeOptiesOpslaan(
            "prettig"
        );

    }


    // Dagstatus van deze optie verwijderen.

    delete dagStatus.afgerond[
        `persoonlijk:${categorie}:${optie.id}`
    ];


    dagStatusOpslaan();


    moeilijkeOptiesWeergeven();


    persoonlijkeOptiesBeheren(
        categorie
    );


    beloningTonen(
        "Verwijderd. Je kunt altijd iets nieuws toevoegen. 🌱"
    );

}


// ======================================
// NIEUWE UNIEKE ID
// ======================================

function uniekeId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


// ======================================
// HTML VEILIG MAKEN
// ======================================

function escapeHtml(
    tekst
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        tekst;

    return div.innerHTML;

}


// ======================================
// EVENT LISTENERS
// ======================================


// Hoofdpagina

basisKnop?.addEventListener(
    "click",
    naarBasis
);


moeilijkKnop?.addEventListener(
    "click",
    naarMoeilijkeDag
);


// Terug

basisTerugKnop?.addEventListener(
    "click",
    basisTerug
);


moeilijkTerugKnop?.addEventListener(
    "click",
    moeilijkTerug
);


activiteitTerugKnop?.addEventListener(
    "click",
    activiteitTerug
);


// Activiteit klaar

activiteitKlaarKnop?.addEventListener(
    "click",
    basisActiviteitKlaar
);


// Korte invoer

kortInvoerSluitenKnop?.addEventListener(
    "click",
    kortInvoerSluiten
);


invoerAnnuleren?.addEventListener(
    "click",
    () => {

        kortInvoerSluiten();

    }
);


invoerOpslaan?.addEventListener(
    "click",
    kortInvoerOpslaan
);


// Enter in invoerveld

kortInvoer?.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            kortInvoerOpslaan();

        }


        if (
            event.key === "Escape"
        ) {

            event.preventDefault();

            kortInvoerSluiten();

        }

    }
);


// Persoonlijke opties sluiten

persoonlijkeOptiesSluiten?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesContainer.hidden =
            true;

    }
);


// Nieuwe persoonlijke optie

persoonlijkeOptieNieuw?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesContainer.hidden =
            true;


        persoonlijkeOptieToevoegen(
            huidigeBeheerCategorie
        );

    }
);


// Safe Food toevoegen

etenOptieToevoegen?.addEventListener(
    "click",
    () => {

        persoonlijkeOptieToevoegen(
            "eten"
        );

    }
);


// Safe Foods beheren

etenOptiesBeheren?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesBeheren(
            "eten"
        );

    }
);


// Prettige activiteit toevoegen

prettigOptieToevoegen?.addEventListener(
    "click",
    () => {

        persoonlijkeOptieToevoegen(
            "prettig"
        );

    }
);


// Prettige activiteiten beheren

prettigOptiesBeheren?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesBeheren(
            "prettig"
        );

    }
);


// Iets gegeten

moeilijkIetsGegeten?.addEventListener(
    "click",
    () => {

        persoonlijkeSectieOpenen(
            moeilijkEtenDetails,
            moeilijkIetsGegeten
        );

    }
);


// Iets leuks gedaan

moeilijkIetsPrettigs?.addEventListener(
    "click",
    () => {

        persoonlijkeSectieOpenen(
            moeilijkPrettigDetails,
            moeilijkIetsPrettigs
        );

    }
);


// Alle standaard moeilijke-dag activiteiten

document
    .querySelectorAll(
        ".moeilijk-activiteit"
    )
    .forEach(
        knop => {

            knop.addEventListener(
                "click",
                () => {

                    moeilijkeActiviteitKlik(
                        knop
                    );

                }
            );

        }
    );


// BASIS blokken

document
    .querySelectorAll(
        ".blok[data-blok]"
    )
    .forEach(
        knop => {

            knop.addEventListener(
                "click",
                () => {

                    basisBlokOpenen(
                        knop.dataset.blok
                    );

                }
            );

        }
    );


// ======================================
// MODALS SLUITEN BIJ OVERLAY-KLIK
// ======================================

kortInvoerContainer?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            kortInvoerContainer
        ) {

            kortInvoerSluiten();

        }

    }
);


persoonlijkeOptiesContainer?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            persoonlijkeOptiesContainer
        ) {

            persoonlijkeOptiesContainer.hidden =
                true;

        }

    }
);


// ======================================
// ESCAPE OM MODAL TE SLUITEN
// ======================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        if (
            !kortInvoerContainer.hidden
        ) {

            kortInvoerSluiten();

            return;

        }


        if (
            !persoonlijkeOptiesContainer.hidden
        ) {

            persoonlijkeOptiesContainer.hidden =
                true;

        }

    }
);


// ======================================
// SERVICE WORKER
// ======================================

function serviceWorkerRegistreren() {

    if (
        !("serviceWorker" in navigator)
    ) {

        return;

    }


    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register(
                    "sw.js"
                )
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

                        console.error(
                            "Anker service worker fout:",
                            fout
                        );

                    }
                );

        }
    );

}
