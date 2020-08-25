import axios from 'axios';

//const URL = `https://jsonplaceholder.typicode.com/posts`;
const URL = `https://villcosmos.vsrnitp.repl.co/api`;

export function getFastFoodList(){
    const request = axios.get(`${URL}/fastFoodList`).then(response => {
         const fastFood = [];
        
        
         for(let key in response.data){
             fastFood.push({
                 ...response.data[key],
                 id:key
             })
            
         }
         return fastFood;
    }).catch(e=>{
        console.log(e);
    })
    return {
        type:'GET_FAST_FOOD_AVAILABILITY',
        payload:request
    }
}