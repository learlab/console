import {
	ArrowLeft,
	BugIcon,
	CircleX,
	InfoIcon,
	LucideProps,
	Table,
	TriangleAlert,
} from "lucide-react";
import React from "react";

export const methods = [
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
	"return",
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
	return: ArrowLeft,
};

export default methods;
