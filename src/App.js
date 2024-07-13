import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollBar";
import { AppContext } from "./context/AppContext";
import BlogPage from "./pages/BlogPage";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import TagPage from "./pages/TagPage";

export default function App() {

  const { fetchBlogPosts,theme, setTheme, defaultDark } = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();



  useEffect(() => {
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }

  }, [location.pathname, location.search]);

  //darkmode/lightmode must also be applied after render
  useEffect(() => {
    if (defaultDark){
    setTheme('dark');
      }
    },[]);

  return (
    <div className='w-full h-full box-border overflow-x-hidden'>
    <ScrollToTop/>
      {/* creating routes for different pages  */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/categories/:category' element={<CategoryPage/>} />
        <Route path='/tags/:tag' element={<TagPage/>} />
        <Route path='/blog/:blogId' element={<BlogPage/>} />
      </Routes>
    </div>
  );
}
