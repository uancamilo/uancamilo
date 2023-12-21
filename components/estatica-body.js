import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import Avatar from "../components/avatar";
import Author from "../components/author";
import DateComponent from "../components/date";
import markdownStyles from "./markdown-styles.module.css";
import RichTextAsset from "./rich-text-asset";
import Button from "../components/button";

const customMarkdownOptions = (content) => ({
	renderNode: {
		[INLINES.HYPERLINK]: (node, children) => (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={node.data.uri}
				className="underline text-indigo-800"
			>
				{children}
			</a>
		),
		[BLOCKS.EMBEDDED_ASSET]: (node) => (
			<RichTextAsset
				id={node.data.target.sys.id}
				assets={content.links.assets.block}
			/>
		),
	},
});

export default function EstaticaBody({ content, date, author }) {
	return (
		<div className="container">
			<div className="flex gap-5">
				<Avatar picture={author.picture} name={author.name} />
				<div>
					<Author name={author.name} />
					<DateComponent dateString={date} />
				</div>
			</div>
			<div className={`${markdownStyles["markdown"]} text-justify`}>
				{documentToReactComponents(
					content.json,
					customMarkdownOptions(content)
				)}
			</div>
			<Button />
		</div>
	);
}
