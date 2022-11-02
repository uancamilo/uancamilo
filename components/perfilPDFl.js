import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PerfilPDF(props) {
	const [numPages, setNumPages] = useState(null);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	const onButtonClick = () => {
		fetch("./assets/docs/Hoja_de_vida.pdf").then((response) => {
			response.blob().then((blob) => {
				const fileURL = window.URL.createObjectURL(blob);
				let alink = document.createElement("a");
				alink.href = fileURL;
				alink.download = "uancamilo.pdf";
				alink.click();
			});
		});
	};

	return (
		<>
			<div className="pt-16 flex justify-end bg-gray-600 pr-24">
				<button onClick={onButtonClick} className="flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6 text-gray-200 hover:text-slate-400 m-3"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
						/>
					</svg>
				</button>
				<button
					onClick={() => {
						props.onChange(true);
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 text-gray-200 hover:text-slate-400 m-3"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div className="container mx-auto">
				<Document
					file="./assets/docs/Hoja_de_vida.pdf"
					onLoadSuccess={onDocumentLoadSuccess}
				>
					{[...Array(numPages).keys()].map((p) => (
						<Page
							className="flex justify-center w-full"
							key={p}
							pageNumber={p + 1}
						/>
					))}
			<style>
				{`
					.react-pdf__Page__canvas{
						width: 75% !important;
						height: 75% !important;
					}

					.react-pdf__Page__textContent {
						height: 0% !important;
					}
					`}
			</style>
				</Document>
			</div>
		</>
	);
}
