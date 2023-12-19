import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function DateComponent({ dateString }) {
	return (
		<time dateTime={dateString}>
			{format(new Date(dateString), "LLLL	d ' de ' yyyy", { locale: es })}
		</time>
	);
}
