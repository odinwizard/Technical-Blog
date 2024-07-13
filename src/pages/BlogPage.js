import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import BlogDetails from "../components/BlogDetails";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { AppContext } from "../context/AppContext";






const BlogPage = () => {

    // we need to find data for the Current Blog as well as related blogs
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    // Getting data from AppContext
    const {loading, setLoading} = useContext(AppContext);
    const{theme} = useContext(AppContext);

    //APi for geeting data from blogId
    const newbaseUrl = "https://codehelp-apis.vercel.app/api/get-blog";

    // Getting Blog ID from location hook
    const location = useLocation();
    const blogId = location.pathname.split('/').at(-1);

    // Using NAvigate hook to go back
    const navigation = useNavigate();

    async function fetchRelatedBlogs(){
        // Loading started
        setLoading(true);

        // API call
        const url = `${newbaseUrl}?blogId=${blogId}`;
        try{
            const res = await fetch (url);
            const data = await res.json();
            console.log(data);
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            alert(error);
            setBlog(null);
            setRelatedBlogs([]);
        }

        // Loading ended
        setLoading(false);
    }

    useEffect(() => {
        fetchRelatedBlogs();
    },[location.pathname]);

  return (
    <div className='w-full h-full flex flex-col justify-start items-center bg-bgColor text-textColor' data-theme={theme}>
    
        <Header/>

        <div className='w-10/12 max-w-[670px] pt-8 flex items-center gap-x-7 mt-16'>
            <button className=" rounded-md border-2 px-4 py-1"
            onClick={() => navigation(-1)}>
                Back
            </button>
        </div>

        <div className='w-10/12 max-w-[670px] pt-8 flex items-center gap-x-7 mb-2'>
            {
                loading ? 
                (<Spinner/>) :
                (blog ? 
                (
                    <div>
                        <BlogDetails post={blog} />
                        <h2 className='text-2xl font-bold mt-8 mb-4'>
                            Related Blogs
                        </h2>
                        <div>
                            {
                                relatedBlogs ? 
                                (relatedBlogs.map( (post) => (
                                    <div key={post.id} className='mb-6'>
                                        <BlogDetails post={post} />
                                    </div>
                                ))) : 
                                (
                                    <div className='mt-16 pt-8'>
                                        No Related Blogs
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className='mt-16 pt-8'>No Blog Found</p>
                    </div>
                ))
            }
        </div>

    </div>
  )
}

export default BlogPage