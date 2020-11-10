import { EventName } from './eventName';

export interface EventData<T> extends EventName {
	data: T;
}
