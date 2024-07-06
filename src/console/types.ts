import type { Options } from "linkifyjs";
import methods from "./methods";
import { Theme as _Theme } from "./theme";

export type Variants = "light" | "dark";

export type Method = (typeof methods)[number];

export interface LogMessage {
	method: Method;
	data?: any[];
	amount?: number;
	id?: string;
	timestamp?: string;
}

export type ConsoleProps = {
	logs: LogMessage[];
	variant?: Variants;
	styles?: Theme;
	searchKeywords?: string;
	logFilter?: (log: LogMessage) => boolean;
	logGrouping?: boolean;
	linkifyOptions?: Options;
};

export interface Theme {
	variant: Variants;
	styles: _Theme;
}

export interface Context extends Theme {
	method: Method;
}
