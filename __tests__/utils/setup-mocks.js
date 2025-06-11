// Helper para configurar respuestas de fetch
export const mockFetchResponse = (data, ok = true, status = 200) => {
	return global.fetch.mockResolvedValueOnce({
		ok,
		status,
		json: async () => data,
		text: async () => JSON.stringify(data),
	});
};

// Helper para mockear errores de red
export const mockFetchError = (errorMessage = "Network error") => {
	return global.fetch.mockRejectedValueOnce(new Error(errorMessage));
};

// Helper para obtener el mock del router
export const getMockRouter = () => {
	const { useRouter } = require("next/router");
	return useRouter();
};

// Limpiar mocks antes de cada test
export const clearAllMocks = () => {
	jest.clearAllMocks();
	global.fetch.mockClear();
};
