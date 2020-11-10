import { EventName } from './eventName';

export interface ConfigEntry {
	type: string;
	name: string;
	options?: object;
	inputEvents: {
		and?: EventName[];
		or?: EventName[];
	};
	outputEvents: {
		success?: EventName;
		fail?: EventName;
	};
}
