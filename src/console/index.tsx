import { ThemeProvider } from "@emotion/react";
import * as React from "react";
import { getStyles } from "./theme";
import "../styles.css";

import { ConsoleMessage } from "./console-message";
import { ConsoleProps, LogMessage } from "./types";

// https://stackoverflow.com/a/48254637/4089357
const customStringify = (v: any) => {
	const cache = new Set();
	return JSON.stringify(v, (key, value) => {
		if (typeof value === "object" && value !== null) {
			if (cache.has(value)) {
				// Circular reference found, discard key
				return;
			}
			// Store value in our set
			cache.add(value);
		}
		return value;
	});
};

const getTheme = (props: ConsoleProps) => ({
	variant: props.variant || "light",
	styles: {
		...getStyles(props.variant || "light"),
		...props.styles,
	},
});

class Console extends React.PureComponent<ConsoleProps, any> {
	render() {
		let {
			filter = [],
			logs = [],
			searchKeywords,
			logFilter,
			logGrouping = true,
		} = this.props;

		if (searchKeywords) {
			const regex = new RegExp(searchKeywords);

			const filterFun = logFilter
				? logFilter
				: (log: LogMessage) => {
						try {
							return regex.test(customStringify(log));
						} catch (e) {
							return true;
						}
					};

			logs = logs.filter(filterFun);
		}

		if (logGrouping) {
			logs = logs.reduce((acc, log) => {
				const prevLog = acc[acc.length - 1];

				if (
					prevLog?.amount &&
					prevLog.method === log.method &&
					prevLog.data.length === log.data.length &&
					prevLog.data.every((value, i) => log.data[i] === value)
				) {
					prevLog.amount += 1;

					return acc;
				}

				acc.push({ ...log, amount: 1 });

				return acc;
			}, [] as LogMessage[]);
		}

		return (
			<ThemeProvider theme={getTheme(this.props)}>
				<div className="break-words w-full">
					{logs.map((log, i) => {
						// If the filter is defined and doesn't include the method
						const filtered =
							filter.length !== 0 &&
							log.method &&
							filter.indexOf(log.method) === -1;

						return filtered ? null : (
							<ConsoleMessage
								log={log}
								key={log.id || `${log.method}-${i}`}
								linkifyOptions={this.props.linkifyOptions}
							/>
						);
					})}
				</div>
			</ThemeProvider>
		);
	}
}

export default Console;
