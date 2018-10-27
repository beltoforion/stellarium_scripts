//
// The analemma class
//

function Analemma(long, lat, timeOfDay, planet, stepInDays) {
	// The year, not that it would matter...
	this.timeOfDay = timeOfDay;

	// Latitude of the observation spot
	this.lat = lat;

	// Longitude of the observation spot
	this.long = long;

	this.labelCaptionDate;
	this.labelDate;
	this.labelMonth;
	this.labelWinterSolstice;
	this.labelSummerSolstice;
	this.trace = [];
    this.planet=planet;

    this.viewAz = 180;
    this.viewAlt = 20;
	this.trailSymbol = ".";		

    if (!stepInDays)
        this.stepInDays = 1;
    else
        this.stepInDays = stepInDays;

    if (!this.planet) 
    {
        this.planet="Earth";
    }

    if (this.planet==="Earth")
    {
        this.secondsPerDay = 86400;
        this.daysPerYear = 365;
    }
    else if (this.planet==="Mars")
    {
        this.secondsPerDay = 88775.2438;
        this.daysPerYear = 668.5991;
    }
    else
    {
        throw new Error("Analemma: Unsupported Planet " + planet);
    }

	// Set location, look south, stop time
    core.setTimeRate(0);
    core.setObserverLocation(this.long, this.lat, 425, 0, "Annalemma Observer", planet);
    core.debug("Annalemma Observation Location: long=" + this.long + "; lat=" + this.lat + "; planet=" + planet);
}

Analemma.prototype.setView = function (az, alt) {
    this.viewAz = az;
    this.viewAlt = alt;
}

Analemma.prototype.setTrailSymbol = function (s) {
	if (!s)
		return;

	this.trailSymbol = s;		
}



Analemma.prototype.clearTrace = function () {
	var i;
	for (i = 0; i < this.trace.length; ++i) {
		var id = this.trace[i];
		LabelMgr.deleteLabel(id);
	}

	this.trace = new Array();
}

Analemma.prototype.changeTraceSymbol = function (symbol) {
	var i;
	for (i = 0; i < this.trace.length; ++i) {
		var id = this.trace[i];
		LabelMgr.setLabelText(id, symbol);
	}
}

Analemma.prototype.clear = function () {
	core.debug("Clearing Analemma Labels and Graphics")
	this.clearTrace();
	LabelMgr.deleteLabel(this.labelCaptionDate)
	LabelMgr.deleteLabel(this.labelMonth)
	LabelMgr.deleteLabel(this.labelDate)
	LabelMgr.deleteLabel(this.labelWinterSolstice)
	LabelMgr.deleteLabel(this.labelSummerSolstice)

	GridLinesMgr.setFlagGridlines(false);
	GridLinesMgr.setFlagAzimuthalGrid(false);
	GridLinesMgr.setFlagMeridianLine(false);
	GridLinesMgr.setFlagHorizonLine(false);
}

Analemma.prototype.compute = function () {
    core.moveToAltAzi(this.viewAlt, this.viewAz)
	StelMovementMgr.zoomTo(110, 1);

	// Show azimutal grid
	GridLinesMgr.setFlagGridlines(true);
	GridLinesMgr.setFlagAzimuthalGrid(true);
	GridLinesMgr.setFlagMeridianLine(true);
	GridLinesMgr.setFlagHorizonLine(true);

	// Set start time
	core.debug("Set simulation date to :" + this.timeOfDay);
    core.setDate(this.timeOfDay, "utc");
	core.wait(1);
	core.debug("Simulation date is Local:" + core.getDate("utc"));

	// Start 
	var day = 0;

	this.labelCaptionDate = LabelMgr.labelScreen(strings.dateAndTime, 70, 50, false, 50, "#66ccff");
	LabelMgr.setLabelShow(this.labelCaptionDate, true);

	this.labelDate = LabelMgr.labelScreen("", 70, 110, false, 30, "#99ccff");
	LabelMgr.setLabelShow(this.labelDate, true);

	this.labelMonth = LabelMgr.labelScreen("", 70, 900, false, 50, "#99ccff");
	LabelMgr.setLabelShow(this.labelMonth, true);

	// Compute the true time difference to utc (disregarding DST and local time zone)
    var trueLocalTimeDiff = this.long * 4;
    if (this.planet==='Earth')
    {
        core.debug("We are on Earth. Correcting to display proper local time!");
        core.debug("Local Simulation date is UTC:" + core.getDate("utc"));
        core.setDate("-" + trueLocalTimeDiff + " minutes");
    }

	core.wait(0.1);

	var azmin = 90;
	var azmax = -90;

	var altmin = 90;
	var altmax = -90;

    this.trace = new Array();
    
    var endOfYear = this.daysPerYear * this.secondsPerDay;
    core.debug("Seconds per Day: " + this.secondsPerDay);
    core.debug("Days per Year: " + this.daysPerYear);
	for (day = 0; day < endOfYear; day += this.secondsPerDay* this.stepInDays) {
        core.setDate("+ " + this.secondsPerDay * this.stepInDays + " seconds");

		var strDate = core.getDate("local");
		LabelMgr.setLabelText(this.labelDate, strDate)

        if (this.planet==='Earth')
        {
		    var month = parseInt(strDate.substring(5, 7), 10);
		    LabelMgr.setLabelText(this.labelMonth, strings.monthFromInt(month))
        }

		var info = core.getObjectInfo("Sun");
		var az = info.azimuth;
		var alt = info.altitude;

		if (alt < altmin) {
			azmin = az;
			altmin = alt;
		}

		if (alt > altmax) {
			azmax = az;
			altmax = alt;
		}

		var color = (month % 2 == 0) ? "#000000" : "#ffffff"

		var labelDot = LabelMgr.labelHorizon(this.trailSymbol, az, alt, "true", 14, color, false);
		LabelMgr.setLabelShow(labelDot, true);
		this.trace.push(labelDot);

		core.wait(0.1);
	}

    if (this.planet=='Earth')
    {
        core.debug("Placing Solstice Labels")
    	core.debug("azmin=" + azmin + "; altmin=" + altmin)
	    core.debug("azmax=" + azmax + "; altmax=" + altmax)
	    this.labelWinterSolstice = LabelMgr.labelHorizon(strings.winterSolstice, azmin, altmin - 4, true, 30, "#ffffff");
        this.labelSummerSolstice = LabelMgr.labelHorizon(strings.summerSolstice, azmax, altmax + 4, true, 30, "#ffffff");
    }
}