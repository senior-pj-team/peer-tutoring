import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";

export function DebounceSearchBar({
	query: initialValue,
	setQuery,
	debounce = 500,
	placeholder,
	callback,
	...props
}: {
	query: string;
	setQuery: (query: string) => void;
	debounce?: number;
	placeholder: string;
	callback?: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setQuery(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, debounce]);

	return (
		<Input
			type="text"
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				setValue(e.target.value);
				if (callback) {
					console.log("debouncing");
					callback();
				}
			}}
			placeholder={placeholder}
			{...props}
		/>
	);
}
