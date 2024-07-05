import {
	BugIcon,
	CircleAlert,
	CircleX,
	InfoIcon,
	LucideProps,
	TriangleAlert,
} from "lucide-react";
import React from "react";

const methods = [
	"log",
	"debug",
	"info",
	"warn",
	"error",
	"table",
	"clear",
	"time",
	"timeEnd",
	"count",
	"assert",
	"command",
	"result",
	"dir",
] as const;

export const methodIcons: Record<
	string,
	React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>
> = {
	info: InfoIcon,
	warn: TriangleAlert,
	error: CircleX,
	debug: BugIcon,
};

export default methods;

export type Methods = (typeof methods)[number];
