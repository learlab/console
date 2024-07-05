import { ThemeProvider } from "@emotion/react";

import { Theme } from "../definitions/Component";

import {
	AmountIcon,
	IconContainer,
	Message,
	MethodIcon,
	Timestamp,
} from "./elements";

import { Options } from "linkifyjs";
import React from "react";
import ErrorPanel from "./message-parsers/Error";
import Formatted from "./message-parsers/Formatted";
import ObjectTree from "./message-parsers/Object";
import { LogMessage } from "./types";

// https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
const reSubstitutions = /(%[coOs])|(%(([0-9]*[.])?[0-9]+)?[dif])/g;

type Props = {
	log: LogMessage;
	linkifyOptions?: Options;
};

class ConsoleMessage extends React.Component<Props, any> {
	shouldComponentUpdate(nextProps) {
		return this.props.log.amount !== nextProps.log.amount;
	}

	theme = (theme: Theme) => ({
		...theme,
		method: this.props.log.method,
	});

	render() {
		const { log } = this.props;
		return (
			<ThemeProvider theme={this.theme}>
				<Message data-method={log.method}>
					<div className="flex items-center justify-center ml-3">
						{log.amount && log.amount > 1 ? (
							<AmountIcon>{log.amount}</AmountIcon>
						) : (
							<MethodIcon method={log.method} />
						)}
					</div>
					{log.timestamp ? <Timestamp>{log.timestamp}</Timestamp> : <span />}
					<div>{this.getNode()}</div>
				</Message>
			</ThemeProvider>
		);
	}

	getNode() {
		const { log } = this.props;

		// Error handling
		const error = this.typeCheck(log);
		if (error) return error;

		// Chrome formatting
		if (log.data.length > 0 && typeof log.data[0] === "string") {
			const matchLength = log.data[0].match(reSubstitutions)?.length;
			if (matchLength) {
				const restData = log.data.slice(1 + matchLength);
				return (
					<>
						<Formatted data={log.data} />
						{restData.length > 0 && (
							<ObjectTree
								quoted={false}
								log={{ ...log, data: restData }}
								linkifyOptions={this.props.linkifyOptions}
							/>
						)}
					</>
				);
			}
		}

		// Error panel
		if (
			log.data.every((message) => typeof message === "string") &&
			log.method === "error"
		) {
			return <ErrorPanel error={log.data.join(" ")} />;
		}

		// Normal inspector
		const quoted = typeof log.data[0] !== "string";
		return (
			<ObjectTree
				log={log}
				quoted={quoted}
				linkifyOptions={this.props.linkifyOptions}
			/>
		);
	}

	typeCheck(log: any) {
		if (!log) {
			return (
				<Formatted
					data={[
						`%c[console] %cFailed to parse message! %clog was typeof ${typeof log}, but it should've been a log object`,
						"color: red",
						"color: orange",
						"color: cyan",
					]}
				/>
			);
		}

		if (!Array.isArray(log.data)) {
			return (
				<Formatted
					data={[
						"%c[console] %cFailed to parse message! %clog.data was not an array!",
						"color: red",
						"color: orange",
						"color: cyan",
					]}
				/>
			);
		}
		return false;
	}
}

export default ConsoleMessage;
