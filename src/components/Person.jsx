import PropTypes from "prop-types";

export const Person = ({ id, name, role, img }) => {
  return (
    <div className="col">
      <div className="card" style={{ width: "18rem" }}>
        <img src={img} className="card-img-top" alt={id} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{role}</p>
        </div>
        <div className="container mb-4">
          <button className="btn btn-success mx-2">Editar</button>
          <button className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
};

Person.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  role: PropTypes.string,
  img: PropTypes.string,
};
