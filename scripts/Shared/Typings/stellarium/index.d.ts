declare namespace core {
    function setJDay(jday : number) : void;
    function getJDay() : number;
    function setMJDay(mjd: number) : void;
    function getMJDay() : number;
    function setDate(dateStr : string, spec? : string, dateIsDT? : boolean) : void;
    function getDate(fmt : string) : string;
    function getDate() : string;
    function getDeltaT() : string;
    function getDeltaTAlgorithm() : string;
    function setDeltaTAlgorithm(algorithmName:string) : void;
    function setTimeRate(t : number) : void;
    function getTimeRate() : number;
    function isRealTime() : boolean;
    function setRealTime() : void;    
    function isPlanetocentricCalculations() : boolean;
    function setPlanetocentricCalculations(b:boolean):void;
    function selectObjectByName(s:string,b:boolean):void;
    function selectObjectByName(s:string):void;
    function getObjectPosition(s:string) : any;
    function getObjectInfo(s:string) : any;
    function getSelectedObjectInfo() : any;
    function clear(s:string) : void;
    function clear() : void;

    function getViewAltitudeAngle() : number;
    function getViewAzimuthAngle(): number 
    function getViewRaAngle(): number 
    function getViewDecAngle(): number 
    function getViewRaJ2000Angle(): number 
    function getViewDecJ2000Angle(): number 
    
    // <ibg 2018-10-24> Technically parameters 1 and 2 are originally strings. 
    // http://stellarium.org/doc/0.18/namespaceStelUtils.html#acd88f8194549c7d46656952428720427
    // I added two overloads for numbers
    function moveToAltAzi(alt:number, az:number, f? : number) : void;
    // original (proper definition):
    function moveToAltAzi(s:string, s2:string, f? : number) : void;
    // </ibg>

    function moveToRaDec(s:string, s2:string, f : number): void;
    function moveToRaDec(s:string, s2:string): void;
    function moveToRaDecJ2000(s:string, s2:string, f:number): void;
    function moveToRaDecJ2000(s:string, s2:string): void;

    function setObserverLocation(lon:number,lat:number,alt:number,duration?:number,name?:string,planet?:string):void;
    function setObserverLocation(id:string,duration?:number):void;

    function getObserverLocation() : string;
    function getObserverLocationInfo() : any;
    function screenshot(s:string,b:boolean,s2:string,b2:boolean):void;
    function screenshot(s:string,b:boolean,s2:string):void;
    function screenshot(s:string,b:boolean):void;
    function screenshot(s:string):void;
    function setGuiVisible(b:boolean):void;
    function setMinFps(f:number):void;
    function getMinFps():number;
    function setMaxFps(f:number):void;
    function getMaxFps():number;
    function getMountMode():string;
    function setMountMode(s:string):void;
    function getNightMode():boolean;
    function setNightMode(b:boolean):void;
    function getProjectionMode():string;
    function setProjectionMode(s:string):void;
    function getDiskViewport():boolean;
    function setDiskViewport(b:boolean):void;
    function setSphericMirror(b:boolean):void;
    function setViewportOffset(f1:number,f2:number):void;
    function setViewportStretch(f:number):void;
    // function getAllSkyCultureIDs();
    function getSkyCulture():string;
    function setSkyCulture(s:string):void;
    function getSkyCultureName():string;
    function getSkyCultureNameI18n():string;
    function getFlagGravityLabels():boolean;
    function setFlagGravityLabels(b:boolean):void;
    
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,double,double,double,double,bool,QString):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,double,double,double,double,bool):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,double,double,double,double):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,double,double,double):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,double,double):void;

    // function loadSkyImage(s:string,QString,QString,QString,QString,QString,QString,QString,QString,QString,double,double,bool,QString):void;
    // function loadSkyImage(s:string,QString,QString,QString,QString,QString,QString,QString,QString,QString,double,double,bool):void;
    // function loadSkyImage(s:string,QString,QString,QString,QString,QString,QString,QString,QString,QString,double,double):void;
    // function loadSkyImage(s:string,QString,QString,QString,QString,QString,QString,QString,QString,QString,double):void;
    // function loadSkyImage(s:string,QString,QString,QString,QString,QString,QString,QString,QString,QString):void;

    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,bool,QString):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double,bool):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double,double):void;
    // function loadSkyImage(s:string,QString,double,double,double,double,double):void;
    // function loadSkyImage(s:string,QString,double,double,double,double):void;

    // function loadSkyImage(s:string,QString,QString,QString,double,double,double,double,bool,QString):void;
    // function loadSkyImage(s:string,QString,QString,QString,double,double,double,double,bool):void;
    // function loadSkyImage(s:string,QString,QString,QString,double,double,double,double):void;
    // function loadSkyImage(s:string,QString,QString,QString,double,double,double):void;
    // function loadSkyImage(s:string,QString,QString,QString,double,double):void;

    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double,double,double,double,double,bool):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double,double,double,double,double):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double,double,double,double):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double,double,double):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double,bool):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double,double):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double,double):void;
    // function loadSkyImageAltAz(s:string,QString,double,double,double,double):void;
    
    function removeSkyImage(s:string):void;
    // function getScreenXYFromAltAzi(s:string,QString);
    
    function loadSound(s:string,s2:string):void;
    function playSound(s:string):void;
    function pauseSound(s:string):void;
    function stopSound(s:string):void;
    function dropSound(s:string):void;
    function getSoundPosition(s:string):number;
    function getSoundDuration(s:string):number;
    function loadVideo(s:string,s2:string,f1:number,f2:number,b:boolean,f:number):void;
    function loadVideo(s:string,s2:string,f1:number,f2:number,b:boolean):void;
    function loadVideo(s:string,s2:string,f1:number,f2:number):void;
    function playVideo(s:string,b:boolean):void;
    function playVideo(s:string):void;
    
    function playVideoPopout(s:string,f1:number,f2:number,f3:number,f4:number,f5:number,f6:number,f7:number,b:boolean):void;
    function pauseVideo(s:string):void;
    function stopVideo(s:string):void;
    function dropVideo(s:string):void;
    
    function seekVideo(s:string,ll:number,b:boolean):void;
    function seekVideo(s:string,ll:number):void;
    function setVideoXY(s:string,f1:number,f2:number,b:boolean):void;
    function setVideoXY(s:string,f1:number,f2:number):void;
    function setVideoAlpha(s:string,f:number):void;
    function resizeVideo(s:string,f1:number,f2:number):void;
    
    function showVideo(s:string,b:boolean):void;
    function showVideo(s:string):void;
    function getVideoDuration(s:string):number;
    function getVideoPosition(s:string):number;
    function getScreenWidth():number;
    function getScreenHeight():number;
    function getScriptRate():number

    function setScriptRate(d:number):void;
    function pauseScript():void;
    function setSelectedObjectInfo(s:string):void;
    function exit() : void;
    function quitStellarium() : void;
    
    // function getPropertyList(); // return type is QStringList

    function debug(s:string) : void;
    function output(s:string) : void;
    
    function mapToString(map:any) : string;

    function resetOutput() : void;
    function saveOutputAs(fileName:string) : void;

    function getAppLanguage():string;
    function setAppLanguage(s:string):void;

    function getSkyLanguage():string;
    function setSkyLanguage(s:string):void;

    function goHome():void;
    function setMilkyWayVisible(b:boolean):void;
    function setMilkyWayIntensity(d:number):void;
    function getMilkyWayIntensity():number;
    function setZodiacalLightVisible(b:boolean):void;

    function setZodiacalLightIntensity(d:number) : void;
    function getZodiacalLightIntensity() : number;

    function getBortleScaleIndex() : number;
    function setBortleScaleIndex(i:number) : void;

    function setDSSMode(b:boolean):void;

    function isDSSModeEnabled() : boolean;
    function jdFromDateString(dt:string, spec : string) : number;
    
    function wait(t:number) : void;
    function waitFor(s1 : string, s2:string) : void;
    function waitFor(s:string) : void;
    function getEnv(s : string) : string;
}

declare namespace ConstellationMgr {
    function setFlagArt(b:boolean) : void;
    function getFlagArt() : boolean;

    function setArtFadeDuration(f:number) : void;
    function getArtFadeDuration():number;
    function setArtIntensity(f:number): void;
    function getArtIntensity():number;
    function setArtIntensityMinimumFov(d:number): void;
    function getArtIntensityMinimumFov():number;
    function setArtIntensityMaximumFov(d:number): void;
    function getArtIntensityMaximumFov():number;
// function setBoundariesColor(Vec3f): void;
// function getBoundariesColor();
    function setFlagBoundaries(b:boolean) : void;
    function getFlagBoundaries(): boolean;
    function setFlagIsolateSelected(b:boolean): void;
    function getFlagIsolateSelected(): boolean;
    function setFlagConstellationPick(b:boolean): void;
    function getFlagConstellationPick(): boolean;
// function setLinesColor(Vec3f);
// function getLinesColor();
    function setFlagLines(b:boolean): void;
    function getFlagLines():boolean;
// function setLabelsColor(Vec3f);
// function getLabelsColor();
    function setFlagLabels(b:boolean): void;
    function getFlagLabels() : boolean;
    function setFontSize(f:number):void;
    function getFontSize() : number;
// function setConstellationDisplayStyle(ConstellationMgr::ConstellationDisplayStyle);
// function getConstellationDisplayStyle();
// function getConstellationDisplayStyleString(ConstellationMgr::ConstellationDisplayStyle);
    function setConstellationLineThickness(i:number):void;
    function getConstellationLineThickness():number;
    function deselectConstellations():void;
    function selectAllConstellations():void;
}

declare namespace CustomObjectMgr {
    // function searchByEnglishName(s:string);
    // function addCustomObject(s1:string,Vec3d,b:boolean);
    // function addCustomObject(s1:string,Vec3d);

    function addCustomObject(s1:string,s2:string,s3:string,b:boolean):void;
    function addCustomObject(s1:string,s2:string,s3:string):void;
    function addCustomObjectRaDec(s1:string,s2:string,s3:string,b:boolean):void;
    function addCustomObjectRaDec(s1:string,s2:string,s3:string):void;

    // <ibg 2018-10-26/>
    function addCustomObjectAltAzi(s1:string,alt:number,az:number,b:boolean):void;
    function addCustomObjectAltAzi(s1:string,alt:number,az:number):void;
    //
    function addCustomObjectAltAzi(s1:string,s2:string,s3:string,b:boolean):void;
    function addCustomObjectAltAzi(s1:string,s2:string,s3:string):void;
    // </ibg>

    function removeCustomObjects():void;
    function removeCustomObject(s:string):void;
    
    // function setMarkersColor(Vec3f);
    // function getMarkersColor();
    function setMarkersSize(f:number) : void;
    function getMarkersSize() : number;
}

declare namespace GridLinesMgr {
    function setFlagGridlines(visible:boolean):void;
    function getFlagGridlines():boolean;

    function setFlagAzimuthalGrid(visible:boolean):void;
    function getFlagAzimuthalGrid():boolean;
    // function getColorAzimuthalGrid();
    // function setColorAzimuthalGrid(Vec3f);
    
    function setFlagEquatorGrid(visible:boolean):void;
    function getFlagEquatorGrid():boolean;
    // function getColorEquatorGrid();
    // function setColorEquatorGrid(Vec3f):void;

    function setFlagEquatorJ2000Grid(b:boolean):void;
    function getFlagEquatorJ2000Grid():boolean;
    // function getColorEquatorJ2000Grid();
    // function setColorEquatorJ2000Grid(Vec3f);

    function setFlagEclipticJ2000Grid(visible:boolean):void;
    function getFlagEclipticJ2000Grid():boolean;
    // function getColorEclipticJ2000Grid();
    // function setColorEclipticJ2000Grid(Vec3f);

    function setFlagEclipticGrid(visible:boolean):void;
    function getFlagEclipticGrid():boolean;
    // function getColorEclipticGrid();
    // function setColorEclipticGrid(Vec3f);

    function setFlagGalacticGrid(visible:boolean):void;
    function getFlagGalacticGrid():boolean;
    // function getColorGalacticGrid();
    // function setColorGalacticGrid(Vec3f);

    function setFlagSupergalacticGrid(visible:boolean):void;
    function getFlagSupergalacticGrid():boolean;
    // function getColorSupergalacticGrid();
    // function setColorSupergalacticGrid(Vec3f):void;

    function setFlagEquatorLine(visible:boolean):void;
    function getFlagEquatorLine():boolean;
    // function getColorEquatorLine();
    // function setColorEquatorLine(Vec3f):void;

    function setFlagEquatorJ2000Line(visible:boolean):void;
    function getFlagEquatorJ2000Line():boolean;
    // function getColorEquatorJ2000Line();
    // function setColorEquatorJ2000Line(Vec3f):void;

    function setFlagEclipticJ2000Line(visible:boolean):void;
    function getFlagEclipticJ2000Line():boolean;
    // function getColorEclipticJ2000Line();
    // function setColorEclipticJ2000Line(Vec3f);

    function setFlagEclipticLine(visible:boolean):void;
    function getFlagEclipticLine():boolean;
    // function getColorEclipticLine();
    // function setColorEclipticLine(Vec3f);

    function setFlagPrecessionCircles(visible:boolean):void;
    function getFlagPrecessionCircles():boolean;
    // function getColorPrecessionCircles();
    // function setColorPrecessionCircles(Vec3f);

    function setFlagMeridianLine(visible:boolean):void;
    function getFlagMeridianLine():boolean;
    // function getColorMeridianLine();
    // function setColorMeridianLine(Vec3f):void;
    
    function setFlagLongitudeLine(visible:boolean):void;
    function getFlagLongitudeLine():boolean;
    // function getColorLongitudeLine();
    // function setColorLongitudeLine(Vec3f);
    
    function setFlagHorizonLine(visible:boolean):void;
    function getFlagHorizonLine():boolean;
    // function getColorHorizonLine();
    // function setColorHorizonLine(Vec3f);

    function setFlagGalacticEquatorLine(visible:boolean):void;
    function setFlagGalacticPlaneLine(visible:boolean):void;
    function getFlagGalacticEquatorLine():boolean;
    function getFlagGalacticPlaneLine():boolean;
    // function getColorGalacticEquatorLine();
    // function setColorGalacticEquatorLine(Vec3f):void;

    function setFlagSupergalacticEquatorLine(visible:boolean):void;
    function getFlagSupergalacticEquatorLine():boolean;
    // function getColorSupergalacticEquatorLine();
    // function setColorSupergalacticEquatorLine(Vec3f);

    function setFlagPrimeVerticalLine(visible:boolean):void;
    function getFlagPrimeVerticalLine():boolean;
    // function getColorPrimeVerticalLine();
    // function setColorPrimeVerticalLine(Vec3f):void;

    function setFlagColureLines(visible:boolean):void;
    function getFlagColureLines():boolean;
    // function getColorColureLines();
    // function setColorColureLines(Vec3f):void;

    function setFlagCircumpolarCircles(visible:boolean):void;
    function getFlagCircumpolarCircles():boolean;
    // function getColorCircumpolarCircles();
    // function setColorCircumpolarCircles(Vec3f):void;

    function setFlagCelestialJ2000Poles(visible:boolean):void;
    function getFlagCelestialJ2000Poles():boolean;
    // function getColorCelestialJ2000Poles();
    // function setColorCelestialJ2000Poles(Vec3f);

    function setFlagCelestialPoles(visible:boolean):void;
    function getFlagCelestialPoles():boolean;
    // function getColorCelestialPoles();
    // function setColorCelestialPoles(Vec3f);

    function setFlagZenithNadir(visible:boolean):void;
    function getFlagZenithNadir():boolean;
    // function getColorZenithNadir();
    // function setColorZenithNadir(Vec3f);

    function setFlagEclipticJ2000Poles(b:boolean):void;
    function getFlagEclipticJ2000Poles():boolean;
    // function getColorEclipticJ2000Poles();
    // function setColorEclipticJ2000Poles(Vec3f);

    function setFlagEclipticPoles(visible:boolean):void;
    function getFlagEclipticPoles():boolean;
    // function getColorEclipticPoles();
    // function setColorEclipticPoles(Vec3f);

    function setFlagGalacticPoles(visible:boolean):void;
    function getFlagGalacticPoles():boolean;
    // function getColorGalacticPoles();
    // function setColorGalacticPoles(Vec3f);

    function setFlagSupergalacticPoles(visible:boolean):void;
    function getFlagSupergalacticPoles():boolean;
    // function getColorSupergalacticPoles();
    // function setColorSupergalacticPoles(Vec3f);

    function setFlagEquinoxJ2000Points(visible:boolean):void;
    function getFlagEquinoxJ2000Points():boolean;
    // function getColorEquinoxJ2000Points();
    // function setColorEquinoxJ2000Points(Vec3f);

    function setFlagEquinoxPoints(visible:boolean):void;
    function getFlagEquinoxPoints():boolean;
    // function getColorEquinoxPoints();
    // function setColorEquinoxPoints(Vec3f);

    function setFlagSolsticeJ2000Points(visible:boolean):void;
    function getFlagSolsticeJ2000Points():boolean;
    // function getColorSolsticeJ2000Points();
    // function setColorSolsticeJ2000Points(Vec3f);

    function setFlagSolsticePoints(visible:boolean):void;
    function getFlagSolsticePoints():boolean;
    // function getColorSolsticePoints();
    // function setColorSolsticePoints(Vec3f);
}

declare namespace LabelMgr {

    function labelObject(text:string,s2:string,b1?:boolean,f?:number,s3?:string,s4?:string,d?:number,s5?:string,b2?:boolean,i?:number):number;
    function labelHorizon(text:string,az:number,alt:number,visible?:boolean,fontSize?:number,color?:string,autoDelete?:boolean,autoDeleteTimeoutMs?:number):number;
    function labelScreen(text:string,x:number,y:number,visible?:boolean,fontSize?:number,color?:string,autoDelete?:boolean,autoDeleteTimeoutMs?:number): number;

    function getLabelShow(i:number):boolean;
    
    function setLabelShow(i:number,b:boolean):void;
    function setLabelText(i:number,s:string):void;
    function deleteLabel(i:number):void;
    function deleteAllLabels() : void;
}

declare namespace LandscapeMgr {
    function getLuminance():number;
    function getAtmosphereAverageLuminance():number;
    function setAtmosphereAverageLuminance(f:number) : void;
    // function getNameToDirMap();
    // function getAllLandscapeNames();
    // function getAllLandscapeIDs();
    // function getUserLandscapeIDs();
    function getCurrentLandscapeID():string;
    function setCurrentLandscapeID(id:string,changeDuration?:number): boolean;

    function getCurrentLandscapeName():string;
    function setCurrentLandscapeName(name:string, changeDuration?:number): boolean;
    
    function getCurrentLandscapeBrightness(light?:boolean):number;
    
    function precacheLandscape(landscapeId:string,replace?:boolean):boolean;
    function removeCachedLandscape(landscapeId:string):boolean;

    function setCacheSize(i:number):void;
    function getCacheSize():number;
    function getCacheFilledSize():number;
    function getCacheCount():number;
    function getCurrentLandscape():string;
    
    function getDefaultLandscapeID():string;
    function setDefaultLandscapeID(s:string):void;
    
    function getCurrentLandscapeHtmlDescription():string;
    function getDescription():string;
    
    function getFlagLandscape():boolean;
    function setFlagLandscape(visible:boolean):void;
    
    function getIsLandscapeFullyVisible():boolean;
    function getLandscapeSinMinAltitudeLimit():number;
    function getFlagFog():boolean;
    function setFlagFog(b:boolean):void;
    
    function getFlagIllumination():boolean;
    function setFlagIllumination(b:boolean):void;
    
    function getFlagLabels():boolean;
    function setFlagLabels(b:boolean):void;
    
    function getFlagLandscapeSetsLocation():boolean;
    function setFlagLandscapeSetsLocation(b:boolean):void;
    
    function getFlagLandscapeUseMinimalBrightness():boolean;
    function setFlagLandscapeUseMinimalBrightness(b:boolean):void;
    function getFlagLandscapeSetsMinimalBrightness():boolean;
    function setFlagLandscapeSetsMinimalBrightness(b:boolean):void;
    function getDefaultMinimalBrightness():number;
    function setDefaultMinimalBrightness(d:number):void;
    function setFlagUseLightPollutionFromDatabase(b:boolean):void;
    function getFlagUseLightPollutionFromDatabase():boolean;
    function getFlagCardinalsPoints():boolean;
    function setFlagCardinalsPoints(b:boolean):void;
    // function getColorCardinalPoints();
    //function setColorCardinalPoints(Vec3f):void;
    function getFlagAtmosphere():boolean;
    function setFlagAtmosphere(b:boolean):void;
    function getAtmosphereFadeIntensity():number;
    function getAtmosphereFadeDuration():number;
    function setAtmosphereFadeDuration(f:number):void;
    function setZRotation(f:number):void;
    
    function installLandscapeFromArchive(s:string,b1:boolean,b2:boolean):string;
    function installLandscapeFromArchive(s:string,b1:boolean):string;
    function installLandscapeFromArchive(s:string):string;
    
    function removeLandscape(s:string):void;
    function loadLandscapeName(landscapeId:string):string;
    function loadLandscapeSize(landscapeId:string):number;
    function getFlagLandscapeAutoSelection():boolean;
    function setFlagLandscapeAutoSelection(b:boolean):void;

    function getFlagEnvironmentAutoEnable():boolean;
    function setFlagEnvironmentAutoEnable(b:boolean):void;
    
    function getFlagAtmosphereAutoEnable():boolean;
    function setFlagAtmosphereAutoEnable(b:boolean):void;
    
    // function getLandscapeOpacity(Vec3d):number;
    // function getLandscapeOpacity(Vec3f):number;
    
    function getLandscapeOpacity(az:number, alt:number):number;
}

declare namespace SporadicMeteorMgr {
    function getZHR():number;
    function setZHR(n:number): void;
    function setFlagShow(b:boolean) : void;
    function getFlagShow() : boolean;
    function setMaxVelocity(v:number): void;
    function setFlagForcedMeteorsActivity(b:boolean): void;
    function getFlagForcedMeteorsActivity():boolean;
}

declare namespace NebulaMgr {
    // function setCatalogFilters(Nebula::CatalogGroup);
    // function getCatalogFilters();
    // function setTypeFilters(Nebula::TypeGroup);
    // function getTypeFilters();
    // function setCirclesColor(Vec3f);
    // function getCirclesColor();
    // function setGalaxyColor(Vec3f);
    // function getGalaxyColor();
    // function setActiveGalaxyColor(Vec3f);
    // function getActiveGalaxyColor();
    // function setInteractingGalaxyColor(Vec3f);
    // function getInteractingGalaxyColor();
    // function setRadioGalaxyColor(Vec3f);
    // function getRadioGalaxyColor();
    // function setQuasarColor(Vec3f);
    // function getQuasarColor();
    // function setBrightNebulaColor(Vec3f);
    // function getBrightNebulaColor();
    // function setNebulaColor(Vec3f);
    // function getNebulaColor();
    // function setPlanetaryNebulaColor(Vec3f);
    // function getPlanetaryNebulaColor();
    // function setReflectionNebulaColor(Vec3f);
    // function getReflectionNebulaColor();
    // function setBipolarNebulaColor(Vec3f);
    // function getBipolarNebulaColor();
    // function setEmissionNebulaColor(Vec3f);
    // function getEmissionNebulaColor();
    // function setHydrogenRegionColor(Vec3f);
    // function getHydrogenRegionColor();
    // function setSupernovaRemnantColor(Vec3f);
    // function getSupernovaRemnantColor();
    // function setSupernovaCandidateColor(Vec3f);
    // function getSupernovaCandidateColor();
    // function setSupernovaRemnantCandidateColor(Vec3f);
    // function getSupernovaRemnantCandidateColor();
    // function setInterstellarMatterColor(Vec3f);
    // function getInterstellarMatterColor();
    // function setDarkNebulaColor(Vec3f);
    // function getDarkNebulaColor();
    // function setClusterWithNebulosityColor(Vec3f);
    // function getClusterWithNebulosityColor();
    // function setClusterColor(Vec3f);
    // function getClusterColor();
    // function setOpenClusterColor(Vec3f);
    // function getOpenClusterColor();
    // function setGlobularClusterColor(Vec3f);
    // function getGlobularClusterColor();
    // function setStellarAssociationColor(Vec3f);
    // function getStellarAssociationColor();
    // function setStarCloudColor(Vec3f);
    // function getStarCloudColor();
    // function setEmissionObjectColor(Vec3f);
    // function getEmissionObjectColor();
    // function setBlLacObjectColor(Vec3f);
    // function getBlLacObjectColor();
    // function setBlazarColor(Vec3f);
    // function getBlazarColor();
    // function setMolecularCloudColor(Vec3f);
    // function getMolecularCloudColor();
    // function setYoungStellarObjectColor(Vec3f);
    // function getYoungStellarObjectColor();
    // function setPossibleQuasarColor(Vec3f);
    // function getPossibleQuasarColor();
    // function setPossiblePlanetaryNebulaColor(Vec3f);
    // function getPossiblePlanetaryNebulaColor();
    // function setProtoplanetaryNebulaColor(Vec3f);
    // function getProtoplanetaryNebulaColor();
    // function setStarColor(Vec3f);
    // function getStarColor();
    // function setSymbioticStarColor(Vec3f);
    // function getSymbioticStarColor();
    // function setEmissionLineStarColor(Vec3f);
    // function getEmissionLineStarColor();
    // function setGalaxyClusterColor(Vec3f);
    // function getGalaxyClusterColor();
    function setHintsFadeDuration(f:number):void;
    function setFlagHints(b:boolean):void;
    function getFlagHints():boolean;
    // function setHintsProportional(b:boolean);
    // function getHintsProportional();
    function setFlagOutlines(b:boolean):void;
    function getFlagOutlines():boolean;
    function setFlagAdditionalNames(b:boolean):void;
    function getFlagAdditionalNames():boolean;
    // function setDesignationUsage(b:boolean);
    // function getDesignationUsage();
    function setFlagSurfaceBrightnessUsage(b:boolean):void;
    function getFlagSurfaceBrightnessUsage():boolean;
    function setFlagSurfaceBrightnessArcsecUsage(b:boolean):void;
    function getFlagSurfaceBrightnessArcsecUsage():boolean;
    function setFlagSurfaceBrightnessShortNotationUsage(b:boolean):void;
    function getFlagSurfaceBrightnessShortNotationUsage():boolean;
    function setFlagSizeLimitsUsage(b:boolean):void;
    function getFlagSizeLimitsUsage():boolean;
    function setFlagShow(b:boolean):void;
    function getFlagShow():boolean;
    function setFlagUseTypeFilters(b:boolean):void;
    function getFlagUseTypeFilters():boolean;
    function setMinSizeLimit(d:number):void;
    function getMinSizeLimit():number;
    function setMaxSizeLimit(d:number):void;
    function getMaxSizeLimit():number;
    //function setLabelsColor(Vec3f):void;
    // function getLabelsColor();
    function setLabelsAmount(d:number):void;
    function getLabelsAmount():number;
    function setHintsAmount(d:number):void;
    function getHintsAmount():number;
}

declare namespace ScreenImageMgr {
    function createScreenImage(id : string, 
                               fileName : string,
                               x : number,
                               y : number,
                               scale? : number,
                               visible? : boolean, 
                               alpha? : number, 
                               fadeDuration? : number) : void;
    function getShowImage(id : string) : boolean;
    function showImage(id : string , b : boolean) : void;
    function getImageWidth(id : string) : number;
    function getImageHeight(id : string) : number;
    
    function setImageScale(s:string,f1:number,f2:number,f3:number):void;
    function setImageScale(s:string,f1:number,f2:number):void;
    function getImageScaleX(s:string):number;
    function getImageScaleY(s:string):number;
    function setImageAlpha(s:string,f1:number):void;
    
    function setImageXY(id:string,x:number,y:number,duration?:number):void;
    
    function addImageXY(s:string,f1:number,f2:number,f3:number):void;
    function addImageXY(s:string,f1:number,f2:number):void;
    function deleteImage(id:string):void;
    function deleteAllImages():void;
    
    // function getAllImageIDs();
}

declare namespace SolarSystem {
    function setFlagPlanets(b:boolean) : void;
    function getFlagPlanets() : boolean;
    function setFlagTrails(b:boolean):void;
    function getFlagTrails() : boolean;
    function setFlagHints(b:boolean):void;
    function getFlagHints() : boolean;
    function setFlagLabels(b:boolean):void;
    function getFlagLabels() : boolean;
    function setLabelsAmount(d:number):void;
    function getLabelsAmount():number;
    function setFlagOrbits(b:boolean):void;
    function getFlagOrbits():boolean;
    function setFlagPointer(b:boolean):void;
    function getFlagPointer():boolean;
    function setFlagLightTravelTime(b:boolean):void;
    function getFlagLightTravelTime():boolean;
    function setFlagUseObjModels(b:boolean):void;
    function getFlagUseObjModels():boolean;
    function setFlagShowObjSelfShadows(b:boolean):void;
    function getFlagShowObjSelfShadows():boolean;
    function setFontSize(f:number):void;
    //function setLabelsColor(Vec3f):void;
    // function getLabelsColor();
    //function setOrbitsColor(Vec3f):void;
    // function getOrbitsColor();
    //function setMajorPlanetsOrbitsColor(Vec3f):void;
    // function getMajorPlanetsOrbitsColor();
    //function setMoonsOrbitsColor(Vec3f):void;
    // function getMoonsOrbitsColor();
    // function setMinorPlanetsOrbitsColor(Vec3f):void;
    // function getMinorPlanetsOrbitsColor();
    // function setDwarfPlanetsOrbitsColor(Vec3f):void;
    // function getDwarfPlanetsOrbitsColor();
    // function setCubewanosOrbitsColor(Vec3f):void;
    // function getCubewanosOrbitsColor();
    // function setPlutinosOrbitsColor(Vec3f):void;
    // function getPlutinosOrbitsColor();
    // function setScatteredDiskObjectsOrbitsColor(Vec3f):void;
    // function getScatteredDiskObjectsOrbitsColor();
    // function setOortCloudObjectsOrbitsColor(Vec3f):void;
    // function getOortCloudObjectsOrbitsColor();
    // function setCometsOrbitsColor(Vec3f):void;
    // function getCometsOrbitsColor();
    // function setSednoidsOrbitsColor(Vec3f):void;
    // function getSednoidsOrbitsColor();
    // function setMercuryOrbitColor(Vec3f):void;
    // function getMercuryOrbitColor();
    // function setVenusOrbitColor(Vec3f):void;
    // function getVenusOrbitColor();
    // function setEarthOrbitColor(Vec3f):void;
    // function getEarthOrbitColor();
    // function setMarsOrbitColor(Vec3f):void;
    // function getMarsOrbitColor();
    // function setJupiterOrbitColor(Vec3f):void;
    // function getJupiterOrbitColor();
    // function setSaturnOrbitColor(Vec3f):void;
    // function getSaturnOrbitColor();
    // function setUranusOrbitColor(Vec3f):void;
    // function getUranusOrbitColor();
    //function setNeptuneOrbitColor(Vec3f):void;
    // function getNeptuneOrbitColor();
    //function setTrailsColor(Vec3f):void;
    // function getTrailsColor();
    //function setPointerColor(Vec3f):void;
    // function getPointerColor();
    function setFlagMoonScale(b:boolean):void;
    function getFlagMoonScale():boolean;
    function setMoonScale(d:number):void;
    // function getMoonScale();
    function setFlagMinorBodyScale(b:boolean):void;
    function getFlagMinorBodyScale():boolean;
    function setMinorBodyScale(d:number):void;
    // function getMinorBodyScale();
    // function updateI18n();
    // function getPlanetVMagnitude(s:string,bool);
    // function getPlanetVMagnitude(s:string);
    // function getPlanetType(s:string);
    // function getDistanceToPlanet(s:string);
    // function getElongationForPlanet(s:string);
    // function getPhaseAngleForPlanet(s:string);
    // function getPhaseForPlanet(s:string);
    function setApparentMagnitudeAlgorithmOnEarth(s:string):void;
    // function getApparentMagnitudeAlgorithmOnEarth();
    function setFlagNativePlanetNames(b:boolean):void;
    function getFlagNativePlanetNames():boolean;
    function setFlagTranslatedNames(b:boolean):void;
    function getFlagTranslatedNames():boolean;
    function setFlagIsolatedTrails(b:boolean):void;
    function getFlagIsolatedTrails():boolean;
    function setFlagIsolatedOrbits(b:boolean):void;
    function getFlagIsolatedOrbits():boolean;
    function setFlagPlanetsOrbitsOnly(b:boolean):void;
    function getFlagPlanetsOrbitsOnly():boolean;
    function setFlagCustomGrsSettings(b:boolean):void;
    function getFlagCustomGrsSettings():boolean;
    function setCustomGrsLongitude(i:number):void;
    function getCustomGrsLongitude():number;
    function setCustomGrsDrift(d:number):void;
    function getCustomGrsDrift():number;
    function setCustomGrsJD(d:number):void;
    function getCustomGrsJD():number;
    function setOrbitColorStyle(s:string):void;
    function getOrbitColorStyle():string;
    // function getObjectsList(s:string);
    // function getObjectsList();
}

declare namespace StarMgr {
    // function setLabelColor(Vec3f);
    // function getLabelColor();
    function setFlagStars(b:boolean):void;
    function getFlagStars():boolean;
    function setFlagLabels(b:boolean):void;
    function getFlagLabels():boolean;
    function setLabelsAmount(d:number):void;
    function getLabelsAmount():number;
    function setFontSize(f:number):void;
    function setFlagSciNames(b:boolean):void;
    function getFlagSciNames():boolean;
    function setFlagAdditionalNames(b:boolean):void;
    function getFlagAdditionalNames():boolean;
}

declare namespace StelVideoMgr {
    function init():void;
    // function update(d:number);
    // function loadVideo(s:string,QString,float,float,bool,float);
    // function playVideo(s:string,bool);
    // function playVideo(s:string);
    // function playVideoPopout(s:string,float,float,float,float,float,float,float,bool);
    // function pauseVideo(s:string);
    // function stopVideo(s:string);
    // function dropVideo(s:string);
    // function seekVideo(s:string,qlonglong,bool);
    // function seekVideo(s:string,qlonglong);
    // function setVideoXY(s:string,float,float,bool);
    // function setVideoXY(s:string,float,float);
    // function setVideoAlpha(s:string,float);
    // function resizeVideo(s:string,float,float);
    // function resizeVideo(s:string,float);
    // function resizeVideo(s:string);
    // function showVideo(s:string,bool);
    // function getVideoDuration(s:string);
    // function getVideoPosition(s:string);
    // function getVideoResolution(s:string);
    // function getVideoWidth(s:string);
    // function getVideoHeight(s:string);
    // function muteVideo(s:string,bool);
    // function muteVideo(s:string);
    // function setVideoVolume(s:string,int);
    // function getVideoVolume(s:string);
    // function isVideoPlaying(s:string);
}

declare namespace StelMovementMgr {
    // function toggleMountMode();
    function setEquatorialMount(b:boolean):void;
    function setFlagTracking(b:boolean):void;
    function setFlagTracking():void;
    function getFlagTracking():boolean;
    function setFlagLockEquPos(b:boolean):void;
    function getFlagLockEquPos():boolean;
    // function panView(double,double);
    function setAutoMoveDuration(f:number):void;
    // function getAutoMoveDuration();
    function setFlagAutoZoomOutResetsDirection(b:boolean):void;
    function getFlagAutoZoomOutResetsDirection():boolean;
    function getFlagEnableZoomKeys():boolean;
    function setFlagEnableZoomKeys(b:boolean):void;
    function getFlagEnableMoveKeys():boolean;
    function setFlagEnableMoveKeys(b:boolean):void;
    function getFlagEnableMoveAtScreenEdge():boolean;
    function setFlagEnableMoveAtScreenEdge(b:boolean):void;
    function getFlagEnableMouseNavigation():boolean;
    function setFlagEnableMouseNavigation(b:boolean):void;
    function getFlagIndicationMountMode():boolean;
    function setFlagIndicationMountMode(b:boolean):void;
    // function moveToJ2000(Vec3d,Vec3d,float,ZoomingMode);
    // function moveToJ2000(Vec3d,Vec3d,float);
    // function moveToJ2000(Vec3d,Vec3d);
    // function moveToObject(StelObjectP,float,ZoomingMode);
    // function moveToObject(StelObjectP,float);
    // function moveToObject(StelObjectP);
    // function moveToAltAzi(Vec3d,Vec3d,float,ZoomingMode);
    // function moveToAltAzi(Vec3d,Vec3d,float);
    // function moveToAltAzi(Vec3d,Vec3d);
    function zoomTo(aimFov:number, zoomDuration?:number):void;
    function getCurrentFov():number;
    function getInitFov():number;
    function setInitFov(d:number):void;
    // function getInitViewingDirection();
    // function setInitViewDirectionToCurrent();
    // function getViewDirectionJ2000();
    // function setViewDirectionJ2000(Vec3d):void;
    function setMaxFov(d:number):void;
    function getMaxFov():number;
    function getMinFov():number;

    function autoZoomIn(moveDuration?:number,allowManualZoom?:boolean):void;
    function autoZoomOut(moveDuration?:number,full?:boolean):void;
    function getAimFov():number;

    function turnRight(b:boolean):void;
    function turnLeft(b:boolean):void;
    function turnUp(b:boolean):void;
    function turnDown(b:boolean):void;

    function moveSlow(b:boolean):void;
    function zoomIn(b:boolean):void;
    function zoomOut(b:boolean):void;
    
    function lookEast(centerToHorizon?:boolean):void;
    function lookWest(centerToHorizon?:boolean):void;
    function lookNorth(centerToHorizon?:boolean):void;
    function lookSouth(centerToHorizon?:boolean):void;

    // function lookZenith();
    // function lookNadir();
    // function lookTowardsNCP();
    // function lookTowardsSCP();
    // function moveViewport(float,float,float);
    // function moveViewport(float,float);
    // function setMountMode(MountMode);
    // function getMountMode();
    // function getEquatorialMount();
    // function setInhibitAllAutomoves(b:boolean);
    // function getViewportOffsetTarget();
    // function getViewportHorizontalOffsetTarget();
    // function getViewportVerticalOffsetTarget();
    // function setViewportHorizontalOffsetTarget(f:number);
    // function setViewportVerticalOffsetTarget(f:number);
}

declare namespace StelSkyDrawer {
    function setRelativeStarScale(d:number):void;
    function setRelativeStarScale():void;
    function getRelativeStarScale():number;
    function setAbsoluteStarScale(d:number):void;
    function setAbsoluteStarScale():void;
    function getAbsoluteStarScale():number;
    function setTwinkleAmount(d:number):void;
    function getTwinkleAmount():number;
    function setFlagTwinkle(b:boolean):void;
    function getFlagTwinkle():boolean;
    function setFlagForcedTwinkle(b:boolean):void;
    function getFlagForcedTwinkle():boolean;
    function setBortleScaleIndex(i:number):void;
    function getBortleScaleIndex():number;
    function getNELMFromBortleScale():number;
    function setFlagDrawBigStarHalo(b:boolean):void;
    function getFlagDrawBigStarHalo():boolean;
    function getLimitMagnitude():number;
    function setFlagStarMagnitudeLimit(b:boolean):void;
    function getFlagStarMagnitudeLimit():boolean;
    function setFlagNebulaMagnitudeLimit(b:boolean):void;
    function getFlagNebulaMagnitudeLimit():boolean;
    function setFlagPlanetMagnitudeLimit(b:boolean):void;
    function getFlagPlanetMagnitudeLimit():boolean;
    function getCustomStarMagnitudeLimit():number;
    function setCustomStarMagnitudeLimit(d:number):void;
    function getCustomNebulaMagnitudeLimit():number;
    function setCustomNebulaMagnitudeLimit(d:number):void;
    function getCustomPlanetMagnitudeLimit():number;
    function setCustomPlanetMagnitudeLimit(d:number):void;
    function getLimitLuminance():number;
    function setFlagLuminanceAdaptation(b:boolean):void;
    function getFlagLuminanceAdaptation():boolean;
    function setDaylightLabelThreshold(d:number):void;
    function getDaylightLabelThreshold():number;
    function getWorldAdaptationLuminance():number;
    function setFlagHasAtmosphere(b:boolean):void;
    function getFlagHasAtmosphere():boolean;
    function setExtinctionCoefficient(d:number):void;
    function getExtinctionCoefficient():number;
    function setAtmosphereTemperature(d:number):void;
    function getAtmosphereTemperature():number;
    function setAtmospherePressure(d:number):void;
    function getAtmospherePressure():number;

    // function getExtinction():Extinction;
    // function getRefraction():Refraction;

    function getBig3dModelHaloRadius():number;
    function setBig3dModelHaloRadius(f:number):void;
}

declare namespace StelSkyLayerMgr {
    function setFlagShow(b:boolean) : void;
    
    //function loadSkyImage(id : string, filename : string, long0 : number, lat0 : number, long1 : number, lat1 : number, long2 : number, lat2 : number, long3 : number, lat3 : number, minRes : number, maxBright : number, visible : boolean, StelCore::FrameType);
    function loadSkyImage(id : string, filename : string, long0 : number, lat0 : number, long1 : number, lat1 : number, long2 : number, lat2 : number, long3 : number, lat3 : number, minRes : number, maxBright : number, visible : boolean) : boolean;
    function loadSkyImageAltAz(id:string, filename:string, alt0:number, azi0:number, alt1:number, azi1:number, alt2:number, azi2:number, alt3:number, azi3:number, minRes:number, maxBright:number, visible:boolean) : boolean;
   
    function showLayer(id : string, visible : boolean) : void;
    function getShowLayer(id : string) : boolean;

    function insertSkyImage(uri:string, keyHint?:string, show?:boolean) : string;
    function removeSkyLayer(key:string):void;
    
    // function getAllKeys() : QStringList
}

declare namespace MilkyWay {
    function getIntensity() : number;
    function setIntensity(n:number) : void;
// function getColor();
// function setColor(Vec3f);
    function setFlagShow(b:boolean) : void;
    function getFlagShow() : boolean;
}

declare namespace ZodiacalLight {
    function getIntensity():number;
    function setIntensity(d:number):void;
// function getColor();
// function setColor(Vec3f);
    function setFlagShow(b:boolean) : void;
    function getFlagShow():boolean;
}

declare namespace CompassMarks {
    function getCompassMarks() : boolean;
    function setCompassMarks(f : boolean) : void;
}

declare namespace Oculars {
    // function updateLists();
    // function ccdRotationReset();
    // function decrementCCDIndex();
    // function decrementOcularIndex();
    // function decrementTelescopeIndex();
    // function decrementLensIndex();
    // function displayPopupMenu();
    // function enableOcular(b:boolean);
    // function getEnableOcular();
    // function incrementCCDIndex();
    // function incrementOcularIndex();
    // function incrementTelescopeIndex();
    // function incrementLensIndex();
    // function disableLens();
    // function rotateCCD(i:number);
    // function getSelectedCCDRotationAngle();
    function setSelectedCCDRotationAngle(d:number):void;
    // function selectCCDAtIndex(i:number);
    // function getSelectedCCDIndex();
    // function selectOcularAtIndex(i:number);
    // function getSelectedOcularIndex();
    // function selectTelescopeAtIndex(i:number);
    // function getSelectedTelescopeIndex();
    // function selectLensAtIndex(i:number);
    // function getSelectedLensIndex();
    // function toggleCCD(b:boolean);
    // function toggleCCD();
    // function getEnableCCD();
    // function toggleCrosshairs(b:boolean);
    // function toggleCrosshairs();
    // function getEnableCrosshairs();
    // function toggleTelrad(b:boolean);
    // function getEnableTelrad();
    // function toggleTelrad();
    // function enableGuiPanel(b:boolean);
    // function enableGuiPanel();
    function getFlagGuiPanelEnabled():boolean;
    function setFlagDMSDegrees(b:boolean):void;
    function getFlagDMSDegrees():boolean;
    function setFlagRequireSelection(b:boolean):void;
    function getFlagRequireSelection():boolean;
    function setFlagLimitMagnitude(b:boolean):void;
    function getFlagLimitMagnitude():boolean;
    function setFlagInitFovUsage(b:boolean):void;
    function getFlagInitFovUsage():boolean;
    function setFlagInitDirectionUsage(b:boolean):void;
    function getFlagInitDirectionUsage():boolean;
    function setFlagAutosetMountForCCD(b:boolean):void;
    function getFlagAutosetMountForCCD():boolean;
    function setFlagScalingFOVForTelrad(b:boolean):void;
    function getFlagScalingFOVForTelrad():boolean;
    function setFlagUseSemiTransparency(b:boolean):void;
    function getFlagUseSemiTransparency():boolean;
    function setFlagShowResolutionCriterions(b:boolean):void;
    function getFlagShowResolutionCriterions():boolean;
    function setArrowButtonScale(d:number):void;
    function getArrowButtonScale():number;
    function setFlagHideGridsLines(b:boolean):void;
    function getFlagHideGridsLines():boolean;
    function setFlagScaleImageCircle(b:boolean):void;
    function getFlagScaleImageCircle():boolean;
    function setFlagShowOcularsButton(b:boolean):void;
    function getFlagShowOcularsButton():boolean;
}

declare namespace Satellites {
    function enableInternetUpdates(b:boolean):void;
    function enableInternetUpdates():void;
    function enableAutoAdd(b:boolean):void;
    function enableAutoAdd():void;
    function enableAutoRemove(b:boolean):void;
    function enableAutoRemove():void;
    function setFlagHints(b:boolean):void;
    function setFlagLabels(b:boolean):void;
    function setFlagRelisticMode(b:boolean):void;
    function setFlagHideInvisibleSatellites(b:boolean):void;
    function setLabelFontSize(i:number):void;
    function setUpdateFrequencyHours(i:number):void;
    function updateFromOnlineSources():void;
    function setOrbitLinesFlag(b:boolean):void;
    function recalculateOrbitLines():void;
    function displayMessage(s:string,s2:string):void;
    function displayMessage(s:string):void;
    function saveCatalog(s:string):void;
    function saveCatalog():void;
    function setIridiumFlaresPredictionDepth(i:number):void;
}

declare namespace Exoplanets {
    function updateJSON():void;
    function setFlagShowExoplanets(b:boolean):void;
    function getFlagShowExoplanets():boolean;
    function setFlagShowExoplanetsDesignations(b:boolean):void;
    function getFlagShowExoplanetsDesignations():boolean;
    function setFlagShowExoplanetsButton(b:boolean):void;
    function getFlagShowExoplanetsButton():boolean;
    function getDisplayMode():boolean
    function setDisplayMode(b:boolean):void;
    function getTimelineMode():boolean;
    function setTimelineMode(b:boolean):void;
    function getHabitableMode():boolean;
    function setHabitableMode(b:boolean):void;

    //function getMarkerColor(b:boolean)
    //function setMarkerColor(Vec3f,bool)

    function getCountPlanetarySystems():number;
    function getCountAllExoplanets():number;
    function getCountHabitableExoplanets():number;

    // function setCurrentTemperatureScale(TemperatureScale) 
    // function getCurrentTemperatureScale() : TemperatureScale

    function getCurrentTemperatureScaleKey():string;
    function setCurrentTemperatureScaleKey(s:string):void;
}