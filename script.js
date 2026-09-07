/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */


/* =========================================================
   OPSLAG
========================================================= */

const OPSLAG_DAGSTATUS = "ankerDagstatus";

let dagStatus = {
    datum: "",
    afgerond: {},
    antwoorden: {}
};


/* =========================================================
   BASIS ACTIVITEITEN
========================================================= */

const BASIS_ACTIVITEITEN = {

    zelfzorg: [
        {
            id: "douchen",
            titel: "Douchen",
            icoon: "🚿",
            invoer: false,
            extra: [
                "Haar gewassen",
                "Geschoren",
                "Haar gekamd"
            ]
        },
        {
            id: "tanden-poetsen",
            titel: "Tanden poetsen",
            icoon: "🪥",
            invoer: false
        },
        {
            id: "deodorant",
            titel: "Deodorant",
            icoon: "🧴",
            invoer: false
        },
        {
            id: "schone-kleding",
            titel: "Schone kleding",
            icoon: "👕",
            invoer: false
        }
    ],

    eten: [
        {
            id: "ontbijt",
            titel: "Ontbijt",
            icoon: "🌅",
            invoer: true,
            placeholder: "Bijvoorbeeld: boterhammen met kaas"
        },
        {
            id: "lunch",
            titel: "Lunch",
            icoon: "🥪",
            invoer: true,
            placeholder: "Bijvoorbeeld: broodje kip"
        },
        {
            id: "diner",
            titel: "Diner",
            icoon: "🍽️",
            invoer: true,
            placeholder: "Bijvoorbeeld: pasta"
        },
        {
            id: "water",
            titel: "Water gedronken",
            icoon: "💧",
            invoer: true,
            placeholder: "Bijvoorbeeld: 500 ml"
        },
        {
            id: "anders-drinken",
            titel: "Iets anders gedronken",
            icoon: "🥤",
            invoer: true,
            placeholder: "Bijvoorbeeld: koffie, 2 koppen"
        }
    ],

    omgeving: [
        {
            id: "afwas",
            titel: "Afwas / vaat",
            icoon: "🍽️",
            invoer: false
        },
        {
            id: "opruimen",
            titel: "Even iets opruimen",
            icoon: "🧹",
            invoer: true,
            placeholder: "Wat heb je opgeruimd?"
        }
    ],

    beweging: [
        {
            id: "naar-buiten",
            titel: "Even naar buiten",
            icoon: "🌳",
            invoer: true,
            placeholder: "Bijvoorbeeld: 5 km gelopen"
        },
        {
            id: "blokje-om",
            titel: "Klein blokje om",
            icoon: "🚶",
            invoer: true,
            placeholder: "Bijvoorbeeld: 20 minuten gewandeld"
        },
        {
            id: "bewegen",
            titel: "Even bewegen",
            icoon: "💪",
            invoer: true,
            placeholder: "Bijvoorbeeld: fitness oefeningen gedaan"
        }
    ],

    hoofd: [
        {
            id: "rust",
            titel: "Even rust genomen",
            icoon: "😌",
            invoer: false
        },
        {
            id: "muziek",
            titel: "Muziek geluisterd",
            icoon: "🎵",
            invoer: true,
            placeholder: "Bijvoorbeeld: Metallica"
        },
        {
            id: "plezier",
            titel: "Iets gedaan waar ik plezier aan beleef",
            icoon: "✨",
            invoer: true,
            placeholder: "Wat heb je gedaan?"
        }
    ],

    borden: [
        {
            id: "borden-bekeken",
            titel: "Borden bekeken",
            icoon: "👀",
            invoer: false
        },
        {
            id: "klein-taakje",
            titel: "Een klein taakje gedaan",
            icoon: "🧩",
            invoer: true,
            placeholder: "Wat heb je gedaan?"
        }
    ]
};


/* =========================================================
   MOEILIJKE DAG
   Deze blijft bewust eenvoudig.
========================================================= */

const MOEILIJKE_DAG = {

    "moeilijk-drinken": [
        {
            id: "iets-gedronken",
            titel: "Iets gedronken",
            icoon: "🥤"
        },
        {
            id: "water-gedronken",
            titel: "Water gedronken",
            icoon: "💧"
        }
    ],

    "moeilijk-eten": [
        {
            id: "iets-gegeten",
            titel: "Iets gegeten",
            icoon: "🍽️"
        }
    ],

    "moeilijk-zelfzorg": [
        {
            id: "gedoucht",
            titel: "Gedoucht",
            icoon: "🚿"
        },
        {
            id: "gewassen",
            titel: "Gewassen",
            icoon: "🧼"
        },
        {
            id: "tanden-gepoetst",
            titel: "Tanden gepoetst",
            icoon: "🪥"
        },
        {
            id: "schone-kleding-moeilijk",
            titel: "Schone kleding aangetrokken",
            icoon: "👕"
        }
    ],

    "moeilijk-beweging": [
        {
            id: "klein-blokje-moeilijk",
            titel: "Klein blokje om",
            icoon: "🚶"
        },
        {
            id: "buiten-geweest",
            titel: "Even buiten geweest",
            icoon: "🌳"
        },
        {
            id: "bewogen",
            titel: "Even bewogen",
            icoon: "💪"
        }
    ],

    "moeilijk-prettig": [
        {
            id: "muziek-moeilijk",
            titel: "Muziek geluisterd",
            icoon: "🎵"
        },
        {
            id: "iets-leuks",
            titel: "Iets leuks gedaan",
            icoon: "✨"
        }
    ]
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
   HUIDIGE ACTIVITEIT
========================================================= */

let huidigeActiviteit = null;
let huidigeBlok = null;
let huidigeModus = null;


/* =========================================================
   DOM ELEMENTEN
========================================================= */

const hoofdScherm = document.getElementById("hoofdScherm");
const basisScherm = document.getElementById("basisScherm");
const moeilijkScherm = document.getElementById("moeilijkScherm");
const activiteitScherm = document.getElementById("activiteitScherm");

const basisKnop = document.getElementById("basisKnop");
const moeilijkKnop = document.getElementById("moeilijkKnop");

const basisTerugKnop = document.getElementById("basisTerugKnop");
const moeilijkTerugKnop = document.getElementById("moeilijkTerugKnop");
const activiteitTerugKnop = document.getElementById("activiteitTerugKnop");

const activiteitTitel = document.getElementById("activiteitTitel");
const activiteitSubtitel = document.getElementById("activiteitSubtitel");
const activiteitStatus = document.getElementById("activiteitStatus");
const activiteitStatusIcoon = document.getElementById("activiteitStatusIcoon");
const activiteitStatusTitel = document.getElementById("activiteitStatusTitel");
const activiteitStatusTekst = document.getElementById("activiteitStatusTekst");
const activiteitInhoud = document.getElementById("activiteitInhoud");
const activiteitKlaarKnop = document.getElementById("activiteitKlaarKnop");

const kortInvoerContainer = document.getElementById("kortInvoerContainer");
const kortInvoerTitel = document.getElementById("kortInvoerTitel");
const kortInvoerUitleg = document.getElementById("kortInvoerUitleg");
const kortInvoer = document.getElementById("kortInvoer");
const kortInvoerSluiten = document.getElementById("kortInvoerSluiten");
const invoerAnnuleren = document.getElementById("invoerAnnuleren");
const invoerOpslaan = document.getElementById("invoerOpslaan");

const beloning = document.getElementById("beloning");
const beloningTekst = document.getElementById("beloningTekst");


/* =========================================================
   INITIALISATIE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    dagStatusLaden();

    eventListenersInstellen();

    activiteitKnoppenInstellen();

    moeilijkeDagKnoppenInstellen();

    serviceWorkerRegistreren();

    dagControle();

});


/* =========================================================
   EVENT LISTENERS
========================================================= */

function eventListenersInstellen() {

    if (basisKnop) {
        basisKnop.addEventListener("click", () => {
            schermTonen(basisScherm);
        });
    }


    if (moeilijkKnop) {
        moeilijkKnop.addEventListener("click", () => {
            schermTonen(moeilijkScherm);
        });
    }


    if (basisTerugKnop) {
        basisTerugKnop.addEventListener("click", () => {
            schermTonen(hoofdScherm);
        });
    }


    if (moeilijkTerugKnop) {
        moeilijkTerugKnop.addEventListener("click", () => {
            schermTonen(hoofdScherm);
        });
    }


    if (activiteitTerugKnop) {
        activiteitTerugKnop.addEventListener("click", () => {
            terugNaarVorigeScherm();
        });
    }


    if (activiteitKlaarKnop) {
        activiteitKlaarKnop.addEventListener("click", () => {

            if (!huidigeActiviteit) {
                return;
            }

            taakAfvinken(
                huidigeBlok,
                huidigeActiviteit.id,
                huidigeModus
            );
        });
    }


    if (kortInvoerSluiten) {
        kortInvoerSluiten.addEventListener("click", invoerSluiten);
    }


    if (invoerAnnuleren) {
        invoerAnnuleren.addEventListener("click", invoerSluiten);
    }


    if (invoerOpslaan) {
        invoerOpslaan.addEventListener("click", invoerOpslaanHandler);
    }


    if (kortInvoer) {
        kortInvoer.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {
                event.preventDefault();
                invoerOpslaanHandler();
            }

            if (event.key === "Escape") {
                invoerSluiten();
            }

        });
    }


    if (kortInvoerContainer) {

        kortInvoerContainer.addEventListener("click", (event) => {

            if (event.target === kortInvoerContainer) {
                invoerSluiten();
            }

        });

    }
}


/* =========================================================
   ACTIVITEIT KNOPPEN
========================================================= */

function activiteitKnoppenInstellen() {

    const knoppen = document.querySelectorAll(
        ".basis-blok .activiteit-knop"
    );

    knoppen.forEach((knop) => {

        knop.addEventListener("click", () => {

            const blok = knop.dataset.blok;
            const activiteitId = knop.dataset.activiteit;

            const activiteit = zoekBasisActiviteit(
                blok,
                activiteitId
            );

            if (!activiteit) {
                return;
            }

            activiteitOpenen(
                activiteit,
                blok,
                "basis"
            );

        });

    });

    basisKnoppenBijwerken();
}


/* =========================================================
   MOEILIJKE DAG KNOPPEN
========================================================= */

function moeilijkeDagKnoppenInstellen() {

    const knoppen = document.querySelectorAll(
        ".moeilijk-activiteit"
    );

    knoppen.forEach((knop) => {

        knop.addEventListener("click", () => {

            const blok = knop.dataset.blok;
            const activiteitId = knop.dataset.activiteit;

            taakAfvinken(
                blok,
                activiteitId,
                "moeilijk"
            );

        });

    });

    moeilijkeKnoppenBijwerken();
}


/* =========================================================
   ACTIVITEIT OPENEN
========================================================= */

function activiteitOpenen(
    activiteit,
    blok,
    modus
) {

    huidigeActiviteit = activiteit;
    huidigeBlok = blok;
    huidigeModus = modus;

    activiteitTitel.textContent = activiteit.titel;

    activiteitSubtitel.textContent =
        activiteit.invoer
            ? "Je kunt er iets korts bij zetten."
            : "Goed bezig.";

    activiteitStatusTitel.textContent =
        activiteit.titel;

    activiteitInhoud.innerHTML = "";


    const sleutel = taakSleutel(
        modus,
        blok,
        activiteit.id
    );

    const afgerond =
        dagStatus.afgerond[sleutel] === true;

    const antwoord =
        dagStatus.antwoorden[sleutel] || "";


    if (activiteit.extra && activiteit.extra.length > 0) {

        extraOnderdelenTonen(
            activiteit.extra,
            sleutel
        );

    }


    if (activiteit.invoer) {

        const antwoordBlok =
            document.createElement("div");

        antwoordBlok.className =
            "activiteit-antwoord-blok";


        const antwoordLabel =
            document.createElement("div");

        antwoordLabel.className =
            "activiteit-antwoord-label";

        antwoordLabel.textContent =
            antwoord
                ? "Ingevuld:"
                : "Nog niets ingevuld.";


        antwoordBlok.appendChild(
            antwoordLabel
        );


        if (antwoord) {

            const antwoordTekst =
                document.createElement("div");

            antwoordTekst.className =
                "activiteit-antwoord";

            antwoordTekst.textContent =
                antwoord;

            antwoordBlok.appendChild(
                antwoordTekst
            );

        }


        const invoerKnop =
            document.createElement("button");

        invoerKnop.type = "button";

        invoerKnop.className =
            "activiteit-invoer-knop";

        invoerKnop.textContent =
            antwoord
                ? "✏️ Aanpassen"
                : "＋ Iets invullen";


        invoerKnop.addEventListener(
            "click",
            () => {

                invoerOpenen(
                    activiteit,
                    sleutel
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


    activiteitStatusBijwerken(
        afgerond
    );


    schermTonen(
        activiteitScherm
    );
}


/* =========================================================
   EXTRA ONDERDELEN
========================================================= */

function extraOnderdelenTonen(
    onderdelen,
    sleutel
) {

    const blok =
        document.createElement("div");

    blok.className =
        "extra-onderdelen";


    const titel =
        document.createElement("h3");

    titel.textContent =
        "Ook gedaan?";

    blok.appendChild(titel);


    const uitleg =
        document.createElement("p");

    uitleg.textContent =
        "Tik aan wat je nog hebt gedaan.";

    blok.appendChild(uitleg);


    onderdelen.forEach(
        (onderdeel, index) => {

            const extraSleutel =
                `${sleutel}::extra::${index}`;


            const label =
                document.createElement("label");

            label.className =
                "extra-onderdeel";


            const checkbox =
                document.createElement("input");

            checkbox.type =
                "checkbox";

            checkbox.checked =
                dagStatus.afgerond[
                    extraSleutel
                ] === true;


            const tekst =
                document.createElement("span");

            tekst.textContent =
                onderdeel;


            checkbox.addEventListener(
                "change",
                () => {

                    dagStatus.afgerond[
                        extraSleutel
                    ] = checkbox.checked;

                    dagStatusOpslaan();

                    if (checkbox.checked) {
                        beloningTonen();
                    }

                }
            );


            label.appendChild(
                checkbox
            );

            label.appendChild(
                tekst
            );

            blok.appendChild(
                label
            );

        }
    );


    activiteitInhoud.appendChild(
        blok
    );
}


/* =========================================================
   KORTE INVOER OPENEN
========================================================= */

function invoerOpenen(
    activiteit,
    sleutel
) {

    if (!kortInvoerContainer) {
        return;
    }

    huidigeActiviteit = activiteit;

    kortInvoerTitel.textContent =
        activiteit.titel;


    kortInvoerUitleg.textContent =
        "Een paar woorden is genoeg.";


    kortInvoer.placeholder =
        activiteit.placeholder ||
        "Bijvoorbeeld: 5 km gelopen";


    kortInvoer.value =
        dagStatus.antwoorden[sleutel] ||
        "";


    kortInvoer.dataset.sleutel =
        sleutel;


    kortInvoerContainer.hidden =
        false;


    document.body.classList.add(
        "invoer-open"
    );


    requestAnimationFrame(() => {

        kortInvoer.focus();

        kortInvoer.select();

    });
}


/* =========================================================
   INVOER OPSLAAN
========================================================= */

function invoerOpslaanHandler() {

    if (!kortInvoer) {
        return;
    }


    const sleutel =
        kortInvoer.dataset.sleutel;


    if (!sleutel) {
        return;
    }


    const waarde =
        kortInvoer.value.trim();


    if (waarde) {

        dagStatus.antwoorden[
            sleutel
        ] = waarde;

    } else {

        delete dagStatus.antwoorden[
            sleutel
        ];

    }


    dagStatus.afgerond[
        sleutel
    ] = true;


    dagStatusOpslaan();


    invoerSluiten();


    if (
        huidigeActiviteit &&
        activiteitScherm &&
        activiteitScherm.classList.contains("actief")
    ) {

        activiteitOpenen(
            huidigeActiviteit,
            huidigeBlok,
            huidigeModus
        );

    }


    beloningTonen();
}


/* =========================================================
   INVOER SLUITEN
========================================================= */

function invoerSluiten() {

    if (!kortInvoerContainer) {
        return;
    }

    kortInvoerContainer.hidden =
        true;


    document.body.classList.remove(
        "invoer-open"
    );


    if (kortInvoer) {
        kortInvoer.value = "";
        kortInvoer.dataset.sleutel = "";
    }
}


/* =========================================================
   TAAK AFVINKEN
========================================================= */

function taakAfvinken(
    blok,
    activiteitId,
    modus
) {

    const sleutel =
        taakSleutel(
            modus,
            blok,
            activiteitId
        );


    const wasAfgerond =
        dagStatus.afgerond[sleutel] === true;


    dagStatus.afgerond[sleutel] =
        !wasAfgerond;


    dagStatusOpslaan();


    if (!wasAfgerond) {

        beloningTonen();

    }


    if (modus === "basis") {

        basisKnoppenBijwerken();

        if (huidigeActiviteit) {

            activiteitStatusBijwerken(
                !wasAfgerond
            );

        }

    } else {

        moeilijkeKnoppenBijwerken();

    }
}


/* =========================================================
   ACTIVITEIT STATUS
========================================================= */

function activiteitStatusBijwerken(
    afgerond
) {

    if (!activiteitStatus) {
        return;
    }


    if (afgerond) {

        activiteitStatus.classList.add(
            "afgerond"
        );


        activiteitStatusIcoon.textContent =
            "✓";


        activiteitStatusTekst.textContent =
            "Afgerond";


        if (activiteitKlaarKnop) {

            activiteitKlaarKnop.textContent =
                "✓ Afgerond";

            activiteitKlaarKnop.classList.add(
                "afgerond"
            );

        }

    } else {

        activiteitStatus.classList.remove(
            "afgerond"
        );


        activiteitStatusIcoon.textContent =
            "○";


        activiteitStatusTekst.textContent =
            "Nog niet afgerond";


        if (activiteitKlaarKnop) {

            activiteitKlaarKnop.textContent =
                "✓ Klaar";

            activiteitKlaarKnop.classList.remove(
                "afgerond"
            );

        }

    }
}


/* =========================================================
   BASIS KNOPPEN BIJWERKEN
========================================================= */

function basisKnoppenBijwerken() {

    const knoppen =
        document.querySelectorAll(
            ".basis-blok .activiteit-knop"
        );


    knoppen.forEach((knop) => {

        const blok =
            knop.dataset.blok;

        const activiteitId =
            knop.dataset.activiteit;


        const sleutel =
            taakSleutel(
                "basis",
                blok,
                activiteitId
            );


        const afgerond =
            dagStatus.afgerond[
                sleutel
            ] === true;


        knop.classList.toggle(
            "afgerond",
            afgerond
        );


        let antwoordElement =
            knop.querySelector(
                ".checklist-antwoord"
            );


        const antwoord =
            dagStatus.antwoorden[
                sleutel
            ] || "";


        if (antwoord) {

            if (!antwoordElement) {

                antwoordElement =
                    document.createElement(
                        "span"
                    );

                antwoordElement.className =
                    "checklist-antwoord";

                knop.appendChild(
                    antwoordElement
                );

            }

            antwoordElement.textContent =
                antwoord;

        } else if (antwoordElement) {

            antwoordElement.remove();

        }

    });
}


/* =========================================================
   MOEILIJKE DAG KNOPPEN BIJWERKEN
========================================================= */

function moeilijkeKnoppenBijwerken() {

    const knoppen =
        document.querySelectorAll(
            ".moeilijk-activiteit"
        );


    knoppen.forEach((knop) => {

        const blok =
            knop.dataset.blok;

        const activiteitId =
            knop.dataset.activiteit;


        const sleutel =
            taakSleutel(
                "moeilijk",
                blok,
                activiteitId
            );


        const afgerond =
            dagStatus.afgerond[
                sleutel
            ] === true;


        knop.classList.toggle(
            "afgerond",
            afgerond
        );

    });
}


/* =========================================================
   ACTIVITEIT ZOEKEN
========================================================= */

function zoekBasisActiviteit(
    blok,
    activiteitId
) {

    const activiteiten =
        BASIS_ACTIVITEITEN[blok];


    if (!activiteiten) {
        return null;
    }


    return activiteiten.find(
        (activiteit) =>
            activiteit.id === activiteitId
    ) || null;
}


/* =========================================================
   SLEUTEL
========================================================= */

function taakSleutel(
    modus,
    blok,
    activiteitId
) {

    return `${modus}::${blok}::${activiteitId}`;
}


/* =========================================================
   SCHERMEN
========================================================= */

function schermTonen(
    scherm
) {

    const schermen =
        document.querySelectorAll(
            ".scherm"
        );


    schermen.forEach(
        (item) => {

            item.classList.remove(
                "actief"
            );

        }
    );


    if (scherm) {

        scherm.classList.add(
            "actief"
        );

    }


    window.scrollTo(
        0,
        0
    );


    invoerSluiten();
}


/* =========================================================
   TERUG NAAR VORIGE SCHERM
========================================================= */

function terugNaarVorigeScherm() {

    if (huidigeModus === "moeilijk") {

        schermTonen(
            moeilijkScherm
        );

    } else {

        schermTonen(
            basisScherm
        );

    }


    huidigeActiviteit = null;
    huidigeBlok = null;
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


    clearTimeout(
        beloning._timeout
    );


    beloning._timeout =
        setTimeout(
            () => {

                beloning.hidden =
                    true;

            },
            3000
        );
}


/* =========================================================
   DAGSTATUS LADEN
========================================================= */

function dagStatusLaden() {

    const vandaag =
        vandaagDatum();


    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_DAGSTATUS
            );


        if (!opgeslagen) {

            dagStatus =
                nieuwDagStatus(
                    vandaag
                );

            dagStatusOpslaan();

            return;
        }


        const data =
            JSON.parse(
                opgeslagen
            );


        if (
            !data ||
            data.datum !== vandaag
        ) {

            dagStatus =
                nieuwDagStatus(
                    vandaag
                );

            dagStatusOpslaan();

            return;
        }


        dagStatus = {
            datum: vandaag,
            afgerond:
                data.afgerond || {},
            antwoorden:
                data.antwoorden || {}
        };


    } catch (error) {

        console.warn(
            "Anker: dagstatus kon niet worden geladen.",
            error
        );


        dagStatus =
            nieuwDagStatus(
                vandaag
            );

        dagStatusOpslaan();

    }
}


/* =========================================================
   NIEUWE DAGSTATUS
========================================================= */

function nieuwDagStatus(
    datum
) {

    return {
        datum: datum,
        afgerond: {},
        antwoorden: {}
    };
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

    } catch (error) {

        console.warn(
            "Anker: dagstatus kon niet worden opgeslagen.",
            error
        );

    }
}


/* =========================================================
   DATUM
========================================================= */

function vandaagDatum() {

    const vandaag =
        new Date();


    const jaar =
        vandaag.getFullYear();


    const maand =
        String(
            vandaag.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dag =
        String(
            vandaag.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${jaar}-${maand}-${dag}`;
}


/* =========================================================
   DAG CONTROLEREN
========================================================= */

function dagControle() {

    const vandaag =
        vandaagDatum();


    if (
        dagStatus.datum !==
        vandaag
    ) {

        dagStatus =
            nieuwDagStatus(
                vandaag
            );

        dagStatusOpslaan();

    }


    basisKnoppenBijwerken();

    moeilijkeKnoppenBijwerken();

}


/* =========================================================
   SERVICE WORKER
========================================================= */

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
                    (registration) => {

                        console.log(
                            "Anker service worker actief:",
                            registration.scope
                        );

                    }
                )
                .catch(
                    (error) => {

                        console.warn(
                            "Anker service worker kon niet worden geregistreerd:",
                            error
                        );

                    }
                );

        }
    );
}


/* =========================================================
   MIDDERNACHT
   Controleert automatisch of er een nieuwe dag is.
========================================================= */

setInterval(
    dagControle,
    60 * 1000
);
