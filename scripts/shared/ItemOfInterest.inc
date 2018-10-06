
//
// class Itemofinterest
//

function ItemOfInterest(name, desc, actionBefore, actionAfter)
{
    // Variables
    this.name = name;
    this.desc = desc;

    this.actionBefore = actionBefore
    this.actionAfter = actionAfter

    this.label = null;
    this.labelDesc = null;
}


ItemOfInterest.prototype.onAfterShowAction = function()
{
    print("-->   Executing Item.onAfterShowAction (" + this.name + ")");
    if (this.actionAfter!=null)
    {
        this.actionAfter();
    }

    LabelMgr.deleteLabel(this.label);
    LabelMgr.deleteLabel(this.labelDesc);
}


ItemOfInterest.prototype.onBeforeShowAction = function()
{
    print("-->   Executing Item.onBeforeShowAction (" + this.name + ")");

   	ConstellationMgr.setFlagArt(false);
    ConstellationMgr.setFlagLabels(false);
    ConstellationMgr.setFlagLines(false);
    ConstellationMgr.setFlagBoundaries(false);

    this.label = LabelMgr.labelScreen(this.name, 70, 110, false, 30, "#99ccff");
    LabelMgr.setLabelShow(this.label, true);

    this.labelDesc = LabelMgr.labelScreen(this.desc, 70, 950, false, 50, "#99ccff");
    LabelMgr.setLabelShow(this.labelDesc, true);

    if (this.actionBefore!=null)
    {
        this.actionBefore();
    }
}


ItemOfInterest.prototype.Show = function()
{
    print("-->   Showing object of interest: " + this.name + " (" + this.desc + ")")

    this.onBeforeShowAction();

	core.selectObjectByName(this.name, true);
    core.setSelectedObjectInfo("ShortInfo");
	core.wait(3);

    LandscapeMgr.setFlagFog(false);
    StelMovementMgr.autoZoomIn(3);
	core.wait(10);

    this.onAfterShowAction();

    StelMovementMgr.autoZoomOut(3);
    LandscapeMgr.setFlagFog (true);
}

