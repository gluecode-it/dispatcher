import { EventEmitter } from 'events';
import { StoreInterface } from './interface';

enum Event {
	UPDATED = 'updated',
	CHANGED = 'changed',
}

export abstract class Store<T> implements StoreInterface<T> {
	private data: T;
	private emitter: EventEmitter = new EventEmitter();

	constructor(emitter?: EventEmitter) {
		this.emitter = emitter || new EventEmitter();
		this.data = this.getInitData();

		this.onUpdated((previousData, newData) => {
			if (previousData !== newData) this.emitChanged(previousData, newData);
		});
	}

	abstract getInitData(): T;

	get(): T {
		return this.data;
	}

	set(data: Partial<T>): T {
		const previousData = this.get();
		const newData = {
			...previousData,
			...data,
		};
		this.data = newData;
		this.emitUpdated(previousData, newData);
		return newData;
	}

	private emitUpdated(previousData: T, newData: T) {
		this.emitter.emit(Event.UPDATED, previousData, newData);
	}

	private emitChanged(previousData: T, newData: T) {
		this.emitter.emit(Event.CHANGED, previousData, newData);
	}

	onUpdated(callback: (previousData: T, newData: T) => void) {
		this.emitter.on(Event.UPDATED, callback);
	}

	onceUpdated(callback: (previousData: T, newData: T) => void) {
		this.emitter.once(Event.UPDATED, callback);
	}

	onChanged(callback: (previousData: T, newData: T) => void) {
		this.emitter.on(Event.CHANGED, callback);
	}

	onceChanged(callback: (previousData: T, newData: T) => void) {
		this.emitter.once(Event.CHANGED, callback);
	}
}
