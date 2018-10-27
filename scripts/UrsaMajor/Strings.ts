// Creates a class for creating the german texts for this script

export type DictType = { [key: string]: string };

export class Strings {
    private _german : DictType = {
        january : "Januar",
        february : "Februar",
        march : "März",
        april : "April",
        may : "Mai",
        june : "Juni",
        july : "Juli",
        august : "August",
        september : "September",
        october : "Oktober",
        november : "November",
        december : "Dezember",
        pinwheelGalaxy : "Feuerrad-Galaxie",
        constellationUrsaMajor: "Sternbild Großer Bär",
        m97Description: "Eulennebel - Ein Stern stößt seine Hülle ab.",
        m108Desc: "Spiralgalaxie M108",
        m81Desc: "Spiralgalaxien M81 und M82"
    };

    private _english : DictType = {
        january : "January",
        february : "February",
        march : "March",
        april : "April",
        may : "May",
        june : "June",
        july : "July",
        august : "August",
        september : "September",
        october : "October",
        november : "November",
        december : "December",
        pinwheelGalaxy : "Pinwheel-Galaxy",
        constellationUrsaMajor: "COnstellation Ursa Major",
        m97Description: "Owl Nebula - A planetary Nebula.",
        m108Desc: "Spiral Galaxy M108",
        m81Desc: "Spiral Galaxies M81 and M82"
    };    

    public constructor() {
    }

    public verify() : void {
        // todo: Check all langauge versions and panik if one of them is missing a string.
    }

    public getLocalizedStrings() : DictType {

        // This function is using the localized name of the sun in order to try to determine the UI culture.
        var lang = core.getAppLanguage();
        core.debug('App language is "' + lang + '"');
    
        var s : any;

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