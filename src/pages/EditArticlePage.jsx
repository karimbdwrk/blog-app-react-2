import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditArticlePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		fetchData();
		fetchCategories();
	}, []);

	useEffect(() => {
		console.log(categories);
	}, [categories]);

	const fetchData = async () => {
		try {
			const response = await fetch(
				`http://localhost:1337/api/articles/${id}?populate=*`,
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			const dataJson = await response.json();
			setTitle(dataJson.data.attributes.title);
			setContent(dataJson.data.attributes.content);
			setSelectedCategory(dataJson.data.attributes.categorie.data.id);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

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
			await fetch(`http://localhost:1337/api/articles/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(values),
			});
			navigate(`/article/${id}`, { replace: true });
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
					<h1>Edit article - {id}</h1>
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

export default EditArticlePage;
