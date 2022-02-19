import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import About from "./containers/About";
import Contact from "./containers/Contact";
import ListingDetail from "./containers/ListingDetail";
import Listings from "./containers/Listings";
import SignIn from "./containers/Login";
import SignUp from "./containers/SignUp";
import NotFound from "./components/NotFound";
import Layout from "./hocs/Layout";
import PrivateRoute from './components/privateRoute';

import { Provider } from "react-redux";
import store from "./store";

import "./sass/main.scss";
//! Error in private route
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/listings' element={<Listings />} />
            <Route exact path='/listings/:id' element={<ListingDetail />} />
            <Route exact path='/login' element={<SignIn />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
