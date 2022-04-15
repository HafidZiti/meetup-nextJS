import PropTypes from "prop-types";
import classes from "./MeetupDetail.module.css";
function MeetupDetail(props) {
  return (
    <>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </>
  );
}

MeetupDetail.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MeetupDetail;
