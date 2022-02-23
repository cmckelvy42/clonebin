import React from "react";
import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "../../util/fontawesome_icons";

export const Footer = () => {
    return <footer>
         <Link to="http://github.com/cmckelvy42/clonebin"><GithubIcon/></Link>
         <Link to="https://www.linkedin.com/in/cmckelvy/"><LinkedinIcon/></Link>
    </footer>
}

export default Footer;