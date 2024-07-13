import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";
import Spinner from "./Spinner";

export default function Blogs() {
    const { posts, loading } = useContext(AppContext);
    const location = useLocation();
    const length = posts.length <= 2 ? ('[100vh]') : ('full');

  return (
    <div  className={location.pathname === '/' ? 
        (`w-10/12 max-w-[670px] h-${length} py-8 flex flex-col items-center gap-y-7 my-16`) :
        (`w-10/12 max-w-[670px] h-${length} py-8 flex flex-col items-center gap-y-7 mb-16`)}>
      {loading ? (
        <Spinner/>
      ) : posts.length === 0 ? (
        <div className='my-auto'>
          <p >No Blogs Found !</p>
        </div>
      ) : (
        posts.map((post) => (
          <BlogDetails key ={post.id} post={post}/>
        ))
      )}
    </div>
  );
}
