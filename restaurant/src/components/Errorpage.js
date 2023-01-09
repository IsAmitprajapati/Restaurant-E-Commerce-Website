import React from 'react'
import { useRouteError } from 'react-router-dom'
import ErroImage  from "../assest/img/error.gif"

const Errorpage = () => {
    const error = useRouteError()
    
  return (
    <div className='w-full flex justify-center items-center h-screen '>
      <img src={ErroImage} className="h-screen"/>
    </div>
  )
}

export default Errorpage