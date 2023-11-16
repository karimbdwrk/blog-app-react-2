import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogPage = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"http://localhost:1337/api/articles?populate=*",
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setArticles(dataJson.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<>
			<h1>Blog</h1>
			{loading ? (
				<p>Loading ...</p>
			) : (
				<div className='articles'>
					{articles.map((article, id) => (
						<div style={styles.card} key={id}>
							{/* <img
								src={`http://localhost:1337${article.attributes.image.data.attributes.formats.small.url}`}
							/> */}
							<p>{article.attributes.title}</p>
							<p>
								{
									article.attributes.categorie.data.attributes
										.title
								}
							</p>
							<Link to={`/article/${article.id}`}>
								Voir l'article
							</Link>
						</div>
					))}
				</div>
			)}
		</>
	);
};

const styles = {
	card: {
		border: "1px solid #E7E7E7",
	},
};

export default BlogPage;
