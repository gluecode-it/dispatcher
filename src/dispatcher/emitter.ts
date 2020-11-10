import { EventEmitter } from 'events';
import { EventName } from '../config/eventName';

export class DispatcherEmitter {
	private emitter: EventEmitter = new EventEmitter();

	emit(eventName: string, data: EventName): boolean {
		return this.emitter.emit(eventName, data);
	}

	on(eventName: string, handler: (event: EventName) => void) {
		this.emitter.on(eventName, handler);
		return this;
	}
}
