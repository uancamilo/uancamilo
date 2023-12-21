import CoverImage from "./cover-image";
import TituloPagina from "./titulo-pagina";

export default function CabeceraPagina({ title, coverImage }) {
	return (
		<div className="container mb-10">
			<TituloPagina>{title}</TituloPagina>
			<div className="mb-8 md:mb-16 sm:mx-0">
				<CoverImage title={title} url={coverImage.url} />
			</div>
			<div className="grid justify-center gap-5 sm:flex"></div>
		</div>
	);
}
