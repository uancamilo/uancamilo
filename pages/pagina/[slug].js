import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import MoreStories from "../../components/more-stories";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import PostTitle from "../../components/post-title";

export default function Post({ post, morePosts, preview, structuredData }) {
	const router = useRouter();

	if (!router.isFallback && !post) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout preview={preview}>
			<Container>
				{/* <Header /> */}
				{router.isFallback ? (
					<PostTitle>Cargando...</PostTitle>
				) : (
					<>
						<article className="pb-10">
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
							<PostHeader title={post.title} coverImage={post.coverImage} />

							<div className="lg:w-10/12 lg:mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10">
								<div className="col-span-2">
									<PostBody
										content={post.content}
										author={post.author}
										date={post.date}
									/>
								</div>
								<div className="bg-gray-200"></div>
							</div>
						</article>
						{morePosts && morePosts.length > 0 && (
							<MoreStories posts={morePosts} />
						)}
						<SectionSeparator />
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
			structuredData: {
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: data?.post.title,
				description: data?.post.excerpt,
				author: [
					{
						"@type": "Person",
						name: data?.post.author,
						url: "https://uancamilo.vercel.app/perfil",
					},
				],
				image: data?.post.coverImage.url,
				datePublished: data?.post.date,
			},
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
