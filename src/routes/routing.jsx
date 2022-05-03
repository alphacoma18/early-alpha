import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Messages from "../pages/messages/messages/messages";

import Forum from "../pages/forum/outside/forum";
import InForum from "../pages/forum/inside/inForum";

import Chat from "../pages/messages/chat/chat";

import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";

import AboutUs from "../pages/_nav_pages/aboutUs/aboutUs";

import ProtectedRoute from "../pages/Protected_Routes/protected";

const Routing = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/messages'
						element={
							<ProtectedRoute>
								<Messages />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/school-forum'
						element={
							<ProtectedRoute>
								<Forum />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/school-forum/forum/:id'
						element={
							<ProtectedRoute>
								<InForum />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/messages/chat/:id'
						element={
							<ProtectedRoute>
								<Chat />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/about-us'
						element={
							<ProtectedRoute>
								<AboutUs />
							</ProtectedRoute>
						}
					/>
					<Route
						exact
						path='/login'
						element={<Login />}
					/>
					<Route
						exact
						path='/signup'
						element={<Signup />}
					/>
				</Routes>
			</Router>
		</>
	);
};
export default Routing;
