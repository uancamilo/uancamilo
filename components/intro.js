export default function Intro() {
	return (
		<header className="bg-[#F8F9FA]">
			<section className="min-h-screen pt-[64px] flex flex-col-reverse lg:flex-row items-center justify-center px-6 gap-10 sm:px-10 lg:px-20 pb-10 bg-[#F8F9FA]">
				<div className="w-full lg:w-1/2 text-center lg:text-left">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-[#2F2F2F]">
						Impulsa tu negocio con un sitio web profesional y fortalece tu
						presencia en Internet
					</h1>
					<p className="text-base sm:text-lg lg:text-xl mb-6 text-[#2F2F2F]">
						Diseñamos sitios web modernos, veloces y alineados con tu propuesta
						de valor para que conectes con tus clientes ideales.
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

				<div className="w-full lg:w-1/2 flex justify-center lg:mb-0">
					<img
						src="/images/doodle.png"
						alt="Desarrollador trabajando en soluciones web"
						loading="lazy"
						className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto"
					/>
				</div>
			</section>
		</header>
	);
}
