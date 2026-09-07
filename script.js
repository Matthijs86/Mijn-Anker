// ======================================
// ANKER
// TERUG NAAR DE BASIS
// ======================================


// ======================================
// BASIS STRUCTUUR
// ======================================
//
// De structuur van BASIS wordt apart opgeslagen.
// Hierdoor kunnen opties worden aangepast zonder
// dat de dagelijkse vinkjes worden meegenomen.
//
// "invoer: true"
// = bij aanklikken wordt gevraagd om een kort woord.
//
// "invoer: false"
// = direct afvinken.
//

const BASIS_CHECKLISTS = {

    zelfzorg: {
        titel: "Zelfzorg",
        subtitel: "Zorg goed voor jezelf.",
        opties: [
            {
                id: "douchen",
                tekst: "Douchen",
                invoer: false
            },
            {
                id: "tanden-poetsen",
                tekst: "Tanden poetsen",
                invoer: false
            },
            {
                id: "deodorant",
                tekst: "Deodorant",
                invoer: false
            },
            {
                id: "schone-kleding",
                tekst: "Schone kleding",
                invoer: false
            }
        ]
    },

    eten: {
        titel: "Eten & drinken",
        subtitel: "Geef je lichaam wat het nodig heeft.",
        opties: [
            {
                id: "iets-gegeten",
                tekst: "Iets gegeten",
                invoer: true
            },
            {
                id: "water-gedronken",
                tekst: "Water gedronken",
                invoer: false
            },
            {
                id: "iets-anders-gedronken",
                tekst: "Iets anders gedronken",
                invoer: true
            }
        ]
    },

    omgeving: {
        titel: "Omgeving",
        subtitel: "Een beetje orde om je heen.",
        opties: [
            {
                id: "afwas-vaat",
                tekst: "Afwas / vaat",
                invoer: false
            },
            {
                id: "even-opruimen",
                tekst: "Even iets opruimen",
                invoer: false
            }
        ]
    },

    beweging: {
        titel: "Beweging & buiten",
        subtitel: "Even bewegen of naar buiten.",
        opties: [
            {
                id: "naar-buiten",
                tekst: "Even naar buiten",
                invoer: false
            },
            {
                id: "klein-blokje-om",
                tekst: "Klein blokje om",
                invoer: false
            },
            {
                id: "even-bewegen",
                tekst: "Even bewegen",
                invoer: false
            }
        ]
    },

    hoofd: {
        titel: "Hoofd & ontspanning",
        subtitel: "Rust, plezier en ontspanning.",
        opties: [
            {
                id: "rust-genomen",
                tekst: "Even rust genomen",
                invoer: false
            },
            {
                id: "muziek-geluisterd",
                tekst: "Muziek geluisterd",
                invoer: false
            },
            {
                id: "iets-leuks",
                tekst: "Iets gedaan waar ik plezier aan beleef",
                invoer: false
            }
        ]
    },

    borden: {
        titel: "Check mijn borden",
        subtitel: "Misschien staat er iets voor vandaag.",
        opties: [
            {
                id: "borden-bekeken",
                tekst: "Mijn borden bekeken",
                invoer: false
            },
            {
                id: "klein-taakje-bord",
                tekst: "Een klein taakje van een bord gedaan",
                invoer: false
            }
        ]
    }

};


// ======================================
// MOEILIJKE DAG
// ======================================
//
// Deze structuur blijft bewust apart.
// De gebruiker kan hier voorlopig niets
// aanpassen.
//

const MOEILIJKE_DAG_CHECKLISTS = {

    "moeilijk-drinken": {
        titel: "Drinken",
        subtitel: "Iets drinken is goed.",
        taken: [
            "Iets gedronken",
            "Water gedronken"
        ]
    },

    "moeilijk-eten": {
        titel: "Eten",
        subtitel: "Iets eten is genoeg.",
        taken: [
            "Iets gegeten"
        ]
    },

    "moeilijk-zelfzorg": {
        titel: "Zelfzorg",
        subtitel: "Een beetje voor jezelf zorgen.",
        taken: [
            "Gedoucht",
            "Gewassen",
            "Tanden gepoetst",
            "Schone kleding aangetrokken"
        ]
    },

    "moeilijk-beweging": {
        titel: "Een beetje bewegen",
        subtitel: "Een klein beetje is ook goed.",
        taken: [
            "Klein blokje om",
            "Even buiten geweest",
            "Even bewogen"
        ]
    },

    "moeilijk-prettig": {
        titel: "Iets prettigs",
        subtitel: "Doe iets wat fijn voelt.",
        taken: [
            "Muziek geluisterd",
            "Iets leuks gedaan"
        ]
    }

};


// ======================================
// OPSLAG BASIS STRUCTUUR
// ======================================

const OPSLAG_BASIS_STRUCTUUR =
    "ankerBasisStructuur";


// ======================================
// OPSLAG DAGSTATUS
// ======================================
//
// Alleen vandaag wordt bewaard.
//

const OPSLAG_DAGSTATUS =
    "ankerDagstatus";


let basisStructuur = {};

let dagStatus = {
    datum: "",
    afgerond: {},
    invulling: {}
};


// ======================================
// POSITIEVE BOODSCHAPPEN
// ======================================

const BELONINGEN = [

    "🎉 YES! Goed gedaan!",
    "💪 KOP OP! Weer eentje geregeld!",
    "🌱 YES! Eén stap vooruit!",
    "🫶 Lekker! Je hebt goed voor jezelf gezorgd.",
    "⚓ YES! Weer een stukje verder.",
    "✨ Kijk jou! Dit heb je gewoon gedaan!",
    "🙌 Hoppa! Die zit!",
    "❤️ Goed bezig. Echt. Dit telt.",
    "🔥 YESSS! Lekker bezig!",
    "🌟 Trots op jezelf? Dat mag!",
    "💚 Kijk eens aan! Weer iets voor jezelf gedaan.",
    "🎊 Lekker hoor! Die kun je afvinken.",
    "😊 Goed zo! Je bent gewoon begonnen.",
    "💫 Bam! Weer een kleine overwinning.",
    "👏 YES! Dat heb je mooi geregeld.",
    "🌈 Eén vinkje tegelijk. Je komt er wel.",
    "⚡ Hoppa! Weer eentje gedaan!",
    "🧡 Dit telt. Echt waar.",
    "🎯 Check! Goed voor jezelf gezorgd.",
    "🥳 JAAA! Lekker bezig!",
    "🌿 Rustig aan, maar wel vooruit.",
    "💜 Goed gedaan! Daar mag je best blij mee zijn.",
    "🚀 Kijk jou gaan! Weer een stapje.",
    "☀️ YES! Fijn dat je dit voor jezelf hebt gedaan.",
    "🏆 Kleine actie. Grote winst.",
    "😎 Check. Geregeld. Lekker bezig.",
    "🎉 Dat is er weer eentje! Goed bezig.",
    "🫶 Eén ding gedaan. En dat is genoeg.",
    "💪 Zie je wel? Je kunt dit.",
    "⚓ Anker uitgegooid. Weer even stevig staan."

];


// ======================================
// SCHERMEN
// ======================================

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisScherm =
    document.getElementById("basisScherm");

const moeilijkScherm =
    document.getElementById("moeilijkScherm");

const checklistScherm =
    document.getElementById("checklistScherm");


// ======================================
// HOOFDSCHERM KNOPPEN
// ======================================

const basisKnop =
    document.getElementById("basisKnop");

const moeilijkKnop =
    document.getElementById("moeilijkKnop");


// ======================================
// CHECKLIST ELEMENTEN
// ======================================

const checklist =
    document.getElementById("checklist");

const checklistTitel =
    document.getElementById("checklistTitel");

const checklistSubtitel =
    document.getElementById("checklistSubtitel");

const checklistLabel =
    document.getElementById("checklistLabel");

const checklistTerugKnop =
    document.getElementById("checklistTerugKnop");


// ======================================
// BELONING
// ======================================

const beloning =
    document.getElementById("beloning");

const beloningTekst =
    document.getElementById("beloningTekst");


// ======================================
// BASIS BEWERKEN
// ======================================

const basisBewerkContainer =
    document.getElementById(
        "basisBewerkContainer"
    );

const basisBewerkKnop =
    document.getElementById(
        "basisBewerkKnop"
    );

const optiesBewerkScherm =
    document.getElementById(
        "optiesBewerkScherm"
    );

const optiesBewerkSluiten =
    document.getElementById(
        "optiesBewerkSluiten"
    );

const optiesEditor =
    document.getElementById(
        "optiesEditor"
    );

const nieuweOptieNaam =
    document.getElementById(
        "nieuweOptieNaam"
    );

const nieuweOptieInvoer =
    document.getElementById(
        "nieuweOptieInvoer"
    );

const nieuweOptieToevoegen =
    document.getElementById(
        "nieuweOptieToevoegen"
    );


// ======================================
// KORTE INVOER
// ======================================

const kortInvoerContainer =
    document.getElementById(
        "kortInvoerContainer"
    );

const kortInvoer =
    document.getElementById(
        "kortInvoer"
    );

const kortInvoerTitel =
    document.getElementById(
        "kortInvoerTitel"
    );

const kortInvoerUitleg =
    document.getElementById(
        "kortInvoerUitleg"
    );

const kortInvoerAnnuleren =
    document.getElementById(
        "kortInvoerAnnuleren"
    );

const kortInvoerOpslaan =
    document.getElementById(
        "kortInvoerOpslaan"
    );


// ======================================
// HUIDIGE STAAT
// ======================================

let huidigScherm = "hoofd";

let vorigeScherm = "hoofd";

let huidigeChecklist = null;

let huidigeOptieVoorInvoer = null;


// ======================================
// START
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        basisStructuurLaden();

        dagStatusLaden();

        gebeurtenissenInstellen();

    }
);


// ======================================
// DATUM VAN VANDAAG
// ======================================

function vandaag() {

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


// ======================================
// BASIS STRUCTUUR LADEN
// ======================================

function basisStructuurLaden() {

    const standaard =
        structuredClone(
            BASIS_CHECKLISTS
        );

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_BASIS_STRUCTUUR
            );

        if (!opgeslagen) {

            basisStructuur =
                standaard;

            basisStructuurOpslaan();

            return;

        }


        const gegevens =
            JSON.parse(opgeslagen);


        if (
            !gegevens ||
            typeof gegevens !== "object"
        ) {

            basisStructuur =
                standaard;

            basisStructuurOpslaan();

            return;

        }


        basisStructuur =
            gegevens;


        /*
         * Eventuele nieuwe standaardcategorieën
         * worden toegevoegd zonder bestaande
         * persoonlijke aanpassingen te verwijderen.
         */

        Object.keys(standaard).forEach(
            (categorie) => {

                if (
                    !basisStructuur[categorie]
                ) {

                    basisStructuur[categorie] =
                        standaard[categorie];

                }

            }
        );


        /*
         * Oude opties die al bestonden blijven
         * gewoon bestaan.
         *
         * We vervangen dus niets automatisch.
         */

        basisStructuurOpslaan();

    } catch (fout) {

        console.warn(
            "Basisstructuur kon niet worden geladen.",
            fout
        );

        basisStructuur =
            standaard;

        basisStructuurOpslaan();

    }

}


// ======================================
// BASIS STRUCTUUR OPSLAAN
// ======================================

function basisStructuurOpslaan() {

    try {

        localStorage.setItem(
            OPSLAG_BASIS_STRUCTUUR,
            JSON.stringify(
                basisStructuur
            )
        );

    } catch (fout) {

        console.warn(
            "Basisstructuur kon niet worden opgeslagen.",
            fout
        );

    }

}


// ======================================
// DAGSTATUS LADEN
// ======================================

function dagStatusLaden() {

    const datumVandaag =
        vandaag();

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_DAGSTATUS
            );


        if (!opgeslagen) {

            dagStatus =
                nieuweDagStatus(
                    datumVandaag
                );

            dagStatusOpslaan();

            return;

        }


        const gegevens =
            JSON.parse(opgeslagen);


        /*
         * Nieuwe dag?
         *
         * Dan ALLE dagelijkse vinkjes
         * en korte antwoorden wissen.
         */

        if (
            !gegevens ||
            gegevens.datum !== datumVandaag
        ) {

            dagStatus =
                nieuweDagStatus(
                    datumVandaag
                );

            dagStatusOpslaan();

            return;

        }


        dagStatus = {

            datum: datumVandaag,

            afgerond:
                gegevens.afgerond || {},

            invulling:
                gegevens.invulling || {}

        };


    } catch (fout) {

        console.warn(
            "Dagstatus kon niet worden geladen.",
            fout
        );

        dagStatus =
            nieuweDagStatus(
                datumVandaag
            );

        dagStatusOpslaan();

    }

}


// ======================================
// NIEUWE DAGSTATUS
// ======================================

function nieuweDagStatus(datum) {

    return {

        datum: datum,

        afgerond: {},

        invulling: {}

    };

}


// ======================================
// DAGSTATUS OPSLAAN
// ======================================

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


// ======================================
// DAGSTATUS CONTROLEREN
// ======================================

function dagStatusControleren() {

    const datumVandaag =
        vandaag();

    if (
        dagStatus.datum !== datumVandaag
    ) {

        dagStatus =
            nieuweDagStatus(
                datumVandaag
            );

        dagStatusOpslaan();

    }

}


// ======================================
// UNIEKE SLEUTEL
// ======================================

function taakSleutel(
    checklistNaam,
    optieId
) {

    return `${checklistNaam}::${optieId}`;

}


// ======================================
// CONTROLEREN OF OPTIE AFGEROND IS
// ======================================

function optieIsAfgerond(
    checklistNaam,
    optieId
) {

    const sleutel =
        taakSleutel(
            checklistNaam,
            optieId
        );

    return (
        dagStatus.afgerond[sleutel] === true
    );

}


// ======================================
// INVULLING OPHALEN
// ======================================

function optieInvulling(
    checklistNaam,
    optieId
) {

    const sleutel =
        taakSleutel(
            checklistNaam,
            optieId
        );

    return (
        dagStatus.invulling[sleutel] || ""
    );

}


// ======================================
// GEBEURTENISSEN
// ======================================

function gebeurtenissenInstellen() {


    // ==================================
    // BASIS
    // ==================================

    if (basisKnop) {

        basisKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    "basis"
                );

            }
        );

    }


    // ==================================
    // MOEILIJKE DAG
    // ==================================

    if (moeilijkKnop) {

        moeilijkKnop.addEventListener(
            "click",
            () => {

                schermTonen(
                    "moeilijk"
                );

            }
        );

    }


    // ==================================
    // CHECKLIST TERUG
    // ==================================

    if (checklistTerugKnop) {

        checklistTerugKnop.addEventListener(
            "click",
            () => {

                optiesBewerkSluitenFunctie();

                sluitKorteInvoer();

                schermTonen(
                    vorigeScherm
                );

            }
        );

    }


    // ==================================
    // BASIS CATEGORIEËN
    // ==================================

    const blokken =
        document.querySelectorAll(
            "#basisScherm .blok"
        );


    blokken.forEach(
        (blok) => {

            blok.addEventListener(
                "click",
                () => {

                    const blokNaam =
                        blok.dataset.blok;

                    checklistOpenen(
                        blokNaam
                    );

                }
            );

        }
    );


    // ==================================
    // MOEILIJKE DAG CATEGORIEËN
    // ==================================

    const moeilijkeBlokken =
        document.querySelectorAll(
            "#moeilijkScherm .blok"
        );


    moeilijkeBlokken.forEach(
        (blok) => {

            blok.addEventListener(
                "click",
                () => {

                    const blokNaam =
                        blok.dataset.blok;

                    moeilijkeChecklistOpenen(
                        blokNaam
                    );

                }
            );

        }
    );


    // ==================================
    // OPTIES AANPASSEN
    // ==================================

    if (basisBewerkKnop) {

        basisBewerkKnop.addEventListener(
            "click",
            () => {

                optiesBewerkOpenen();

            }
        );

    }


    if (optiesBewerkSluiten) {

        optiesBewerkSluiten.addEventListener(
            "click",
            () => {

                optiesBewerkSluitenFunctie();

            }
        );

    }


    // ==================================
    // NIEUWE OPTIE
    // ==================================

    if (nieuweOptieToevoegen) {

        nieuweOptieToevoegen.addEventListener(
            "click",
            () => {

                nieuweOptieToevoegenFunctie();

            }
        );

    }


    // ==================================
    // ENTER BIJ NIEUWE OPTIE
    // ==================================

    if (nieuweOptieNaam) {

        nieuweOptieNaam.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    nieuweOptieToevoegenFunctie();

                }

            }
        );

    }


    // ==================================
    // KORTE INVOER OPSLAAN
    // ==================================

    if (kortInvoerOpslaan) {

        kortInvoerOpslaan.addEventListener(
            "click",
            () => {

                korteInvullingOpslaan();

            }
        );

    }


    // ==================================
    // KORTE INVOER ANNULEREN
    // ==================================

    if (kortInvoerAnnuleren) {

        kortInvoerAnnuleren.addEventListener(
            "click",
            () => {

                sluitKorteInvoer();

            }
        );

    }


    // ==================================
    // ENTER BIJ KORTE INVOER
    // ==================================

    if (kortInvoer) {

        kortInvoer.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    korteInvullingOpslaan();

                }

                if (
                    event.key === "Escape"
                ) {

                    event.preventDefault();

                    sluitKorteInvoer();

                }

            }
        );

    }

}


// ======================================
// SCHERM TONEN
// ======================================

function schermTonen(scherm) {

    hoofdScherm.classList.remove(
        "actief"
    );

    basisScherm.classList.remove(
        "actief"
    );

    moeilijkScherm.classList.remove(
        "actief"
    );

    checklistScherm.classList.remove(
        "actief"
    );


    if (scherm === "hoofd") {

        hoofdScherm.classList.add(
            "actief"
        );

    }


    if (scherm === "basis") {

        basisScherm.classList.add(
            "actief"
        );

    }


    if (scherm === "moeilijk") {

        moeilijkScherm.classList.add(
            "actief"
        );

    }


    if (scherm === "checklist") {

        checklistScherm.classList.add(
            "actief"
        );

    }


    huidigScherm =
        scherm;

}


// ======================================
// BASIS CHECKLIST OPENEN
// ======================================

function checklistOpenen(
    blokNaam
) {

    dagStatusControleren();


    const gegevens =
        basisStructuur[blokNaam];


    if (!gegevens) {

        return;

    }


    vorigeScherm =
        "basis";

    huidigeChecklist =
        blokNaam;


    checklistLabel.textContent =
        "BASIS";


    checklistTitel.textContent =
        gegevens.titel;


    checklistSubtitel.textContent =
        gegevens.subtitel;


    /*
     * Bewerkknop alleen bij BASIS.
     */

    if (basisBewerkContainer) {

        basisBewerkContainer.hidden =
            false;

    }


    optiesBewerkScherm.hidden =
        true;


    checklist.innerHTML =
        "";


    beloningVerbergen();


    gegevens.opties.forEach(
        (optie) => {

            const item =
                checklistItemMaken(
                    blokNaam,
                    optie
                );

            checklist.appendChild(
                item
            );

        }
    );


    schermTonen(
        "checklist"
    );

}


// ======================================
// MOEILIJKE DAG CHECKLIST OPENEN
// ======================================

function moeilijkeChecklistOpenen(
    blokNaam
) {

    dagStatusControleren();


    const gegevens =
        MOEILIJKE_DAG_CHECKLISTS[
            blokNaam
        ];


    if (!gegevens) {

        return;

    }


    vorigeScherm =
        "moeilijk";


    huidigeChecklist =
        blokNaam;


    checklistLabel.textContent =
        "MOEILIJKE DAG";


    checklistTitel.textContent =
        gegevens.titel;


    checklistSubtitel.textContent =
        gegevens.subtitel;


    /*
     * Bewerkfunctie verbergen.
     */

    if (basisBewerkContainer) {

        basisBewerkContainer.hidden =
            true;

    }


    optiesBewerkScherm.hidden =
        true;


    checklist.innerHTML =
        "";


    beloningVerbergen();


    gegevens.taken.forEach(
        (taak) => {

            const item =
                moeilijkeTaakMaken(
                    blokNaam,
                    taak
                );

            checklist.appendChild(
                item
            );

        }
    );


    schermTonen(
        "checklist"
    );

}


// ======================================
// BASIS CHECKLIST ITEM MAKEN
// ======================================

function checklistItemMaken(
    blokNaam,
    optie
) {

    const item =
        document.createElement(
            "button"
        );


    item.type =
        "button";


    item.className =
        "checklist-item";


    const checkbox =
        document.createElement(
            "span"
        );


    checkbox.className =
        "checklist-checkbox";


    const tekst =
        document.createElement(
            "span"
        );


    tekst.className =
        "checklist-tekst";


    tekst.textContent =
        optie.tekst;


    const sleutel =
        taakSleutel(
            blokNaam,
            optie.id
        );


    const afgerond =
        dagStatus.afgerond[
            sleutel
        ] === true;


    const invulling =
        dagStatus.invulling[
            sleutel
        ] || "";


    if (afgerond) {

        item.classList.add(
            "afgerond"
        );

        checkbox.textContent =
            "✓";

    } else {

        checkbox.textContent =
            "";

    }


    item.appendChild(
        checkbox
    );


    item.appendChild(
        tekst
    );


    /*
     * Wanneer er vandaag een korte
     * invulling is opgeslagen, tonen
     * we die onder / naast de optie.
     */

    if (
        afgerond &&
        invulling
    ) {

        const antwoord =
            document.createElement(
                "span"
            );


        antwoord.className =
            "checklist-antwoord";


        antwoord.textContent =
            invulling;


        item.appendChild(
            antwoord
        );

    }


    item.addEventListener(
        "click",
        () => {

            basisOptieKlik(
                item,
                checkbox,
                blokNaam,
                optie
            );

        }
    );


    return item;

}


// ======================================
// MOEILIJKE DAG ITEM MAKEN
// ======================================

function moeilijkeTaakMaken(
    blokNaam,
    taak
) {

    const item =
        document.createElement(
            "button"
        );


    item.type =
        "button";


    item.className =
        "checklist-item";


    const checkbox =
        document.createElement(
            "span"
        );


    checkbox.className =
        "checklist-checkbox";


    const tekst =
        document.createElement(
            "span"
        );


    tekst.className =
        "checklist-tekst";


    tekst.textContent =
        taak;


    const sleutel =
        taakSleutel(
            blokNaam,
            taak
        );


    if (
        dagStatus.afgerond[sleutel]
    ) {

        item.classList.add(
            "afgerond"
        );

        checkbox.textContent =
            "✓";

    }


    item.appendChild(
        checkbox
    );


    item.appendChild(
        tekst
    );


    item.addEventListener(
        "click",
        () => {

            moeilijkeTaakAfvinken(
                item,
                checkbox,
                blokNaam,
                taak
            );

        }
    );


    return item;

}


// ======================================
// BASIS OPTIE KLIKKEN
// ======================================

function basisOptieKlik(
    item,
    checkbox,
    blokNaam,
    optie
) {

    const sleutel =
        taakSleutel(
            blokNaam,
            optie.id
        );


    /*
     * Staat hij al aan?
     * Dan weer uitzetten.
     */

    if (
        item.classList.contains(
            "afgerond"
        )
    ) {

        item.classList.remove(
            "afgerond"
        );

        checkbox.textContent =
            "";


        delete dagStatus.afgerond[
            sleutel
        ];


        delete dagStatus.invulling[
            sleutel
        ];


        dagStatusOpslaan();


        /*
         * Opnieuw tekenen zodat een eventueel
         * opgeslagen steekwoord verdwijnt.
         */

        checklistOpnieuwTekenen();


        return;

    }


    /*
     * Heeft deze optie een korte invoer?
     */

    if (optie.invoer) {

        huidigeOptieVoorInvoer = {

            blokNaam:
                blokNaam,

            optie:
                optie,

            item:
                item,

            checkbox:
                checkbox

        };


        korteInvoerOpenen(
            optie
        );


        return;

    }


    /*
     * Gewoon afvinken.
     */

    item.classList.add(
        "afgerond"
    );

    checkbox.textContent =
        "✓";


    dagStatus.afgerond[
        sleutel
    ] = true;


    dagStatusOpslaan();


    beloningTonen();

}


// ======================================
// MOEILIJKE DAG AFVINKEN
// ======================================

function moeilijkeTaakAfvinken(
    item,
    checkbox,
    blokNaam,
    taak
) {

    const sleutel =
        taakSleutel(
            blokNaam,
            taak
        );


    if (
        item.classList.contains(
            "afgerond"
        )
    ) {

        item.classList.remove(
            "afgerond"
        );

        checkbox.textContent =
            "";


        delete dagStatus.afgerond[
            sleutel
        ];


        dagStatusOpslaan();


        return;

    }


    item.classList.add(
        "afgerond"
    );


    checkbox.textContent =
        "✓";


    dagStatus.afgerond[
        sleutel
    ] = true;


    dagStatusOpslaan();


    beloningTonen();

}


// ======================================
// KORTE INVOER OPENEN
// ======================================

function korteInvoerOpenen(
    optie
) {

    if (!kortInvoerContainer) {

        return;

    }


    kortInvoerTitel.textContent =
        optie.tekst;


    kortInvoerUitleg.textContent =
        "Eén kort woord is genoeg.";


    kortInvoer.value =
        "";


    kortInvoerContainer.hidden =
        false;


    /*
     * Kleine vertraging zodat de browser
     * eerst het veld zichtbaar maakt.
     */

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

function sluitKorteInvoer() {

    if (!kortInvoerContainer) {

        return;

    }


    kortInvoerContainer.hidden =
        true;


    if (kortInvoer) {

        kortInvoer.value =
            "";

    }


    huidigeOptieVoorInvoer =
        null;

}


// ======================================
// KORTE INVULLING OPSLAAN
// ======================================

function korteInvullingOpslaan() {

    if (
        !huidigeOptieVoorInvoer
    ) {

        return;

    }


    const waarde =
        kortInvoer.value.trim();


    const blokNaam =
        huidigeOptieVoorInvoer.blokNaam;


    const optie =
        huidigeOptieVoorInvoer.optie;


    const sleutel =
        taakSleutel(
            blokNaam,
            optie.id
        );


    /*
     * Een leeg veld mag ook.
     *
     * Zo kan iemand alsnog gewoon aangeven:
     * "dit heb ik gedaan", zonder verplicht
     * iets te moeten invullen.
     */

    dagStatus.afgerond[
        sleutel
    ] = true;


    if (waarde) {

        dagStatus.invulling[
            sleutel
        ] = waarde;

    } else {

        delete dagStatus.invulling[
            sleutel
        ];

    }


    dagStatusOpslaan();


    sluitKorteInvoer();


    checklistOpnieuwTekenen();


    beloningTonen();

}


// ======================================
// CHECKLIST OPNIEUW TEKENEN
// ======================================

function checklistOpnieuwTekenen() {

    if (!huidigeChecklist) {

        return;

    }


    if (
        basisStructuur[
            huidigeChecklist
        ]
    ) {

        const gegevens =
            basisStructuur[
                huidigeChecklist
            ];


        checklist.innerHTML =
            "";


        gegevens.opties.forEach(
            (optie) => {

                checklist.appendChild(
                    checklistItemMaken(
                        huidigeChecklist,
                        optie
                    )
                );

            }
        );


        return;

    }


    if (
        MOEILIJKE_DAG_CHECKLISTS[
            huidigeChecklist
        ]
    ) {

        const gegevens =
            MOEILIJKE_DAG_CHECKLISTS[
                huidigeChecklist
            ];


        checklist.innerHTML =
            "";


        gegevens.taken.forEach(
            (taak) => {

                checklist.appendChild(
                    moeilijkeTaakMaken(
                        huidigeChecklist,
                        taak
                    )
                );

            }
        );

    }

}


// ======================================
// OPTIES BEWERKEN OPENEN
// ======================================

function optiesBewerkOpenen() {

    if (
        !basisStructuur[
            huidigeChecklist
        ]
    ) {

        return;

    }


    optiesEditorVullen();


    optiesBewerkScherm.hidden =
        false;


    if (nieuweOptieNaam) {

        nieuweOptieNaam.value =
            "";

    }


    if (nieuweOptieInvoer) {

        nieuweOptieInvoer.checked =
            false;

    }


    setTimeout(
        () => {

            if (nieuweOptieNaam) {

                nieuweOptieNaam.focus();

            }

        },
        50
    );

}


// ======================================
// OPTIES BEWERKEN SLUITEN
// ======================================

function optiesBewerkSluitenFunctie() {

    if (!optiesBewerkScherm) {

        return;

    }


    optiesBewerkScherm.hidden =
        true;

}


// ======================================
// OPTIES EDITOR VULLEN
// ======================================

function optiesEditorVullen() {

    if (!optiesEditor) {

        return;

    }


    const gegevens =
        basisStructuur[
            huidigeChecklist
        ];


    if (!gegevens) {

        return;

    }


    optiesEditor.innerHTML =
        "";


    gegevens.opties.forEach(
        (optie, index) => {

            const rij =
                document.createElement(
                    "div"
                );


            rij.className =
                "optie-editor-rij";


            /*
             * Nummer
             */

            const nummer =
                document.createElement(
                    "span"
                );


            nummer.className =
                "optie-editor-nummer";


            nummer.textContent =
                `${index + 1}.`;


            /*
             * Inhoud
             */

            const inhoud =
                document.createElement(
                    "div"
                );


            inhoud.className =
                "optie-editor-inhoud";


            /*
             * Naam
             */

            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "text";


            input.className =
                "optie-editor-input";


            input.value =
                optie.tekst;


            input.maxLength =
                60;


            input.autocomplete =
                "off";


            input.setAttribute(
                "aria-label",
                "Naam van optie"
            );


            /*
             * Kort antwoord
             */

            const invoerLabel =
                document.createElement(
                    "label"
                );


            invoerLabel.className =
                "optie-editor-invoer";


            const invoerCheckbox =
                document.createElement(
                    "input"
                );


            invoerCheckbox.type =
                "checkbox";


            invoerCheckbox.checked =
                optie.invoer === true;


            const invoerTekst =
                document.createElement(
                    "span"
                );


            invoerTekst.textContent =
                "Kort antwoord vragen";


            invoerLabel.appendChild(
                invoerCheckbox
            );


            invoerLabel.appendChild(
                invoerTekst
            );


            /*
             * Opslaan knop
             */

            const opslaan =
                document.createElement(
                    "button"
                );


            opslaan.type =
                "button";


            opslaan.className =
                "optie-opslaan-knop";


            opslaan.textContent =
                "Opslaan";


            /*
             * Verwijderen
             */

            const verwijderen =
                document.createElement(
                    "button"
                );


            verwijderen.type =
                "button";


            verwijderen.className =
                "optie-verwijder-knop";


            verwijderen.textContent =
                "Verwijder";


            /*
             * Opslaan actie
             */

            opslaan.addEventListener(
                "click",
                () => {

                    const nieuweNaam =
                        input.value.trim();


                    if (!nieuweNaam) {

                        input.focus();

                        return;

                    }


                    const oudeId =
                        optie.id;


                    optie.tekst =
                        nieuweNaam;


                    optie.invoer =
                        invoerCheckbox.checked;


                    /*
                     * De ID blijft gelijk.
                     *
                     * Hierdoor blijven eventuele
                     * dagelijkse gegevens technisch
                     * gekoppeld aan dezelfde optie.
                     */

                    basisStructuurOpslaan();


                    /*
                     * Eventueel opgeslagen dagstatus
                     * blijft behouden.
                     */

                    checklistOpnieuwTekenen();


                    optiesEditorVullen();


                }
            );


            /*
             * Ook direct opslaan met Enter.
             */

            input.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        opslaan.click();

                    }

                }
            );


            /*
             * Verwijderen
             */

            verwijderen.addEventListener(
                "click",
                () => {

                    if (
                        gegevens.opties.length <= 1
                    ) {

                        return;

                    }


                    gegevens.opties =
                        gegevens.opties.filter(
                            (item) =>
                                item.id !==
                                optie.id
                        );


                    basisStructuurOpslaan();


                    /*
                     * Oude dagelijkse status
                     * van deze optie opruimen.
                     */

                    verwijderDaggegevensVoorOptie(
                        huidigeChecklist,
                        oudeId
                    );


                    checklistOpnieuwTekenen();


                    optiesEditorVullen();

                }
            );


            inhoud.appendChild(
                input
            );


            inhoud.appendChild(
                invoerLabel
            );


            const acties =
                document.createElement(
                    "div"
                );


            acties.className =
                "optie-editor-acties";


            acties.appendChild(
                opslaan
            );


            acties.appendChild(
                verwijderen
            );


            rij.appendChild(
                nummer
            );


            rij.appendChild(
                inhoud
            );


            rij.appendChild(
                acties
            );


            optiesEditor.appendChild(
                rij
            );

        }
    );

}


// ======================================
// NIEUWE OPTIE TOEVOEGEN
// ======================================

function nieuweOptieToevoegenFunctie() {

    if (!huidigeChecklist) {

        return;

    }


    const gegevens =
        basisStructuur[
            huidigeChecklist
        ];


    if (!gegevens) {

        return;

    }


    const naam =
        nieuweOptieNaam.value.trim();


    if (!naam) {

        nieuweOptieNaam.focus();

        return;

    }


    /*
     * Unieke ID maken.
     */

    const id =
        uniekeOptieId(
            huidigeChecklist,
            naam
        );


    gegevens.opties.push({

        id: id,

        tekst: naam,

        invoer:
            nieuweOptieInvoer.checked

    });


    basisStructuurOpslaan();


    nieuweOptieNaam.value =
        "";


    nieuweOptieInvoer.checked =
        false;


    checklistOpnieuwTekenen();


    optiesEditorVullen();


    nieuweOptieNaam.focus();

}


// ======================================
// UNIEKE OPTIE ID
// ======================================

function uniekeOptieId(
    categorie,
    tekst
) {

    let basis =
        tekst
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9À-ÿ]+/gi,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );


    if (!basis) {

        basis =
            "optie";

    }


    let id =
        basis;

    let teller =
        2;


    const bestaande =
        basisStructuur[
            categorie
        ]?.opties || [];


    while (
        bestaande.some(
            (optie) =>
                optie.id === id
        )
    ) {

        id =
            `${basis}-${teller}`;

        teller++;

    }


    return id;

}


// ======================================
// DAGGEGEVENS VAN VERWIJDERDE OPTIE
// OPRUIMEN
// ======================================

function verwijderDaggegevensVoorOptie(
    categorie,
    optieId
) {

    const sleutel =
        taakSleutel(
            categorie,
            optieId
        );


    delete dagStatus.afgerond[
        sleutel
    ];


    delete dagStatus.invulling[
        sleutel
    ];


    dagStatusOpslaan();

}


// ======================================
// POSITIEVE FEEDBACK TONEN
// ======================================

function beloningTonen() {

    if (!beloning) {

        return;

    }


    const index =
        Math.floor(
            Math.random() *
            BELONINGEN.length
        );


    const boodschap =
        BELONINGEN[index];


    if (beloningTekst) {

        beloningTekst.textContent =
            boodschap;

    } else {

        beloning.textContent =
            boodschap;

    }


    beloning.hidden =
        false;


    beloning.classList.remove(
        "zichtbaar"
    );


    /*
     * Forceer nieuwe animatie.
     */

    void beloning.offsetWidth;


    beloning.classList.add(
        "zichtbaar"
    );


    /*
     * Feedback verdwijnt niet meteen.
     *
     * Hij blijft zichtbaar zodat het
     * positieve moment echt even blijft staan.
     */

}


// ======================================
// POSITIEVE FEEDBACK VERBERGEN
// ======================================

function beloningVerbergen() {

    if (!beloning) {

        return;

    }


    beloning.classList.remove(
        "zichtbaar"
    );


    beloning.hidden =
        true;

}


// ======================================
// SERVICE WORKER
// ======================================

function serviceWorkerRegistreren() {

    if (
        "serviceWorker" in navigator
    ) {

        navigator.serviceWorker
            .register("sw.js")
            .then(
                () => {

                    console.log(
                        "Anker service worker geregistreerd."
                    );

                }
            )
            .catch(
                (fout) => {

                    console.warn(
                        "Service worker kon niet worden geregistreerd.",
                        fout
                    );

                }
            );

    }

}


// ======================================
// SERVICE WORKER STARTEN
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        serviceWorkerRegistreren();

    }
);


// ======================================
// EINDE
// ======================================
