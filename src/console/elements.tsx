import React from "react";
import { methodIcons } from "./methods";
import styled from "./theme";

/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */
const Themed = (
	style: string,
	method: string,
	styles: { [name: string]: string },
) =>
	styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
	styles[`LOG_${style.toUpperCase()}`];

/**
 * console-message
 */
export const Message = styled("div")(({ theme: { styles, method } }) => ({
	position: "relative",
	display: "flex",
	color: Themed("color", method, styles),
	backgroundColor: Themed("background", method, styles),
	borderTop: `1px solid ${Themed("border", method, styles)}`,
	borderBottom: `1px solid ${Themed("border", method, styles)}`,
	marginTop: -1,
	marginBottom: +/^warn|error$/.test(method),
	padding: styles.PADDING,
	boxSizing: "border-box",
	"& *": {
		boxSizing: "border-box",
		fontFamily: styles.BASE_FONT_FAMILY,
		whiteSpace: "pre-wrap",
		fontSize: styles.BASE_FONT_SIZE,
	},
	"& a": {
		color: styles.LOG_LINK_COLOR,
	},
}));

const MessageContainer = () => {
	return <div className="flex relative" />;
};

export const MethodIcon = ({ method }: { method: string }) => {
	if (Object.keys(methodIcons).includes(method)) {
		const Icon = methodIcons[method];
		return <Icon className="size-5 mr-2" />;
	}

	return null;
};

/**
 * message-amount
 */
export const AmountIcon = styled("div")(({ theme: { styles, method } }) => ({
	// make it a circle if the amount is one digit
	minWidth: `${16 / 12}em`,
	height: `${16 / 12}em`,
	margin: "1px 0",
	whiteSpace: "nowrap",
	fontSize: `${10 / 12}em!important`,
	padding: "0px 3px",
	background: Themed("amount_background", method, styles),
	color: Themed("amount_color", method, styles),
	borderRadius: "9999px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

/**
 * timestamp
 */
export const Timestamp = styled("div")(({ theme: { styles, method } }) => ({
	marginLeft: 5,
	color: "dimgray",
}));
