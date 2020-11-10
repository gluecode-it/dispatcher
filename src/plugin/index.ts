import { ConfigEntry } from '../config/entry';
import { PluginInterface } from './interface';
import { DispatcherEmitter } from '../dispatcher/emitter';

export abstract class Plugin implements PluginInterface {
	constructor(protected config: ConfigEntry) {}
	abstract run(): any;

	getName(): string {
		return this.config.name;
	}

	attachEvents(emitter: DispatcherEmitter) {
		if (this.config.inputEvents.or) {
			this.config.inputEvents.or.forEach((inputEvent) => {
				emitter.on(inputEvent.name, () => {
					try {
						const result = this.run();
						if (this.config.outputEvents.success)
							emitter.emit(this.config.outputEvents.success.name, result);
					} catch (err) {
						if (this.config.outputEvents.fail)
							emitter.emit(this.config.outputEvents.fail.name, err);
					}
				});
			});
		}
	}
}
