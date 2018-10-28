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

    private _fovSun : number;

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
        return this._fovSun;
    }

    set fovSun(value:number) {
        this._fovSun = value;
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

        var cached = LandscapeMgr.precacheLandscape('Sun');
        if (!cached)
            throw new Error('Precaching landscape "Sun" failed');
    }

    public watchSurface() : void {
        core.debug("Setting up " + this._name + " surface observer");
    }

    public watchFromSun() : void {
        core.debug("Setting up " + this._name + " sun observer");

//        LandscapeMgr.setCurrentLandscapeName("Sun");
        LandscapeMgr.setFlagFog(false);
        LandscapeMgr.setFlagAtmosphere(false);
        LandscapeMgr.setFlagLandscape(false);

        this.select();

        StelMovementMgr.autoZoomIn(0);
        StelMovementMgr.zoomTo(this.fovSun, 0);
        core.wait(0.1);
    }

    public select() : void {
        core.debug('Selecting object "' + this.id + '" (' + this.name + ')')
        core.selectObjectByName(this.id, true);
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

    public watchFromSun() : void {
        super.watchFromSun();

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Solar Mercury Observer", "Sun");
    }
}

class VenusObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.mars, "Venus", long, lat, date);

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

    public watchFromSun() : void {
        super.watchFromSun();
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

    public watchFromSun() : void {
        super.watchFromSun();
    }

}

class MarsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.mars, "Mars", long, lat, date);

        // fov for mars + phobos + deimos
        this.fovSun = 0.0132;
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

    public watchFromSun() : void {
        super.watchFromSun();
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

    public watchFromSun() : void {
        super.watchFromSun();
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

    public watchFromSun() : void {
        super.watchFromSun();
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

    public watchFromSun() : void {
        super.watchFromSun();
    }
}

function main() : void {
    try 
    {
        core.wait(2);

        Helper.installDebugHooks();

        setup();
        intro(5);

        var planets : PlanetaryObserver[] = [
            new MercuryObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new VenusObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new EarthObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new MarsObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
        ];

        for (var i=0; i<planets.length; ++i) {
            var p = planets[i];
            if (p==null)
                continue;

            p.watchFromSun();
            core.wait(5);
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