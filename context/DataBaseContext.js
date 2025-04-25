import { createClient } from "contentful";
import { createContext, useContext } from "react";

const DataBaseContext = createContext();

export function useDataBase() {
	return useContext(DataBaseContext);
}

const client = createClient({
	space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
	accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export function DataBaseProvider({ children }) {
	const fetchEntries = async (contentType) => {
		try {
			const entries = await client.getEntries({ content_type: contentType });
			return entries.items;
		} catch (error) {
			console.error("Error cargando datos de Contentful:", error);
			return [];
		}
	};

	const value = {
		fetchEntries,
	};

	return (
		<DataBaseContext.Provider value={value}>
			{children}
		</DataBaseContext.Provider>
	);
}
