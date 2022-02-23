import React from "react";
import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "../../util/fontawesome_icons";

export const Footer = () => {
    return <footer>
         <a href="http://github.com/cmckelvy42/clonebin"><GithubIcon/></Link>
         <a href="https://www.linkedin.com/in/cmckelvy/"><LinkedinIcon/></Link>
    </footer>
}

export default Footer;