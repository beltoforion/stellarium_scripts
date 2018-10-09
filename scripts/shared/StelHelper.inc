var StelHelper = {
    
    Output : function(message) {
        print(message);
        core.debug(message);
    },

    // StoreObjectState : function(stelObject) {
    //     if (stelObject==null)
    //         return;

    //     var state = {}



    //     return state;
    // },

    StoreState : function() {
        var stelObjects = [ 
                            // Stellarium Base functionality
                            core, ConstellationMgr, CustomObjectMgr, 
                            GridLinesMgr, LabelMgr, LandscapeMgr, 
                            SporadicMeteorMgr, NebulaMgr, ScreenImageMgr, 
                            SolarSystem, StarMgr, 
                            StelVideoMgr, StelMovementMgr, 
                            StelSkyDrawer, StelSkyLayerMgr, MilkyWay, ZodiacalLight,

                            // Plugins
                            CompassMarks, Oculars, Satellites, /*Quasars,*/
                            /*Pulsars,*/ Exoplanets, /*Observability,*/ /*EquationOfTime,*/
                            /*NavStars,*//* MeteorShowers, ArchaeoLines, TelescopeControl */];
        
        stelObjects.forEach(function storeFlag(stelObject) {
             var funList = Object.getOwnPropertyNames(stelObject).filter(
                function (p) { 
                    return typeof stelObject[p]==='function'
                });

             funList.forEach(function xxx(item) {
//                 print("type:" + (typeof item).toString() + "; xxx." + item);
                 print("xxx." + item);
             })
             print(funList);
        });
/*        
                            Object.getOwnPropertyNames(Math).filter(function (p) {
                                return typeof Math[p] === 'function';
                            }));
*/

    },

    RestoreState : function() {

    }
}
