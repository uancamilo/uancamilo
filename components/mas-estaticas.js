import EstaticasPreview from "../components/estaticas-preview";

export default function MoreEstaticas({ estaticas }) {
	return (
		<section>
			<h2 className="m-4 text-3xl text-center tracking-tighter leading-tight">
				Otros temas...
			</h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{estaticas.map((estatica) => (
					<EstaticasPreview
						key={estatica.slug}
						title={estatica.title}
						coverImage={estatica.coverImage}
						date={estatica.date}
						author={estatica.author}
						slug={estatica.slug}
						excerpt={estatica.excerpt}
					/>
				))}
			</div>
		</section>
	);
}
