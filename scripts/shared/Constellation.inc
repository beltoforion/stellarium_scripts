//
// class Constellation
//

function Constellation(date, searchkey, displayname, fov1, fov2, objects)
{
    this.date = date;
    this.name = searchkey;
    this.displayName = displayname;
    this.fov1 = fov1;
    this.fov2 = fov2;
    this.items = objects;

    // private 
    var label = null;
}


// Show overview of the constellation with caption, lines and boundaries
Constellation.prototype.ShowOverview = function(delay1, delay2)
{
    print("--> Showing constellation overview " + this.name + " (" + this.displayName + ")");

    ConstellationMgr.setFlagIsolateSelected(true);  
	core.selectObjectByName(this.name, false);

	StelMovementMgr.autoZoomIn(6);
	StelMovementMgr.zoomTo(this.fov1,2);
    core.wait(delay1);

    // Show constellation label
    label = LabelMgr.labelScreen(this.displayName, 70, 50, false, 50, "#66ccff");
    LabelMgr.setLabelShow(label, true);

    ConstellationMgr.setFlagLabels(true);
    ConstellationMgr.setFlagBoundaries(true);
    ConstellationMgr.setFlagLines(true);
	core.wait(delay2);
}


Constellation.prototype.StartTour = function()
{
    print("--> Showing constellation " + this.name + " (" + this.displayName + ")");

    ConstellationMgr.setFlagIsolateSelected(true);  
    ConstellationMgr.setFlagConstellationPick(true);

    StarMgr.setLabelsAmount(3);
    SolarSystem.setFlagLabels(true);

    if (this.date)
    {
        core.setDate(this.date, "utc");
    }

    // Show constellation overview
    this.ShowOverview(4, 7);

    // Zoom out to show Constellation art
    StelMovementMgr.zoomTo(this.fov2,1);
    core.wait(1);
    ConstellationMgr.setFlagArt(true);
    core.wait(8);
    
    // Hide constellation Art, zoom back to normal
    ConstellationMgr.setFlagArt(false);
    StelMovementMgr.zoomTo(this.fov1,1);

    // Show Objects of interes for this constellation
    var tourItems = this.items;
    if (tourItems!=null)
    {
        print("--> Starting tour of objects of interest.")
        var i = 0;        
        for (i = 0; i<tourItems.length; i++)
        {
            if (tourItems[i]==null)
                continue;

            tourItems[i].Show();
            this.ShowOverview(0, 4);
        }
    }
    else
    {
        print("--> No tour items found; Skipping objects ofinterest.")
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