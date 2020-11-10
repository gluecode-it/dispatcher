import { PluginStores } from '../../stores';

export interface DownloadToBufferStores extends PluginStores {
	[Key: string]: Map<string, any>;
}
