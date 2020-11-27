import { Store } from '..';

export interface BufferModel {
	buffer: Buffer | null;
}

export class BufferStore extends Store<BufferModel> {
	getInitData(): BufferModel {
		return {
			buffer: null,
		};
	}
}
