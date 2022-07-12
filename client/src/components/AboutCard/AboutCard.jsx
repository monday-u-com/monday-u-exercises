import aboutCardCSS from "./AboutCard.module.css";
import profilePic from "../../assets/profilepic.jpeg";

function AboutCard() {
   return (
      <div className={aboutCardCSS.card}>
         <h1 className={aboutCardCSS.title}>About</h1>
         <p className={aboutCardCSS.info}>
            This is an exercise, developed as part of the Monday-U Full Stack course.
         </p>
         <img src={profilePic} alt="profile" className={aboutCardCSS.profile} />
         <h2 className={aboutCardCSS.name}>Lior Tal</h2>
      </div>
   );
}

export default AboutCard;
