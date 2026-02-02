import "./about.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Card from "../compponents/Card";
import data from "../compponents/ConstData";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }, []);

  return (
    <section className="about-section" id="about">
      <h1 className="about-me">
        About <span className="ME">Me</span>
      </h1>
      <hr className="hr" />

      <div className="about-div">
        <p className="about-description">
          Hello! I'm Omar, a passionate FullStack Web Developer with experience
          in building dynamic and responsive web applications.
        </p>
      </div>

      <div className="cards-container">
        {data.map((item, i) => (
          <Card
            key={i}
            title={item.title}
            ex={item.ex}
            icon={item.icon}
            color={item.color}
            aos={item.aos}
          />
        ))}
      </div>
    </section>
  );
}
