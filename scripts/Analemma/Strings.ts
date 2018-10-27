import { DictType } from "../Shared/Types"

// Creates a class for creating the german texts for this script
export class Strings {
    
    private _german : DictType = {
            titleMars: "Analemma (Mars; Abendsonne)",
            subtitle : "Variationen der Sonnenposition im Verlauf eines Jahres.",
    };

    private _english : DictType = {
            titleMars: "Analemma (Mars; Evening Sun)",
            subtitle : "Variations in the position of the sun over the course of a year.",
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
    
       
        return s;
    }
}