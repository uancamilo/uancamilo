export default function Stack() {
	const logos = [
		{ src: "/images/java.svg", alt: "Java" },
		{ src: "/images/javascript.svg", alt: "JavaScript" },
		{ src: "/images/react.svg", alt: "React" },
		{ src: "/images/next.svg", alt: "Next.js" },
		{ src: "/images/git.svg", alt: "Git" },
		{ src: "/images/github.svg", alt: "GitHub" },
		{ src: "/images/firebase.svg", alt: "Firebase" },
		{ src: "/images/python.svg", alt: "Python" },
		{ src: "/images/springboot.svg", alt: "Spring Boot" },
		{ src: "/images/sql.svg", alt: "SQL" },
		{ src: "/images/tailwind.svg", alt: "Tailwind CSS" },
	];

	return (
		<section className="bg-white py-8 px-6 md:px-16 overflow-hidden">
			<h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2F2F2F] mb-12">
				Tecnologías
			</h2>

			<div className="relative w-full">
				<div className="flex gap-12 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
					{logos.map((logo, idx) => (
						<img
							key={`logo-${idx}`}
							src={logo.src}
							alt={logo.alt}
							className="h-12 w-auto filter grayscale hover:grayscale-0 transition"
							loading="lazy"
						/>
					))}
					{/* Duplicado para scroll continuo */}
					{logos.map((logo, idx) => (
						<img
							key={`logo-dup-${idx}`}
							src={logo.src}
							alt={logo.alt}
							className="h-12 w-auto filter grayscale hover:grayscale-0 transition"
							loading="lazy"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
