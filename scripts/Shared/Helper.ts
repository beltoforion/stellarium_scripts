import { FunStr } from "../Shared/Types"

let originalDebug : FunStr = core.debug;

export var Helper = {

    InstallDebugHooks : function() {
        var osd : OnScreenLogger = new OnScreenLogger(15);
        var betterDebug = function(msg : string) {
            osd.addLine(msg);
            originalDebug(msg);
        }

        core.debug = betterDebug
    },

    RemoveDebugHooks : function() {
        if (originalDebug!=null) {
            core.debug = originalDebug;
        }

        core.debug("Debug Hooks removed!")
    }
}

// A class to create an on screen console using with Stellarium Labels
class OnScreenLogger {
    // An array of stellarium labels serving as a circular buffer
    private _labelHandle : number[];

    private _labelContent : string[];

    // X-Position of the log output
    private _xp : number = 70;

    // Output text font size
    private _fs : number = 15;

    // Line Margin
    private _margin : number = 5;

    constructor(numLines : number) {
        this._labelHandle = [];
        this._labelContent = [];

        for (var i=0; i<numLines; ++i) {
            this._labelContent.push("");
        }
    }

    public addLine(msg : string) : void {
        for (var i=this._labelContent.length-2; i>=0; --i) {
            this._labelContent[i+1] = this._labelContent[i];
        }

        this._labelContent[0] = msg;

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

            this._labelHandle[i] = LabelMgr.labelScreen(msg, xp, yp, true, this._fs, "#66ccff");
        }
    }
};
