import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArticlePage = () => {
	const [article, setArticle] = useState({});
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:1337/api/articles/${id}`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setArticle(dataJson.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<>
			{loading ? (
				<p>Loading ...</p>
			) : (
				<>
					<h1>{article?.attributes?.title}</h1>
					<p>{article?.attributes?.content}</p>
				</>
			)}
		</>
	);
};

export default ArticlePage;
