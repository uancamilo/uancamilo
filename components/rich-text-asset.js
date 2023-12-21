import Image from "next/image";

export default function RichTextAsset({ id, assets }) {
	const asset = assets?.find((asset) => asset.sys.id === id);

	if (asset?.url) {
		return (
			<Image
				src={asset.url}
				alt={asset.description}
				layout="responsive"
				width={1920}
				height={1080}
			/>
		);
	}

	return null;
}