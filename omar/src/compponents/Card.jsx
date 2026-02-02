export default function Card({ title, ex, icon: Icon, color, aos }) {
  return (
    <div className="card" data-aos={aos}>
      <Icon className="card-icon" style={{ color }} />

      <p className="ex">
        {title}
        <br />
        <span className="span">{ex}</span>
      </p>
    </div>
  );
}
