import ActionTypes from './actionTypes';
import Dispatcher from './dispatcher';

const Actions = {
	addTodo(text: any) {
		Dispatcher.dispatch({
			type: ActionTypes.ADD_TODO,
			text,
		});
	},
};

export default Actions;
