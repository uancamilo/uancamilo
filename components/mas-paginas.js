import EstaticasPreview from "./estaticas-preview";

export default function MasPaginas({ paginas }) {
	return (
		<section>
			<h2 className="m-4 text-3xl text-center tracking-tighter leading-tight">
				Otros temas...
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{paginas.map((pagina) => (
					<EstaticasPreview
						key={pagina.slug}
						title={pagina.title}
						coverImage={pagina.coverImage}
						date={pagina.date}
						author={pagina.author}
						slug={pagina.slug}
						excerpt={pagina.excerpt}
					/>
				))}
			</div>
		</section>
	);
}
