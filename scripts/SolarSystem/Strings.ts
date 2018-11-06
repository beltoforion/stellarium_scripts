// Creates a class for creating the german texts for this script

import { DictType } from "../Shared/Types"

export class Strings {
    private _german : DictType = {
        title : "Die inneren Planeten",
        subTitle : "Eine Tour durchs Sonnensystem",
        sun : "Sonne",
        mercury : "Merkur",
        venus : "Venus",
        earth : "Erde",
        mars : "Mars",
        saturn : "Saturn",
        jupiter : "Jupiter",
        uranus : "Uranus",
        neptun : "Neptun", 
        pluto : "Pluto",
        asSeenFromSun : " von der Sonne aus gesehen",
        timeLapse: "Zeitraffer",
        europeAtNoon: "Europa zur Mittagszeit",
        seasonalChanges: "Jahreszeitenwechsel",
        orbitOfXXX: "Orbit des Planeten ",
        aDayOnMercury: "Ein Tag auf dem Merkur",
        mercuryAsSeenFromSun: "Merkur von der Sonne aus gesehen",
        mercuryInfo1: "* Merkur ist der sonnennächste Planet",
        mercuryInfo2: "* Er hat den exzentrischsten Orbit aller Planeten.",
        mercuryInfo3: "* Er hat eine 3:2 Spin-Orbit-Resonanz:",
        mercuryInfo4: "     - Er benötigt 88 Tage für einen Sonnenumlauf",
        mercuryInfo5: "     - Er benötigt 58.7 Tage für eine Rotation um seine Achse",

        aDayOnVenus: "Ein Tag auf der Venus",
        venusAsSeenFromSun: "Venus von der Sonne aus gesehen",
        venusInfo1: "* Ein Tag auf Venus ist länger als das Venus-Jahr.",
        venusInfo2: "* Venus rotiert rückwärts",

    };

    private _english : DictType = {
        title : "Inner Planets",
        subTitle : "A tour through the Solar system",
        sun : "Sun",
        mercury : "Mercury",
        venus : "Venus",
        earth : "Earth",
        mars : "Mars",
        saturn : "Saturn",
        jupiter : "Jupiter",
        uranus : "Uranus",
        neptun : "Neptun", 
        pluto : "Pluto",
        asSeenFromSun : " as seen from the sun",
        timeLapse: "Timelapse",
        europeAtNoon: "Europe at noon",
        seasonalChanges: "Seasonal changes", 
        orbitOfXXX: "Orbit of ",
        aDayOnMercury: "A day on mercury",
        mercuryAsSeenFromSun: "Mercury as seen from sun",
        mercuryInfo1: "* Mercury is the planet closest to sun",
        mercuryInfo2: "* It has the most excentric orbit of all planets.",
        mercuryInfo3: "* It is tidally locked to the sun in a 3:2 spin-orbit resonance:",
        mercuryInfo4: "     - It takes 88 days to orbit sun",
        mercuryInfo5: "     - It takes 58.7 days to revolve around its axis",

        aDayOnVenus: "A day on Venus",
        venusAsSeenFromSun: "Venus as seen from the sun",
        venusInfo1: "* A day on Venus is longer than a venus year.",
        venusInfo2: "* Venus is rotating backwards",
    };    

    public getLocalizedStrings(loc : string = "") : DictType {

        // This function is using the localized name of the sun in order to try to determine the UI culture.
        let lang;
        if (loc)
        {
            lang = loc;
            core.debug('Forcing language to "' + lang + '"');            
        }
        else
        {
            lang = core.getAppLanguage();
            core.debug('App language is "' + lang + '"');
        }
    
        let s : any;

        // Germany, Austria and Switzerland get the german strings. 		
        if (lang == "de_DE" || lang == "de_AT" || lang == "de_CH") {
            s = this._german; 
        }
        // default is english
        else {
            s = this._english; 
        }
    
        // Add support functions
        s.monthFromInt = function (m : number) {
            if (m < 1 || m > 12)
                return "invalid month";
    
            const monthNames = [s.january, s.february, s.march,
                                s.april, s.may, s.june,
                                s.july, s.august, s.september,
                                s.october, s.november, s.december];

            return monthNames[m - 1];
        }
        
        return s;
    }
}