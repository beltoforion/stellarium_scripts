// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: Analemma for Mars
// Description: A script for drawing analemmas

import { Strings } from "../Shared/Strings";
import { Analemma } from "../Shared/Analemma";
import { DictType } from "../Shared/Types"
import { Helper } from "../Shared/Helper"

var strings : DictType;


function setup() : void {
	// Wait to work around #491 
	// (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
	core.wait(2);

	strings = new Strings().getLocalizedStrings();

	SolarSystem.setFlagPlanets(true);
	SolarSystem.setMoonScale(6);
	SolarSystem.setFlagMoonScale(true);
	SolarSystem.setFontSize(25);
	SolarSystem.setFlagLabels(false);

	StarMgr.setLabelsAmount(0);

	StelMovementMgr.setAutoMoveDuration(5);
	StelMovementMgr.setFlagEnableMouseNavigation(false);

	ConstellationMgr.setFlagLines(false);
	ConstellationMgr.setFlagLabels(false);
	ConstellationMgr.setFlagArt(false);
	ConstellationMgr.setFlagBoundaries(false);
	ConstellationMgr.setFlagConstellationPick(false);
	ConstellationMgr.setFlagIsolateSelected(false);
	ConstellationMgr.deselectConstellations();

	core.setGuiVisible(false);

	LandscapeMgr.setFlagLandscape(true);
	LandscapeMgr.setFlagAtmosphere(true);
	LandscapeMgr.setFlagFog(true);
	LandscapeMgr.setCurrentLandscapeName("Mars",0);
	LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);
}


function intro() : void {
	core.setDate("2018-06-21T12:00:00", "local");
	core.moveToAltAzi(10, 140, 0);
	core.wait(.1);

	var labelTitle : number = LabelMgr.labelScreen(strings.titleMars, 250, 750, false, 70, "#66ccff");
	LabelMgr.setLabelShow(labelTitle, true);

	var labelTitle : number = LabelMgr.labelScreen(strings.subtitle, 250, 850, false, 40, "#66ccff");
	LabelMgr.setLabelShow(labelTitle, true);

	core.moveToAltAzi(10, 180, 5);
	core.wait(6);

	LabelMgr.deleteAllLabels();
}


function main() : void {
	try
	{
		Helper.InstallDebugHooks();

		setup()
		intro();

		// Position is for the Sagan memorial station (19° 7′ 48″ N, 33° 13′ 12″ W  (19.13°, -33.22°) )
		// time is for the analemma shown in APOD 61230 (https://www.starobserver.org/ap061230.html)
		let ana : Analemma = new Analemma(-33.22, 19.13, "1997-07-29T23:35:00", "Mars", 10);
		ana.setView(270, 20)
		ana.setTrailSymbol("O");
		ana.compute();
		core.wait(5);

		// uncomment if you want to remove the trace:
		//	ana.clear();
	}
	catch(err)
	{
		core.debug(err);
	}
	finally
	{
		core.debug("Restoring environment");
		core.setGuiVisible(true);
		StelMovementMgr.setFlagEnableMouseNavigation(true);
		Helper.RemoveDebugHooks();
	}
}

main();