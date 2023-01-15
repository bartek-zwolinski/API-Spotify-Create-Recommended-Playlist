import React from "react";
import GitHub from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Mail from "@material-ui/icons/Mail";
import './Footer.css'


function Footer() {
  return (
    <div className="footer">
      <h3>App created by: <span>Bartłomiej Zwoliński</span></h3>
      <h4>Check my Socials. If you want to contact me press mail icon</h4>
      <div className="socialMedia">
      
      <a href="https://github.com/zwolinn?tab=projects" ><GitHub/></a>
      <a href="mailto:bartek.zwolinski99@gmail.com"><Mail/></a>
      <a href="https://twitter.com" ><TwitterIcon /></a>
      <a href="https://www.linkedin.com/in/bart%C5%82omiej-zwoli%C5%84ski-9755aa216/" ><LinkedInIcon /></a>
      
      </div>
      <p className="rights"> &copy; Contact Mail: <span>bartek.zwolinski99@gmail.com</span></p>
    </div>
  );
}


export default Footer;