import {combineReducers} from 'redux';
import fastFoodAvailabilityList from './fast_food_product_reducer';
import vegetableAvailabilityList from './vegetable_product_reducer';


const rootReducer = combineReducers({
//import various other reducers here and combine...
fastFoodAvailabilityList,
vegetableAvailabilityList
});

export default rootReducer;