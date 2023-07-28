import React from 'react'
import {SlSocialGoogle,SlSocialLinkedin,SlSocialTwitter} from "react-icons/sl"
import "./Footer.css"
export default function Footer() {
  return (
    <div className='mainDiv'>
    <div className='footerHeader'><div className='footerHeaderLeft'></div><SlSocialGoogle className='icons'/><SlSocialLinkedin className='icons'/><SlSocialTwitter className='icons'/> </div>
<div className='footerMainContent'>
    <div className='ColumnOne'>
        <p>About us</p>
        <p>Contact us</p>
        <p>Careers</p>
        <p>Blog</p>
    </div>
    <div className='ColumnTwo'>
        <p>Help and Support</p>
        <p>Customer care</p>
        <p>Terms</p>
        <p>Privacy policy</p>
    </div>
    <div className='ColumnThree'>
        <p>Cookie setting</p>
        <p>Accessbility statement</p>
        <p>Sitemap</p>
        <p>Language</p>
    </div>
    <div className='rightDiv'>

    </div>
   
</div>
 <div className='copyRight'>
        <div><p className='BrandName'>Universal</p></div>
        <div><p className='copyText'>©2023 Universal,Inc</p>
    </div></div>
    </div>
  )
}
