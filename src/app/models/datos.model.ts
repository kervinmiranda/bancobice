export class Datos {

    public key: string;
    public name: string;
    public unit: string;
    public date: string;
    public value: string;
    public variation: number;

    constructor(key?: string, name?: string, unit?: string, date?: string, value?: string, variation?:number){
        this.key = key;
        this.name = name;
        this.unit = unit;
        this.date = date;
        this.value = value;
        this.variation = variation;
    }

}