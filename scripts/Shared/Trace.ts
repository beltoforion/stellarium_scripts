export class Trace {

    private _trace : number[];

    private _symbol : string;

    constructor() {
        this._trace = [];
        this._symbol = ".";
    }

    public add(x : number, y : number, color : string = "#ffffff") {
        var lb = LabelMgr.labelScreen(this._symbol, x, y, true, 10, color);
        this._trace.push(lb);
    }

    public setSymbol(s : string) : void {
		if (!s)
			return;

		this._symbol = s;		
	}

    public changeSymbol(symbol : string) {
		for (var i = 0; i < this._trace.length; ++i) {
			var id = this._trace[i];
			LabelMgr.setLabelText(id, symbol);
		}
    }
    
	public clear() : void {
		for (var i = 0; i < this._trace.length; ++i) {
			var id = this._trace[i];
			LabelMgr.deleteLabel(id);
		}

		this._trace = new Array();
	}
}