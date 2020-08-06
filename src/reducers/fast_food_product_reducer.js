export default function(state={},action){
    switch(action.type){
        case 'GET_FAST_FOOD_AVAILABILITY':
            return {...state,fastFoodList:action.payload};
            break;
        default:
            return state;
    }
}