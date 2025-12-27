export function Card({ id, name, imgUrl, onClick }) {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <img src={imgUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}
