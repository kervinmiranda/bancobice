export class historico{
    
    public key:string;
    public name: string;
    public unit: string;
    public values: Map<string, number>;

    constructor(key?: string, name?: string, unit?: string, values?: Map<string, number>){
        this.key = key;
        this.name = name;
        this.unit = unit;
        this.values = values;        
    }
}