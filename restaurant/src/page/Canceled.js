import React from 'react'

const Canceled = () => {
  return (
    <div className='w-full h-full flex justify-center items-center pt-10 px-2  md:p-10'>
        <div className='bg-slate-100 w-full max-w-md text-center flex justify-center items-center flex-col rounded'>
            {/* <div className=''>
                <img src={iconSuccess} className="h-40" />
            </div> */}
            <h1 className='text-red-600 font-bold text-lg py-3 '>payment Cancel</h1>
        </div>
    </div>
  )
}

export default Canceled