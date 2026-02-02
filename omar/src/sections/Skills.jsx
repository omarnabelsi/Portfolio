import "./skills.css";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub } from "react-icons/fa";
import { SiRedux } from "react-icons/si";

export default function Skills() {
  const skills = [
    { icon: <FaHtml5 />, color: "#E34F26" },   
    { icon: <FaCss3Alt />, color: "#1572B6" },
    { icon: <FaJs />, color: "#F7DF1E" },     
    { icon: <FaReact />, color: "#61DAFB" },  
    { icon: <FaGithub />, color: "#181717" }, 
    
  ];

  return (
    <section className="skills-section" id="skills">
      <h2 className="skills-title">My Skills</h2>
      <p className="skills-subtitle">
        Here are some of the technologies I work with:
      </p>

      <div className="skills-pill">
        {skills.map((skill, i) => (
          <div className="skill-tile" key={i}>
            <span style={{ color: skill.color }}>{skill.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
