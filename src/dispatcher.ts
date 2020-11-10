import { PluginManager } from './plugin/manager';
import { DispatcherEmitter } from './dispatcher/emitter';
import { EventData } from './config/eventData';

export class Dispatcher {
	private emitter: DispatcherEmitter;

	constructor(private plugins: PluginManager) {
		this.emitter = new DispatcherEmitter();
	}

	start<T>(initalData: EventData<T>) {
		this.plugins.forEach((plugin) => {
			plugin.attachEvents(this.emitter);
		});
		this.emitter.on('end', () => console.log('dead'));
		this.emitter.emit('start', initalData);
	}
}
