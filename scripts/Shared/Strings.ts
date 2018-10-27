// Creates a class for creating the german texts for this script
import { DictType } from "./Types"

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
        dateAndTime : "Datum und Zeit",
        winterSolstice : "Wintersonnenwende",
        summerSolstice : "Sommersonnenwende"
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
        dateAndTime : "Date and Time",
        winterSolstice : "Winter solstice",
        summerSolstice : "Sommer solstice"
    };    

    public constructor() {
    }

    public verify() : void {
        // todo: Check all langauge versions and panik if one of them is missing a string.
    }

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