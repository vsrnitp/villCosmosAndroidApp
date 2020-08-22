import axios from 'axios';

//const URL = `https://jsonplaceholder.typicode.com/posts`;
const URL = `https://villcosmos.vsrnitp.repl.co/api`;

export function getVegetableList(){
    const request = axios.get(`${URL}/vegetable/vegetableList`).then(response => {
         const vegetable = [];
        

         for(let key in response.data){
             vegetable.push({
                 ...response.data[key],
                 id:key
             })
            
         }
         return vegetable;
    }).catch(e=>{
        console.log(e);
    })
    return {
        type:'GET_VEGETABLE_AVAILABILITY',
        payload:request
    }
}