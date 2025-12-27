export function Card({ key, id, name, imgUrl, clicked }) {
  return (
    <div className="card">
      <img src={imgUrl} alt={name} />
      <p>{name}</p>
    </div>
  );
}
