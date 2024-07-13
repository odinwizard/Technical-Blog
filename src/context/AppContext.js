import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "use-local-storage";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const navigation = useNavigate();

  // Fetch Blog Data
  const fetchBlogPosts = async (page = 1, tag= null, category) => {
    setLoading(true);

    let url = `${baseUrl}?page=${page}`;
    if(tag) {
      url += `&tag=${tag}`;
    }
    if(category) {
      url += `&category=${category}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.posts || data.posts.length === 0)
        throw new Error("Something Went Wrong");
      console.log("Api Response", data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in Fetching BlogPosts", error);
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  };

  // Handle When Next and Previous button are clicked
  const handlePageChange = (page) => {
    navigation( {search:`?page=${page}`});
    setPage(page);
    
  };

   
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

    // Creating a function for switching theme
    function switchTheme(){
        // for switching a theme, if theme is light set it to dark or vice versa
        const newTheme = (theme === 'light') ? 'dark' : 'light';
        setTheme(newTheme);
    }

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
    theme,
    setTheme,
    switchTheme,
    defaultDark
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
