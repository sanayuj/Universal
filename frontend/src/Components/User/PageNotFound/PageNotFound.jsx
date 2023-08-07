import React from 'react'
import "./PageNotFound.css"
import { useNavigate } from 'react-router-dom'
export default function NotFoundpage() {
  const navigate=useNavigate()
  return (
    <div id="main">
    	<div class="fof">
        		<h1>Error 404</h1>
            <p>Page Not Found</p>
            <button onClick={()=>{navigate("/") }} className='HomeBtn'> Home</button>
    	</div>
      
</div>
  )
}
