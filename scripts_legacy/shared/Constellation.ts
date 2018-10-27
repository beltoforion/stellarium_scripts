//
// class Constellation
//

export class Constellation {

    private _date : string;
    private _name : string;
    private _displayName : string;

    private _fov1 : number;
    private _fov2 : number;

    private _items : any;
    private _label : number;

    public get displayName() : string {
        return this._displayName;
    }

    public constructor(date:string, searchkey:string, displayname:string, fov1:number, fov2:number, objects:any) {
        this._date = date;
        this._name = searchkey;
        this._displayName = displayname;
        
        this._fov1 = fov1;
        this._fov2 = fov2;

        this._items = objects;
    }


    // Show overview of the constellation with caption, lines and boundaries
    public showOverview(delay1:number, delay2:number) : void {
        core.output("Showing constellation overview " + this._name + " (" + this.displayName + ")");

        ConstellationMgr.setFlagIsolateSelected(true);  
        core.selectObjectByName(this._name, false);

        StelMovementMgr.autoZoomIn(6);
        StelMovementMgr.zoomTo(this._fov1,2);
        core.wait(delay1);

        // Show constellation label
        this._label= LabelMgr.labelScreen(this.displayName, 70, 50, false, 50, "#66ccff");
        LabelMgr.setLabelShow(this._label, true);

        ConstellationMgr.setFlagLabels(true);
        ConstellationMgr.setFlagBoundaries(true);
        ConstellationMgr.setFlagLines(true);
        core.wait(delay2);
    }


    public startTour() : void {
        core.debug("Showing constellation " + this._name + " (" + this.displayName + ")");

        ConstellationMgr.setFlagIsolateSelected(true);  
        ConstellationMgr.setFlagConstellationPick(true);

        StarMgr.setLabelsAmount(3);
        SolarSystem.setFlagLabels(true);

        if (this._date) {
            core.setDate(this._date, "utc");
        }

        // Show constellation overview
        this.showOverview(4, 7);

        // Zoom out to show Constellation art
        StelMovementMgr.zoomTo(this._fov2,1);
        core.wait(1);
        ConstellationMgr.setFlagArt(true);
        core.wait(8);

        // Hide constellation Art, zoom back to normal
        ConstellationMgr.setFlagArt(false);
        StelMovementMgr.zoomTo(this._fov1,1);

        // Show Objects of interes for this constellation
        var tourItems = this._items;
        if (tourItems!=null) {
            core.debug("Starting tour of objects of interest.")
            var i = 0;        

            for (i = 0; i<tourItems.length; i++) {
                if (tourItems[i]==null)
                    continue;

                tourItems[i].Show();
                this.showOverview(0, 4);
            }
        } else {
            core.debug("--> No tour items found; Skipping objects ofinterest.")
        }

        // Grafiken abschalten
        ConstellationMgr.setFlagArt(false);
        ConstellationMgr.setFlagLabels(false);
        ConstellationMgr.setFlagLines(false);
        ConstellationMgr.setFlagBoundaries(false);
        ConstellationMgr.setFlagIsolateSelected(false);  
        ConstellationMgr.setFlagConstellationPick(false);

        // Selection abwählen
        ConstellationMgr.deselectConstellations();

        LabelMgr.deleteAllLabels();
    }
}