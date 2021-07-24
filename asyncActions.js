const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const initialState = {   //declaring initial state
    loading: false,
    users: [],
    error: ''
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';  //actions
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

const fetchUserRequest = () => {  //action-creator, returning an object with type property
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserFailure = error => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => { //reducer take two parameters, state and action
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function (dispatch) { //dispatch used for when we want to use our action.
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is the users
                const users = response.data.map(user => user.id);
                dispatch(fetchUserSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.message))
            })
    }
}

// if we have multiple reducer:
// const rootReducer = combineReducers({}) //combine all the reducers.

const store = createStore(reducer, applyMiddleware(thunkMiddleware)) //store take two parameter one is reducer and another one is applyMiddleware if any.
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())