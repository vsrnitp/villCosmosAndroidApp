export default function(state={},action){
    switch(action.type){
        case 'GET_VEGETABLE_AVAILABILITY':
            return {...state,posts:action.payload};
            break;
        default:
            return state
    }
}