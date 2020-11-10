import { EventEmitter } from 'events';
import { DispatcherEmitter } from '../dispatcher/emitter';

export interface PluginInterface {
	run(
		storeNameList: string[],
		emitter: EventEmitter,
		outputEvents: { [Key: string]: string }
	): any;

	getName(): string;

	attachEvents(emitter: DispatcherEmitter): void;
}
