// Creates a class for creating the german texts for this script
var Strings = {
    
    DE : {
            dateAndTime : "Datum und Zeit",
            titleMars: "Analemma (Mars; Abendsonne)",
            subtitle : "Variationen der Sonnenposition im Verlauf eines Jahres.",
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
            winterSolstice : "Wintersonnenwende",
            summerSolstice : "Sommersonnenwende"
    },

    EN : {
            dateAndTime : "Date and Time",
            titleMars: "Analemma (Mars; Evening Sun)",
            subtitle : "Variations in the position of the sun over the course of a year.",
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
    	    winterSolstice : "Winter solstice",
            summerSolstice : "Sommer solstice"
    },

    verify : function () {
        // todo: Check all langauge versions and panik if one of them is missing a string.
    },

    getLocalizedStrings : function() {

        // This function is using the localized name of the sun in order to try to determine the UI culture.
        var lang = core.getAppLanguage();
        core.debug('App language is "' + lang + '"');
    
        var s;

        // Germany, Austria and Switzerland get the german strings. 		
        if (lang == "de_DE" || lang == "de_AT" || lang == "de_CH") {
            s = Strings.DE; 
        }
        // default is english
        else {
            s = Strings.EN; 
        }
    
        // Add support functions
        s.monthFromInt = function (m) {
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