/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */


/* =========================================================
   OPSLAG
   Alleen de huidige dag wordt bewaard.
   ========================================================= */

const OPSLAG_DAGSTATUS = "ankerDagstatus";

let dagStatus = {
    datum: "",
    afgerond: {},
    antwoorden: {}
};

let huidigeActiviteit = null;


/* =========================================================
   ACTIVITEITEN
   ========================================================= */

const BASIS_ACTIVITEITEN = {

    zelfzorg: {
        douchen: {
            titel: "Douchen",
            icoon: "🚿",
            invoer: true,
            placeholder: "Bijvoorbeeld: haar gewassen"
        },

        "tanden-poetsen": {
            titel: "Tanden poetsen",
            icoon: "🪥",
            invoer: true,
            placeholder: "Bijvoorbeeld: geflost"
        },

        deodorant: {
            titel: "Deodorant",
            icoon: "🧴",
            invoer: true,
            placeholder: "Bijvoorbeeld: ook parfum gebruikt"
        },

        "schone-kleding": {
            titel: "Schone kleding",
            icoon: "👕",
            invoer: true,
            placeholder: "Bijvoorbeeld: werkkleding aangetrokken"
        }
    },


    eten: {
        ontbijt: {
            titel: "Ontbijt",
            icoon: "🌅",
            invoer: true,
            placeholder: "Bijvoorbeeld: boterhammen met kaas"
        },

        lunch: {
            titel: "Lunch",
            icoon: "🥪",
            invoer: true,
            placeholder: "Bijvoorbeeld: broodje gezond"
        },

        diner: {
            titel: "Diner",
            icoon: "🍽️",
            invoer: true,
            placeholder: "Bijvoorbeeld: pasta"
        },

        water: {
            titel: "Water gedronken",
            icoon: "💧",
            invoer: true,
            placeholder: "Bijvoorbeeld: 500 ml"
        },

        "anders-drinken": {
            titel: "Iets anders gedronken",
            icoon: "🥤",
            invoer: true,
            placeholder: "Bijvoorbeeld: koffie, 2 koppen"
        }
    },


    omgeving: {
        afwas: {
            titel: "Afwas / vaat",
            icoon: "🍽️",
            invoer: false
        },

        opruimen: {
            titel: "Even iets opruimen",
            icoon: "🧹",
            invoer: true,
            placeholder: "Bijvoorbeeld: keuken opgeruimd"
        }
    },


    beweging: {
        "naar-buiten": {
            titel: "Even naar buiten",
            icoon: "🌳",
            invoer: true,
            placeholder: "Bijvoorbeeld: 5 km gelopen"
        },

        "blokje-om": {
            titel: "Klein blokje om",
            icoon: "🚶",
            invoer: true,
            placeholder: "Bijvoorbeeld: 20 minuten gewandeld"
        },

        bewegen: {
            titel: "Even bewegen",
            icoon: "💪",
            invoer: true,
            placeholder: "Bijvoorbeeld: fitness oefeningen gedaan"
        }
    },


    hoofd: {
        rust: {
            titel: "Even rust genomen",
            icoon: "😌",
            invoer: false
        },

        muziek: {
            titel: "Muziek geluisterd",
            icoon: "🎵",
            invoer: true,
            placeholder: "Bijvoorbeeld: mijn favoriete playlist"
        },

        plezier: {
            titel: "Iets gedaan waar ik plezier aan beleef",
            icoon: "✨",
            invoer: true,
            placeholder: "Bijvoorbeeld: gegamed"
        }
    },


    borden: {
        "borden-bekeken": {
            titel: "Borden bekeken",
            icoon: "👀",
            invoer: false
        },

        "klein-taakje": {
            titel: "Een klein taakje gedaan",
            icoon: "🧩",
            invoer: true,
            placeholder: "Bijvoorbeeld: afspraak gemaakt met gemeente"
        }
    }
};


/* =========================================================
   MOEILIJKE DAG
   Deze blijft zoals hij nu is:
   gewoon klikken = afvinken.
   ========================================================= */

const MOEILIJKE_ACTIVITEITEN = {

    "moeilijk-drinken": {
        "iets-gedronken": {
            titel: "Iets gedronken"
        },

        "water-gedronken": {
            titel: "Water gedronken"
        }
    },

    "moeilijk-eten": {
        "iets-gegeten": {
            titel: "Iets gegeten"
        }
    },

    "moeilijk-zelfzorg": {
        gedoucht: {
            titel: "Gedoucht"
        },

        gewassen: {
            titel: "Gewassen"
        },

        "tanden-gepoetst": {
            titel: "Tanden gepoetst"
        },

        "schone-kleding-moeilijk": {
            titel: "Schone kleding aangetrokken"
        }
    },

    "moeilijk-beweging": {
        "klein-blokje-moeilijk": {
            titel: "Klein blokje om"
        },

        "buiten-geweest": {
            titel: "Even buiten geweest"
        },

        bewogen: {
            titel: "Even bewogen"
        }
    },

    "moeilijk-prettig": {
        "muziek-moeilijk": {
            titel: "Muziek geluisterd"
        },

        "iets-leuks": {
            titel: "Iets leuks gedaan"
        }
    }
};


/* =========================================================
   POSITIEVE FEEDBACK
   ========================================================= */

const BELONINGEN = [
    "🎉 YES! Goed gedaan!",
    "💪 KOP OP! Weer eentje geregeld!",
    "🌱 YES! Eén stap vooruit!",
    "✨ Kijk jou! Dit heb je gewoon gedaan!",
    "🙌 Lekker bezig!",
    "⚓ Goed bezig. Weer een klein stukje verder.",
    "💚 Mooi. Dit telt.",
    "👏 Goed gedaan!",
    "🌟 Kijk eens wat je alweer hebt gedaan!"
];


/* =========================================================
   ELEMENTEN
   ========================================================= */

let hoofdScherm;
let basisScherm;
let moeilijkScherm;
let activiteitScherm;

let activiteitTitel;
let activiteitSubtitel;
let activiteitStatus;
let activiteitStatusIcoon;
let activiteitStatusTitel;
let activiteitStatusTekst;
let activiteitInhoud;
let activiteitKlaarKnop;

let kortInvoerContainer;
let kortInvoerTitel;
let kortInvoerUitleg;
let kortInvoer;
let kortInvoerSluiten;
let invoerAnnuleren;
let invoerOpslaan;

let beloning;
let beloningTekst;


/* =========================================================
   START
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    elementenOphalen();

    dagStatusLaden();

    activiteitenInstellen();

    moeilijkeDagInstellen();

    navigatieInstellen();

    invoerInstellen();

    basisKnoppenBijwerken();

    moeilijkeKnoppenBijwerken();

    dagControle();

    serviceWorkerRegistreren();
});


/* =========================================================
   ELEMENTEN OPHALEN
   ========================================================= */

function elementenOphalen() {

    hoofdScherm =
        document.getElementById("hoofdScherm");

    basisScherm =
        document.getElementById("basisScherm");

    moeilijkScherm =
        document.getElementById("moeilijkScherm");

    activiteitScherm =
        document.getElementById("activiteitScherm");


    activiteitTitel =
        document.getElementById("activiteitTitel");

    activiteitSubtitel =
        document.getElementById("activiteitSubtitel");

    activiteitStatus =
        document.getElementById("activiteitStatus");

    activiteitStatusIcoon =
        document.getElementById("activiteitStatusIcoon");

    activiteitStatusTitel =
        document.getElementById("activiteitStatusTitel");

    activiteitStatusTekst =
        document.getElementById("activiteitStatusTekst");

    activiteitInhoud =
        document.getElementById("activiteitInhoud");

    activiteitKlaarKnop =
        document.getElementById("activiteitKlaarKnop");


    kortInvoerContainer =
        document.getElementById("kortInvoerContainer");

    kortInvoerTitel =
        document.getElementById("kortInvoerTitel");

    kortInvoerUitleg =
        document.getElementById("kortInvoerUitleg");

    kortInvoer =
        document.getElementById("kortInvoer");

    kortInvoerSluiten =
        document.getElementById("kortInvoerSluiten");

    invoerAnnuleren =
        document.getElementById("invoerAnnuleren");

    invoerOpslaan =
        document.getElementById("invoerOpslaan");


    beloning =
        document.getElementById("beloning");

    beloningTekst =
        document.getElementById("beloningTekst");
}


/* =========================================================
   DAGSTATUS LADEN
   ========================================================= */

function dagStatusLaden() {

    const opgeslagen =
        localStorage.getItem(OPSLAG_DAGSTATUS);

    if (!opgeslagen) {

        nieuweDagStarten();

        return;
    }

    try {

        const data =
            JSON.parse(opgeslagen);

        if (
            !data ||
            data.datum !== vandaagAlsTekst()
        ) {

            nieuweDagStarten();

            return;
        }

        dagStatus = {
            datum: data.datum,
            afgerond: data.afgerond || {},
            antwoorden: data.antwoorden || {}
        };

    } catch (fout) {

        nieuweDagStarten();
    }
}


/* =========================================================
   NIEUWE DAG
   ========================================================= */

function nieuweDagStarten() {

    dagStatus = {
        datum: vandaagAlsTekst(),
        afgerond: {},
        antwoorden: {}
    };

    dagStatusOpslaan();
}


/* =========================================================
   OPSLAAN
   ========================================================= */

function dagStatusOpslaan() {

    localStorage.setItem(
        OPSLAG_DAGSTATUS,
        JSON.stringify(dagStatus)
    );
}


/* =========================================================
   DATUM
   ========================================================= */

function vandaagAlsTekst() {

    const datum = new Date();

    const jaar =
        datum.getFullYear();

    const maand =
        String(
            datum.getMonth() + 1
        ).padStart(2, "0");

    const dag =
        String(
            datum.getDate()
        ).padStart(2, "0");

    return `${jaar}-${maand}-${dag}`;
}


/* =========================================================
   DAG CONTROLEREN
   ========================================================= */

function dagControle() {

    const vandaag =
        vandaagAlsTekst();

    if (dagStatus.datum !== vandaag) {

        nieuweDagStarten();

        basisKnoppenBijwerken();

        moeilijkeKnoppenBijwerken();
    }
}


/* =========================================================
   BASIS ACTIVITEITEN KOPPELEN
   ========================================================= */

function activiteitenInstellen() {

    document
        .querySelectorAll(
            "#basisCategorieen .activiteit-knop"
        )
        .forEach(knop => {

            knop.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const blok =
                        knop.dataset.blok;

                    const activiteit =
                        knop.dataset.activiteit;

                    const gegevens =
                        BASIS_ACTIVITEITEN[
                            blok
                        ]?.[
                            activiteit
                        ];

                    if (!gegevens) {

                        console.warn(
                            "Activiteit niet gevonden:",
                            blok,
                            activiteit
                        );

                        return;
                    }

                    activiteitOpenen(
                        blok,
                        activiteit,
                        gegevens
                    );
                }
            );
        });
}


/* =========================================================
   ACTIVITEIT OPENEN
   ========================================================= */

function activiteitOpenen(
    blok,
    activiteit,
    gegevens
) {

    huidigeActiviteit = {
        blok: blok,
        activiteit: activiteit,
        gegevens: gegevens,
        sleutel: `${blok}::${activiteit}`
    };


    activiteitTitel.textContent =
        gegevens.titel;


    const blokNaam =
        document.querySelector(
            `.basis-blok[data-blok="${blok}"] h3`
        );

    activiteitSubtitel.textContent =
        blokNaam
            ? blokNaam.textContent
            : "BASIS";


    activiteitStatusIcoon.textContent =
        gegevens.icoon;


    activiteitInhoud.innerHTML = "";


    /*
     * Activiteiten waarbij je zelf iets
     * kunt toevoegen.
     */

    if (gegevens.invoer) {

        const antwoordBlok =
            document.createElement("div");

        antwoordBlok.className =
            "activiteit-antwoord-blok";


        const bestaandAntwoord =
            dagStatus.antwoorden[
                huidigeActiviteit.sleutel
            ];


        const label =
            document.createElement("div");

        label.className =
            "activiteit-antwoord-label";

        label.textContent =
            bestaandAntwoord
                ? "Mijn toevoeging"
                : "Zelf iets toevoegen";

        antwoordBlok.appendChild(label);


        if (bestaandAntwoord) {

            const antwoord =
                document.createElement("div");

            antwoord.className =
                "activiteit-antwoord";

            antwoord.textContent =
                bestaandAntwoord;

            antwoordBlok.appendChild(
                antwoord
            );
        }


        const invoerKnop =
            document.createElement("button");

        invoerKnop.type = "button";

        invoerKnop.className =
            "activiteit-invoer-knop";

        invoerKnop.textContent =
            bestaandAntwoord
                ? "✏️ Aanpassen"
                : "＋ Iets toevoegen";


        invoerKnop.addEventListener(
            "click",
            () => {

                invoerOpenen(
                    gegevens
                );
            }
        );


        antwoordBlok.appendChild(
            invoerKnop
        );


        activiteitInhoud.appendChild(
            antwoordBlok
        );
    }


    activiteitStatusBijwerken();

    schermTonen(
        activiteitScherm
    );
}


/* =========================================================
   ACTIVITEIT STATUS
   ========================================================= */

function activiteitStatusBijwerken() {

    if (!huidigeActiviteit) return;

    const sleutel =
        huidigeActiviteit.sleutel;

    const afgerond =
        !!dagStatus.afgerond[sleutel];


    if (afgerond) {

        activiteitStatus.classList.add(
            "afgerond"
        );

        activiteitStatusIcoon.textContent =
            "✓";

        activiteitStatusTitel.textContent =
            "Gedaan!";

        activiteitStatusTekst.textContent =
            "Goed bezig. Dit heb je vandaag gedaan.";

        activiteitKlaarKnop.textContent =
            "✓ Gedaan";

        activiteitKlaarKnop.classList.add(
            "afgerond"
        );

    } else {

        activiteitStatus.classList.remove(
            "afgerond"
        );

        activiteitStatusIcoon.textContent =
            huidigeActiviteit.gegevens.icoon;

        activiteitStatusTitel.textContent =
            "Nog niet afgevinkt";

        activiteitStatusTekst.textContent =
            "Als je klaar bent, vink je hem hieronder af.";

        activiteitKlaarKnop.textContent =
            "✓ Klaar";

        activiteitKlaarKnop.classList.remove(
            "afgerond"
        );
    }
}


/* =========================================================
   KLAAR-KNOP
   ========================================================= */

if (typeof document !== "undefined") {

    document.addEventListener(
        "click",
        event => {

            if (
                event.target?.id !==
                "activiteitKlaarKnop"
            ) {
                return;
            }

            if (!huidigeActiviteit) {
                return;
            }


            taakAfvinken(
                huidigeActiviteit.sleutel
            );


            activiteitStatusBijwerken();

            basisKnoppenBijwerken();

            beloningTonen();
        }
    );
}


/* =========================================================
   TAAK AFVINKEN
   ========================================================= */

function taakAfvinken(sleutel) {

    dagStatus.afgerond[sleutel] =
        !dagStatus.afgerond[sleutel];

    dagStatusOpslaan();
}


/* =========================================================
   BASIS KNOPPEN BIJWERKEN
   ========================================================= */

function basisKnoppenBijwerken() {

    document
        .querySelectorAll(
            "#basisCategorieen .activiteit-knop"
        )
        .forEach(knop => {

            const sleutel =
                `${knop.dataset.blok}::${knop.dataset.activiteit}`;

            const afgerond =
                !!dagStatus.afgerond[sleutel];


            knop.classList.toggle(
                "afgerond",
                afgerond
            );


            let antwoord =
                knop.querySelector(
                    ".checklist-antwoord"
                );


            const opgeslagenAntwoord =
                dagStatus.antwoorden[
                    sleutel
                ];


            if (opgeslagenAntwoord) {

                if (!antwoord) {

                    antwoord =
                        document.createElement(
                            "span"
                        );

                    antwoord.className =
                        "checklist-antwoord";

                    knop.appendChild(
                        antwoord
                    );
                }

                antwoord.textContent =
                    opgeslagenAntwoord;

            } else if (antwoord) {

                antwoord.remove();
            }
        });
}


/* =========================================================
   MOEILIJKE DAG KOPPELEN
   ========================================================= */

function moeilijkeDagInstellen() {

    document
        .querySelectorAll(
            ".moeilijk-activiteit"
        )
        .forEach(knop => {

            knop.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    const blok =
                        knop.dataset.blok;

                    const activiteit =
                        knop.dataset.activiteit;

                    const sleutel =
                        `${blok}::${activiteit}`;


                    taakAfvinken(
                        sleutel
                    );


                    knop.classList.toggle(
                        "afgerond",
                        !!dagStatus.afgerond[sleutel]
                    );


                    beloningTonen();
                }
            );
        });
}


/* =========================================================
   MOEILIJKE DAG BIJWERKEN
   ========================================================= */

function moeilijkeKnoppenBijwerken() {

    document
        .querySelectorAll(
            ".moeilijk-activiteit"
        )
        .forEach(knop => {

            const sleutel =
                `${knop.dataset.blok}::${knop.dataset.activiteit}`;

            knop.classList.toggle(
                "afgerond",
                !!dagStatus.afgerond[sleutel]
            );
        });
}


/* =========================================================
   NAVIGATIE
   ========================================================= */

function navigatieInstellen() {

    /*
     * Hoofdscherm → BASIS
     */

    const basisKnop =
        document.getElementById(
            "basisKnop"
        );

    if (basisKnop) {

        basisKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    basisScherm
                );
            }
        );
    }


    /*
     * Hoofdscherm → MOEILIJKE DAG
     */

    const moeilijkKnop =
        document.getElementById(
            "moeilijkKnop"
        );

    if (moeilijkKnop) {

        moeilijkKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    moeilijkScherm
                );
            }
        );
    }


    /*
     * BASIS → terug naar hoofdscherm
     */

    const basisTerugKnop =
        document.getElementById(
            "basisTerugKnop"
        );

    if (basisTerugKnop) {

        basisTerugKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    hoofdScherm
                );
            }
        );
    }


    /*
     * MOEILIJKE DAG → terug naar hoofdscherm
     */

    const moeilijkTerugKnop =
        document.getElementById(
            "moeilijkTerugKnop"
        );

    if (moeilijkTerugKnop) {

        moeilijkTerugKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    hoofdScherm
                );
            }
        );
    }


    /*
     * Activiteit → terug naar BASIS
     */

    const activiteitTerugKnop =
        document.getElementById(
            "activiteitTerugKnop"
        );

    if (activiteitTerugKnop) {

        activiteitTerugKnop.addEventListener(
            "click",
            () => {

                huidigeActiviteit = null;

                schermTonen(
                    basisScherm
                );
            }
        );
    }


    /*
     * Sluiten van invoervenster
     */

    if (kortInvoerSluiten) {

        kortInvoerSluiten.addEventListener(
            "click",
            invoerSluiten
        );
    }
}


/* =========================================================
   SCHERM TONEN
   ========================================================= */

function schermTonen(scherm) {

    document
        .querySelectorAll(".scherm")
        .forEach(item => {

            item.classList.remove(
                "actief"
            );
        });


    if (scherm) {

        scherm.classList.add(
            "actief"
        );
    }


    invoerSluiten();
}


/* =========================================================
   INVOER INSTELLEN
   ========================================================= */

function invoerInstellen() {

    if (invoerAnnuleren) {

        invoerAnnuleren.addEventListener(
            "click",
            invoerSluiten
        );
    }


    if (invoerOpslaan) {

        invoerOpslaan.addEventListener(
            "click",
            invoerOpslaanHandler
        );
    }


    if (kortInvoer) {

        kortInvoer.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    invoerOpslaanHandler();
                }


                if (
                    event.key === "Escape"
                ) {

                    invoerSluiten();
                }
            }
        );
    }
}


/* =========================================================
   INVOER OPENEN
   ========================================================= */

function invoerOpenen(gegevens) {

    if (!huidigeActiviteit) {
        return;
    }


    kortInvoerTitel.textContent =
        gegevens.titel;


    kortInvoerUitleg.textContent =
        "Een paar woorden is genoeg.";


    kortInvoer.placeholder =
        gegevens.placeholder ||
        "Bijvoorbeeld: iets gedaan";


    kortInvoer.value =
        dagStatus.antwoorden[
            huidigeActiviteit.sleutel
        ] || "";


    /*
     * hidden moet echt worden verwijderd.
     */

    kortInvoerContainer.hidden =
        false;


    kortInvoerContainer.classList.add(
        "actief"
    );


    setTimeout(
        () => {

            kortInvoer.focus();

        },
        50
    );
}


/* =========================================================
   INVOER OPSLAAN
   ========================================================= */

function invoerOpslaanHandler() {

    if (!huidigeActiviteit) {
        return;
    }


    const waarde =
        kortInvoer.value.trim();


    if (!waarde) {

        invoerSluiten();

        return;
    }


    const sleutel =
        huidigeActiviteit.sleutel;


    dagStatus.antwoorden[sleutel] =
        waarde;


    /*
     * Zodra je iets toevoegt,
     * wordt de activiteit ook afgevinkt.
     */

    dagStatus.afgerond[sleutel] =
        true;


    dagStatusOpslaan();


    invoerSluiten();


    activiteitOpenen(
        huidigeActiviteit.blok,
        huidigeActiviteit.activiteit,
        huidigeActiviteit.gegevens
    );


    beloningTonen();


    basisKnoppenBijwerken();
}


/* =========================================================
   INVOER SLUITEN
   ========================================================= */

function invoerSluiten() {

    if (!kortInvoerContainer) {
        return;
    }


    kortInvoerContainer.classList.remove(
        "actief"
    );


    kortInvoerContainer.hidden =
        true;
}


/* =========================================================
   POSITIEVE FEEDBACK
   ========================================================= */

function beloningTonen() {

    if (!beloning || !beloningTekst) {
        return;
    }


    const willekeurig =
        Math.floor(
            Math.random() *
            BELONINGEN.length
        );


    beloningTekst.textContent =
        BELONINGEN[willekeurig];


    beloning.hidden =
        false;


    beloning.classList.remove(
        "beloningPop"
    );


    void beloning.offsetWidth;


    beloning.classList.add(
        "beloningPop"
    );


    setTimeout(
        () => {

            beloning.hidden =
                true;

            beloning.classList.remove(
                "beloningPop"
            );

        },
        2500
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
                    .catch(
                        fout => {

                            console.warn(
                                "Service worker kon niet worden geregistreerd:",
                                fout
                            );

                        }
                    );
            }
        );
    }
}
