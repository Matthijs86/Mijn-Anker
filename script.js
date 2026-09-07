/* =========================================================
   ANKER
   Terug naar de basis.
   ========================================================= */


/* =========================================================
   OPSLAG
   ========================================================= */

/*
   DAGSTATUS
   ----------
   Deze opslag wordt iedere nieuwe dag opnieuw begonnen.

   Persoonlijke opties
   -------------------
   Deze blijven juist bestaan totdat de gebruiker ze zelf
   aanpast of verwijdert.
*/

const OPSLAG_DAGSTATUS = "ankerDagstatus";

const OPSLAG_SAFEFOODS = "ankerSafeFoods";

const OPSLAG_PRETTIGE_ACTIVITEITEN =
    "ankerPrettigeActiviteiten";


/* =========================================================
   STANDAARD PERSOONLIJKE OPTIES
   ========================================================= */

/*
   Deze worden alleen gebruikt wanneer er nog geen
   persoonlijke lijst bestaat.

   Daarna wordt de lijst volledig door de gebruiker beheerd.
*/

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
   DATA
   ========================================================= */

let dagStatus = {
    datum: "",
    afgerond: {},
    toevoegingen: {}
};


let safeFoods = [];

let prettigeActiviteiten = [];


/*
   Houdt bij welke persoonlijke lijst momenteel
   wordt beheerd.
*/

let huidigeBeheerCategorie = null;


/*
   Houdt bij welke persoonlijke optie momenteel
   wordt bewerkt.
*/

let huidigeBewerkOptie = null;


/* =========================================================
   ELEMENTEN
   ========================================================= */

const hoofdScherm =
    document.getElementById("hoofdScherm");

const basisScherm =
    document.getElementById("basisScherm");

const moeilijkScherm =
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

const kortInvoerSluiten =
    document.getElementById("kortInvoerSluiten");

const invoerAnnuleren =
    document.getElementById("invoerAnnuleren");

const invoerOpslaan =
    document.getElementById("invoerOpslaan");


const beloning =
    document.getElementById("beloning");

const beloningTekst =
    document.getElementById("beloningTekst");


const moeilijkEtenOpties =
    document.getElementById("moeilijkEtenOpties");

const moeilijkPrettigOpties =
    document.getElementById("moeilijkPrettigOpties");


const etenOptieToevoegen =
    document.getElementById("etenOptieToevoegen");

const etenOptiesBeheren =
    document.getElementById("etenOptiesBeheren");


const prettigOptieToevoegen =
    document.getElementById("prettigOptieToevoegen");

const prettigOptiesBeheren =
    document.getElementById("prettigOptiesBeheren");


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


/* =========================================================
   DATUM
   ========================================================= */

function vandaagDatum() {

    const vandaag = new Date();

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


/* =========================================================
   DAGSTATUS LADEN
   ========================================================= */

function dagStatusLaden() {

    const opgeslagen =
        localStorage.getItem(
            OPSLAG_DAGSTATUS
        );

    const datum =
        vandaagDatum();


    /*
       Geen eerdere opslag:
       begin schoon.
    */

    if (!opgeslagen) {

        dagStatus = {
            datum,
            afgerond: {},
            toevoegingen: {}
        };

        dagStatusOpslaan();

        return;
    }


    try {

        const data =
            JSON.parse(opgeslagen);


        /*
           Nieuwe dag:
           alleen de dagelijkse voortgang wordt
           opnieuw begonnen.
        */

        if (data.datum !== datum) {

            dagStatus = {
                datum,
                afgerond: {},
                toevoegingen: {}
            };

            dagStatusOpslaan();

            return;
        }


        dagStatus = {
            datum,
            afgerond:
                data.afgerond || {},

            toevoegingen:
                data.toevoegingen || {}
        };


    } catch (fout) {

        console.warn(
            "Anker: dagstatus kon niet worden geladen.",
            fout
        );

        dagStatus = {
            datum,
            afgerond: {},
            toevoegingen: {}
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
   PERSOONLIJKE OPTIES LADEN
   ========================================================= */

function persoonlijkeOptiesLaden() {

    safeFoods =
        persoonlijkeLijstLaden(
            OPSLAG_SAFEFOODS,
            STANDAARD_SAFEFOODS
        );


    prettigeActiviteiten =
        persoonlijkeLijstLaden(
            OPSLAG_PRETTIGE_ACTIVITEITEN,
            STANDAARD_PRETTIGE_ACTIVITEITEN
        );
}


/* =========================================================
   PERSOONLIJKE LIJST LADEN
   ========================================================= */

function persoonlijkeLijstLaden(
    opslagNaam,
    standaardLijst
) {

    const opgeslagen =
        localStorage.getItem(opslagNaam);


    /*
       Eerste keer:
       standaardlijst gebruiken en opslaan.
    */

    if (!opgeslagen) {

        const kopie =
            standaardLijst.map(
                optie => ({
                    ...optie
                })
            );

        localStorage.setItem(
            opslagNaam,
            JSON.stringify(kopie)
        );

        return kopie;
    }


    try {

        const data =
            JSON.parse(opgeslagen);


        if (!Array.isArray(data)) {

            return standaardLijst.map(
                optie => ({
                    ...optie
                })
            );
        }


        /*
           Oude of beschadigde items
           netjes normaliseren.
        */

        return data
            .filter(
                optie =>
                    optie &&
                    typeof optie.tekst === "string" &&
                    optie.tekst.trim() !== ""
            )
            .map(
                optie => ({
                    id:
                        optie.id ||
                        uniekeId(),

                    tekst:
                        optie.tekst.trim(),

                    icoon:
                        optie.icoon || "•"
                })
            );


    } catch (fout) {

        console.warn(
            "Anker: persoonlijke opties konden niet worden geladen.",
            fout
        );

        return standaardLijst.map(
            optie => ({
                ...optie
            })
        );
    }
}


/* =========================================================
   PERSOONLIJKE LIJST OPSLAAN
   ========================================================= */

function persoonlijkeLijstOpslaan(
    categorie
) {

    if (categorie === "eten") {

        localStorage.setItem(
            OPSLAG_SAFEFOODS,
            JSON.stringify(safeFoods)
        );

        return;
    }


    if (categorie === "prettig") {

        localStorage.setItem(
            OPSLAG_PRETTIGE_ACTIVITEITEN,
            JSON.stringify(
                prettigeActiviteiten
            )
        );
    }
}


/* =========================================================
   UNIEKE ID
   ========================================================= */

function uniekeId() {

    return (
        Date.now().toString(36) +
        "-" +
        Math.random()
            .toString(36)
            .slice(2, 9)
    );
}


/* =========================================================
   SCHERM WISSELEN
   ========================================================= */

function schermTonen(scherm) {

    document
        .querySelectorAll(".scherm")
        .forEach(
            element =>
                element.classList.remove("actief")
        );


    scherm.classList.add("actief");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   HOOFDSCHERM
   ========================================================= */

function naarHoofdscherm() {

    schermTonen(hoofdScherm);
}


/* =========================================================
   BASIS
   ========================================================= */

function naarBasis() {

    schermTonen(basisScherm);

    basisStatusBijwerken();
}


/* =========================================================
   MOEILIJKE DAG
   ========================================================= */

function naarMoeilijkeDag() {

    schermTonen(moeilijkScherm);

    persoonlijkeOptiesWeergeven();

    moeilijkStatusBijwerken();
}


/* =========================================================
   ACTIVITEIT
   ========================================================= */

let huidigeActiviteit = null;


/* =========================================================
   BASIS ACTIVITEIT OPENEN
   ========================================================= */

function basisActiviteitOpenen(knop) {

    const activiteit =
        knop.dataset.activiteit;

    const blok =
        knop.dataset.blok;


    huidigeActiviteit = {
        type: "basis",
        activiteit,
        blok
    };


    activiteitTitel.textContent =
        knop.querySelector(
            "span:last-child"
        )?.textContent ||
        "Activiteit";


    activiteitSubtitel.textContent =
        "Goed bezig. Kleine stapjes tellen.";


    activiteitInhoud.innerHTML = "";


    activiteitStatusTitel.textContent =
        activiteitTitel.textContent;


    activiteitStatusTekst.textContent =
        isAfgerond(
            activiteitSleutel(
                "basis",
                activiteit
            )
        )
            ? "Afgerond"
            : "Nog niet afgerond";


    activiteitStatusIcoon.textContent =
        isAfgerond(
            activiteitSleutel(
                "basis",
                activiteit
            )
        )
            ? "✓"
            : "○";


    activiteitKlaarKnop.textContent =
        isAfgerond(
            activiteitSleutel(
                "basis",
                activiteit
            )
        )
            ? "✓ Afgerond"
            : "✓ Klaar";


    /*
       Sommige BASIS-activiteiten kunnen
       extra invoer bevatten.
    */

    if (
        activiteit === "buiten" ||
        activiteit === "wandelen" ||
        activiteit === "bewegen" ||
        activiteit === "klein-taakje"
    ) {

        extraInvoerWeergeven(
            "basis",
            activiteit,
            activiteitInhoud
        );
    }


    schermTonen(activiteitScherm);
}


/* =========================================================
   ACTIVITEIT SLEUTEL
   ========================================================= */

function activiteitSleutel(
    type,
    activiteit
) {

    return `${type}:${activiteit}`;
}


/* =========================================================
   AFGEROND CONTROLEREN
   ========================================================= */

function isAfgerond(sleutel) {

    return dagStatus.afgerond[sleutel] === true;
}


/* =========================================================
   ACTIVITEIT AFRONDEN
   ========================================================= */

function activiteitKlaar() {

    if (!huidigeActiviteit) {
        return;
    }


    const sleutel =
        activiteitSleutel(
            huidigeActiviteit.type,
            huidigeActiviteit.activiteit
        );


    const wasAfgerond =
        isAfgerond(sleutel);


    dagStatus.afgerond[sleutel] =
        !wasAfgerond;


    dagStatusOpslaan();


    activiteitStatusTekst.textContent =
        !wasAfgerond
            ? "Afgerond"
            : "Nog niet afgerond";


    activiteitStatusIcoon.textContent =
        !wasAfgerond
            ? "✓"
            : "○";


    activiteitKlaarKnop.textContent =
        !wasAfgerond
            ? "✓ Afgerond"
            : "✓ Klaar";


    if (!wasAfgerond) {

        beloningTonen(
            beloningVoor(
                huidigeActiviteit.activiteit
            )
        );
    }


    basisStatusBijwerken();
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

            const activiteit =
                knop.dataset.activiteit;

            const sleutel =
                activiteitSleutel(
                    "basis",
                    activiteit
                );


            knop.classList.toggle(
                "afgerond",
                isAfgerond(sleutel)
            );


            const bestaandeAntwoord =
                knop.querySelector(
                    ".activiteit-antwoord"
                );


            if (bestaandeAntwoord) {
                bestaandeAntwoord.remove();
            }


            const aantal =
                aantalToevoegingen(
                    sleutel
                );


            if (aantal > 0) {

                const antwoord =
                    document.createElement("span");

                antwoord.className =
                    "activiteit-antwoord";

                antwoord.textContent =
                    `${aantal} toegevoegd`;

                knop.appendChild(antwoord);
            }
        });
}


/* =========================================================
   MOEILIJKE DAG STATUS
   ========================================================= */

function moeilijkStatusBijwerken() {

    document
        .querySelectorAll(
            "#moeilijkScherm .moeilijk-activiteit"
        )
        .forEach(knop => {

            const activiteit =
                knop.dataset.activiteit;

            const sleutel =
                activiteitSleutel(
                    "moeilijk",
                    activiteit
                );


            knop.classList.toggle(
                "afgerond",
                isAfgerond(sleutel)
            );
        });


    persoonlijkeOptiesWeergeven();
}


/* =========================================================
   MOEILIJKE DAG SIMPELE ACTIVITEIT
   ========================================================= */

function moeilijkeActiviteitKlik(knop) {

    const activiteit =
        knop.dataset.activiteit;

    const sleutel =
        activiteitSleutel(
            "moeilijk",
            activiteit
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

        beloningTonen(
            beloningVoor(
                activiteit
            )
        );
    }
}


/* =========================================================
   PERSOONLIJKE OPTIES WEERGEVEN
   ========================================================= */

function persoonlijkeOptiesWeergeven() {

    if (
        !moeilijkEtenOpties ||
        !moeilijkPrettigOpties
    ) {
        return;
    }


    persoonlijkeLijstWeergeven(
        moeilijkEtenOpties,
        safeFoods,
        "eten"
    );


    persoonlijkeLijstWeergeven(
        moeilijkPrettigOpties,
        prettigeActiviteiten,
        "prettig"
    );
}


/* =========================================================
   PERSOONLIJKE LIJST WEERGEVEN
   ========================================================= */

function persoonlijkeLijstWeergeven(
    container,
    lijst,
    categorie
) {

    container.innerHTML = "";


    if (lijst.length === 0) {

        const leeg =
            document.createElement("div");

        leeg.className =
            "persoonlijke-lijst-leeg";

        leeg.textContent =
            categorie === "eten"
                ? "Voeg een paar makkelijke opties toe."
                : "Voeg iets toe waarvan je weet dat het helpt.";

        container.appendChild(leeg);

        return;
    }


    lijst.forEach(optie => {

        const knop =
            document.createElement("button");

        knop.type = "button";

        knop.className =
            "persoonlijke-optie";


        const sleutel =
            persoonlijkeOptieSleutel(
                categorie,
                optie.id
            );


        const afgerond =
            isAfgerond(sleutel);


        if (afgerond) {
            knop.classList.add("afgerond");
        }


        const icoon =
            document.createElement("span");

        icoon.className =
            "persoonlijke-optie-icoon";

        icoon.textContent =
            optie.icoon || "•";


        const tekst =
            document.createElement("span");

        tekst.className =
            "persoonlijke-optie-tekst";

        tekst.textContent =
            optie.tekst;


        knop.appendChild(icoon);

        knop.appendChild(tekst);


        knop.addEventListener(
            "click",
            () => {

                persoonlijkeOptieAfronden(
                    categorie,
                    optie.id
                );
            }
        );


        container.appendChild(knop);
    });
}


/* =========================================================
   PERSOONLIJKE OPTIE SLEUTEL
   ========================================================= */

function persoonlijkeOptieSleutel(
    categorie,
    id
) {

    return `persoonlijk:${categorie}:${id}`;
}


/* =========================================================
   PERSOONLIJKE OPTIE AFRONDEN
   ========================================================= */

function persoonlijkeOptieAfronden(
    categorie,
    id
) {

    const sleutel =
        persoonlijkeOptieSleutel(
            categorie,
            id
        );


    const wasAfgerond =
        isAfgerond(sleutel);


    dagStatus.afgerond[sleutel] =
        !wasAfgerond;


    dagStatusOpslaan();


    persoonlijkeOptiesWeergeven();


    if (!wasAfgerond) {

        beloningTonen(
            categorie === "eten"
                ? "Goed zo. Je hebt iets gegeten. ❤️"
                : "Yes. Even iets prettigs voor jezelf. 💚"
        );
    }
}


/* =========================================================
   PERSOONLIJKE OPTIE TOEVOEGEN
   ========================================================= */

function persoonlijkeOptieToevoegen(
    categorie
) {

    huidigeBeheerCategorie =
        categorie;

    huidigeBewerkOptie = null;


    const titel =
        categorie === "eten"
            ? "Safe food toevoegen"
            : "Prettige activiteit toevoegen";


    const uitleg =
        categorie === "eten"
            ? "Voeg iets toe dat op moeilijke dagen makkelijk voor je is."
            : "Voeg iets toe waarvan je weet dat het je kan helpen ontspannen.";


    kortInvoerTitel.textContent =
        titel;

    kortInvoerUitleg.textContent =
        uitleg;

    kortInvoer.value = "";

    kortInvoer.placeholder =
        categorie === "eten"
            ? "Bijvoorbeeld: tosti"
            : "Bijvoorbeeld: in de tuin zitten";


    kortInvoerContainer.hidden =
        false;


    setTimeout(
        () => kortInvoer.focus(),
        50
    );
}


/* =========================================================
   PERSOONLIJKE OPTIE BEWERKEN
   ========================================================= */

function persoonlijkeOptieBewerken(
    categorie,
    id
) {

    const lijst =
        categorie === "eten"
            ? safeFoods
            : prettigeActiviteiten;


    const optie =
        lijst.find(
            item => item.id === id
        );


    if (!optie) {
        return;
    }


    huidigeBeheerCategorie =
        categorie;

    huidigeBewerkOptie =
        id;


    kortInvoerTitel.textContent =
        categorie === "eten"
            ? "Safe food aanpassen"
            : "Activiteit aanpassen";


    kortInvoerUitleg.textContent =
        "Pas de naam aan wanneer iets niet meer bij je past.";


    kortInvoer.value =
        optie.tekst;


    kortInvoer.placeholder =
        optie.tekst;


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


/* =========================================================
   PERSOONLIJKE OPTIE VERWIJDEREN
   ========================================================= */

function persoonlijkeOptieVerwijderen(
    categorie,
    id
) {

    const lijst =
        categorie === "eten"
            ? safeFoods
            : prettigeActiviteiten;


    const index =
        lijst.findIndex(
            item => item.id === id
        );


    if (index === -1) {
        return;
    }


    const optie =
        lijst[index];


    const bevestigen =
        window.confirm(
            `Wil je "${optie.tekst}" verwijderen?`
        );


    if (!bevestigen) {
        return;
    }


    lijst.splice(index, 1);


    persoonlijkeLijstOpslaan(
        categorie
    );


    /*
       Oude dagelijkse status van deze optie
       hoeft niet bewaard te blijven.
    */

    delete dagStatus.afgerond[
        persoonlijkeOptieSleutel(
            categorie,
            id
        )
    ];


    dagStatusOpslaan();


    persoonlijkeOptiesWeergeven();

    persoonlijkeOptiesBeheerWeergeven();
}


/* =========================================================
   BEHEER VENSTER OPENEN
   ========================================================= */

function persoonlijkeOptiesBeherenOpenen(
    categorie
) {

    huidigeBeheerCategorie =
        categorie;


    persoonlijkeOptiesTitel.textContent =
        categorie === "eten"
            ? "Mijn safe foods"
            : "Mijn prettige activiteiten";


    persoonlijkeOptiesUitleg.textContent =
        categorie === "eten"
            ? "Deze lijst blijft bestaan totdat jij hem aanpast."
            : "Deze lijst blijft bestaan totdat jij hem aanpast.";


    persoonlijkeOptiesBeheerWeergeven();


    persoonlijkeOptiesContainer.hidden =
        false;
}


/* =========================================================
   BEHEER VENSTER WEERGEVEN
   ========================================================= */

function persoonlijkeOptiesBeheerWeergeven() {

    persoonlijkeOptiesLijst.innerHTML = "";


    const lijst =
        huidigeBeheerCategorie === "eten"
            ? safeFoods
            : prettigeActiviteiten;


    if (lijst.length === 0) {

        const leeg =
            document.createElement("p");

        leeg.textContent =
            "Je hebt nog geen opties toegevoegd.";

        leeg.style.color =
            "var(--tekst-zacht)";

        persoonlijkeOptiesLijst.appendChild(
            leeg
        );

        return;
    }


    lijst.forEach(optie => {

        const rij =
            document.createElement("div");

        rij.className =
            "persoonlijke-beheer-rij";


        const naam =
            document.createElement("span");

        naam.className =
            "persoonlijke-beheer-naam";

        naam.textContent =
            `${optie.icoon || "•"} ${optie.tekst}`;


        const bewerk =
            document.createElement("button");

        bewerk.type = "button";

        bewerk.className =
            "persoonlijke-bewerk-knop";

        bewerk.textContent =
            "✎";

        bewerk.setAttribute(
            "aria-label",
            `${optie.tekst} aanpassen`
        );


        bewerk.addEventListener(
            "click",
            () => {

                persoonlijkeOptiesContainer.hidden =
                    true;

                persoonlijkeOptieBewerken(
                    huidigeBeheerCategorie,
                    optie.id
                );
            }
        );


        const verwijder =
            document.createElement("button");

        verwijder.type = "button";

        verwijder.className =
            "persoonlijke-verwijder-knop";

        verwijder.textContent =
            "🗑️";

        verwijder.setAttribute(
            "aria-label",
            `${optie.tekst} verwijderen`
        );


        verwijder.addEventListener(
            "click",
            () => {

                persoonlijkeOptieVerwijderen(
                    huidigeBeheerCategorie,
                    optie.id
                );
            }
        );


        rij.appendChild(naam);

        rij.appendChild(bewerk);

        rij.appendChild(verwijder);


        persoonlijkeOptiesLijst.appendChild(
            rij
        );
    });
}


/* =========================================================
   NIEUWE PERSOONLIJKE OPTIE VANUIT BEHEER
   ========================================================= */

function persoonlijkeNieuweOptie() {

    if (!huidigeBeheerCategorie) {
        return;
    }


    persoonlijkeOptiesContainer.hidden =
        true;


    persoonlijkeOptieToevoegen(
        huidigeBeheerCategorie
    );
}


/* =========================================================
   KORTE INVOER OPSLAAN
   ========================================================= */

function korteInvoerOpslaan() {

    const tekst =
        kortInvoer.value.trim();


    if (!tekst) {

        kortInvoer.focus();

        return;
    }


    /*
       We zijn een bestaande persoonlijke optie
       aan het aanpassen.
    */

    if (huidigeBewerkOptie) {

        const lijst =
            huidigeBeheerCategorie === "eten"
                ? safeFoods
                : prettigeActiviteiten;


        const optie =
            lijst.find(
                item =>
                    item.id ===
                    huidigeBewerkOptie
            );


        if (optie) {

            optie.tekst =
                tekst;

            persoonlijkeLijstOpslaan(
                huidigeBeheerCategorie
            );
        }


        huidigeBewerkOptie =
            null;


        kortInvoerSluiten();


        persoonlijkeOptiesBeherenOpenen(
            huidigeBeheerCategorie
        );


        return;
    }


    /*
       Nieuwe persoonlijke optie.
    */

    const nieuweOptie = {

        id: uniekeId(),

        tekst,

        icoon:
            huidigeBeheerCategorie === "eten"
                ? "🍽️"
                : "❤️"
    };


    if (
        huidigeBeheerCategorie ===
        "eten"
    ) {

        safeFoods.push(
            nieuweOptie
        );

    } else {

        prettigeActiviteiten.push(
            nieuweOptie
        );
    }


    persoonlijkeLijstOpslaan(
        huidigeBeheerCategorie
    );


    kortInvoerSluiten();


    persoonlijkeOptiesWeergeven();


    /*
       Wanneer de gebruiker vanuit het beheer
       een nieuwe optie heeft toegevoegd,
       het beheer opnieuw openen.
    */

    if (persoonlijkeOptiesContainer) {

        persoonlijkeOptiesBeherenOpenen(
            huidigeBeheerCategorie
        );
    }
}


/* =========================================================
   KORTE INVOER SLUITEN
   ========================================================= */

function kortInvoerSluiten() {

    kortInvoerContainer.hidden =
        true;

    kortInvoer.value = "";

    huidigeBewerkOptie =
        null;
}


/* =========================================================
   EXTRA INVOER
   ========================================================= */

function extraInvoerWeergeven(
    type,
    activiteit,
    container
) {

    const sleutel =
        activiteitSleutel(
            type,
            activiteit
        );


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "extra-invoer";


    const toevoegingen =
        dagStatus.toevoegingen[sleutel] ||
        [];


    toevoegingen.forEach(
        toevoeging => {

            const rij =
                extraRijMaken(
                    sleutel,
                    toevoeging
                );

            wrapper.appendChild(
                rij
            );
        }
    );


    const toevoegenKnop =
        document.createElement("button");

    toevoegenKnop.type = "button";

    toevoegenKnop.className =
        "activiteit-invoer-knop";

    toevoegenKnop.textContent =
        "＋ Iets toevoegen";


    toevoegenKnop.addEventListener(
        "click",
        () => {

            extraToevoegingOpenen(
                sleutel
            );
        }
    );


    wrapper.appendChild(
        toevoegenKnop
    );


    container.appendChild(
        wrapper
    );
}


/* =========================================================
   EXTRA RIJ
   ========================================================= */

function extraRijMaken(
    sleutel,
    toevoeging
) {

    const rij =
        document.createElement("div");

    rij.className =
        "extra-rij";


    if (toevoeging.afgerond) {

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
        toevoeging.afgerond
            ? "✓"
            : "";


    vink.addEventListener(
        "click",
        () => {

            toevoeging.afgerond =
                !toevoeging.afgerond;

            dagStatusOpslaan();

            if (huidigeActiviteit) {

                basisActiviteitOpenen(
                    document.querySelector(
                        `.activiteit-knop[data-activiteit="${huidigeActiviteit.activiteit}"]`
                    )
                );
            }
        }
    );


    const tekst =
        document.createElement("span");

    tekst.className =
        "extra-tekst";

    tekst.textContent =
        toevoeging.tekst;


    const verwijderen =
        document.createElement("button");

    verwijderen.type = "button";

    verwijderen.className =
        "extra-verwijder";

    verwijderen.textContent =
        "×";

    verwijderen.setAttribute(
        "aria-label",
        "Verwijderen"
    );


    verwijderen.addEventListener(
        "click",
        () => {

            const lijst =
                dagStatus.toevoegingen[
                    sleutel
                ] || [];


            dagStatus.toevoegingen[
                sleutel
            ] =
                lijst.filter(
                    item =>
                        item.id !==
                        toevoeging.id
                );


            dagStatusOpslaan();


            if (huidigeActiviteit) {

                const knop =
                    document.querySelector(
                        `#basisCategorieen .activiteit-knop[data-activiteit="${huidigeActiviteit.activiteit}"]`
                    );


                if (knop) {

                    basisActiviteitOpenen(
                        knop
                    );
                }
            }
        }
    );


    rij.appendChild(vink);

    rij.appendChild(tekst);

    rij.appendChild(verwijderen);


    return rij;
}


/* =========================================================
   EXTRA TOEVOEGING OPENEN
   ========================================================= */

function extraToevoegingOpenen(
    sleutel
) {

    huidigeBeheerCategorie =
        null;

    huidigeBewerkOptie =
        null;


    kortInvoerTitel.textContent =
        "Even invullen";


    kortInvoerUitleg.textContent =
        "Een paar woorden is genoeg.";


    kortInvoer.placeholder =
        "Bijvoorbeeld: 5 km gelopen";


    kortInvoer.value = "";


    kortInvoerContainer.hidden =
        false;


    kortInvoer.dataset.extraSleutel =
        sleutel;


    setTimeout(
        () => kortInvoer.focus(),
        50
    );
}


/* =========================================================
   OVERSCHRIJVEN KORTE INVOER
   ========================================================= */

/*
   De algemene invoer wordt gebruikt voor:
   - persoonlijke opties
   - extra activiteiten
*/

function invoerOpslaanAlgemeen() {

    const tekst =
        kortInvoer.value.trim();


    if (!tekst) {

        kortInvoer.focus();

        return;
    }


    /*
       Persoonlijke optie?
    */

    if (
        huidigeBeheerCategorie === "eten" ||
        huidigeBeheerCategorie === "prettig"
    ) {

        korteInvoerOpslaan();

        return;
    }


    /*
       Extra activiteit?
    */

    const sleutel =
        kortInvoer.dataset.extraSleutel;


    if (sleutel) {

        if (
            !dagStatus.toevoegingen[
                sleutel
            ]
        ) {

            dagStatus.toevoegingen[
                sleutel
            ] = [];
        }


        dagStatus.toevoegingen[
            sleutel
        ].push({

            id: uniekeId(),

            tekst,

            afgerond: false
        });


        dagStatusOpslaan();


        delete kortInvoer.dataset.extraSleutel;


        kortInvoerSluiten();


        if (huidigeActiviteit) {

            const knop =
                document.querySelector(
                    `#basisCategorieen .activiteit-knop[data-activiteit="${huidigeActiviteit.activiteit}"]`
                );


            if (knop) {

                basisActiviteitOpenen(
                    knop
                );
            }
        }
    }
}


/* =========================================================
   AANTAL TOEVOEGINGEN
   ========================================================= */

function aantalToevoegingen(
    sleutel
) {

    return (
        dagStatus.toevoegingen[
            sleutel
        ] || []
    ).length;
}


/* =========================================================
   BELONING
   ========================================================= */

function beloningTonen(
    tekst
) {

    if (!beloning || !beloningTekst) {
        return;
    }


    beloningTekst.textContent =
        tekst;


    beloning.hidden =
        false;


    clearTimeout(
        beloning._timeout
    );


    beloning._timeout =
        setTimeout(
            () => {

                beloning.hidden =
                    true;

            },
            2800
        );
}


/* =========================================================
   POSITIEVE TEKSTEN
   ========================================================= */

function beloningVoor(
    activiteit
) {

    const teksten = {

        douchen:
            "Yes! Gedoucht. Goed voor jezelf gezorgd. 🚿💚",

        "tanden-poetsen":
            "Yes! Tanden gepoetst. Weer een basisding gedaan. 🪥✨",

        deodorant:
            "Lekker bezig! Weer een klein ding geregeld. 💚",

        "schone-kleding":
            "Yes! Schone kleding aan. 👕✨",

        ontbijt:
            "Goed zo! Je hebt je lichaam iets gegeven. 🥣💚",

        lunch:
            "Yes! Lunch geregeld. 🥪✨",

        diner:
            "Goed gedaan! Je hebt gegeten. 🍽️💚",

        water:
            "Yes! Water gedronken. 💧",

        "ander-drinken":
            "Goed zo! Iets gedronken. 🥤",

        afwas:
            "Klaar! Weer een klein stukje opgeruimd. 🍽️✨",

        opruimen:
            "Yes! Een klein stukje opgeruimd. 🏠💚",

        buiten:
            "Je bent naar buiten geweest. Goed bezig! 🌳💚",

        wandelen:
            "Yes! Even bewogen. 🚶✨",

        bewegen:
            "Lekker! Je bent even in beweging gekomen. 💚",

        rust:
            "Goed zo. Je hebt jezelf even rust gegeven. 🛋️💚",

        muziek:
            "Yes! Even muziek voor jezelf. 🎧✨",

        plezier:
            "Mooi! Je hebt iets gedaan waar je plezier aan beleeft. ❤️",

        "borden-bekeken":
            "Yes! Je hebt even je borden bekeken. 📋",

        "klein-taakje":
            "Klein taakje gedaan. Dat telt! 💚",

        "moeilijk-douchen":
            "Yes! Gedoucht. Dat was genoeg. 🚿💚",

        "moeilijk-wassen":
            "Goed zo! Je hebt jezelf gewassen. 🧼",

        "moeilijk-tanden":
            "Yes! Tanden gepoetst. 🪥✨",

        "moeilijk-kleding":
            "Schone kleding aan. Goed voor jezelf gezorgd. 👕💚",

        "moeilijk-blokje-om":
            "Even naar buiten geweest. Goed bezig. 🚶💚",

        "moeilijk-buiten":
            "Yes! Je bent even buiten geweest. 🌳",

        "moeilijk-bewegen":
            "Goed zo. Even bewogen is genoeg. 💚"
    };


    return (
        teksten[activiteit] ||
        "Yes! Goed gedaan. Dit telt. 💚✨"
    );
}


/* =========================================================
   EVENT LISTENERS
   ========================================================= */


/* Hoofdscherm */

basisKnop?.addEventListener(
    "click",
    naarBasis
);


moeilijkKnop?.addEventListener(
    "click",
    naarMoeilijkeDag
);


/* Terug */

basisTerugKnop?.addEventListener(
    "click",
    naarHoofdscherm
);


moeilijkTerugKnop?.addEventListener(
    "click",
    naarHoofdscherm
);


activiteitTerugKnop?.addEventListener(
    "click",
    () => {

        huidigeActiviteit =
            null;

        naarBasis();
    }
);


/* Activiteit klaar */

activiteitKlaarKnop?.addEventListener(
    "click",
    activiteitKlaar
);


/* =========================================================
   BASIS ACTIVITEITEN
   ========================================================= */

document
    .querySelectorAll(
        "#basisCategorieen .activiteit-knop"
    )
    .forEach(knop => {

        knop.addEventListener(
            "click",
            () => {

                basisActiviteitOpenen(
                    knop
                );
            }
        );
    });


/* =========================================================
   MOEILIJKE DAG ACTIVITEITEN
   ========================================================= */

document
    .querySelectorAll(
        "#moeilijkScherm .moeilijk-activiteit"
    )
    .forEach(knop => {

        knop.addEventListener(
            "click",
            () => {

                moeilijkeActiviteitKlik(
                    knop
                );
            }
        );
    });


/* =========================================================
   PERSOONLIJKE OPTIES
   ========================================================= */


/* Safe food toevoegen */

etenOptieToevoegen?.addEventListener(
    "click",
    () => {

        persoonlijkeOptieToevoegen(
            "eten"
        );
    }
);


/* Safe foods beheren */

etenOptiesBeheren?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesBeherenOpenen(
            "eten"
        );
    }
);


/* Prettige activiteit toevoegen */

prettigOptieToevoegen?.addEventListener(
    "click",
    () => {

        persoonlijkeOptieToevoegen(
            "prettig"
        );
    }
);


/* Prettige activiteiten beheren */

prettigOptiesBeheren?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesBeherenOpenen(
            "prettig"
        );
    }
);


/* =========================================================
   BEHEER VENSTER
   ========================================================= */

persoonlijkeOptiesSluiten?.addEventListener(
    "click",
    () => {

        persoonlijkeOptiesContainer.hidden =
            true;
    }
);


persoonlijkeOptieNieuw?.addEventListener(
    "click",
    persoonlijkeNieuweOptie
);


/* =========================================================
   KORTE INVOER
   ========================================================= */

invoerOpslaan?.addEventListener(
    "click",
    invoerOpslaanAlgemeen
);


invoerAnnuleren?.addEventListener(
    "click",
    () => {

        delete kortInvoer.dataset.extraSleutel;

        kortInvoerSluiten();
    }
);


kortInvoerSluiten?.addEventListener(
    "click",
    () => {

        delete kortInvoer.dataset.extraSleutel;

        kortInvoerSluiten();
    }
);


/* Enter in invoerveld */

kortInvoer?.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            invoerOpslaanAlgemeen();
        }


        if (
            event.key === "Escape"
        ) {

            event.preventDefault();

            delete kortInvoer.dataset.extraSleutel;

            kortInvoerSluiten();
        }
    }
);


/* =========================================================
   VENSTERS SLUITEN BIJ KLIKKEN OP ACHTERGROND
   ========================================================= */

kortInvoerContainer?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            kortInvoerContainer
        ) {

            delete kortInvoer.dataset.extraSleutel;

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


/* =========================================================
   ESCAPE
   ========================================================= */

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

            delete kortInvoer.dataset.extraSleutel;

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


/* =========================================================
   INITIALISATIE
   ========================================================= */

function initialiseren() {

    dagStatusLaden();

    persoonlijkeOptiesLaden();

    basisStatusBijwerken();

    persoonlijkeOptiesWeergeven();

    moeilijkStatusBijwerken();


    /*
       Service worker registreren.
    */

    serviceWorkerRegistreren();
}


/* =========================================================
   SERVICE WORKER
   ========================================================= */

function serviceWorkerRegistreren() {

    if (
        "serviceWorker" in navigator
    ) {

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
                        "Anker service worker kon niet worden geregistreerd:",
                        fout
                    );
                }
            );
    }
}


/* =========================================================
   START
   ========================================================= */

initialiseren();
