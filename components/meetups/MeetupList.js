import MeetupItem from "./MeetupItem";
import PropTypes from "prop-types";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      <strong> {props.meetups.length} meetup(s)</strong>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

MeetupList.propTypes = {
  meetups: PropTypes.array.isRequired,
};

export default MeetupList;
