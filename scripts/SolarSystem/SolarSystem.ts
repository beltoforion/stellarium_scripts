// Author: Ingo Berg
// Version: 1.0
// License: GPL v3.0
// Name: Tour of the solar system
// Description: A tour through the solar system
import { Helper } from "../Shared/Helper"
import { Strings } from "./Strings";

var strings = new Strings().getLocalizedStrings();

function setup() : void {
    // Wait to work around #491 
    // (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
    core.wait(2);

    SolarSystem.setFlagPlanets(true);
    //SolarSystem.setMoonScale(6);
    //SolarSystem.setFlagMoonScale(true);
    SolarSystem.setFontSize(25);
    
    StelSkyDrawer.setAbsoluteStarScale(1.0);
    StelSkyDrawer.setRelativeStarScale(1.1);

    StarMgr.setFontSize(20);
    StarMgr.setLabelsAmount(0);

    StelMovementMgr.setAutoMoveDuration(5);

    ConstellationMgr.setFlagLines(false);
    ConstellationMgr.setFlagLabels(false);
    ConstellationMgr.setArtIntensity(0.3);
    ConstellationMgr.setFlagArt(false);
    ConstellationMgr.setFlagBoundaries(false);
    ConstellationMgr.setConstellationLineThickness(2);
    ConstellationMgr.setFontSize(32);
    ConstellationMgr.setFlagConstellationPick(true);
    ConstellationMgr.setFlagIsolateSelected(true);  

    SporadicMeteorMgr.setFlagShow(true);
    SporadicMeteorMgr.setZHR(20000);

//    core.setGuiVisible(false);
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(1);

    LandscapeMgr.setFlagAtmosphere(false);
    LandscapeMgr.setFlagLandscape(false);
}

function intro(delayTime : number) : void {
    try
    {
        Helper.storeState(StarMgr);
        Helper.storeState(SolarSystem);

        SolarSystem.setFlagLabels(false);

//        core.setDate("2492-05-06T20:00:00", "utc");
        core.setTimeRate(500);

        var baseY = 200;
        Helper.showTitle(strings.title, strings.subTitle, 800, baseY);

        core.moveToAltAzi(10, 270)

        var baseScale : number = 0.4;
        var imgHeight : number;
        var margin : number = 50;
        var x = 800;
        ScreenImageMgr.createScreenImage("imgSun", "./SolarSystem.Assets/sun.png", 0, 0, 0.7);
        
        var planets : string[] = [ "mercury", "venus", "earth", "mars" ];
        var scale : number[] = [ 4879.4 / 12756.32, 12103.6 / 12756.32, 1, 6792.4 / 12756.32];

        for (var i=0; i<planets.length; ++i) {
            var planet : string = planets[i];
            ScreenImageMgr.createScreenImage(planet, "./SolarSystem.Assets/" + planet + ".png", 0, 0, baseScale * scale[i], false);
            imgHeight = ScreenImageMgr.getImageWidth(planet);

            //core.debug("imageHeight=" + imgHeight + "; x=" + x + "; y=" + (baseY - imgHeight / 2));
            ScreenImageMgr.setImageXY(planet, x, baseY + 400 - imgHeight / 2)
            ScreenImageMgr.showImage(planet, true);
            x += imgHeight + margin;
        }
        
        core.wait(delayTime);

        core.setTimeRate(1);
        LabelMgr.deleteAllLabels();    
        ScreenImageMgr.deleteAllImages();
        SolarSystem.setFlagLabels(true);
    }
    finally
    {
        Helper.restoreState(StarMgr);
        Helper.restoreState(SolarSystem);
    }
}

abstract class PlanetaryObserver {
    private _long : number;
    private _lat : number;
    private _date : string;
    private _name : string;

    // Search key for stellariums object database
    private _id : string;

    // Field of view for planet closeup
    private _fovCloseupFromSun : number = 0.1;

    // Field of view for watching the planet race along the ecliptic
    private _fovEcliptic : number = 40;

    get name() {
        return this._name;
    }

    get long() {
        return this._long;
    }

    get lat() {
        return this._lat;
    }
 
    get date() {
        return this._date;
    }
    
    get id() {
        return this._id;
    }

    get fovSun() {
        return this._fovCloseupFromSun;
    }

    set fovSun(value:number) {
        this._fovCloseupFromSun = value;
    }

    constructor(name: string, id : string, long:number, lat:number, date:string) {
        if (id==null)
            throw new Error("PlanetaryObserver.constructor: id is null or empty!")

        if (name==null)
            throw new Error("PlanetaryObserver.constructor: name is null or empty!")

        this._long = long;
        this._lat = lat;
        this._date = date;
        this._name = name;
        this._id = id;

        this._fovEcliptic = 40;

        var cached = LandscapeMgr.precacheLandscape('Sun');
        if (!cached)
            throw new Error('Precaching landscape "Sun" failed');
    }

    public watchSurface() : void {
        core.debug("Setting up " + this._name + " surface observer");
    }

    public watchFromSun(delay:number) : void {
        try
        {
            var observerName : string = "Solar " + this.name + " Observer";
            core.debug("Setting up " + observerName);
            core.setDate(this.date, "utc");


            var lbTitle = LabelMgr.labelScreen(this.name + strings.asSeenFromSun, 50, 50, true, 40, "#66ccff");

            var rate = core.getTimeRate();
            var lbTime =  LabelMgr.labelScreen(strings.timeLapse + ": 1 s = " + rate/3600 + " h", 50, 100, true, 25, "#66ccff");

            // Show ecliptic and poles
            GridLinesMgr.setFlagEclipticJ2000Line(true);
            GridLinesMgr.setFlagEclipticJ2000Poles(true);

            // observer location is the suns north pole. This will eliminate the
            // effects of suns rotation
            core.setObserverLocation(0, 90, 0, 0, observerName, "Sun");

            LandscapeMgr.setFlagFog(false);
            LandscapeMgr.setFlagAtmosphere(false);
            LandscapeMgr.setFlagLandscape(false);

            this.select();

            StelMovementMgr.autoZoomIn(0);
            StelMovementMgr.zoomTo(this.fovSun, 0);
            
            core.wait(delay);
        }
        finally
        {
            LabelMgr.deleteLabel(lbTitle);
            LabelMgr.deleteLabel(lbTime);
        }
    }

    public select() : void {
        core.debug('Selecting object "' + this.id + '" (' + this.name + ')')
        core.selectObjectByName(this.id, true);
        core.setSelectedObjectInfo("None"); // "ShortInfo", "AllInfo"
    }
}

class MercuryObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.mercury, "Mercury", long, lat, date);
        
        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Moon");
        LandscapeMgr.setFlagAtmosphere(false);
        LandscapeMgr.setFlagFog(false);
        LandscapeMgr.setFlagLandscape(true);
        LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
        LandscapeMgr.setDefaultMinimalBrightness(0.05);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Surface Mercury Observer", "Mercury");
    }

    public watchFromSun(time:number) : void {
        core.setTimeRate(2*86400);
        super.watchFromSun(time);
    }
}

class VenusObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.venus, "Venus", long, lat, date);

        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Mars");
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Venus Observer", "Venus");
    }

    public watchFromSun(delay:number) : void {
        core.setTimeRate(2*86400);
        super.watchFromSun(delay);
    }
}

class EarthObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.earth, "Earth", long, lat, date);

        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Garching");
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Earth Observer", "Earth");
    }

    public watchFromSun(delay:number) : void {
        core.setTimeRate(2*3600);
        super.watchFromSun(delay);

        this.watchSeasons();
    }

    public watchSeasons() : void {

        var lbTitle = LabelMgr.labelScreen(strings.seasonalChanges, 50, 50, true, 40, "#66ccff");

        var rate = core.getTimeRate();
        var lbTime =  LabelMgr.labelScreen(strings.europeAtNoon, 50, 100, true, 25, "#66ccff");

        core.setDate(this.date, "utc");
        core.setTimeRate(0);

        for (var i=0; i<365; ++i) {
            core.setDate("+1 day");
            core.wait(0.1);
        }

        LabelMgr.deleteLabel(lbTitle);
        LabelMgr.deleteLabel(lbTime);
    }
}

class MarsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.mars, "Mars", long, lat, date);

        // fov for mars + phobos + deimos
        this.fovSun = 0.00678;
    }

    public watchSurface() : void {
        
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Mars");
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Mars Observer", "Mars");
    }

    public watchFromSun(delay:number) : void {
        core.setTimeRate(2000);
        super.watchFromSun(delay);
    }
}

class SaturnObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.saturn, "Saturn", long, lat, date);

        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Saturn");
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Saturn Observer", "Saturn");
    }

    public watchFromSun(delay:number) : void {
        super.watchFromSun(delay);
    }
}

class JupiterObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.jupiter, "Jupiter", long, lat, date);

        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setCurrentLandscapeName("Jupiter");
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Jupiter Observer", "Jupiter");
    }

    public watchFromSun(delay:number) : void {
        super.watchFromSun(delay);
    }
}

class NeptunObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.neptun, "Neptun", long, lat, date);

        this.fovSun = 0.008;
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Neptun");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Neptun Observer", "Neptun");
    }

    public watchFromSun(delay:number) : void {
        super.watchFromSun(delay);
    }
}

function main() : void {
    try 
    {
        core.wait(2);

        Helper.installDebugHooks();

        setup();
//        intro(5);

        var planets : PlanetaryObserver[] = [
            new MercuryObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new VenusObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new EarthObserver(13, 51, "2018-06-21T12:00:00"),
            //new MarsObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
        ];

        for (var i=0; i<planets.length; ++i) {
            var p = planets[i];
            if (p==null)
                continue;

            p.watchFromSun(60);
        }
    }
    catch(exc)
    {
        core.debug(exc);
        Helper.showError(exc);
    }
    finally
    {
        Helper.removeDebugHooks();
        core.setTimeRate(1);
    }
}

main();