import { LogMessage } from "./Console";

export interface Payload extends LogMessage {
	id: string;
}
