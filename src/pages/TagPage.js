import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Blogs from "../components/Blogs";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { AppContext } from "../context/AppContext";

const TagPage = () => {

    const Navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);

    const {theme} = useContext(AppContext);

    return ( 
        <div  className='w-full h-full flex flex-col gap-y-2 justify-start items-center bg-bgColor text-textColor' data-theme={theme}>
            <Header/>
        
                <div className='w-10/12 max-w-[670px] pt-8 flex items-center gap-x-7 mt-16'>
                <button
                className=" rounded-md border-2 px-4 py-1"
                onClick={() => Navigation(-1)}
                >
                Back </button>
                <h2 className='text-2xl font-bold'>
                 {" "}   Blogs Tagged <span className='text-blue-700 underline'>{`#${tag.replaceAll('-',' ')}`}</span>
                </h2>
                </div>
                
                <Blogs/>
                <Pagination/>
            
        </div>
     );
}
 
export default TagPage;
