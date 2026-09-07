/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */

const OPSLAG_DAGSTATUS = "ankerDagstatus";

let dagStatus = {
    datum: "",
    afgerond: {},
    toevoegingen: {}
};

let huidigeActiviteit = null;
let beloningTimer = null;


/* =========================================================
   BASIS ACTIVITEITEN
   ========================================================= */

const BASIS_ACTIVITEITEN = {
    "douchen": {
        titel: "Douchen",
        icoon: "🚿"
    },

    "tanden-poetsen": {
        titel: "Tanden poetsen",
        icoon: "🪥"
    },

    "deodorant": {
        titel: "Deodorant",
        icoon: "🧴"
    },

    "schone-kleding": {
        titel: "Schone kleding",
        icoon: "👕"
    },

    "ontbijt": {
        titel: "Ontbijt",
        icoon: "🌅"
    },

    "lunch": {
        titel: "Lunch",
        icoon: "🥪"
    },

    "diner": {
        titel: "Diner",
        icoon: "🍽️"
    },

    "water": {
        titel: "Water gedronken",
        icoon: "💧"
    },

    "anders-drinken": {
        titel: "Iets anders gedronken",
        icoon: "🥤"
    },

    "afwas": {
        titel: "Afwas / vaat",
        icoon: "🍽️"
    },

    "opruimen": {
        titel: "Even iets opruimen",
        icoon: "🧹"
    },

    "naar-buiten": {
        titel: "Even naar buiten",
        icoon: "🌳"
    },

    "blokje-om": {
        titel: "Klein blokje om",
        icoon: "🚶"
    },

    "bewegen": {
        titel: "Even bewegen",
        icoon: "💪"
    },

    "rust": {
        titel: "Even rust genomen",
        icoon: "😌"
    },

    "muziek": {
        titel: "Muziek geluisterd",
        icoon: "🎵"
    },

    "plezier": {
        titel: "Iets gedaan waar ik plezier aan beleef",
        icoon: "✨"
    },

    "borden-bekeken": {
        titel: "Borden bekeken",
        icoon: "👀"
    },

    "klein-taakje": {
        titel: "Een klein taakje gedaan",
        icoon: "🧩"
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
   DOM ELEMENTEN
   ========================================================= */

let hoofdScherm;
let basisScherm;
let moeilijkScherm;
let activiteitScherm;

let basisKnop;
let moeilijkKnop;

let basisTerugKnop;
let moeilijkTerugKnop;
let activiteitTerugKnop;

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
   DATUM
   ========================================================= */

function lokaleDatum() {
    const nu = new Date();

    const jaar = nu.getFullYear();
    const maand = String(nu.getMonth() + 1).padStart(2, "0");
    const dag = String(nu.getDate()).padStart(2, "0");

    return `${jaar}-${maand}-${dag}`;
}


/* =========================================================
   DAGSTATUS NORMALISEREN
   ========================================================= */

function dagStatusNormaliseren(data) {
    if (!data || typeof data !== "object") {
        return {
            datum: lokaleDatum(),
            afgerond: {},
            toevoegingen: {}
        };
    }

    return {
        datum: typeof data.datum === "string"
            ? data.datum
            : lokaleDatum(),

        afgerond:
            data.afgerond &&
            typeof data.afgerond === "object"
                ? data.afgerond
                : {},

        toevoegingen:
            data.toevoegingen &&
            typeof data.toevoegingen === "object"
                ? data.toevoegingen
                : {}
    };
}


/* =========================================================
   OPSLAAN
   ========================================================= */

function dagStatusOpslaan() {
    try {
        localStorage.setItem(
            OPSLAG_DAGSTATUS,
            JSON.stringify(dagStatus)
        );
    } catch (fout) {
        console.warn(
            "Anker kon de dagstatus niet opslaan.",
            fout
        );
    }
}


/* =========================================================
   LADEN
   ========================================================= */

function dagStatusLaden() {
    const vandaag = lokaleDatum();

    try {
        const opgeslagen = localStorage.getItem(
            OPSLAG_DAGSTATUS
        );

        if (!opgeslagen) {
            dagStatus = {
                datum: vandaag,
                afgerond: {},
                toevoegingen: {}
            };

            return;
        }

        const data = dagStatusNormaliseren(
            JSON.parse(opgeslagen)
        );

        if (data.datum !== vandaag) {
            dagStatus = {
                datum: vandaag,
                afgerond: {},
                toevoegingen: {}
            };

            dagStatusOpslaan();
            return;
        }

        dagStatus = data;

    } catch (fout) {
        console.warn(
            "Anker kon de dagstatus niet laden.",
            fout
        );

        dagStatus = {
            datum: vandaag,
            afgerond: {},
            toevoegingen: {}
        };
    }
}


/* =========================================================
   SCHERM WISSELEN
   ========================================================= */

function schermTonen(scherm) {
    document.querySelectorAll(".scherm").forEach(
        anderScherm => {
            anderScherm.classList.remove("actief");
        }
    );

    scherm.classList.add("actief");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   HULPFUNCTIES
   ========================================================= */

function activiteitSleutel(blok, activiteit) {
    return `${blok}::${activiteit}`;
}


function isAfgerond(sleutel) {
    return dagStatus.afgerond[sleutel] === true;
}


function krijgToevoegingen(sleutel) {
    if (!Array.isArray(dagStatus.toevoegingen[sleutel])) {
        dagStatus.toevoegingen[sleutel] = [];
    }

    return dagStatus.toevoegingen[sleutel];
}


/* =========================================================
   BASIS ACTIVITEIT OPENEN
   ========================================================= */

function basisActiviteitOpenen(knop) {
    const activiteit = knop.dataset.activiteit;
    const blok = knop.dataset.blok;

    const gegevens = BASIS_ACTIVITEITEN[activiteit];

    if (!gegevens) {
        console.warn(
            "Onbekende activiteit:",
            activiteit
        );

        return;
    }

    huidigeActiviteit = {
        activiteit: activiteit,
        blok: blok,
        sleutel: activiteitSleutel(
            blok,
            activiteit
        ),
        titel: gegevens.titel,
        icoon: gegevens.icoon
    };

    activiteitDetailVullen();

    schermTonen(activiteitScherm);
}


/* =========================================================
   DETAIL SCHERM
   ========================================================= */

function activiteitDetailVullen() {
    if (!huidigeActiviteit) {
        return;
    }

    const sleutel = huidigeActiviteit.sleutel;
    const titel = huidigeActiviteit.titel;
    const icoon = huidigeActiviteit.icoon;

    const afgerond = isAfgerond(sleutel);
    const toevoegingen = krijgToevoegingen(sleutel);

    activiteitTitel.textContent =
        `${icoon} ${titel}`;

    activiteitSubtitel.textContent =
        "Doe wat bij vandaag past.";

    activiteitStatus.classList.toggle(
        "afgerond",
        afgerond
    );

    if (afgerond) {
        activiteitStatusIcoon.textContent = "✓";
        activiteitStatusTitel.textContent = "Klaar";
        activiteitStatusTekst.textContent =
            "Deze activiteit is afgerond.";
    } else {
        activiteitStatusIcoon.textContent = "○";
        activiteitStatusTitel.textContent =
            "Nog niet klaar";
        activiteitStatusTekst.textContent =
            "Je kunt hem afvinken wanneer je wilt.";
    }

    activiteitKlaarKnop.textContent =
        afgerond
            ? "✓ Klaar"
            : "✓ Klaar";

    activiteitInhoud.innerHTML = "";


    /* -----------------------------------------------------
       BESTAANDE TOEVOEGINGEN
       ----------------------------------------------------- */

    if (toevoegingen.length > 0) {
        const lijst = document.createElement("div");

        lijst.className = "extra-onderdelen";

        toevoegingen.forEach(toevoeging => {
            const rij = document.createElement("div");

            rij.className = "extra-onderdeel";

            if (toevoeging.afgerond) {
                rij.classList.add("afgerond");
            }


            /* Vinkje */

            const vinkKnop =
                document.createElement("button");

            vinkKnop.type = "button";
            vinkKnop.className = "extra-vink";

            vinkKnop.setAttribute(
                "aria-label",
                toevoeging.afgerond
                    ? "Markeer als niet afgerond"
                    : "Markeer als afgerond"
            );

            vinkKnop.textContent =
                toevoeging.afgerond
                    ? "✓"
                    : "○";

            vinkKnop.addEventListener(
                "click",
                () => {
                    toevoeging.afgerond =
                        !toevoeging.afgerond;

                    dagStatusOpslaan();

                    activiteitDetailVullen();
                    basisStatusBijwerken();
                }
            );


            /* Tekst */

            const tekst =
                document.createElement("span");

            tekst.className = "extra-tekst";
            tekst.textContent = toevoeging.tekst;


            /* Verwijderen */

            const verwijderKnop =
                document.createElement("button");

            verwijderKnop.type = "button";
            verwijderKnop.className =
                "extra-verwijder";

            verwijderKnop.setAttribute(
                "aria-label",
                "Verwijder toevoeging"
            );

            verwijderKnop.textContent = "×";

            verwijderKnop.addEventListener(
                "click",
                () => {
                    dagStatus.toevoegingen[sleutel] =
                        krijgToevoegingen(sleutel)
                            .filter(
                                item =>
                                    item.id !==
                                    toevoeging.id
                            );

                    dagStatusOpslaan();

                    activiteitDetailVullen();
                    basisStatusBijwerken();
                }
            );


            rij.appendChild(vinkKnop);
            rij.appendChild(tekst);
            rij.appendChild(verwijderKnop);

            lijst.appendChild(rij);
        });

        activiteitInhoud.appendChild(lijst);
    }


    /* -----------------------------------------------------
       TOEVOEGEN KNOP
       ----------------------------------------------------- */

    const toevoegenKnop =
        document.createElement("button");

    toevoegenKnop.type = "button";
    toevoegenKnop.className =
        "activiteit-invoer-knop";

    toevoegenKnop.textContent =
        "＋ Iets toevoegen";

    toevoegenKnop.addEventListener(
        "click",
        invoerOpenen
    );

    activiteitInhoud.appendChild(
        toevoegenKnop
    );
}


/* =========================================================
   INVOERVELD OPENEN
   ========================================================= */

function invoerOpenen() {
    if (!huidigeActiviteit) {
        return;
    }

    kortInvoerTitel.textContent =
        "Iets toevoegen";

    kortInvoerUitleg.textContent =
        `Wat wil je toevoegen bij ${huidigeActiviteit.titel}?`;

    kortInvoer.value = "";

    kortInvoerContainer.hidden = false;

    setTimeout(() => {
        kortInvoer.focus();
    }, 50);
}


/* =========================================================
   INVOERVELD SLUITEN
   ========================================================= */

function invoerSluiten() {
    kortInvoerContainer.hidden = true;
    kortInvoer.value = "";
}


/* =========================================================
   TOEVOEGING OPSLAAN
   ========================================================= */

function toevoegingOpslaan() {
    if (!huidigeActiviteit) {
        return;
    }

    const tekst =
        kortInvoer.value.trim();

    if (!tekst) {
        kortInvoer.focus();
        return;
    }

    const sleutel =
        huidigeActiviteit.sleutel;

    const toevoegingen =
        krijgToevoegingen(sleutel);

    toevoegingen.push({
        id:
            `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 9)}`,

        tekst: tekst,

        afgerond: false
    });

    dagStatus.toevoegingen[sleutel] =
        toevoegingen;

    dagStatusOpslaan();

    invoerSluiten();

    activiteitDetailVullen();
    basisStatusBijwerken();
}


/* =========================================================
   HOOFDACTIVITEIT KLAAR
   ========================================================= */

function activiteitKlaar() {
    if (!huidigeActiviteit) {
        return;
    }

    const sleutel =
        huidigeActiviteit.sleutel;

    const wasAfgerond =
        isAfgerond(sleutel);

    dagStatus.afgerond[sleutel] =
        !wasAfgerond;

    dagStatusOpslaan();

    activiteitDetailVullen();
    basisStatusBijwerken();

    if (!wasAfgerond) {
        beloningTonen();
    }
}


/* =========================================================
   BASIS STATUS BIJWERKEN
   ========================================================= */

function basisStatusBijwerken() {
    document
        .querySelectorAll(
            "#basisCategorieen .activiteit-knop"
        )
        .forEach(knop => {

            const sleutel =
                activiteitSleutel(
                    knop.dataset.blok,
                    knop.dataset.activiteit
                );

            const afgerond =
                isAfgerond(sleutel);

            knop.classList.toggle(
                "afgerond",
                afgerond
            );


            /* Oude telling verwijderen */

            knop.querySelectorAll(
                ".activiteit-antwoord"
            ).forEach(
                element => element.remove()
            );


            /* Aantal afgeronde toevoegingen */

            const toevoegingen =
                krijgToevoegingen(sleutel);

            const aantal =
                toevoegingen.filter(
                    item => item.afgerond
                ).length;

            if (aantal > 0) {
                const antwoord =
                    document.createElement("span");

                antwoord.className =
                    "activiteit-antwoord";

                antwoord.textContent =
                    `${aantal} toegevoegd`;

                knop.appendChild(
                    antwoord
                );
            }
        });
}


/* =========================================================
   MOEILIJKE DAG
   ========================================================= */

function moeilijkeActiviteitKlik(knop) {
    const sleutel =
        activiteitSleutel(
            knop.dataset.blok,
            knop.dataset.activiteit
        );

    const wasAfgerond =
        isAfgerond(sleutel);

    dagStatus.afgerond[sleutel] =
        !wasAfgerond;

    dagStatusOpslaan();

    knop.classList.toggle(
        "afgerond",
        !wasAfgerond
    );

    if (!wasAfgerond) {
        beloningTonen();
    }
}


/* =========================================================
   MOEILIJKE DAG STATUS HERSTELLEN
   ========================================================= */

function moeilijkeStatusBijwerken() {
    document
        .querySelectorAll(
            "#moeilijkScherm .moeilijk-activiteit"
        )
        .forEach(knop => {

            const sleutel =
                activiteitSleutel(
                    knop.dataset.blok,
                    knop.dataset.activiteit
                );

            knop.classList.toggle(
                "afgerond",
                isAfgerond(sleutel)
            );
        });
}


/* =========================================================
   POSITIEVE FEEDBACK
   ========================================================= */

function beloningTonen() {
    if (!beloning || !beloningTekst) {
        return;
    }

    const willekeurig =
        BELONINGEN[
            Math.floor(
                Math.random() *
                BELONINGEN.length
            )
        ];

    beloningTekst.textContent =
        willekeurig;

    beloning.hidden = false;

    requestAnimationFrame(() => {
        beloning.classList.add(
            "zichtbaar"
        );
    });

    clearTimeout(beloningTimer);

    beloningTimer =
        setTimeout(() => {

            beloning.classList.remove(
                "zichtbaar"
            );

            setTimeout(() => {
                beloning.hidden = true;
            }, 250);

        }, 2200);
}


/* =========================================================
   EVENTS
   ========================================================= */

function eventsInstellen() {

    basisKnop.addEventListener(
        "click",
        () => {
            schermTonen(basisScherm);
        }
    );


    moeilijkKnop.addEventListener(
        "click",
        () => {
            schermTonen(moeilijkScherm);
        }
    );


    basisTerugKnop.addEventListener(
        "click",
        () => {
            schermTonen(hoofdScherm);
        }
    );


    moeilijkTerugKnop.addEventListener(
        "click",
        () => {
            schermTonen(hoofdScherm);
        }
    );


    activiteitTerugKnop.addEventListener(
        "click",
        () => {
            schermTonen(basisScherm);
        }
    );


    /* BASIS */

    document
        .querySelectorAll(
            "#basisCategorieen .activiteit-knop"
        )
        .forEach(knop => {

            knop.addEventListener(
                "click",
                () => {
                    basisActiviteitOpenen(knop);
                }
            );
        });


    /* MOEILIJKE DAG */

    document
        .querySelectorAll(
            "#moeilijkScherm .moeilijk-activiteit"
        )
        .forEach(knop => {

            knop.addEventListener(
                "click",
                () => {
                    moeilijkeActiviteitKlik(knop);
                }
            );
        });


    /* KLAAR */

    activiteitKlaarKnop.addEventListener(
        "click",
        activiteitKlaar
    );


    /* INVOER */

    kortInvoerSluiten.addEventListener(
        "click",
        invoerSluiten
    );


    invoerAnnuleren.addEventListener(
        "click",
        invoerSluiten
    );


    invoerOpslaan.addEventListener(
        "click",
        toevoegingOpslaan
    );


    /* ENTER / ESCAPE */

    kortInvoer.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                event.preventDefault();
                toevoegingOpslaan();
            }

            if (event.key === "Escape") {
                event.preventDefault();
                invoerSluiten();
            }
        }
    );


    /* Klik buiten invoervak */

    kortInvoerContainer.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                kortInvoerContainer
            ) {
                invoerSluiten();
            }
        }
    );
}


/* =========================================================
   ELEMENTEN KOPPELEN
   ========================================================= */

function elementenKoppelen() {

    hoofdScherm =
        document.getElementById("hoofdScherm");

    basisScherm =
        document.getElementById("basisScherm");

    moeilijkScherm =
        document.getElementById("moeilijkScherm");

    activiteitScherm =
        document.getElementById("activiteitScherm");


    basisKnop =
        document.getElementById("basisKnop");

    moeilijkKnop =
        document.getElementById("moeilijkKnop");


    basisTerugKnop =
        document.getElementById("basisTerugKnop");

    moeilijkTerugKnop =
        document.getElementById("moeilijkTerugKnop");

    activiteitTerugKnop =
        document.getElementById("activiteitTerugKnop");


    activiteitTitel =
        document.getElementById("activiteitTitel");

    activiteitSubtitel =
        document.getElementById("activiteitSubtitel");

    activiteitStatus =
        document.getElementById("activiteitStatus");

    activiteitStatusIcoon =
        document.getElementById(
            "activiteitStatusIcoon"
        );

    activiteitStatusTitel =
        document.getElementById(
            "activiteitStatusTitel"
        );

    activiteitStatusTekst =
        document.getElementById(
            "activiteitStatusTekst"
        );

    activiteitInhoud =
        document.getElementById(
            "activiteitInhoud"
        );

    activiteitKlaarKnop =
        document.getElementById(
            "activiteitKlaarKnop"
        );


    kortInvoerContainer =
        document.getElementById(
            "kortInvoerContainer"
        );

    kortInvoerTitel =
        document.getElementById(
            "kortInvoerTitel"
        );

    kortInvoerUitleg =
        document.getElementById(
            "kortInvoerUitleg"
        );

    kortInvoer =
        document.getElementById(
            "kortInvoer"
        );

    kortInvoerSluiten =
        document.getElementById(
            "kortInvoerSluiten"
        );

    invoerAnnuleren =
        document.getElementById(
            "invoerAnnuleren"
        );

    invoerOpslaan =
        document.getElementById(
            "invoerOpslaan"
        );


    beloning =
        document.getElementById("beloning");

    beloningTekst =
        document.getElementById(
            "beloningTekst"
        );
}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function serviceWorkerRegistreren() {

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker
            .register("sw.js")
            .catch(fout => {

                console.warn(
                    "Service worker kon niet worden geregistreerd.",
                    fout
                );
            });
    }
}


/* =========================================================
   START
   ========================================================= */

function starten() {

    elementenKoppelen();

    dagStatusLaden();

    eventsInstellen();

    basisStatusBijwerken();

    moeilijkeStatusBijwerken();

    serviceWorkerRegistreren();
}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        starten
    );

} else {

    starten();
}

