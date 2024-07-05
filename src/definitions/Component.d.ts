import type { Options } from "linkifyjs";
import { Methods } from "./Methods";
import { Payload } from "./Payload";
import { Styles } from "./Styles";

export type Variants = "light" | "dark";

export interface Theme {
	variant: Variants;
	styles: Styles;
}

export interface Context extends Theme {
	method: Methods;
}

export interface LogMessage extends Payload {
	data: any[];
	amount?: number;
}

export interface Props {
	logs: LogMessage[];
	variant?: Variants;
	styles?: Styles;
	filter?: Methods[];
	searchKeywords?: string;
	logFilter?: (log: LogMessage) => boolean;
	logGrouping?: boolean;
	linkifyOptions?: Options;
}

export interface MessageProps {
	log: LogMessage;
	linkifyOptions?: Options;
}
