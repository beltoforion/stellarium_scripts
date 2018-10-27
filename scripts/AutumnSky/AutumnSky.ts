// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: Constellations of the Autumn Sky
// Description: A tour through selected constallations of the autumn sky

import { ItemOfInterest } from "../Shared/ItemOfInterest"
import { Constellation } from "../Shared/Constellation"
import { Helper } from "../Shared/Helper"
import { Strings, DictType } from "./Strings"

var param_lat : number= 50.911944
var param_long : number= 13.34277

var strings : DictType;


function setup() : void
{
    // Wait to work around #491 
    // (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
    core.wait(2);

    SolarSystem.setFlagPlanets(true);
    SolarSystem.setMoonScale(6);
    SolarSystem.setFlagMoonScale(true);
    SolarSystem.setFontSize(25);
    SolarSystem.setFlagTrails(false);
	SolarSystem.setFlagOrbits(false);
	SolarSystem.setFlagLabels(false);
    
    StelSkyDrawer.setAbsoluteStarScale(1.2);
    StelSkyDrawer.setRelativeStarScale(1.25);

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
    core.setMilkyWayVisible(true);
    core.setMilkyWayIntensity(3);
    core.setObserverLocation(param_long, param_lat, 425, 0, "Freiberg", "Earth");

    LandscapeMgr.setFlagAtmosphere(true);
    LandscapeMgr.setCurrentLandscapeName("Freiberg");
    LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
	
    StelMovementMgr.setFlagEnableMouseNavigation(false);
    
    strings = new Strings().getLocalizedStrings("en");
}


function intro() : void
{
    core.setDate("2018-10-25T20:00:00", "utc");

    let labelTitle = LabelMgr.labelScreen(strings.title, 250, 750, false, 70, "#66ccff");
    LabelMgr.setLabelShow(labelTitle, true);

    let labelSubTitle = LabelMgr.labelScreen(strings.subtitle, 250, 850, false, 40, "#66ccff");
    LabelMgr.setLabelShow(labelSubTitle, true);

    core.moveToAltAzi(10, 270)
    GoHome(15, 0, 10);
    LabelMgr.deleteAllLabels();
}


function GoHome(delay : number, zoomDelay : number, moveDelay : number) : void
{
    core.output("Moving to home postion");
    StelMovementMgr.zoomTo(90, zoomDelay);
    core.moveToAltAzi(10, 130, moveDelay)
    core.wait(delay);
}

// 
// Try to undo script settings that will mess up stellariums expected opertation
//

function cleanup() : void
{
    ConstellationMgr.setFlagIsolateSelected(false);  
    ConstellationMgr.setFlagConstellationPick(false);
    ConstellationMgr.deselectConstellations();

    StelMovementMgr.setFlagEnableMouseNavigation(true);
	
    core.setGuiVisible(true);
    core.clear("natural");
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

    core.setTimeRate(60); 
    GridLinesMgr.setFlagEquatorGrid(false);
}


function customActionAndromeda() : void
{
	StelMovementMgr.zoomTo(3,2);
    core.wait(10);
}

//
// Main script entry Point
//

function main() : void
{
    try
    {
        Helper.InstallDebugHooks();

        setup()
        intro();

        core.setTimeRate(60); 

        var constellations = [

            new Constellation("2018-10-25T20:00:00", "Cepheus", strings.cepheus, 35, 35, 
            [
                new ItemOfInterest("NGC6946", strings.ngc6946),
                new ItemOfInterest("NGC7380", strings.ngc7380),
                new ItemOfInterest("NGC7023", strings.ngc7023),
                new ItemOfInterest("NGC7129", strings.ngc7129)
            ]),

            new Constellation("2018-10-25T20:00:00", "Mirfak", strings.perseus, 45, 45, 
            [
                new ItemOfInterest("NGC1499", strings.ngc1499),
                new ItemOfInterest("NGC884", strings.ngc884),
            ]),

            new Constellation("2018-10-25T20:01:30", "Cassiopeia", strings.cassiopeia, 35, 35, 
            [
                new ItemOfInterest("M103", strings.m103),
                new ItemOfInterest("M52", strings.m52),
                new ItemOfInterest("LBN667", strings.lbn667),
                new ItemOfInterest("IC1805", strings.ic1805),
                new ItemOfInterest("NGC281", strings.ngc281)
            ]),

            new Constellation("2018-10-25T22:02:22", "Ursa Major", strings.ursaMajor, 40, 50, 
            [
                new ItemOfInterest("M101", strings.m101),
                new ItemOfInterest("M97", strings.m97),
                new ItemOfInterest("M108", strings.m108),
                new ItemOfInterest("M81", strings.m81)
            ]),

            new Constellation("2018-10-25T22:02:22", "Ursa Minor", strings.ursaMinor, 32, 32, 
            [
                new ItemOfInterest("Polaris", strings.polaris, null, customActionPolaris)
            ]),

            new Constellation("2018-10-25T22:02:22", "Lyra", strings.lyra, 25, 25, 
            [
                new ItemOfInterest("M57", strings.m57)
            ]),

            new Constellation("2018-10-25T21:00:00", "Cygnus", strings.cygnus, 45, 45, 
            [
                new ItemOfInterest("NGC7000", strings.ngc7000),
                new ItemOfInterest("M39", strings.m39),
                new ItemOfInterest("NGC6960", strings.ngc6960),
                new ItemOfInterest("LBN203", strings.lbn203)
            ]),

            new Constellation("2018-10-25T20:00:00", "Andromeda", strings.andromeda, 35, 35, 
            [
                new ItemOfInterest("M31", strings.m31, null, customActionAndromeda)
            ]),

            new Constellation("2018-10-25T20:00:00", "1 Tri", strings.triangle, 25, 25, 
            [
                new ItemOfInterest("M33", strings.m33)
            ]),

            // workaround for a bug in Stellarium 0.18.2: Use "1 Her" as the name not "Hercules". That will show gemini.
            new Constellation("2018-10-25T20:00:00", "1 Her", strings.hercules, 55, 55, 
            [
                new ItemOfInterest("M13", strings.m13),
                new ItemOfInterest("M92", strings.m92)
            ])
        ];


        var i = 0;
        for (i = 0; i < constellations.length; i++)
        {
            var c = constellations[i];
            core.output("i=" + i + "; constellation=\"" + c.displayName + "\"");
            if (c != null)
            {
                c.startTour();
                GoHome(6, 2, 2);
            }
        }

        core.wait(3);
    }
    catch(exc)
    {
        core.output(exc);
    }
    finally
    {
        cleanup();
        Helper.RemoveDebugHooks();
    }
}

main();