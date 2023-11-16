import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewArticlePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		fetchCategories();
	}, []);

	useEffect(() => {
		console.log(categories);
	}, [categories]);

	const fetchCategories = async () => {
		try {
			const response = await fetch(
				"http://localhost:1337/api/categories",
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setCategories(dataJson.data);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const values = {
			data: {
				title: title,
				content: content,
				categorie: {
					id: selectedCategory,
				},
			},
		};

		try {
			await fetch("http://localhost:1337/api/articles", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(values),
			});
			navigate("/blog", { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{loading ? (
				<p>Loading ...</p>
			) : (
				<>
					<h1>New article</h1>
					<form>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<br />
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<br />
						<select
							value={selectedCategory}
							onChange={(e) =>
								setSelectedCategory(e.target.value)
							}>
							{categories.map((category, id) => (
								<option key={id} value={category.id}>
									{category.attributes.title}
								</option>
							))}
						</select>
						<button onClick={handleSubmit}>Add</button>
					</form>
				</>
			)}
		</>
	);
};

export default NewArticlePage;
