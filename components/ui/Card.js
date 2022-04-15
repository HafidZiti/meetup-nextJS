import PropTypes from "prop-types";
import classes from "./Card.module.css";

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
