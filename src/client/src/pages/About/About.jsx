import React from "react";
import Header from "../../components/Header/Header";
import image from "./aboutPhoto.jpg";
import DataRow from "../../components/DataRow/DataRow";
import "./about.css";

const About = () => {
  return (
    <div className="container">
      <div className="app-wrapper about-wrap">
        <div>
          <Header headline="About" />
          <div>
            <img src={image} alt="nadav avraham" className="profile-pic" />
          </div>
          <div className="about-data">
            <DataRow
              icon="fa-solid fa-graduation-cap"
              header="Education"
              content="B.Sc. in Computer Science"
            />
            <DataRow
              icon="fa-solid fa-shield-halved"
              header="Army Service"
              content="Paratroopers Brigade"
            />
            <DataRow
              icon="fa-solid fa-person-swimming"
              header="Fun Fact"
              content="Former professional swimmer for Maccabi Rishon le Zion"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
