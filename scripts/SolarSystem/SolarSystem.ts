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

function intro() : void {
    core.setDate("2492-05-06T20:00:00", "utc");

    StarMgr.setLabelsAmount(0);
    SolarSystem.setFlagLabels(false);

    var labelTitle : number = LabelMgr.labelScreen(strings.title, 250, 750, false, 70, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    var labelTitle : number = LabelMgr.labelScreen(strings.subTitle, 250, 850, false, 40, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    core.moveToAltAzi(10, 270)
    LabelMgr.deleteAllLabels();

    ScreenImageMgr.createScreenImage("imgEarth", "./SolarSystem.Assets/earth.png", 1400, 300, 1);
	ScreenImageMgr.createScreenImage("imgMars", "./SolarSystem.Assets/mars.png", 100, 450, 0.5);
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

    public setup() : void {
        core.debug("Setting up " + this._name + " Observer");
    }
}

class EarthsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Earth", long, lat, date);
    }

    public setup() : void {
        super.setup();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Mars");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Mars Observer", "Mars");
    }
}

class MarsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Mars", long, lat, date);
    }

    public setup() : void {
        super.setup();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Mars");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Mars Observer", "Mars");
    }
}

class SaturnObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Saturn", long, lat, date);
    }

    public setup() : void {
        super.setup();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Saturn");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Saturn Observer", "Saturn");
    }
}

class JupiterObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super("Jupiter", long, lat, date);
    }

    public setup() : void {
        super.setup();
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setCurrentLandscapeName("Saturn");

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Saturn Observer", "Jupiter");
    }
}

function main() : void {
    try 
    {
        core.wait(2);

        Helper.InstallDebugHooks();

        setup();
        intro();

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
    }
}

main();