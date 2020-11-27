import { URL } from 'url';
import { Store } from '..';

export interface UrlModel {
	url: URL | null;
}

export class UrlStore extends Store<UrlModel> {
	getInitData(): UrlModel {
		return {
			url: null,
		};
	}
}
