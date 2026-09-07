/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */

const OPSLAG_DAGSTATUS = "ankerDagstatus";

let dagStatus = {
    datum: "",
    afgerond: {},
    antwoorden: {}
};

let huidigeActiviteit = null;


/* =========================================================
   BASIS ACTIVITEITEN
   ========================================================= */

const BASIS_ACTIVITEITEN = [

    {
        id: "zelfzorg",
        titel: "Zelfzorg",
        icoon: "🧼",
        activiteiten: [
            {
                id: "douchen",
                titel: "Douchen",
                icoon: "🚿",
                invoer: true,
                placeholder: "Bijvoorbeeld: haar gewassen"
            },
            {
                id: "tanden-poetsen",
                titel: "Tanden poetsen",
                icoon: "🪥",
                invoer: true,
                placeholder: "Bijvoorbeeld: geflost"
            },
            {
                id: "deodorant",
                titel: "Deodorant",
                icoon: "🧴",
                invoer: true,
                placeholder: "Bijvoorbeeld: ook parfum gebruikt"
            },
            {
                id: "schone-kleding",
                titel: "Schone kleding",
                icoon: "👕",
                invoer: true,
                placeholder: "Bijvoorbeeld: werkkleding aangetrokken"
            }
        ]
    },

    {
        id: "eten-drinken",
        titel: "Eten & drinken",
        icoon: "🍽️",
        activiteiten: [
            {
                id: "ontbijt",
                titel: "Ontbijt",
                icoon: "🥪",
                invoer: true,
                placeholder: "Bijvoorbeeld: boterhammen met kaas"
            },
            {
                id: "lunch",
                titel: "Lunch",
                icoon: "🥗",
                invoer: true,
                placeholder: "Bijvoorbeeld: broodje gezond"
            },
            {
                id: "diner",
                titel: "Diner",
                icoon: "🍝",
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
                id: "ander-drinken",
                titel: "Iets anders gedronken",
                icoon: "🥤",
                invoer: true,
                placeholder: "Bijvoorbeeld: koffie, 2 koppen"
            }
        ]
    },

    {
        id: "omgeving",
        titel: "Omgeving",
        icoon: "🏠",
        activiteiten: [
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
                placeholder: "Bijvoorbeeld: keuken opgeruimd"
            }
        ]
    },

    {
        id: "beweging-buiten",
        titel: "Beweging & buiten",
        icoon: "🚶",
        activiteiten: [
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
        ]
    },

    {
        id: "hoofd-ontspanning",
        titel: "Hoofd & ontspanning",
        icoon: "🧠",
        activiteiten: [
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
                placeholder: "Bijvoorbeeld: mijn favoriete playlist"
            },
            {
                id: "plezier",
                titel: "Iets gedaan waar ik plezier aan beleef",
                icoon: "😊",
                invoer: true,
                placeholder: "Bijvoorbeeld: gegamed"
            }
        ]
    },

    {
        id: "check-mijn-borden",
        titel: "Check mijn borden",
        icoon: "📋",
        activiteiten: [
            {
                id: "borden-bekeken",
                titel: "Borden bekeken",
                icoon: "👀",
                invoer: false
            },
            {
                id: "klein-taakje",
                titel: "Een klein taakje gedaan",
                icoon: "✅",
                invoer: true,
                placeholder: "Bijvoorbeeld: afspraak gemaakt met gemeente"
            }
        ]
    }
];


/* =========================================================
   MOEILIJKE DAG
   Deze blijft bewust eenvoudig.
   ========================================================= */

const MOEILIJKE_DAG = [

    {
        id: "moeilijk-drinken",
        titel: "Drinken",
        icoon: "💧",
        activiteiten: [
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
        ]
    },

    {
        id: "moeilijk-eten",
        titel: "Eten",
        icoon: "🍽️",
        activiteiten: [
            {
                id: "iets-gegeten",
                titel: "Iets gegeten",
                icoon: "🍎"
            }
        ]
    },

    {
        id: "moeilijk-zelfzorg",
        titel: "Zelfzorg",
        icoon: "🧼",
        activiteiten: [
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
                id: "schone-kleding-aangetrokken",
                titel: "Schone kleding aangetrokken",
                icoon: "👕"
            }
        ]
    },

    {
        id: "moeilijk-beweging",
        titel: "Beweging",
        icoon: "🚶",
        activiteiten: [
            {
                id: "moeilijk-blokje-om",
                titel: "Klein blokje om",
                icoon: "🚶"
            },
            {
                id: "even-buiten",
                titel: "Even buiten geweest",
                icoon: "🌳"
            },
            {
                id: "even-bewogen",
                titel: "Even bewogen",
                icoon: "💪"
            }
        ]
    },

    {
        id: "moeilijk-prettig",
        titel: "Prettig",
        icoon: "💚",
        activiteiten: [
            {
                id: "moeilijk-muziek",
                titel: "Muziek geluisterd",
                icoon: "🎵"
            },
            {
                id: "iets-leuks",
                titel: "Iets leuks gedaan",
                icoon: "😊"
            }
        ]
    }
];


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

let basisKnoppen;
let moeilijkKnoppen;

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

    dagControle();

    basisKnoppenMaken();
    moeilijkKnoppenMaken();

    navigatieInstellen();

    invoerInstellen();

    serviceWorkerRegistreren();

    setInterval(dagControle, 60000);
});


/* =========================================================
   ELEMENTEN OPHALEN
   ========================================================= */

function elementenOphalen() {

    hoofdScherm = document.getElementById("hoofdScherm");
    basisScherm = document.getElementById("basisScherm");
    moeilijkScherm = document.getElementById("moeilijkScherm");
    activiteitScherm = document.getElementById("activiteitScherm");

    basisKnoppen = document.getElementById("basisKnoppen");
    moeilijkKnoppen = document.getElementById("moeilijkKnoppen");

    activiteitTitel = document.getElementById("activiteitTitel");
    activiteitSubtitel = document.getElementById("activiteitSubtitel");
    activiteitStatus = document.getElementById("activiteitStatus");
    activiteitStatusIcoon = document.getElementById("activiteitStatusIcoon");
    activiteitStatusTitel = document.getElementById("activiteitStatusTitel");
    activiteitStatusTekst = document.getElementById("activiteitStatusTekst");
    activiteitInhoud = document.getElementById("activiteitInhoud");
    activiteitKlaarKnop = document.getElementById("activiteitKlaarKnop");

    kortInvoerContainer = document.getElementById("kortInvoerContainer");
    kortInvoerTitel = document.getElementById("kortInvoerTitel");
    kortInvoerUitleg = document.getElementById("kortInvoerUitleg");
    kortInvoer = document.getElementById("kortInvoer");
    invoerAnnuleren = document.getElementById("invoerAnnuleren");
    invoerOpslaan = document.getElementById("invoerOpslaan");

    beloning = document.getElementById("beloning");
    beloningTekst = document.getElementById("beloningTekst");
}


/* =========================================================
   DAGSTATUS LADEN
   ========================================================= */

function dagStatusLaden() {

    const opgeslagen = localStorage.getItem(OPSLAG_DAGSTATUS);

    if (!opgeslagen) {
        dagStatus = {
            datum: vandaagAlsTekst(),
            afgerond: {},
            antwoorden: {}
        };

        dagStatusOpslaan();
        return;
    }

    try {

        const data = JSON.parse(opgeslagen);

        if (data.datum !== vandaagAlsTekst()) {

            dagStatus = {
                datum: vandaagAlsTekst(),
                afgerond: {},
                antwoorden: {}
            };

            dagStatusOpslaan();
            return;
        }

        dagStatus = {
            datum: data.datum || vandaagAlsTekst(),
            afgerond: data.afgerond || {},
            antwoorden: data.antwoorden || {}
        };

    } catch (fout) {

        dagStatus = {
            datum: vandaagAlsTekst(),
            afgerond: {},
            antwoorden: {}
        };

        dagStatusOpslaan();
    }
}


/* =========================================================
   DAGSTATUS OPSLAAN
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

    const jaar = datum.getFullYear();
    const maand = String(datum.getMonth() + 1).padStart(2, "0");
    const dag = String(datum.getDate()).padStart(2, "0");

    return `${jaar}-${maand}-${dag}`;
}


function dagControle() {

    const vandaag = vandaagAlsTekst();

    if (dagStatus.datum !== vandaag) {

        dagStatus = {
            datum: vandaag,
            afgerond: {},
            antwoorden: {}
        };

        dagStatusOpslaan();

        basisKnoppenBijwerken();
        moeilijkKnoppenBijwerken();
    }
}


/* =========================================================
   NAVIGATIE
   ========================================================= */

function navigatieInstellen() {

    const basisKnop = document.getElementById("basisKnop");
    const moeilijkKnop = document.getElementById("moeilijkKnop");

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

    document.querySelectorAll("[data-terug]").forEach(knop => {

        knop.addEventListener("click", () => {

            const bestemming = knop.dataset.terug;

            if (bestemming === "hoofd") {
                schermTonen(hoofdScherm);
            }

            if (bestemming === "basis") {
                schermTonen(basisScherm);
            }

            if (bestemming === "moeilijk") {
                schermTonen(moeilijkScherm);
            }
        });
    });
}


/* =========================================================
   SCHERM TONEN
   ========================================================= */

function schermTonen(scherm) {

    document.querySelectorAll(".scherm").forEach(item => {
        item.classList.remove("actief");
    });

    if (scherm) {
        scherm.classList.add("actief");
    }

    invoerSluiten();
}


/* =========================================================
   BASIS KNOPPEN
   ========================================================= */

function basisKnoppenMaken() {

    if (!basisKnoppen) return;

    basisKnoppen.innerHTML = "";

    BASIS_ACTIVITEITEN.forEach(blok => {

        const blokElement = document.createElement("div");
        blokElement.className = "blok basis-blok";

        const titel = document.createElement("h3");
        titel.className = "blok-titel";
        titel.innerHTML = `${blok.icoon} ${blok.titel}`;

        blokElement.appendChild(titel);

        const activiteiten = document.createElement("div");
        activiteiten.className = "activiteiten";

        blok.activiteiten.forEach(activiteit => {

            const knop = document.createElement("button");

            knop.type = "button";
            knop.className = "activiteit-knop";

            knop.dataset.blok = blok.id;
            knop.dataset.activiteit = activiteit.id;

            knop.innerHTML = `
                <span class="activiteit-icoon">${activiteit.icoon}</span>
                <span class="activiteit-naam">${activiteit.titel}</span>
                <span class="activiteit-check">✓</span>
            `;

            knop.addEventListener("click", () => {
                activiteitOpenen(blok, activiteit);
            });

            activiteiten.appendChild(knop);
        });

        blokElement.appendChild(activiteiten);
        basisKnoppen.appendChild(blokElement);
    });

    basisKnoppenBijwerken();
}


/* =========================================================
   MOEILIJKE DAG KNOPPEN
   ========================================================= */

function moeilijkKnoppenMaken() {

    if (!moeilijkKnoppen) return;

    moeilijkKnoppen.innerHTML = "";

    MOEILIJKE_DAG.forEach(blok => {

        const blokElement = document.createElement("div");
        blokElement.className = "blok moeilijk-blok";

        const titel = document.createElement("h3");
        titel.className = "blok-titel";
        titel.innerHTML = `${blok.icoon} ${blok.titel}`;

        blokElement.appendChild(titel);

        const activiteiten = document.createElement("div");
        activiteiten.className = "activiteiten";

        blok.activiteiten.forEach(activiteit => {

            const knop = document.createElement("button");

            knop.type = "button";
            knop.className = "activiteit-knop";

            knop.dataset.blok = blok.id;
            knop.dataset.activiteit = activiteit.id;

            knop.innerHTML = `
                <span class="activiteit-icoon">${activiteit.icoon}</span>
                <span class="activiteit-naam">${activiteit.titel}</span>
                <span class="activiteit-check">✓</span>
            `;

            knop.addEventListener("click", () => {

                taakAfvinken(
                    `${blok.id}::${activiteit.id}`
                );

                beloningTonen();
            });

            activiteiten.appendChild(knop);
        });

        blokElement.appendChild(activiteiten);
        moeilijkKnoppen.appendChild(blokElement);
    });

    moeilijkKnoppenBijwerken();
}


/* =========================================================
   BASIS ACTIVITEIT OPENEN
   ========================================================= */

function activiteitOpenen(blok, activiteit) {

    huidigeActiviteit = {
        blok,
        activiteit,
        sleutel: `${blok.id}::${activiteit.id}`
    };

    activiteitTitel.textContent = activiteit.titel;
    activiteitSubtitel.textContent = blok.titel;

    activiteitStatusIcoon.textContent =
        activiteit.icoon;

    activiteitInhoud.innerHTML = "";

    const antwoord =
        dagStatus.antwoorden[huidigeActiviteit.sleutel];

    /*
     * Eventuele eigen toevoeging tonen.
     */

    if (activiteit.invoer) {

        const antwoordBlok =
            document.createElement("div");

        antwoordBlok.className =
            "activiteit-antwoord-blok";

        if (antwoord) {

            antwoordBlok.innerHTML = `
                <div class="activiteit-antwoord-label">
                    Mijn toevoeging
                </div>

                <div class="activiteit-antwoord">
                    ${escapeHtml(antwoord)}
                </div>
            `;

        } else {

            antwoordBlok.innerHTML = `
                <div class="activiteit-antwoord-label">
                    Zelf iets toevoegen?
                </div>
            `;
        }

        const invoerKnop =
            document.createElement("button");

        invoerKnop.type = "button";
        invoerKnop.className =
            "activiteit-invoer-knop";

        invoerKnop.textContent =
            antwoord
                ? "✏️ Aanpassen"
                : "＋ Iets toevoegen";

        invoerKnop.addEventListener("click", () => {
            invoerOpenen(activiteit);
        });

        antwoordBlok.appendChild(invoerKnop);

        activiteitInhoud.appendChild(
            antwoordBlok
        );
    }

    activiteitStatusBijwerken();

    schermTonen(activiteitScherm);
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

        activiteitStatus.classList.add("afgerond");

        activiteitStatusIcoon.textContent = "✓";
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

        activiteitStatus.classList.remove("afgerond");

        activiteitStatusIcoon.textContent =
            huidigeActiviteit.activiteit.icoon;

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
   KLAAR-KNOP ACTIVITEIT
   ========================================================= */

if (typeof document !== "undefined") {

    document.addEventListener(
        "click",
        event => {

            if (
                event.target &&
                event.target.id ===
                "activiteitKlaarKnop"
            ) {

                if (!huidigeActiviteit) return;

                taakAfvinken(
                    huidigeActiviteit.sleutel
                );

                activiteitStatusBijwerken();

                basisKnoppenBijwerken();

                beloningTonen();
            }
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

    basisKnoppenBijwerken();
    moeilijkKnoppenBijwerken();
}


/* =========================================================
   BASIS KNOPPEN BIJWERKEN
   ========================================================= */

function basisKnoppenBijwerken() {

    if (!basisKnoppen) return;

    basisKnoppen
        .querySelectorAll(".activiteit-knop")
        .forEach(knop => {

            const sleutel =
                `${knop.dataset.blok}::${knop.dataset.activiteit}`;

            const afgerond =
                !!dagStatus.afgerond[sleutel];

            knop.classList.toggle(
                "afgerond",
                afgerond
            );

            const antwoord =
                dagStatus.antwoorden[sleutel];

            let antwoordElement =
                knop.querySelector(
                    ".checklist-antwoord"
                );

            if (antwoord) {

                if (!antwoordElement) {

                    antwoordElement =
                        document.createElement("span");

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
   MOEILIJKE DAG BIJWERKEN
   ========================================================= */

function moeilijkKnoppenBijwerken() {

    if (!moeilijkKnoppen) return;

    moeilijkKnoppen
        .querySelectorAll(".activiteit-knop")
        .forEach(knop => {

            const sleutel =
                `${knop.dataset.blok}::${knop.dataset.activiteit}`;

            const afgerond =
                !!dagStatus.afgerond[sleutel];

            knop.classList.toggle(
                "afgerond",
                afgerond
            );
        });
}


/* =========================================================
   KORTE INVOER
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
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    invoerOpslaanHandler();
                }

                if (event.key === "Escape") {
                    invoerSluiten();
                }
            }
        );
    }
}


/* =========================================================
   INVOER OPENEN
   ========================================================= */

function invoerOpenen(activiteit) {

    if (!huidigeActiviteit) return;

    kortInvoerTitel.textContent =
        activiteit.titel;

    kortInvoerUitleg.textContent =
        "Je hoeft alleen kort in te vullen wat je hebt gedaan.";

    kortInvoer.placeholder =
        activiteit.placeholder ||
        "Bijvoorbeeld: iets gedaan";

    kortInvoer.value =
        dagStatus.antwoorden[
            huidigeActiviteit.sleutel
        ] || "";

    kortInvoerContainer.classList.add(
        "actief"
    );

    setTimeout(() => {
        kortInvoer.focus();
    }, 50);
}


/* =========================================================
   INVOER OPSLAAN
   ========================================================= */

function invoerOpslaanHandler() {

    if (!huidigeActiviteit) return;

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

    dagStatus.afgerond[sleutel] =
        true;

    dagStatusOpslaan();

    invoerSluiten();

    activiteitOpenen(
        huidigeActiviteit.blok,
        huidigeActiviteit.activiteit
    );

    beloningTonen();
}


/* =========================================================
   INVOER SLUITEN
   ========================================================= */

function invoerSluiten() {

    if (!kortInvoerContainer) return;

    kortInvoerContainer.classList.remove(
        "actief"
    );
}


/* =========================================================
   POSITIEVE FEEDBACK
   ========================================================= */

function beloningTonen() {

    if (!beloning || !beloningTekst) return;

    const willekeurig =
        Math.floor(
            Math.random() *
            BELONINGEN.length
        );

    beloningTekst.textContent =
        BELONINGEN[willekeurig];

    beloning.classList.remove(
        "beloningPop"
    );

    void beloning.offsetWidth;

    beloning.classList.add(
        "beloningPop"
    );

    setTimeout(() => {

        beloning.classList.remove(
            "beloningPop"
        );

    }, 2500);
}


/* =========================================================
   HTML VEILIG WEERGEVEN
   ========================================================= */

function escapeHtml(tekst) {

    const div =
        document.createElement("div");

    div.textContent = tekst;

    return div.innerHTML;
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
                    .catch(fout => {

                        console.warn(
                            "Service worker kon niet worden geregistreerd:",
                            fout
                        );

                    });
            }
        );
    }
}
