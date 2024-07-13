import React from 'react';
import './Spinner.css';


const Spinner = () => {
    return ( 
        <div className='absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 '>
            <div className="spinner "></div>
        </div>
     );
}
 
export default Spinner;
