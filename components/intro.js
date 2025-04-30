export default function Intro() {
	return (
		<header className="bg-[#F8F9FA]">
			<section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-20 py-16 bg-[#F8F9FA] gap-10">
				<div className="w-full lg:w-1/2 text-center lg:text-left">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-[#2F2F2F]">
						Crea tu página web profesional y haz crecer tu presencia online
					</h1>
					<p className="text-base sm:text-lg lg:text-xl mb-6 text-[#2F2F2F]">
						Diseñamos sitios modernos, rápidos y adaptados a tu negocio para que
						conectes con más con comunidades y audiencias.
					</p>
					<a
						href="https://wa.me/573105038505"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Iniciar conversación por WhatsApp con Lybre"
						title="Chatea con nosotros por WhatsApp"
						className="inline-block bg-[#34A853] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#2c8c46] transition-colors duration-200"
					>
						Chatea por WhatsApp
					</a>
				</div>

				<div className="w-full lg:w-1/2 flex justify-center">
					<img
						src="/images/doodle.png"
						alt="Desarrollador trabajando en soluciones web"
						width="400"
						height="400"
						loading="lazy"
						className="w-60 sm:w-72 lg:w-96 max-w-full h-auto"
					/>
				</div>
			</section>
		</header>
	);
}
