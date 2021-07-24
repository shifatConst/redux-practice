const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore //for creating a store
const combineReducers = redux.combineReducers; //for combine all the reducers
const applyMiddleware = redux.applyMiddleware; //for adding middleware 
const logger = reduxLogger.createLogger();

//ACTION 
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
// Action is simple an object with type property
// {
//     type: BUY_CAKE,
//     info: 'First redux action'
// } 

//a action-creator is a function which returns a action
//action-creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}


//Reducers
//(perviousState, action) => newState
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
// }

const initialCakeState = {
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCreams: 20
}

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCream: state.numOfIceCream - 1
//         }

//         default: return state;
//     }
// }

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state;
    }
}

//STORE

const rootReducer = combineReducers({  //combine all the reducers.
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger)) //holds application state. and takes reducer as a parameter because it has the state parameter.
console.log('initial state', store.getState()); //allows access to state via getState()
const unsubscribe = store.subscribe(() => { }); // subscribe function always executed whenever our state has changed
store.dispatch(buyCake()) //by this method we can update any state, as parameter it takes a action function.
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe(); //we can unsubscribe also.