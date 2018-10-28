// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: Analemma
// Description: A script for drawing analemmas

import { Analemma } from "../Shared/Analemma"
import { DictType } from "../Shared/Types"
import { Helper } from "../Shared/Helper"
import { Strings } from "./Strings"

var strings : DictType;

function setup() : void {
	// Wait to work around #491 
	// (https://github.com/Stellarium/stellarium/issues?q=is%3Aissue+is%3Aclosed)
	core.wait(3);

	SolarSystem.setFlagPlanets(true);
	SolarSystem.setMoonScale(6);
	SolarSystem.setFlagMoonScale(true);
	SolarSystem.setFontSize(25);

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
	//	LandscapeMgr.setFlagLandscapeSetsLocation(true);
	LandscapeMgr.setCurrentLandscapeName("Freiberg");
	LandscapeMgr.setFlagLandscapeUseMinimalBrightness(true);

	core.setDate("2018-06-21T12:00:00", "local");
	core.moveToAltAzi(10, 140, 0);
	core.wait(.1);

	strings = new Strings().getLocalizedStrings();
}


function intro() : void  {
	StarMgr.setLabelsAmount(0);
	SolarSystem.setFlagLabels(false);

	var labelTitle : number = LabelMgr.labelScreen("Analemma", 250, 750, false, 70, "#66ccff");
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
		Helper.installDebugHooks();

		setup()
		intro();
		var ana : Analemma = new Analemma(13.34277, 50.911944, "2018-06-21T12:00:00", "Earth", 2);
		ana.compute();
		core.wait(5);

		ana.clear();
		core.clear("natural");
	}
	catch(err)
	{
		core.debug(err);
		Helper.showError(err);
	}
	finally
	{
		core.debug("Script finished");
		Helper.removeDebugHooks();
		
		core.setGuiVisible(true);
		StelMovementMgr.setFlagEnableMouseNavigation(true);
	}
}

main();