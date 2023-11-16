import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import NewArticlePage from "./pages/NewArticlePage";

import "./App.css";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/blog' element={<BlogPage />} />
				<Route path='/article/:id' element={<ArticlePage />} />
				<Route path='/newarticle' element={<NewArticlePage />} />
			</Routes>
		</Router>
	);
}

export default App;
