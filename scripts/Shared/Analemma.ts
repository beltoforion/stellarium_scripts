//
// The analemma class
//
import { Strings } from "./Strings"


export class Analemma {

	private _timeOfDay : string;
	private _lat : number;
	private _long : number;

	private _labelCaptionDate : number;
	private _labelDate : number;
	private _labelMonth : number;
	private _labelWinterSolstice : number;
	private _labelSummerSolstice : number;

	private _trace : number[];
	private _planet : string;

	private _viewAz : number;
	private _viewAlt : number;
	private _trailSymbol : string;

	private _stepInDays : number = 1;

	private _secondsPerDay : number = 86400;
	private _daysPerYear : number = 365;

	private _strings : any;


	public constructor(long : number, lat : number, timeOfDay : string, planet : string = "Earth", stepInDays : number = 1) {
		
		this._strings = new Strings().getLocalizedStrings();

		// The year, not that it would matter...
		this._timeOfDay = timeOfDay;

		// Latitude of the observation spot
		this._lat = lat;

		// Longitude of the observation spot
		this._long = long;

		this._trace = [];
	    this._planet=planet;

		this._viewAz = 180;
		this._viewAlt = 20;
		this._trailSymbol = ".";		

		this._stepInDays = stepInDays;

		if (this._planet==="Earth")
		{
			this._secondsPerDay = 86400;
			this._daysPerYear = 365;
		}
		else if (this._planet==="Mars")
		{
			this._secondsPerDay = 88775.2438;
			this._daysPerYear = 668.5991;
		}
		else
		{
			throw new Error("Analemma: Unsupported Planet " + planet);
		}

		// Set location, look south, stop time
		core.setTimeRate(0);
		core.setObserverLocation(this._long, this._lat, 425, 0, "Annalemma Observer", planet);
		core.debug("Annalemma Settings");
		core.debug("  - Location: long=" + this._long + "; lat=" + this._lat + "; planet=" + planet);
		core.debug("  - step in days=" + this._stepInDays);
	}


	public setView(az : number, alt : number) : void {
    	this._viewAz = az;
    	this._viewAlt = alt;
	}


	public setTrailSymbol(s : string) : void {
		if (!s)
			return;

		this._trailSymbol = s;		
	}


	public clearTrace() : void {
		for (var i = 0; i < this._trace.length; ++i) {
			var id = this._trace[i];
			LabelMgr.deleteLabel(id);
		}

		this._trace = new Array();
	}

	public changeTraceSymbol(symbol : string) {
		for (var i = 0; i < this._trace.length; ++i) {
			var id = this._trace[i];
			LabelMgr.setLabelText(id, symbol);
		}
	}

	public clear() : void {
		core.debug("Clearing Analemma Labels and Graphics")
		this.clearTrace();

		LabelMgr.deleteLabel(this._labelCaptionDate)
		LabelMgr.deleteLabel(this._labelMonth)
		LabelMgr.deleteLabel(this._labelDate)
		LabelMgr.deleteLabel(this._labelWinterSolstice)
		LabelMgr.deleteLabel(this._labelSummerSolstice)

		GridLinesMgr.setFlagGridlines(false);
		GridLinesMgr.setFlagAzimuthalGrid(false);
		GridLinesMgr.setFlagMeridianLine(false);
		GridLinesMgr.setFlagHorizonLine(false);
	}

	public compute() : void {
	    core.moveToAltAzi(this._viewAlt, this._viewAz)
		StelMovementMgr.zoomTo(110, 1);

		// Show azimutal grid
		GridLinesMgr.setFlagGridlines(true);
		GridLinesMgr.setFlagAzimuthalGrid(true);
		GridLinesMgr.setFlagMeridianLine(true);
		GridLinesMgr.setFlagHorizonLine(true);

		// Set start time
		core.debug("Set simulation date to :" + this._timeOfDay);
		core.setDate(this._timeOfDay, "utc");
		core.wait(1);
		core.debug("Simulation date is Local:" + core.getDate("utc"));

		// Start 
		var day : number = 0;

		this._labelCaptionDate = LabelMgr.labelScreen(this._strings.dateAndTime, 70, 50, false, 50, "#66ccff");
		LabelMgr.setLabelShow(this._labelCaptionDate, true);

		this._labelDate = LabelMgr.labelScreen("", 70, 110, false, 30, "#99ccff");
		LabelMgr.setLabelShow(this._labelDate, true);

		this._labelMonth = LabelMgr.labelScreen("", 70, 900, false, 50, "#99ccff");
		LabelMgr.setLabelShow(this._labelMonth, true);

		// Compute the true time difference to utc (disregarding DST and local time zone)
		var trueLocalTimeDiff : number = this._long * 4;
		if (this._planet==='Earth')
		{
			core.debug("We are on Earth. Correcting to display proper local time!");
			core.debug("Local Simulation date is UTC:" + core.getDate("utc"));
			core.setDate("-" + trueLocalTimeDiff + " minutes");
		}

		core.wait(0.1);

		var azmin : number = 90;
		var azmax : number= -90;

		var altmin : number= 90;
		var altmax : number= -90;

		this._trace = new Array();
		
		var endOfYear : number = this._daysPerYear * this._secondsPerDay;

		core.debug("Seconds per Day: " + this._secondsPerDay);
		core.debug("Days per Year: " + this._daysPerYear);
		for (day = 0; day < endOfYear; day += this._secondsPerDay * this._stepInDays) {
			core.setDate("+ " + this._secondsPerDay * this._stepInDays + " seconds");

			var strDate : string = core.getDate("local");
			LabelMgr.setLabelText(this._labelDate, strDate)

			if (this._planet==='Earth')
			{
				var month = parseInt(strDate.substring(5, 7), 10);
				LabelMgr.setLabelText(this._labelMonth, this._strings.monthFromInt(month))
			}

			var info : any = core.getObjectInfo("Sun");
			var az : number = info.azimuth;
			var alt : number = info.altitude;

			if (alt < altmin) {
				azmin = az;
				altmin = alt;
			}

			if (alt > altmax) {
				azmax = az;
				altmax = alt;
			}

			var color : string = (month % 2 == 0) ? "#000000" : "#ffffff"

			var labelDot : number = LabelMgr.labelHorizon(this._trailSymbol, az, alt, true, 14, color, false);
			LabelMgr.setLabelShow(labelDot, true);
			this._trace.push(labelDot);

			core.wait(0.1);
		}

		if (this._planet=='Earth')
		{
			core.debug("Placing Solstice Labels")
			core.debug("azmin=" + azmin + "; altmin=" + altmin)
			core.debug("azmax=" + azmax + "; altmax=" + altmax)
			this._labelWinterSolstice = LabelMgr.labelHorizon(this._strings.winterSolstice, azmin, altmin - 4, true, 30, "#ffffff");
			this._labelSummerSolstice = LabelMgr.labelHorizon(this._strings.summerSolstice, azmax, altmax + 4, true, 30, "#ffffff");
		}
	}
} // class Analemma