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
        pluto : "Pluto"
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
        pluto : "Pluto"
    };    

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
    
        return s;
    }
}