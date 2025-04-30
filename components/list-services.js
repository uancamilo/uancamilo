export default function ListServices({ title, descripcion, imagen }) {
    return (
			<div className="w-full sm:w-[280px] md:w-[300px] text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
				<img
					src={imagen}
					alt={`Ícono del servicio: ${title}`}
					className="mx-auto mb-4 w-20 h-20 object-contain"
					loading="lazy"
				/>
				<h3 className="font-semibold text-xl mb-2 text-[#2F2F2F]">{title}</h3>
				<p className="text-[#4B5563]">{descripcion}</p>
			</div>
		);
}
