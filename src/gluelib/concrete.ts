import { GlueLib } from '.';
import { BufferStore } from '../store/standard/buffer';
import { UrlStore } from '../store/standard/url';

export class UrlResponseToBuffer extends GlueLib {
	onceChanged(readStores: [UrlStore], writeStores: [BufferStore]) {
		return super.onceChanged(readStores, writeStores);
	}

	run(readStores: [UrlStore], writeStores: [BufferStore]) {
		writeStores[0].set({
			buffer: Buffer.from('äääääääää'),
		});
	}
}
