import { Store } from '..';

export interface StringModel {
	string: string | null;
}

export class StringStore extends Store<StringModel> {
	getInitData(): StringModel {
		return {
			string: null,
		};
	}
}
