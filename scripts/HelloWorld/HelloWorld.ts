// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: HelloWorld
// Description: A demonstrational script for tramnspiling typescript to stellarium

import { Helper } from "../Shared/Helper"

function main() : void {
	try
	{
		core.wait(2);

		Helper.installDebugHooks();

		LabelMgr.labelScreen("Hello world", 400, 550, true, 100, "#66ccff");
	
		core.debug("Here is how Typescript can help you")
		core.debug("  + Use stellariums native commands")
		core.debug("  + Keep your sanity whilst working with ECMA script")
		core.debug("  + get a onscreen display of core.debug messages")

		for (var i=0; i<10; ++i) {
			core.debug("Teminating in " + (10-i).toString() + " seconds")
			core.wait(1)
		}
	}
	catch(err)
	{
		core.debug(err);
		Helper.showError(err);
	}
	finally
	{
		LabelMgr.deleteAllLabels();
		Helper.removeDebugHooks()
	}
}

main();