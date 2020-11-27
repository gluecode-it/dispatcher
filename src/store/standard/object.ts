import { Store } from '..';

export interface ObjectModel {
	object: Object | null;
}

export class ObjectStore extends Store<ObjectModel> {
	getInitData(): ObjectModel {
		return {
			object: null,
		};
	}
}
