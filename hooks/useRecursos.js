import { useEffect, useState } from "react";
import { getRecursos } from "../lib/contentful";

export function useRecursos({ preview = false, debounceDelay = 400 } = {}) {
	const [recursos, setRecursos] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			const fetchData = async () => {
				setLoading(true);
				const data = await getRecursos(preview, searchTerm);
				setRecursos(data);
				setLoading(false);
			};

			fetchData();
		}, debounceDelay);

		return () => clearTimeout(delayDebounce);
	}, [searchTerm, preview, debounceDelay]);

	return {
		recursos,
		searchTerm,
		setSearchTerm,
		loading,
	};
}
