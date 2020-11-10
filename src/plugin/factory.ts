import { PluginInterface } from './interface';
import { DownloadToBufferPlugin } from './implementations/downloadToBuffer';
import { BufferToBucketPlugin } from './implementations/bufferToBucket';
import { ConfigEntry } from '../config/entry';

export class PluginFactory {
	create(entry: ConfigEntry): PluginInterface {
		switch (entry.type) {
			case DownloadToBufferPlugin.name:
				return new DownloadToBufferPlugin(entry);
			case BufferToBucketPlugin.name:
				return new BufferToBucketPlugin(entry);
			default:
				throw new Error(
					`plugin not found "${entry.name}", type: ${entry.type}`
				);
		}
	}
}
