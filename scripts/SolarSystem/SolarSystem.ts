// Author: Ingo Berg
// Version: 1.0
// License: GPL v3.0
// Name: Tour of the solar system
// Description: A tour through the solar system
import { Helper } from "../Shared/Helper"
import { Trace } from "../Shared/Trace"
import { BulletList } from "../Shared/BulletList"
import { Strings as SharedStrings } from "../Shared/Strings"
import { Strings } from "./Strings";

// Set up localized strings
var strings = new Strings().getLocalizedStrings("en");
var sharedStrings = new SharedStrings().getLocalizedStrings("en");

function setup() : void {
    // Wait to work around #491 
    // (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
    core.wait(2);

    SolarSystem.setFlagPlanets(true);
    SolarSystem.setMoonScale(1);
    SolarSystem.setFlagMoonScale(false);
    SolarSystem.setFontSize(25);
    SolarSystem.setFlagLabels(false);

    StelSkyDrawer.setAbsoluteStarScale(0.9);
    StelSkyDrawer.setRelativeStarScale(1.0);

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

    core.setGuiVisible(false);
    core.setSkyCulture("western");
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(1);

    LandscapeMgr.setFlagAtmosphere(false);
    LandscapeMgr.setFlagLandscape(false);

    LabelMgr.deleteAllLabels();
}

function intro(delayTime : number) : void {
    try {
        Helper.storeState(StarMgr);
        Helper.storeState(SolarSystem);

        SolarSystem.setFlagLabels(false);

//      core.setDate("2492-05-06T20:00:00", "utc");
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
    } 
    finally {
        Helper.restoreState(StarMgr);
        Helper.restoreState(SolarSystem);
    }
}

interface IPlanetaryObserver {
    orbitalPeriod : number;

    siderialPeriod : number;

    timeRateDay : number;

    dateSunsetStart : string;

    dateSunsetEnd : string;

    landscape : string;

    watchSurface(startDate : string, endDate : string, timeRate : number) : void;
    
    watchSeasons() : void;
    
    select() : void;
}

abstract class PlanetaryObserver implements IPlanetaryObserver {
    
    // orbital period in days
    protected _orbitalPeriod : number;

    // siderial period in days
    protected _siderialPeriod : number;

    private _long : number;
    
    private _lat : number;
    
    private _date : string;
    
    private _name : string;

    private _landscape : string;

    private _trace : Trace = new Trace();

    // Search key for stellariums object database
    private _id : string;

    // Field of view for planet closeup
    private _fovCloseupFromSun : number = 0.1;

    // Field of view for watching the planet race along the ecliptic
    private _fovEcliptic : number = 40;

    private _timeRateDay : number = 0;

    private _dateSunsetStart : string;

    private _dateSunsetEnd : string;

    public get landscape() {
        return this._landscape;
    }

    public set landscape(value:string) {
        this._landscape = value;
    }

    public get dateSunsetStart() {
        return this._dateSunsetStart;
    }

    public set dateSunsetStart(value:string) {
        this._dateSunsetStart = value;
    }

    public get dateSunsetEnd() {
        return this._dateSunsetEnd;
    }

    public set dateSunsetEnd(value:string) {
        this._dateSunsetEnd = value;
    }

    public get timeRateDay() {
        return this._timeRateDay;
    }

    public set timeRateDay(value:number) {
        this._timeRateDay = value;
    }

    protected get trace() {
        return this._trace;
    }

    public get orbitalPeriod() {
        return this._orbitalPeriod;
    }

    public set orbitalPeriod(value:number) {
        this._orbitalPeriod = value;
    }

    public get siderialPeriod() {
        return this._siderialPeriod;
    }

    public set siderialPeriod(value:number) {
        this._siderialPeriod = value;
    }

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

    constructor(name: string, id : string, long : number, lat : number, date : string) {
        if (id == null)
            throw new Error("PlanetaryObserver.constructor: id is null or empty!")

        if (name == null)
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

    public watchSurface(startDate : string, endDate : string, timeRate : number) : void {
        if (startDate == null)
            throw new Error("date is null!");

        if (timeRate == null)
            throw new Error("timeRate is null!")

        core.selectObjectByName("");

        core.debug("Setting up " + this._name + " surface observer (" + startDate + ")");
        core.setDate(startDate, "utc");
        core.wait(0.1);
        core.setTimeRate(timeRate);
    }

    public select() : void {
        core.debug('Selecting object "' + this.id + '" (' + this.name + ')')
        core.selectObjectByName(this.id, false);
        core.setSelectedObjectInfo("None"); // "ShortInfo", "AllInfo", "None"
    }

    public watchSeasons() : void {
        try
        {
            var observerName : string = "Solar " + this.name + " Observer";
            core.debug("Setting up " + observerName);
            core.setDate(this.date, "utc");

            StarMgr.setFlagStars(false);

            var lbTitle = LabelMgr.labelScreen(this.name + strings.asSeenFromSun, 50, 50, true, 40, "#66ccff");
            var lbTime =  LabelMgr.labelScreen(strings.timeLapse + ": 1 s = " + core.getTimeRate()/3600 + " h", 50, 100, true, 25, "#66ccff");

            // Show ecliptic and poles
            // GridLinesMgr.setFlagEclipticJ2000Line(true);
            // GridLinesMgr.setFlagEclipticJ2000Poles(true);

            // observer location is the suns north pole. This will eliminate the
            // effects of suns rotation
            core.setObserverLocation(0, 90, 0, 0, observerName, "Sun");

            LandscapeMgr.setFlagFog(false);
            LandscapeMgr.setFlagAtmosphere(false);
            LandscapeMgr.setFlagLandscape(false);

            this.select();

            StelMovementMgr.autoZoomIn(0);
            StelMovementMgr.zoomTo(this.fovSun, 0);
        }
        finally
        {
            StarMgr.setFlagStars(true);

            LabelMgr.deleteLabel(lbTitle);
            LabelMgr.deleteLabel(lbTime);
        }

        core.setTimeRate(0);
        core.setDate(this.date, "utc");
        core.debug("Watching seasons of " + this.name);
    }
}

class MercuryObserver extends PlanetaryObserver {
    private _bulletList : BulletList;

    constructor(long:number, lat:number, date:string) {
        super(strings.mercury, "Mercury", long, lat, date);
        
        this.orbitalPeriod = 87.969;
        this.siderialPeriod = 58.646;
        this.fovSun = 0.008;
        this.landscape = "Moon";

        var cached = LandscapeMgr.precacheLandscape(this.landscape);
        if (!cached)
            throw new Error('Precaching landscape '+ this.landscape + ' failed');

        // For simulating a "day" on mercury
        this.timeRateDay = 4*86400;
        this.dateSunsetStart = "2018-10-26T13:01:13";
        this.dateSunsetEnd = "2019-01-21T12:00:00";
    }

    public watchSurface(startDate : string, endDate : string, timeRate : number) : void {
        try {
            var lbTitle : number = LabelMgr.labelScreen(strings.aDayOnMercury, 50, 50, true, 40, "#66ccff");

            super.watchSurface(startDate, endDate, timeRate);

            LandscapeMgr.setCurrentLandscapeName(this.landscape, 0);
            LandscapeMgr.setFlagAtmosphere(false);
            LandscapeMgr.setFlagFog(false);
            LandscapeMgr.setFlagLandscape(true);
            LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
            LandscapeMgr.setDefaultMinimalBrightness(0.05);

            StelMovementMgr.zoomTo(90, 0);
            core.setObserverLocation(this.long, this.lat, 425, 0, "Surface " + this.name + " Observer", this.id);
            core.moveToAltAzi(40, 180);
            core.wait(1);

            Helper.waitUntilDate(endDate);
        }
        finally {
            LabelMgr.deleteLabel(lbTitle);
        }
    }

    // Watch Season on mercury
    public watchSeasons() : void {
        try {
            super.watchSeasons();

            var bl : BulletList = new BulletList();

            let orbitx : number = core.getScreenWidth() - 300;
            let orbity : number = core.getScreenHeight() / 2;

            var lbTitle : number = LabelMgr.labelScreen(strings.mercuryAsSeenFromSun, 50, 50, true, 40, "#66ccff");
            var lbSunMarker : number = LabelMgr.labelScreen("+", orbitx, orbity, true, 15, "#ffff66");
            var lbSunCaption : number = LabelMgr.labelScreen(sharedStrings.sun, orbitx + 20, orbity, true, 15, "#ffff66");

            var dt = 0.3;
            for (let p = 0; p < this.orbitalPeriod; p += dt) {
                core.setDate("+" + dt + " day");
                core.wait(0.05);

                let info : any = core.getSelectedObjectInfo();
                if (info == null)
                    continue;

                let ra : number = info["ra"];
                let dst : number = info["distance"];
                let rad = 400;
                let x = Math.sin(ra * Math.PI / 180) * rad * dst;
                let y = Math.cos(ra * Math.PI / 180) * rad * dst;

                this.trace.add(orbitx + x, orbity + y)
            }

            // Display bullet list
            bl.setPos(50, 300);
            bl.add(strings.mercuryInfo1, 2);
            bl.add(strings.mercuryInfo2, 2);
            bl.add(strings.mercuryInfo3, 2);
            bl.add(strings.mercuryInfo4, 2);
            bl.add(strings.mercuryInfo5, 2);
            bl.show();

            core.wait(5);
        }
        finally {
            bl.clear();

            LabelMgr.deleteLabel(lbTitle);
            LabelMgr.deleteLabel(lbSunMarker);
            LabelMgr.deleteLabel(lbSunCaption);

            this.trace.clear();
        }
    }
}

class VenusObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.venus, "Venus", long, lat, date);

        this.orbitalPeriod = 224.701;
        this.siderialPeriod = -243.025;
        this.fovSun = 0.008;        
        this.landscape = "Saturn";

        var cached = LandscapeMgr.precacheLandscape(this.landscape);
        if (!cached)
            throw new Error('Precaching landscape '+ this.landscape + ' failed');

        this.timeRateDay = 4*86400;
        this.dateSunsetStart = "2018-08-23T12:00:00";
        this.dateSunsetEnd = "2018-10-29T12:00:00";
    }

    public watchSurface(startDate : string, endDate : string, timeRate : number) : void {
        try {
            var lbTitle : number = LabelMgr.labelScreen(strings.aDayOnVenus, 50, 50, true, 40, "#66ccff");

            super.watchSurface(startDate, endDate, timeRate);

            LandscapeMgr.setCurrentLandscapeName(this.landscape, 0);
            core.setObserverLocation(this.long, this.lat, 20000, 0, "Surface " + this.name + " Observer", this.id);

            LandscapeMgr.setFlagFog(false);
            LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
            LandscapeMgr.setDefaultMinimalBrightness(0.05);
            LandscapeMgr.setFlagAtmosphere(false);
            LandscapeMgr.setFlagLandscape(true);

            StelMovementMgr.zoomTo(120, 0);
            core.moveToAltAzi(50, 180);
            core.wait(1);

            Helper.waitUntilDate(endDate);
        }
        finally {
            LabelMgr.deleteLabel(lbTitle);
        }
    }

    // Watch Season on mercury
    public watchSeasons() : void {
        try {
            super.watchSeasons();

            var bl : BulletList = new BulletList();

            let orbitx : number = core.getScreenWidth() - 300;
            let orbity : number = core.getScreenHeight() / 2;

            var lbTitle = LabelMgr.labelScreen(strings.venusAsSeenFromSun, 50, 50, true, 40, "#66ccff");
            var lbSunMarker = LabelMgr.labelScreen("+", orbitx, orbity, true, 15, "#ffff66");
            var lbSunCaption = LabelMgr.labelScreen(sharedStrings.sun, orbitx + 20, orbity, true, 15, "#ffff66");

            var dt = 0.6;
            for (let p = 0; p < this.orbitalPeriod; p += dt) {
                core.setDate("+" + dt + " day");
                core.wait(0.05);

                let info : any = core.getSelectedObjectInfo();
                if (info == null)
                    continue;

                let ra : number = info["ra"];
                let dst : number = info["distance"];
                let rad = 200;
                let x = Math.sin(ra * Math.PI / 180) * rad * dst;
                let y = Math.cos(ra * Math.PI / 180) * rad * dst;

                this.trace.add(orbitx + x, orbity + y)
            }

            // Display bullet list
            bl.setPos(50, 300);
            bl.add(strings.venusInfo1, 2);
            bl.add(strings.venusInfo2, 2);
            bl.show();

            core.wait(5);
        }
        finally {
            bl.clear();

            LabelMgr.deleteLabel(lbTitle);
            LabelMgr.deleteLabel(lbSunMarker);
            LabelMgr.deleteLabel(lbSunCaption);

            this.trace.clear();
        }
    }
}

class EarthObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.earth, "Earth", long, lat, date);
        
        this.orbitalPeriod = 365.256363004;
        this.siderialPeriod = 0.99726968;
        this.fovSun = 0.008;
        this.landscape = "Garching";

        this.timeRateDay = 100;
        this.dateSunsetStart = "2018-10-26T13:01:13";
        this.dateSunsetEnd = "2019-01-21T12:00:00";
    }

    public watchSurface(startDate : string, endDate : string, timeRate : number) : void {
        super.watchSurface(startDate, endDate, timeRate);
        LandscapeMgr.setCurrentLandscapeName("Garching", 0);
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Earth Observer", "Earth");
    }

    public watchSeasons() : void {
        try {
            super.watchSeasons();
           
            var lbTitle = LabelMgr.labelScreen(strings.seasonalChanges, 50, 50, true, 40, "#66ccff");
            var lbTime =  LabelMgr.labelScreen(strings.europeAtNoon, 50, 100, true, 25, "#66ccff");

            // core.setDate(this.date, "utc");
            // core.setTimeRate(0);

            for (var i = 0; i < 365; ++i) {
                core.setDate("+1 day");
                core.wait(0.1);
            }
        }
        finally {
            LabelMgr.deleteLabel(lbTitle);
            LabelMgr.deleteLabel(lbTime);
        }
    }
}

class MarsObserver extends PlanetaryObserver {
    constructor(long:number, lat:number, date:string) {
        super(strings.mars, "Mars", long, lat, date);

        // fov for mars + phobos + deimos
        this.orbitalPeriod = 686.971;
        this.siderialPeriod = 1.025957;
        this.fovSun = 0.00678;
        this.landscape = "Mars";

        this.timeRateDay = 100;
        this.dateSunsetStart = "2018-10-26T13:01:13";
        this.dateSunsetEnd = "2019-01-21T12:00:00";
    }

    public watchSurface(startDate : string, endDate : string, timeRate : number) : void {
        
        super.watchSurface(startDate, endDate, timeRate);
        LandscapeMgr.setCurrentLandscapeName("Mars",0);
        LandscapeMgr.setFlagAtmosphere(true);
        LandscapeMgr.setFlagFog(true);
        LandscapeMgr.setFlagLandscape(true);

        core.setDate(this.date, "utc");
        core.setObserverLocation(this.long, this.lat, 425, 0, "Mars Observer", "Mars");
    }
}

function main() : void {
    try {
        core.wait(2);

        Helper.installDebugHooks();

        setup();
        //intro(5);

        var planets : IPlanetaryObserver[] = [
            new MercuryObserver(-33.22, 19.13, "2018-10-20T12:00:00"),
            new VenusObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
            new EarthObserver(13, 51, "2018-06-21T12:00:00"),
            //new MarsObserver(-33.22, 19.13, "1997-07-29T23:35:00"),
        ];

        var p = planets[1];
        //p.watchSeasons();

        let rate : number  = p.timeRateDay;
        let startDate : string = p.dateSunsetStart;
        let endDate : string = p.dateSunsetEnd;

        p.watchSeasons();
        p.watchSurface(startDate, endDate, rate);

/*        
        for (var i=0; i<planets.length; ++i) {
             var p = planets[i];
             if (p==null)
                 continue;

        //     p.watchFromSun();
        //     core.wait(60);

             p.watchSeasons();
             core.wait(6);
            }
*/            
    }
    catch(exc) {
        core.debug(exc);
        Helper.showError(exc);
    }
    finally {
        core.setGuiVisible(true);
        core.setTimeRate(1);

        Helper.removeDebugHooks();
    }
}

main();
