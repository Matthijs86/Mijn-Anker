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
// DAGSTATUS
// ======================================

// Alleen de vinkjes van VANDAAG worden bewaard.
// Zodra een nieuwe dag begint, wordt alles automatisch blanco.

const OPSLAG_DAGSTATUS = "ankerDagstatus";

let dagStatus = {
    datum: "",
    afgerond: {}
};


// ======================================
// SCHERMEN
// ======================================

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisScherm =
    document.getElementById("basisScherm");

const moeilijkeDagScherm =
    document.getElementById("moeilijkeDagScherm);

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

        dagStatusLaden();

        gebeurtenissenInstellen();

    }
);


// ======================================
// DATUM VAN VANDAAG
// ======================================

function vandaag() {

    const datum = new Date();

    const jaar = datum.getFullYear();

    const maand = String(
        datum.getMonth() + 1
    ).padStart(2, "0");

    const dag = String(
        datum.getDate()
    ).padStart(2, "0");

    return `${jaar}-${maand}-${dag}`;

}


// ======================================
// DAGSTATUS LADEN
// ======================================

function dagStatusLaden() {

    const datumVandaag = vandaag();

    try {

        const opgeslagen =
            localStorage.getItem(
                OPSLAG_DAGSTATUS
            );

        if (!opgeslagen) {

            dagStatus = {
                datum: datumVandaag,
                afgerond: {}
            };

            dagStatusOpslaan();

            return;
        }


        const gegevens =
            JSON.parse(opgeslagen);


        // Is dit een nieuwe dag?
        if (
            !gegevens ||
            gegevens.datum !== datumVandaag
        ) {

            dagStatus = {
                datum: datumVandaag,
                afgerond: {}
            };

            dagStatusOpslaan();

            return;
        }


        // Status van vandaag gebruiken

        dagStatus = {
            datum: datumVandaag,
            afgerond:
                gegevens.afgerond || {}
        };

    } catch (fout) {

        // Bij een fout altijd veilig
        // met een lege dag beginnen.

        dagStatus = {
            datum: datumVandaag,
            afgerond: {}
        };

        dagStatusOpslaan();

    }

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

        console.warn(
            "Dagstatus kon niet worden opgeslagen.",
            fout
        );

    }

}


// ======================================
// UNIEKE SLEUTEL VOOR EEN TAAK
// ======================================

// We bewaren niet alleen "Douchen",
// maar bijvoorbeeld:
//
// zelfzorg::Douchen
//
// Hierdoor kunnen dezelfde taaknamen
// veilig in verschillende checklists bestaan.

function taakSleutel(
    checklistNaam,
    taak
) {

    return `${checklistNaam}::${taak}`;

}


// ======================================
// CONTROLEREN OF TAAK AFGEROND IS
// ======================================

function taakIsAfgerond(
    checklistNaam,
    taak
) {

    const sleutel =
        taakSleutel(
            checklistNaam,
            taak
        );

    return dagStatus.afgerond[sleutel] === true;

}


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


    // ==================================
    // DAGSTATUS CONTROLEREN
    // ==================================

    // Voor de zekerheid controleren we
    // opnieuw of het nog dezelfde dag is.

    const datumVandaag = vandaag();

    if (dagStatus.datum !== datumVandaag) {

        dagStatus = {
            datum: datumVandaag,
            afgerond: {}
        };

        dagStatusOpslaan();

    }


    // ==================================
    // ONTHOUDEN WAAR WE VANDAAN KWAMEN
    // ==================================

    vorigeScherm =
        huidigScherm;

    huidigeChecklist =
        blokNaam;


    // ==================================
    // TITEL INSTELLEN
    // ==================================

    checklistTitel.textContent =
        gegevens.titel;

    checklistSubtitel.textContent =
        gegevens.subtitel;


    // ==================================
    // OUDE INHOUD VERWIJDEREN
    // ==================================

    checklist.innerHTML = "";


    // ==================================
    // OUDE BELONING VERWIJDEREN
    // ==================================

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


            // ==================================
            // CHECKBOX
            // ==================================

            const checkbox =
                document.createElement(
                    "span"
                );

            checkbox.className =
                "checklist-checkbox";

            checkbox.textContent = " ";


            // ==================================
            // TEKST
            // ==================================

            const tekst =
                document.createElement(
                    "span"
                );

            tekst.className =
                "checklist-tekst";

            tekst.textContent =
                taak;


            // ==================================
            // EERDER AFGEROND?
            // ==================================

            if (
                taakIsAfgerond(
                    blokNaam,
                    taak
                )
            ) {

                item.classList.add(
                    "afgerond"
                );

                checkbox.textContent = "✓";

            }


            // ==================================
            // ONDERDELEN TOEVOEGEN
            // ==================================

            item.appendChild(
                checkbox
            );

            item.appendChild(
                tekst
            );


            // ==================================
            // KLIKGEbeurtenis
            // ==================================

            item.addEventListener(
                "click",
                () => {

                    taakAfvinken(
                        item,
                        checkbox,
                        blokNaam,
                        taak
                    );

                }
            );


            checklist.appendChild(
                item
            );

        }
    );


    // ==================================
    // CHECKLIST TONEN
    // ==================================

    schermTonen(
        "checklist"
    );

}


// ======================================
// TAAK AFVINKEN
// ======================================

function taakAfvinken(
    item,
    checkbox,
    checklistNaam,
    taak
) {


    const sleutel =
        taakSleutel(
            checklistNaam,
            taak
        );


    // ==================================
    // TAAK AL AFGEROND?
    // ==================================

    if (
        item.classList.contains(
            "afgerond"
        )
    ) {

        // Taak weer openzetten

        item.classList.remove(
            "afgerond"
        );

        checkbox.textContent = " ";


        // Ook uit de dagstatus verwijderen

        delete dagStatus.afgerond[sleutel];

        dagStatusOpslaan();


        return;

    }


    // ==================================
    // TAAK AFRONDEN
    // ==================================

    item.classList.add(
        "afgerond"
    );

    checkbox.textContent = "✓";


    // In de dagstatus zetten

    dagStatus.afgerond[sleutel] = true;

    dagStatusOpslaan();


    // ==================================
    // POSITIEVE BOODSCHAP
    // ==================================

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


    beloning.classList.remove(
        "zichtbaar"
    );


    // Forceer een nieuwe animatie
    // wanneer de gebruiker meerdere
    // taken achter elkaar afvinkt.

    void beloning.offsetWidth;


    beloning.classList.add(
        "zichtbaar"
    );

}


// ======================================
// EINDE
// ======================================

