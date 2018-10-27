// Creates a class for creating the german texts for this script

import { DictType } from "../Shared/Types"

export class Strings {
    private _german : DictType = {
        title : "Acht Planeten",
        subTitle : "Eine Tour durchs Sonnensystem"
    };

    private _english : DictType = {
        title : "Eight Planets",
        subTitle : "A tour through the Solar system"
    };    

    public constructor() {
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
    
        return s;
    }
}