import './Hero.css'

function Hero(params) {
    return (
        <section className="Hero">
            
            <div className="leftside-img">
                <img className='imgback' src="/profile.png" alt="Profile" />
            </div>

            <div className='rightside-img'>
                <img className='Pimg' src="\omar.png" alt="profile" />
            </div>
        
            <div className='right-side-p'>
                <p className='p'> Hi , Iam Omar </p>
                <p className='p2'>A FullStack WebDeveloper</p>
                <a href="#projects" className="hero-btn">My Projects</a>
            </div>

        </section>
    )
}
export default Hero
