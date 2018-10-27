// Author: Ingo Berg
// Version: 1.0
// License: Public Domain
// Name: CreateTypeScriptDeclarationFile 
// Description: Create TypeScript Declaration file for Stellarium

function out(line) {
    core.output(line);
}

function createDeclarationFile(objects)
{
    if (objects==null)
        return;

    var i=0;
    for (i=0; i<objects.length; ++i)
    {
        var o = objects[i];
        if (o==null)
            continue;

        out(o.prototype.name);
    }
}

function main()
{
    var stelObjects = [ 
        // Stellarium Base functionality
        core, 
        ConstellationMgr, 
        CustomObjectMgr, 
        GridLinesMgr, 
        LabelMgr, 
        LandscapeMgr, 
        SporadicMeteorMgr, 
        NebulaMgr, 
        ScreenImageMgr, 
        SolarSystem, 
        StarMgr, 
        StelVideoMgr, 
        StelMovementMgr, 
        StelSkyDrawer, 
        StelSkyLayerMgr, 
        MilkyWay, 
        ZodiacalLight,
    
        // also add a couple of plugins
        CompassMarks, 
        Oculars, 
        Satellites, 
        Exoplanets
    ];

    createDeclarationFile(stelObjects);
}

main();