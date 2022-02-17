import axios from 'axios'
//import sisu9_combobox from './sisu9_combobox'

export default class sisu9_std_list {
    Obje = "";
    Liste = [];
 
    constructor(obje) 
    {
      this.Obje = obje;
    }
    
    async callService() {
        try {
          let formData = new FormData();
          formData.append('obje', this.Obje);
          const res = await axios.post('https://sagdiclarmimarlik.sisu9.com/hizmet.php?page=std_list',formData,
          {
          'Content-type': 'application/x-www-form-urlencoded'
        });
          for (var i=0 ; i<res.data.dvojka.Liste.length ; i++) {
              //const listItem = new sisu9_combobox(res.data.dvojka.Liste[i].STD_ID,res.data.dvojka.Liste[i].Label);
              let listItem = { 'value': res.data.dvojka.Liste[i].STD_ID, 'text': res.data.dvojka.Liste[i].Label}       
              this.Liste.push(listItem);  
          }
          
        } catch (e) {
          console.error(e);
          }
      }  
}