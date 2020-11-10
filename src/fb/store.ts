import { OrderedMap } from 'immutable';
import { ReduceStore } from 'flux/utils';
import TodoActionTypes from './actionTypes';
import TodoDispatcher from './dispatcher';

class TodoStore extends ReduceStore<string, { type: string }> {
	constructor() {
		super(TodoDispatcher);
	}

	getInitialState() {
		return OrderedMap();
	}

	reduce(state: string, action: { type: string }) {
		switch (action.type) {
			case TodoActionTypes.ADD_TODO:
				// Do nothing for now, we will add logic here soon!
				return state;

			default:
				return state;
		}
	}
}

export default new TodoStore();
