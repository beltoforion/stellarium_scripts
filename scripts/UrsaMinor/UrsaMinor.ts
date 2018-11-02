// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: Tour of Ursa Minor
// Description: A tour through constellation Ursa Minor and the northern star.

import { ItemOfInterest } from "../Shared/ItemOfInterest"
import { Constellation } from "../Shared/Constellation"
import { Strings, DictType } from "./Strings"

let strings : DictType = new Strings().getLocalizedStrings();

function setup() : void
{
    // Wait... Stellarium needs to start completely. Otherwise it would override the script settings
    core.debug("Setting up environment");

    SolarSystem.setFlagPlanets(false);
    SolarSystem.setFlagTrails(false);
    SolarSystem.setFlagLabels(false);
    SolarSystem.setFlagOrbits(false);
    SolarSystem.setFlagMoonScale(false);
    SolarSystem.setFontSize(25);
    
    StelSkyDrawer.setAbsoluteStarScale(1.2);
    StelSkyDrawer.setRelativeStarScale(1.25);

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

    core.setSkyCulture("western");
    core.setGuiVisible(false);
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(3);

    // Set location but wait 2 seconds to work around #491 (https://github.com/Stellarium/stellarium/issues/491)
    core.wait(2); 
    core.setObserverLocation(0,60, 500, 1, "Freiberg", "Earth");

    LandscapeMgr.setFlagAtmosphere(true);
    LandscapeMgr.setCurrentLandscapeName("Freiberg");
    LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);

    core.setDate("2018-10-25T20:00:00", "utc");
	core.selectObjectByName("UrsaMajor", false);
    StelMovementMgr.zoomTo(90, 3);
    core.wait(5);
}


function goHome(delay : number, zoomDelay : number) : void
{
    core.output("Moving to home postion");
	core.selectObjectByName("UrsaMajor", false);
    StelMovementMgr.zoomTo(90, zoomDelay);
    core.wait(delay);
}

// 
// Try to undo script settings that will mess up stellariums expected opertation
//

function cleanup() : void
{
    core.wait(5);

    ConstellationMgr.setFlagIsolateSelected(false);  
    ConstellationMgr.setFlagConstellationPick(false);
    ConstellationMgr.deselectConstellations();

    core.setGuiVisible(true);
}

//
// Custom Actions for some constellations
//

function customActionPolaris() : void
{
    GridLinesMgr.setFlagEquatorGrid(true);
	StelMovementMgr.zoomTo(100,2);

    core.setTimeRate(2000); 
    core.wait(10);

    core.setTimeRate(100); 
    GridLinesMgr.setFlagEquatorGrid(false);
}

//
// Main script entry Point
//

function main() : void
{
    setup()

    core.setTimeRate(1); 

    var constellations = [
        new Constellation("2018-10-25T22:02:22", "Ursa Minor", strings.constellationUrsaMinor, 32, 32, 
        [
            new ItemOfInterest("Polaris", strings.polaris, null, customActionPolaris)
        ])
    ];

    for (var i=0; i<constellations.length; i++)
    {
        var c = constellations[i];
        core.output("xx> i=" + i + "; constellation=\"" + c.displayName + "\"");
        if (c != null)
        {
            c.startTour();
            goHome(6, 2);
        }
    }

    cleanup();
}

main();