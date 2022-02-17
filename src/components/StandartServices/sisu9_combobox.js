export default class sisu9_combobox {
    text= ""; 
    value= ""; 
    disabled= false;
    divider= false;
    header= "";

    constructor(value,text,disabled=false,divider=false,header="") {
        this.text = text;
        this.value = value;
        this.disabled = disabled;
        this.divider = divider;
        this.header = header;
    }
}