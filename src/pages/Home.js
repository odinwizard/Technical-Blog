import React, { useContext } from "react";
import Blogs from "../components/Blogs";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import ScrollToTop from "../components/ScrollBar";
import { AppContext } from "../context/AppContext";


const Home = () => {
    const {theme} = useContext(AppContext);

    return ( 
        <div className='w-full h-full overflow-x-hidden flex flex-col gap-y-2 justify-center items-center bg-bgColor text-textColor' data-theme={theme}>
    <ScrollToTop/>
        <Header/>

        <Blogs/>

        <Pagination/>
    </div>
     );
}
 
export default Home;