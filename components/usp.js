import { useEffect, useRef, useState } from "react";

function useInView(options) {
	const ref = useRef(null);
	const [isVisible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setVisible(entry.isIntersecting);
		}, options);

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect();
	}, [options]);

	return [ref, isVisible];
}

export default function Ups() {
	const uspItems = [
		{
			image: "/images/usp/tecnologias.png",
			alt: "Tecnologías abiertas",
			title: "Tecnologías abiertas",
			description:
				"Trabajamos con herramientas libres y modernas. Lo que hacemos es tuyo y puedes mantenerlo fácilmente.",
		},
		{
			image: "/images/usp/acompanamiento.png",
			alt: "Acompañamiento claro",
			title: "Acompañamiento claro",
			description:
				"Te explicamos cada paso del proceso sin tecnicismos. Siempre sabrás qué estamos haciendo y por qué.",
		},
		{
			image: "/images/usp/entrega.png",
			alt: "Entrega funcional",
			title: "Entrega rápida y funcional",
			description:
				"Tu sitio web estará listo en poco tiempo, y optimizado para funcionar bien desde el primer día.",
		},
	];

	return (
		<section className="bg-white py-20 px-6 md:px-16">
			<h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2F2F2F] mb-12">
				¿Por qué elegirnos?
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
				{uspItems.map((item, index) => {
					const [ref, isVisible] = useInView({ threshold: 0.2 });

					return (
						<div
							key={index}
							ref={ref}
							className={`p-6 rounded-lg shadow-md bg-[#F8F9FA] transform transition-all duration-700 ease-out ${
								isVisible
									? `opacity-100 translate-y-0 delay-${index * 100}`
									: "opacity-0 translate-y-10 delay-0"
							} hover:shadow-lg`}
						>
							<img
								src={item.image}
								alt={item.alt}
								className="mx-auto mb-6 h-20 w-auto"
								loading="lazy"
							/>
							<h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">
								{item.title}
							</h3>
							<p className="text-[#4B5563] text-sm">{item.description}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
