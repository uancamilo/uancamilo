import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
// import Header from '../../components/header'
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Button from "../../components/button";

export default function Post({ post, morePosts, preview }) {
	const router = useRouter();

	if (!router.isFallback && !post) {
		return <ErrorPage statusCode={404} />;
	}

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		author: [
			{
				"@type": "Person",
				name: post.author,
				url: "https://uancamilo.vercel.app/perfil",
			},
		],
		image: post.coverImage.url,
		datePublished: post.date,
	};

	console.log(structuredData);

	return (
		<Layout preview={preview}>
			<Container>
				{/* <Header /> */}
				{router.isFallback ? (
					<PostTitle>Cargando...</PostTitle>
				) : (
					<>
						<article>
							<Head>
								<title>{post.title} | FrontEnd Juan Camilo Serna</title>
								<meta property="og:image" content={post.coverImage.url} />
								<script
									key="structured-data"
									type="application/ld+json"
									dangerouslySetInnerHTML={{
										__html: JSON.stringify(structuredData),
									}}
								/>
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.coverImage}
								date={post.date}
								author={post.author}
							/>
							<PostBody content={post.content} />
						</article>
						<Button />
						<SectionSeparator />
						{morePosts && morePosts.length > 0 && (
							<MoreStories posts={morePosts} />
						)}
					</>
				)}
			</Container>
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const data = await getPostAndMorePosts(params.slug, preview);

	return {
		props: {
			preview,
			post: data?.post ?? null,
			morePosts: data?.morePosts ?? null,
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const allPosts = await getAllPostsWithSlug();
	return {
		paths: allPosts?.map(({ slug }) => `/pagina/${slug}`) ?? [],
		fallback: true,
	};
}
