import type { Options } from "linkifyjs";
import { Methods } from "../definitions/Methods";
import { Styles } from "../definitions/Styles";

export type Variants = "light" | "dark";

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
	styles?: Styles;
	filter?: Methods[];
	searchKeywords?: string;
	logFilter?: (log: LogMessage) => boolean;
	logGrouping?: boolean;
	linkifyOptions?: Options;
};
