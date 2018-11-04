export class BulletList {
    private _messages : string[];

    private _times : number[];

    private _labels : number[];

    private _x : number;

    private _y : number;

    private _fs : number;

    private _color : string;

    constructor() {
        this.clear();

        this._x = 100;
        this._y = 100;
        this._fs = 25;
        this._color = "#66ccff";
    }

    public clear() : void {
        this._messages = [];
        this._times = [];

        if (this._labels != null && this._labels.length > 0) {
             for (var i=0; i<this._labels.length; ++i) {
                 LabelMgr.deleteLabel(this._labels[i]);
             }
        }

        this._labels = [];
    }

    public setColor(color : string) {
        this._color = color;
    }

    public setPos(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    public add(line : string, delay : number) : void {
        this._messages.push(line);
        this._times.push(delay);
    }

    public show() {
        if (this._messages.length!=this._times.length)
            throw new Error("Array length mismatch!");

        let list = [];
        try {
            for (let i=0; i<this._messages.length; ++i) {
                let line = this._messages[i];
                let x : number = this._x;
                let y : number = this._y;
                
                let lb = LabelMgr.labelScreen(line, x, y + ((this._fs + 6) * i), true, this._fs, this._color, false);
                core.wait(this._times[i]);

                list.push(lb);
            }
        }
        finally {
            this._labels = list;
        }
    }
}