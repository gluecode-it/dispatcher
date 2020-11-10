import { Dispatcher } from 'flux';
import { ReduceStore } from 'flux/utils';

interface Payload {
	type: string;
}

interface State {}

class Store extends ReduceStore<State, Payload> {
	getInitialState() {
		return {};
	}

	reduce(state: State, action: Payload) {
		return state;
	}
}

const glueDispatcher = new Dispatcher<{ type: string }>();
const store = new Store(glueDispatcher);

glueDispatcher.register((payload) => {
	if (payload.type !== 'test') return;
});
