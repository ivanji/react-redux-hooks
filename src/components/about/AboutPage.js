import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => (
  <div>
    <h1>About us</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur aut
      illum nam obcaecati rem sunt ipsam magni nisi corrupti molestias adipisci
      fugit, voluptatum tenetur cum repudiandae laborum dignissimos soluta
      praesentium.
    </p>

    <Link to="/">Go back to homepage</Link>
  </div>
);

export default AboutPage;
