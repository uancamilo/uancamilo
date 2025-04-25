import Head from "next/head";
import Layout from "../components/layout";
import PostList from "../components/postList";

export default function Post() {
	return (
		<>
			<Layout>
				<Head>
					<title>Post | Juan Camilo Serna</title>
				</Head>
				<PostList />
			</Layout>
		</>
	);
}
