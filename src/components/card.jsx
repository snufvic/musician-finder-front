// import { Link } from "react-router-dom";

const Card = ({
  card: {
    id,
    first_name,
    email,
    last_name,
    phone,
    selected_districts,
    profileImage,
    selected_instruments,
  },
}) => {
  return (
    <div className="col-6 col-md-3 col-lg-4 mt-3">
      <div className="card">
        <img src={profileImage} alt={first_name + " " + last_name} />
        <div className="card-body">
          <p className="card-title">First Name: {first_name}</p>
          <p className="card-title">Last Name: {last_name}</p>
          <p className="card-text border-top">
            <b>Email: </b> <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="card-text border-top">
            <b>Tel: </b> <a href={`tel:${phone}`}>{phone}</a>
          </p>
          <div className="card-text border-top">
            <b>Plays following instruments: </b> <br />
            {
              <ul>
                {" "}
                {selected_instruments.map((instrument) => (
                  <li key={instrument.id}>{instrument.name}</li>
                ))}
              </ul>
            }
          </div>
          <div className="card-text border-top">
            <b>Available at: </b> <br />
            {
              <ul>
                {" "}
                {selected_districts.map((district) => (
                  <li key={district.id}>{district.name}</li>
                ))}
              </ul>
            }
          </div>
          {/* <Link to={`/my-cards/edit/${_id}`}>
            {" "}
            <i className="bi bi-pencil"></i> Edit
          </Link> */}
          {/* <Link className="text-danger ms-3" to={`/my-cards/delete/${_id}`}>
            <i className="bi bi-trash"></i> DELETE
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
