import type { Options } from "linkifyjs";
import methods from "./methods";
import { Theme } from "./theme";

export type Variants = "light" | "dark";

export type Methods = (typeof methods)[number];

export interface LogMessage {
	method: Methods;
	data?: any[];
	amount?: number;
	id?: string;
	timestamp?: string;
}

export type ConsoleProps = {
	logs: LogMessage[];
	variant?: Variants;
	styles?: Theme;
	filter?: Methods[];
	searchKeywords?: string;
	logFilter?: (log: LogMessage) => boolean;
	logGrouping?: boolean;
	linkifyOptions?: Options;
};
