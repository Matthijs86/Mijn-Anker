// ======================================
// ANKER
// TERUG NAAR DE BASIS
// ======================================


// ======================================
// CHECKLISTS
// ======================================

const CHECKLISTS = {

    // ==================================
    // BASIS
    // ==================================

    zelfzorg: {
        titel: "Zelfzorg",
        subtitel: "Zorg goed voor jezelf.",
        taken: [
            "Douchen",
            "Tanden poetsen",
            "Deodorant",
            "Schone kleding"
        ]
    },


    eten: {
        titel: "Eten & drinken",
        subtitel: "Geef je lichaam wat het nodig heeft.",
        taken: [
            "Iets gegeten",
            "Water gedronken",
            "Iets anders gedronken"
        ]
    },


    omgeving: {
        titel: "Omgeving",
        subtitel: "Een beetje orde om je heen.",
        taken: [
            "Afwas / vaat",
            "Even iets opruimen"
        ]
    },


    beweging: {
        titel: "Beweging & buiten",
        subtitel: "Even bewegen of naar buiten.",
        taken: [
            "Even naar buiten",
            "Klein blokje om",
            "Even bewegen"
        ]
    },


    hoofd: {
        titel: "Hoofd & ontspanning",
        subtitel: "Rust, plezier en ontspanning.",
        taken: [
            "Even rust genomen",
            "Muziek geluisterd",
            "Iets gedaan waar ik plezier aan beleef"
        ]
    },


    borden: {
        titel: "Check mijn borden",
        subtitel: "Misschien staat er iets voor vandaag.",
        taken: [
            "Mijn borden bekeken",
            "Een klein taakje van een bord gedaan"
        ]
    },


    // ==================================
    // MOEILIJKE DAG
    // ==================================

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
// POSITIEVE BOODSCHAPPEN
// ======================================

const BELONINGEN = [

    "💚 Lekker bezig!",

    "🫶 Goed voor jezelf zorgen is óók iets doen.",

    "🌱 Eén ding gedaan. Dat telt.",

    "✨ Kijk jou eens goed voor jezelf zorgen!",

    "💪 Bam! Weer eentje geregeld.",

    "😎 Check. Lekker bezig.",

    "🌟 Je hoeft niet alles te doen. Je hebt wél iets gedaan.",

    "❤️ Goed gedaan. Echt.",

    "🙌 Mooi! Weer een klein stukje verder.",

    "🌿 Rustig aan. Je bent goed bezig.",

    "⚓ Weer even goed voor jezelf gezorgd.",

    "😊 Kijk, dat heb je mooi gedaan.",

    "💫 Klein ding, mooi resultaat.",

    "🧡 Top. Dat mag je best even waarderen.",

    "🎉 Yes! Geregeld.",

    "🌈 Eén vinkje tegelijk.",

    "👏 Goed bezig. Ga zo door, op jouw tempo.",

    "☀️ Fijn dat je even voor jezelf hebt gezorgd.",

    "💜 Dat telt.",

    "⚡ Hoppa! Eentje afgevinkt."

];


// ======================================
// SCHERMEN
// ======================================

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisScherm =
    document.getElementById("basisScherm");

const moeilijkeDagScherm =
    document.getElementById("moeilijkeDagScherm");

const checklistScherm =
    document.getElementById("checklistScherm");


// ======================================
// KNOPPEN
// ======================================

const basisKnop =
    document.getElementById("basisKnop");

const moeilijkeDagKnop =
    document.getElementById("moeilijkeDagKnop");

const basisTerugKnop =
    document.getElementById("basisTerugKnop");

const moeilijkeDagTerugKnop =
    document.getElementById(
        "moeilijkeDagTerugKnop"
    );

const checklistTerugKnop =
    document.getElementById(
        "checklistTerugKnop"
    );


// ======================================
// CHECKLIST ELEMENTEN
// ======================================

const checklist =
    document.getElementById("checklist");

const checklistTitel =
    document.getElementById("checklistTitel");

const checklistSubtitel =
    document.getElementById(
        "checklistSubtitel"
    );

const beloning =
    document.getElementById("beloning");


// ======================================
// HUIDIGE STAAT
// ======================================

let huidigScherm = "hoofd";

let vorigeScherm = "hoofd";

let huidigeChecklist = null;


// ======================================
// START
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        gebeurtenissenInstellen();

    }
);


// ======================================
// GEBEURTENISSEN INSTELLEN
// ======================================

function gebeurtenissenInstellen() {


    // ==================================
    // HOOFDSCHERM
    // ==================================

    basisKnop.addEventListener(
        "click",
        () => {

            schermTonen("basis");

        }
    );


    moeilijkeDagKnop.addEventListener(
        "click",
        () => {

            schermTonen("moeilijkeDag");

        }
    );


    // ==================================
    // TERUGKNOPPEN
    // ==================================

    basisTerugKnop.addEventListener(
        "click",
        () => {

            schermTonen("hoofd");

        }
    );


    moeilijkeDagTerugKnop.addEventListener(
        "click",
        () => {

            schermTonen("hoofd");

        }
    );


    checklistTerugKnop.addEventListener(
        "click",
        () => {

            schermTonen(vorigeScherm);

        }
    );


    // ==================================
    // BLOKKEN
    // ==================================

    const blokken =
        document.querySelectorAll(
            ".blok"
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

}


// ======================================
// SCHERM TONEN
// ======================================

function schermTonen(scherm) {


    // Alle schermen verbergen

    hoofdScherm.classList.remove(
        "actief"
    );

    basisScherm.classList.remove(
        "actief"
    );

    moeilijkeDagScherm.classList.remove(
        "actief"
    );

    checklistScherm.classList.remove(
        "actief"
    );


    // Gewenst scherm tonen

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


    if (scherm === "moeilijkeDag") {

        moeilijkeDagScherm.classList.add(
            "actief"
        );

    }


    if (scherm === "checklist") {

        checklistScherm.classList.add(
            "actief"
        );

    }


    huidigScherm = scherm;

}


// ======================================
// CHECKLIST OPENEN
// ======================================

function checklistOpenen(blokNaam) {

    const gegevens =
        CHECKLISTS[blokNaam];


    if (!gegevens) {

        return;

    }


    // Onthouden waar we vandaan kwamen

    vorigeScherm =
        huidigScherm;


    huidigeChecklist =
        blokNaam;


    // Titel instellen

    checklistTitel.textContent =
        gegevens.titel;


    checklistSubtitel.textContent =
        gegevens.subtitel;


    // Oude inhoud verwijderen

    checklist.innerHTML = "";


    // Oude beloning verwijderen

    beloning.textContent = "";

    beloning.classList.remove(
        "zichtbaar"
    );


    // ==================================
    // TAKEN MAKEN
    // ==================================

    gegevens.taken.forEach(
        (taak) => {

            const item =
                document.createElement(
                    "button"
                );


            item.type = "button";

            item.className =
                "checklist-item";


            // Checkbox

            const checkbox =
                document.createElement(
                    "span"
                );

            checkbox.className =
                "checklist-checkbox";

            checkbox.textContent = " ";


            // Tekst

            const tekst =
                document.createElement(
                    "span"
                );

            tekst.className =
                "checklist-tekst";

            tekst.textContent =
                taak;


            // Onderdelen toevoegen

            item.appendChild(
                checkbox
            );

            item.appendChild(
                tekst
            );


            // Klikgebeurtenis

            item.addEventListener(
                "click",
                () => {

                    taakAfvinken(
                        item,
                        checkbox
                    );

                }
            );


            checklist.appendChild(
                item
            );

        }
    );


    // Checklist tonen

    schermTonen(
        "checklist"
    );

}


// ======================================
// TAAK AFVINKEN
// ======================================

function taakAfvinken(
    item,
    checkbox
) {


    // Als de taak al klaar is:
    // weer ongedaan maken.

    if (
        item.classList.contains(
            "afgerond"
        )
    ) {

        item.classList.remove(
            "afgerond"
        );

        checkbox.textContent = " ";

        return;

    }


    // Taak afronden

    item.classList.add(
        "afgerond"
    );

    checkbox.textContent = "✓";


    // Positieve boodschap tonen

    beloningTonen();

}


// ======================================
// RANDOM BELONING
// ======================================

function beloningTonen() {

    const index =
        Math.floor(
            Math.random() *
            BELONINGEN.length
        );


    const boodschap =
        BELONINGEN[index];


    beloning.textContent =
        boodschap;


    beloning.classList.add(
        "zichtbaar"
    );

}


// ======================================
// EINDE
// ======================================