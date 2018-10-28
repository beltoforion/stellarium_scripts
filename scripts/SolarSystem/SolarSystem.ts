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
    SolarSystem.setMoonScale(6);
    SolarSystem.setFlagMoonScale(true);
    SolarSystem.setFontSize(25);
    
    StelSkyDrawer.setAbsoluteStarScale(1.0);
    StelSkyDrawer.setRelativeStarScale(1.1);

    StarMgr.setFontSize(20);
    StarMgr.setLabelsAmount(3);

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

    core.setGuiVisible(false);
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(1);

    LandscapeMgr.setFlagAtmosphere(false);
    LandscapeMgr.setFlagLandscape(false);
}

function intro(delayTime : number) : void {
    core.setDate("2492-05-06T20:00:00", "utc");
    core.setTimeRate(500);

    StarMgr.setLabelsAmount(0);
    SolarSystem.setFlagLabels(false);

    core.debug(strings.title);
    core.debug(strings.subTitle);

    var baseY = 200;
    var labelTitle : number = LabelMgr.labelScreen(strings.title, 800, baseY, true, 70, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    var labelTitle : number = LabelMgr.labelScreen(strings.subTitle, 800, baseY + 100, true, 40, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    core.moveToAltAzi(10, 270)

    var baseScale : number = 0.4;
    var imgHeight : number;
    var margin : number = 50;
    var x = 800;
    ScreenImageMgr.createScreenImage("imgSun", "./SolarSystem.Assets/sun.png", 0, 0, 0.7);
    
    var planets : string[] = [ "mercury", "venus", "earth", "mars" ];
    var scales : number[] = [ 4879.4 / 12756.32, 12103.6 / 12756.32, 1, 6792.4 / 12756.32];

    for (var i=0; i<planets.length; ++i) {
        var planet : string = planets[i];
        var scale : number = scales[i];
        ScreenImageMgr.createScreenImage(planet, "./SolarSystem.Assets/" + planet + ".png", 0, 0, baseScale * scale, false);
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
}

abstract class PlanetaryObserver {
    private _long : number;
    private _lat : number;
    private _date : string;
    private _name : string;

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

    constructor(name: string, long:number, lat:number, date:string) {
        this._long = long;
        this._lat = lat;
        this._date = date;
        this._name = name;
    }

    public watchSurface() : void {
        core.debug("Setting up " + this._name + " surface observer");
    }

    public watchFromSun() : void {
        core.debug("Setting up " + this._name + " sun observer");
        this.select();
    }

    public select() : void {
        core.debug("Selecting object " + this.name)
        core.selectObjectByName(this.name);
    }
}

class MercuryObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Mercury", long, lat, date);
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Moon");
        LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
        LandscapeMgr.setDefaultMinimalBrightness(0.05);
        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Surface Mercury Observer", "Mercury");
    }

    public watchFromSun() : void {
        super.watchFromSun();

        LandscapeMgr.setFlagAtmosphere(false);
        LandscapeMgr.setFlagLandscape(false);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Solar Mercury Observer", "Sun");
    }
}

class EarthObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Earth", long, lat, date);
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Garching");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Earth Observer", "Earth");
    }

    public watchFromSun() : void {
        super.watchFromSun();
    }

}

class MarsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Mars", long, lat, date);
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Mars");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Mars Observer", "Mars");
    }

    public watchFromSun() : void {
        super.watchFromSun();
    }
}

class SaturnObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Saturn", long, lat, date);
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Saturn");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Saturn Observer", "Saturn");
    }

    public watchFromSun() : void {
        super.watchFromSun();
    }
}

class JupiterObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Jupiter", long, lat, date);
    }

    public watchSurface() : void {
        super.watchSurface();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Jupiter");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Jupiter Observer", "Jupiter");
    }

    public watchFromSun() : void {
        super.watchFromSun();
    }
}

class NeptunObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Neptun", long, lat, date);
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

        Helper.InstallDebugHooks();

        setup();
        intro(5);

        var mercury : PlanetaryObserver = new MercuryObserver(-33.22, 19.13, "1997-07-29T23:35:00");
        mercury.watchSurface();
        core.wait(5);
        mercury.watchFromSun();

        // var mars : PlanetaryObserver = new MarsObserver(-33.22, 19.13, "1997-07-29T23:35:00");
        // mars.setup();

        // var saturn : PlanetaryObserver = new SaturnObserver(-33.22, 19.13, "1997-07-29T23:35:00");
        // saturn.setup();

        // var jupiter : PlanetaryObserver = new JupiterObserver(-33.22, 19.13, "1997-07-29T23:35:00");
        // jupiter.setup();
    }
    catch(exc)
    {
        core.debug(exc);
    }
    finally
    {
        Helper.RemoveDebugHooks();
        core.setTimeRate(0);
    }
}

main();