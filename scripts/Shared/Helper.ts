import { FunStr } from "../Shared/Types"
import { Strings } from "../Shared/Strings"

let originalDebug : FunStr = core.debug;
let strings = new Strings().getLocalizedStrings();

export var Helper = {

    installDebugHooks : function() : void {
        var osd : OnScreenLogger = new OnScreenLogger(15);
        var betterDebug = function(msg : any) {
            if (msg instanceof Error) {
                osd.addLine(msg.toString(), "#ff3333");
            } 
            else {
//                osd.addLine(msg.toString(), "#66ccff");
                osd.addLine(msg.toString(), "#66ffcc");
            }

            originalDebug(msg);
        }

        core.debug = betterDebug
    },

    removeDebugHooks : function() : void {
        if (originalDebug!=null) {
            core.debug = originalDebug;
        }

        core.debug("Debug Hooks removed!")
    },

    restoreState : function(o : any) : void {
        // todo: restore state of public getters
    },

    storeState : function(o : any) : void {
        // todo: store state of public getters
    },

    showError : function(err : Error) : void {
        var x : number = 100;
        var y : number = 100;
        var labelTitle : number = LabelMgr.labelScreen(strings.anErrorOccured, x, y, true, 50, "#ff3333");
        LabelMgr.setLabelShow(labelTitle, true);

        var labelTitle : number = LabelMgr.labelScreen(err.message, x, y + 70, true, 40, "#ff3333");
        LabelMgr.setLabelShow(labelTitle, true);
    },

    showTitle : function(title:string, subTitle:string, x:number, y:number) : void {
        core.debug(title);
        core.debug(subTitle);

        var labelTitle : number = LabelMgr.labelScreen(title, x, y, true, 70, "#66ccff");
        LabelMgr.setLabelShow(labelTitle, true);

        var labelTitle : number = LabelMgr.labelScreen(subTitle, x, y + 100, true, 40, "#66ccff");
        LabelMgr.setLabelShow(labelTitle, true);
    },

    waitUntilDate : function(endDate : string) {
        do {
            var simulationTime : string = core.getDate();
            core.wait(.1);
        } while (simulationTime < endDate)
    }
}

// A class to create an on screen console using with Stellarium Labels
class OnScreenLogger {
    // An array of stellarium labels serving as a circular buffer
    private _labelHandle : number[] = [];

    private _labelContent : string[] = [];

    private _labelColor : string[] = [];

    // X-Position of the log output
    private _xp : number = 70;

    // Output text font size
    private _fs : number = 15;

    // Line Margin
    private _margin : number = 5;

    constructor(numLines : number) {
        for (var i=0; i<numLines; ++i) {
            this._labelContent.push("");
            this._labelColor.push("");
        }
    }

    public addLine(msg : string, color = "#66ccff") : void {
        for (var i=this._labelContent.length-2; i>=0; --i) {
            this._labelContent[i+1] = this._labelContent[i];
            this._labelColor[i+1] = this._labelColor[i];
        }

        this._labelContent[0] = msg;
        this._labelColor[0] = color;

        // delete old labels
        for (var i=0; i<this._labelHandle.length; ++i) {
            let lb = this._labelHandle[i];
            LabelMgr.deleteLabel(lb);
        }

        // Recreate labels
        for (var i=0; i<this._labelContent.length; ++i) {
            let xp = this._xp;
            let yp = core.getScreenHeight() - 150 - i * (this._fs + this._margin)

            //            let lb : number = LabelMgr.labelScreen(this._labelContent[i] + "(" + this._labelContent.length.toString() + ";" + this._labelHandle.length.toString() + ")", xp, yp, true, this._fs, "#66ccff");
            let msg = this._labelContent[i];
            if (msg)
                msg = "> " + msg;

            this._labelHandle[i] = LabelMgr.labelScreen(msg, xp, yp, true, this._fs, this._labelColor[i]);
        }
    }
};
