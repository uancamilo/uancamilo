import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DateComponent({ dateString }) {
	return (
		<time dateTime={dateString} className="flex justify-center items-center">
			<span className="text-xl mr-4">Publicado: </span>
			<span className="text-xl font-bold truncate">
				{format(new Date(dateString), "LLLL	d ' de ' yyyy'.'", { locale: es })}
			</span>
		</time>
	);
}
