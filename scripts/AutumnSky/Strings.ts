// Creates a class for creating the german texts for this script

export type DictType = { [key: string]: string };

export class Strings {
    private _german : DictType = {
        title:    "Sternbilder des Herbstes",
        subtitle: "Himmel über Sachsen",

        cepheus: "Sternbild Cepheus",
        ngc6946: "Feuerwerksgalaxie - Eine Spiralgalaxie (21 Mio Lj)",
        ngc7380: "Wizard Nebula - Offener Sternhaufen (7000 Lj)",
        ngc7023: "Iris Nebula - Reflexionsnebel (1300 Lj)",
        ngc7129: "Rosenknospennebel - Offener Sternhaufen, Sternenentstehungsgebiet (3300 Lj)",
        perseus: "Sternbild Perseus",
        ngc1499: "Kalifornien Nebel - Emmissionsnebel aus Wasserstoff (1000 Lj)",
        ngc884:  "Chi Persei - Offener Doppelsternhaufen (6781 Lj)",

        cassiopeia: "Sternbild Kassiopeia",
        m103:       "Offener Sternhaufen M103 (8500 Lj)",
        m52:        "Blasennebel (7100 Lj) und offener Sternhaufen M52 (4600 Lj)",
        lbn667:     "Seelennebel - Emmissionsnebel aus ionisiertem Wasserstoff (7500 Lj)",
        ic1805:     "Herznebel - Emmissionsnebel aus ionisiertem Wasserstoff (7500 Lj)",
        ngc281:     "Emissionsnebel aus ionisiertem Wasserstoff (9500 Lj)",

        ursaMajor: "Sternbild Großer Bär",
        m101:      "Feuerrad-Galaxie",
        m97:       "Eulennebel - Ein Stern stößt seine Hülle ab.",
        m108:      "Spiralgalaxie M108",
        m81:       "Spiralgalaxien M81 und M82",

        ursaMinor: "Sternbild Kleiner Bär",
        polaris:   "Polarstern - Der Himmelsnordpol",
        
        lyra: "Sternbild Leier",
        m57:  "Ringnebel M57 - Die abgestoßenen Hülle eines sterbenden Sterns",
        
        cygnus:  "Sternbild Schwan",
        ngc7000: "Nordamerikanebel",
        m39:     "Offener Sternhaufen M39",
        ngc6960: "Cirrusnebel",
        lbn203:  "Crescentnebel - Emmissionsnebel (4700 Lj)",

        aAndromeda: "Sternbild Andromeda",
        m31:        "Andromedagalaxie - Hellste Galaxie am Nachthimmel (2.5 Mio Lj)",
        
        triangle: "Sternbild Dreieck",
        m33:      "Dreiecksgalaxie - Zweithellste Galaxie am Nachthimmel (2.67 Mio Lj)",
        
        hercules: "Sternbild Herkules",
        m13:      "Herkuleshaufen - Kugelsternhaufen",
        m92:      "Kugelsternhaufen"
    };

    private _english : DictType = {
        title:    "Constellations of the Autumn Sky",
        subtitle: "Northern Hemispehere",

        cepheus: "Constellation Cepheus",
        ngc6946: "NGC 6946 - A spiral galaxy (21 Mio ly)",
        ngc7380: "Wizard Nebula - Open cluster (7000 ly)",
        ngc7023: "Iris Nebula - Reflection nebula (1300 ly)",
        ngc7129: "NGC 7129 - Reflection nebula; Young open cluster (3300 ly)",
        
        perseus: "Constellation Perseus",
        ngc1499: "California Nebula - Emission nebula (1000 ly)",
        ngc884:  "Chi Persei - Open cluster (6781 ly)",

        cassiopeia: "Constellation Cassiopeia",
        m103:       "Open cluster M103 (8500 ly)",
        m52:        "Bubble Nebula (7100 ly) and open cluster M52 (4600 ly)",
        lbn667:     "Soul Nebula - Emission nebula (7500 ly)",
        ic1805:     "Heart Nebula - Emission nebula (7500 ly)",
        ngc281:     "NGC 281 - Emission nebula (9500 ly)",

        ursaMajor: "Constellation Ursa Major",
        m101:      "M101 - Pinwheel Galaxy",
        m97:       "Owl Nebula - Planetary Nebula (2030 ly)",
        m108:      "M108 - Spiral Galaxy",
        m81:       "M81 and M82 - Spiral Galaxies",

        ursaMinor: "Constellation Ursa Minor",
        polaris:   "Pole Star - North Celestial Pole",
        
        lyra: "Constellation Lyra",
        m57:  "Ring Nebula M57 - A red giants expelled hull",
        
        cygnus:  "Constellation Cygnus",
        ngc7000: "North America Nebula",
        m39:     "M39 - Open cluster",
        ngc6960: "Veil Nebula - Heated ionized gas",
        lbn203:  "Crescent Nebula - Emission nebula (4700 ly)",

        aAndromeda: "Constellation Andromeda",
        m31:        "Andromeda Galaxy - Brightest galaxy of the night sky (2.5 Mio ly)",
        
        triangle:   "Constellation Triangulum",
        m33:        "Triangulum Galaxy - Second brightest galaxy of the night sky (2.67 Mio ly)",
        
        hercules:   "Constellation Hercules",
        m13:        "M13 - Hercules Globular Cluster",
        m92:        "M92 - Globular Cluster"
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