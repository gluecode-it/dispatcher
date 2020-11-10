import { Dispatcher } from './dispatcher';
import { StoreManager } from './store/manager';
import { PluginManager } from './plugin/manager';
import { PluginFactory } from './plugin/factory';

interface FileBufferDto {
	buffer: Buffer;
}

interface GoogleDriveFileIdDto {
	fileId: string;
}

// HTTP
//  body muss inputDto des ersten Plugins entsprechen

const storeManager = new StoreManager();
const pluginManager = new PluginManager();
const pluginFactory = new PluginFactory();

const pluginInstance1 = pluginFactory.create({
	type: 'DownloadToBufferPlugin',
	name: 'download',
	inputEvents: {
		or: [
			{
				name: 'start',
				type: 'DownloadUrl',
			},
		],
	},
	outputEvents: {
		success: {
			name: 'FileBufferCreated',
			type: 'FileBuffer',
		},
		fail: {
			name: 'error',
			type: 'Error',
		},
	},
});

const pluginInstance2 = pluginFactory.create({
	type: 'BufferToBucketPlugin',
	name: 'save',
	inputEvents: {
		or: [
			{
				name: 'FileBufferCreated',
				type: 'FileBuffer',
			},
		],
	},
	outputEvents: {
		success: {
			name: 'end',
			type: 'Result',
		},
		fail: {
			name: 'error',
			type: 'Error',
		},
	},
});

pluginManager.set(pluginInstance1.getName(), pluginInstance1);
pluginManager.set(pluginInstance2.getName(), pluginInstance2);

const dispatcher = new Dispatcher(pluginManager);
dispatcher.start<object>({
	name: '',
	type: '',
	data: {},
});
