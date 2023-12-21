export default function EstaticasTitle({ children }) {
	return (
		<h1 className="container mx-auto xl:px-28 lg:px-18  pt-28 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
			{children}
		</h1>
	);
}
