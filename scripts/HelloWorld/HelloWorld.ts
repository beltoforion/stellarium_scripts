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

		Helper.InstallDebugHooks();

		LabelMgr.labelScreen("Hello world", 400, 550, true, 100, "#66ccff");
	
		core.debug("Debug Output:")
		core.debug("  + Control Stellarium with Typescript!")
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
	}
	finally
	{
		LabelMgr.deleteAllLabels();
		Helper.RemoveDebugHooks()
	}
}

main();