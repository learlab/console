import { ThemeProvider } from "@emotion/react";
import { getStyles } from "./theme";
import "../styles.css";

import { deepEqual, shallowEqual } from "fast-equals";
import { LogItem } from "./log-item";
import { ConsoleProps, LogMessage } from "./types";

export const Console = ({
	logs,
	styles,
	variant = "light",
	logFilter = undefined,
	linkifyOptions = undefined,
	searchKeywords = undefined,
	logGrouping = true,
}: ConsoleProps) => {
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
		logs = logs.reduce((acc: LogMessage[], log) => {
			const prevLog = acc[acc.length - 1];

			if (!prevLog?.amount) {
				acc.push({ ...log, amount: 1 });
				return acc;
			}

			if (
				prevLog.method === log.method &&
				prevLog.data?.length === log.data?.length &&
				shallowEqual(prevLog.data, log.data)
			) {
				prevLog.amount++;
				return acc;
			}

			acc.push({ ...log, amount: 1 });
			return acc;
		}, [] as LogMessage[]);
	}

	const theme = {
		variant,
		styles: {
			...getStyles(variant),
			...styles,
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="break-words w-full">
				{logs.map((log, i) => (
					<LogItem
						log={log}
						key={log.id || `${log.method}-${i}`}
						linkifyOptions={linkifyOptions}
						style={theme.styles}
					/>
				))}
			</div>
		</ThemeProvider>
	);
};

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
