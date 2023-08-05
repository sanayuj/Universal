import React from 'react'
import {SlSocialGithub, SlSocialGoogle,SlSocialLinkedin,SlSocialTwitter} from "react-icons/sl"
import "./Footer.css"
export default function Footer() {
  return (
    <div className='mainDiv'>
    <div className='footerHeader'>
  <div className='footerHeaderLeft'></div>
  <a href="https://www.google.com" target="_blank"><SlSocialGoogle className='icons'/></a>
  <a href="https://www.linkedin.com/in/sanayuj/" target="_blank"><SlSocialLinkedin className='icons'/></a>
  <a href="https://twitter.com/sanay_j" target="_blank"><SlSocialTwitter className='icons'/></a>
  <a href="https://github.com/sanayuj" target="_blank"><SlSocialGithub className='icons'/></a>
</div>

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
