 function updateState(state, action){
 		if (action.type === '+'){
 			return {count: state.count + action.amount};
 		} else if (action.type === '-') {
 			return {count: state.count - action.amount};
 		} else {
 			return state.count;
 		}
 }

class Store {
	constructor(updateState, state){
		this._updateState = updateState;
		this._state = state;
		this._callback = [];
	}

		get state () {
			return this._state;
		}

	update(action){
		this._state = this._updateState(this._state, action);
		this._callback.forEach(callback => callback())
	}	

	subscribe(callback){
		this._callback.push(callback);
		return () => this._callback = this._callback.filter( cb => cb !== callback );
	}
}

const initialState = { count:0 }

const store = new Store(updateState, initialState); 

const incrementAction = {type: '+', amount: 5 };
const decrementAction = {type: '-', amount: 5 };
const defaultAction   = {type: '_'}

const unSubscribe = store.subscribe(() => console.log('CHANGE IS COMIN=> ',  store.state , 'Unsubscribed'))
store.subscribe(() => console.log('CHANGE IS COMIN=> ',  store.state))

store.update(incrementAction);
unSubscribe()
store.update(decrementAction);
store.update(defaultAction);
