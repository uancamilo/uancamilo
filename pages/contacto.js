import Head from "next/head";
import Layout from "../components/layout";

export default function Contacto() {
	return (
		<>
			<Layout>
				<Head>
					<title>Contacto | Juan Camilo Serna</title>
				</Head>
				<div className="h-[60rem]">
					<div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full">
						<div className="w-full flex items-center justify-center py-28">
							<div className="bg-white shadow rounded py-12 lg:px-28 px-8">
								<p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
									Este es el inicio de algo sorprendente.
								</p>
								<p className="md:text-2xl text-xl italic leading-7 text-center text-gray-700 pt-5">
									Enviarme tus datos será el primer paso.
								</p>
								<div className="md:flex justify-around items-center mt-12 ">
									<div className="md:w-72 flex flex-col">
										<label className="text-base font-semibold leading-none text-gray-800">
											Nombres
										</label>
										<input
											tabIndex={0}
											arial-label="Please input name"
											type="name"
											className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
											placeholder="Please input  name"
										/>
									</div>
									<div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
										<label className="text-base font-semibold leading-none text-gray-800">
											Correo electrónico
										</label>
										<input
											tabIndex={0}
											arial-label="Please input email address"
											type="name"
											className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
											placeholder="Please input email address"
										/>
									</div>
								</div>
								<div className="md:flex justify-around items-center mt-8">
									<div className="md:w-72 flex flex-col">
										<label className="text-base font-semibold leading-none text-gray-800">
											Empresa / compañía
										</label>
										<input
											tabIndex={0}
											role="input"
											arial-label="Please input company name"
											type="name"
											className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
											placeholder="Please input company name"
										/>
									</div>
									<div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
										<label className="text-base font-semibold leading-none text-gray-800">
											País
										</label>
										<input
											tabIndex={0}
											arial-label="Please input country name"
											type="name"
											className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
											placeholder="Please input country name"
										/>
									</div>
								</div>
								<div>
									<div className="w-full flex flex-col mt-8">
										<label className="text-base font-semibold leading-none text-gray-800">
											Mensaje
										</label>
										<textarea
											tabIndex={0}
											aria-label="leave a message"
											role="textbox"
											type="name"
											className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
											defaultValue={""}
										/>
									</div>
								</div>
								<p className="text-xs leading-3 text-gray-600 mt-4">
									Al hacer clic en enviar, acepta nuestros términos de servicio,
									política de privacidad y cómo usamos los datos que acá se
									envían.
								</p>
								<div className="flex items-center justify-center w-full">
									<button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none">
										Enviar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
