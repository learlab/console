import { Methods as _Methods } from "./Methods";
import { Payload } from "./Payload";

export interface Storage {
	pointers: {
		[name: string]: Function;
	};
	src: any;
}

export interface HookedConsole extends Console {
	feed: Storage;
}

export type Methods = _Methods;

export interface LogMessage {
	method: Methods;
	data?: any[];
	timestamp?: string;
}

export type Callback = (encoded: LogMessage, message: Payload) => void;
