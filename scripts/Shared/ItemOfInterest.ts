
//
// class Itemofinterest
//
import { Action } from "./Types"

export class ItemOfInterest {

    private _name : string;
    private _desc : string;

    private _actionBefore : Action;
    private _actionAfter : Action;

    private _label : number;
    private _labelDesc : number;

    get name() : string {
        return this._name;
    }

    public constructor(name:string, desc:string, actionBefore:Action = null, actionAfter:Action = null) {
        this._name = name;
        this._desc = desc;
    
        this._actionBefore = actionBefore
        this._actionAfter = actionAfter
    
        this._label = null;
        this._labelDesc = null;
    }
    

    public onAfterShowAction() : void {
        core.output("Executing Item.onAfterShowAction (" + this._name + ")");

        if (this._actionAfter!=null) {
            core.output("Custom AfterShowAction found! Executing now!");
            this._actionAfter();
        }
    
        LabelMgr.deleteLabel(this._label);
        LabelMgr.deleteLabel(this._labelDesc);
    }
    
    
    public onBeforeShowAction() : void {
        core.output("Executing Item.onBeforeShowAction (" + this._name + ")");
    
        ConstellationMgr.setFlagArt(false);
        ConstellationMgr.setFlagLabels(false);
        ConstellationMgr.setFlagLines(false);
        ConstellationMgr.setFlagBoundaries(false);
    
        this._label = LabelMgr.labelScreen(this._name, 70, 110, false, 30, "#99ccff");
        LabelMgr.setLabelShow(this._label, true);
    
        this._labelDesc = LabelMgr.labelScreen(this._desc, 70, 950, false, 50, "#99ccff");
        LabelMgr.setLabelShow(this._labelDesc, true);
    
        if (this._actionBefore!=null) {
            this._actionBefore();
        }
    }
    
    
    public show() : void {
        core.output("Showing object of interest: " + this._name + " (" + this._desc + ")")
    
        this.onBeforeShowAction();
    
        core.selectObjectByName(this._name, true);
        core.setSelectedObjectInfo("ShortInfo");
        core.wait(3);
    
        LandscapeMgr.setFlagFog(false);
        StelMovementMgr.autoZoomIn(3);
        core.wait(10);
    
        this.onAfterShowAction();
    
        StelMovementMgr.autoZoomOut(3);
        LandscapeMgr.setFlagFog (true);
    }
};
