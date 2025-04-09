import React from "react";
import { Link } from "react-router-dom";
import footerBtn from "../assets/footerBtn.png";

const Footer = () => {
  return (
    <footer>
      <Link to={"/"}>
        <img src={footerBtn} alt="footerBtn" />
      </Link>
    </footer>
  );
};

export default Footer;
