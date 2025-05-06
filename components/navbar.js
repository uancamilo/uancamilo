import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
	{ name: "Inicio", href: "/", current: true },
	{ name: "Perfil", href: "/perfil", current: false },
	{ name: "Proyectos", href: "#", current: false },
	{ name: "Contacto", href: "/contacto", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const router = useRouter();
	return (
		<Disclosure as="nav" className="bg-[#F8F9FA] fixed z-50 w-full">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							{/* Botón mobile */}
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-[#2F2F2F] hover:text-[#34A853] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#34A853]">
									<span className="sr-only">Abrir menú principal</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>

							{/* Logo + navegación */}
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex flex-shrink-0 items-center">
									<Link href="/">
										<Image
											className="h-8 w-auto"
											src="/images/logo_lybre.png"
											width={120}
											height={120}
											alt="Logo Lybre"
										/>
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={classNames(
													router.pathname === item.href
														? "text-[#34A853] font-semibold"
														: "text-[#2F2F2F] hover:text-[#34A853]",
													"px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
												)}
												aria-current={item.current ? "page" : undefined}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>

							{/* Ícono derecho */}
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button
									type="button"
									className="rounded-full bg-transparent p-1 text-[#2F2F2F] hover:text-[#34A853] focus:outline-none focus:ring-2 focus:ring-[#34A853]"
								>
									<span className="sr-only">Ver notificaciones</span>
									<BellIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>

					{/* Menú móvil */}
					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pt-2 pb-3">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={classNames(
										router.pathname === item.href
											? "text-[#34A853] font-semibold"
											: "text-[#2F2F2F] hover:text-[#34A853]",
										"block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
