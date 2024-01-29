import Link from "next/link";
import Avatar from "../components/avatar";
import Author from "../components/author";
import DateComponent from "../components/date";
import CoverImage from "../components/cover-image";

export default function HeroEntries({
	title,
	coverImage,
	date,
	excerpt,
	author,
	slug,
}) {
	return (
		<section className="lg:px-28 lg:mb-12 mb-6 bg-slate-50 rounded-lg">
			<div className="pt-5 mb-8 md:mb-12 text-center">
				<CoverImage title={title} slug={slug} url={coverImage.url} />
			</div>
			<div>
				<h2 className="flex text-justify mb-4 text-2xl lg:text-6xl leading-tight">
					<Link
						href={`/pagina/${slug}`}
						className="flex items-center sm:hover:text-purple-900 gap-2 underline underline-offset-8 sm:underline-offset-8"
					>
						{title}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6 hidden md:block lg:block"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
							/>
						</svg>
					</Link>
				</h2>
				<p className="text-lg leading-relaxed mb-4">{excerpt}</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5">
				<div className="flex justify-center sm:justify-start">
					{author && (
						<div className="flex gap-5">
							<Avatar picture={author.picture} name={author.name} />
							<div>
								<Author name={author.name} />
								<DateComponent dateString={date} />
							</div>
						</div>
					)}
				</div>
				<div>
					<div className="text-end">Comparte!</div>
					<div className="flex justify-end bg-slate-50">
						<div className="rounded-full hover:bg-slate-200">
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={`https://twitter.com/intent/tweet?text=${title}&url=https://uancamilo.vercel.app/pagina/${slug} via @uancamilo`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-twitter-x m-2"
									viewBox="0 0 16 16"
								>
									<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
								</svg>
							</Link>
						</div>
						<div className="rounded-full hover:bg-slate-200">
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
									`https://uancamilo.vercel.app/pagina/${slug}`
								)}&title=${encodeURIComponent(
									title
								)}&summary=${encodeURIComponent(
									excerpt
								)}&source=${encodeURIComponent(
									"https://uancamilo.vercel.app/"
								)}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-linkedin m-2"
									viewBox="0 0 16 16"
								>
									<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
								</svg>
							</Link>
						</div>
						<div className="rounded-full hover:bg-slate-200">
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={`https://www.facebook.com/sharer.php?quote=${title}&u=https://uancamilo.vercel.app/pagina/${slug}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-facebook m-2"
									viewBox="0 0 16 16"
								>
									<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
								</svg>
							</Link>
						</div>
						<div className="rounded-full hover:bg-slate-200">
							<Link
								target="_blank"
								rel="noopener noreferrer"
								href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
									`Te comparto post sobre "${title}" que encontré en la página https://uancamilo.vercel.app/pagina/${slug}`
								)}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									className="bi bi-whatsapp m-2"
									viewBox="0 0 16 16"
								>
									<path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
