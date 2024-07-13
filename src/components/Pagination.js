import { useContext } from "react";
import { AppContext } from "../context/AppContext";



const Pagination = () => {

    const {page, handlePageChange, totalPages} = useContext(AppContext);

    return ( 
        <div className='w-full flex fixed bottom-0 bg-bgColor text-textColor justify-center shadow-footer-shadow py-2 transition-all ease-in-out duration-700 '>
        
            <div className='flex w-10/12 max-w-[670px] justify-between '>
            <div className='flex gap-x-4'>
            { page > 1 &&
                    <button
                    className=" rounded-md border-2 px-4 py-1"
                     onClick={ () => handlePageChange(page-1)}>
                        previous
                    </button>
                }
                { page < totalPages &&
                    <button 
                    className=" rounded-md border-2 px-4 py-1"
                    onClick={ () => handlePageChange(page+1) }>
                        Next
                    </button>
                }
            </div>
                
                <p className=" font-bold text-sm">
                    page {page} of {totalPages}
                </p>
            </div>
        </div>
     );
}
 
export default Pagination;