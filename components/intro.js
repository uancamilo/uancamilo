import Image from "next/image";
import Link from "next/link";

export default function Intro() {
	return (
		<section className="pb-20">
			<div className="bg-gradient-to-tr from-indigo-300 to-purple-900 h-screen relative flex items-center">
				<Image
					src="/images/bgImage.jpg"
					className="object-cover absolute mix-blend-overlay"
					alt="FrontEnd dev universe"
					fill={true}
				/>
				<div className="text-center absolute w-full">
					<h1 className="font-bold text-slate-300 text-4xl sm:text-5xl md:text-6xl">
						<span className="block pb-12">{"< Hola mundo . . . /> "}</span>{" "}
						<span className="block text-gray-800">Tus {"{ proyectos }"}</span>
					</h1>
					<p className="mt-3 text-base text-gray-300 sm:mx-auto sm:mt-5 sm:text-lg md:mt-5 md:text-xl lg:mx-0 ">
						empiezan con un ¡Hola!
					</p>
					<div className="mt-5 flex justify-center">
						{/* <div className="rounded-md shadow">
								<a
									href="#"
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
								>
									¿ Conversamos ?
								</a>
							</div> */}
						<div className="mt-3 sm:mt-0 sm:ml-3">
							<Link
								href="/contacto"
								className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-200 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:text-lg"
							>
								¿ Conversamos ?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
