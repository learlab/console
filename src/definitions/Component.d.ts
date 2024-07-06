import type { Options } from "linkifyjs";
import { Theme as _Theme } from "../theme";
import { Methods } from "./Methods";
import { Payload } from "./Payload";

export type Variants = "light" | "dark";

export interface Theme {
	variant: Variants;
	styles: _Theme;
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
