import "./projects.css";
import Data from "../compponents/Projectsdata";

function Projects() {
    return(
        <section className="projects" id="projects">
            <h2>My Projects</h2>
           <div className="projects-container">
             {Data.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
           </div>

            <div className="see-projects">
                <button className="see-projects-btn"> <a href="https://dynamic-longma-da4733.netlify.app/">See The Project</a></button>
                <button className="see-projects-btn">  <a href="">See The Project</a></button>


            </div>

        </section>
    ) 

    
}
export default Projects;