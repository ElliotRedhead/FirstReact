import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseactions";
import PropTypes from "prop-types";

// Only using a class here for stateful implementation and to learn both syntaces.

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  /**
   * Copy current course from state, set new title passed from event target value.
   * Sets state to pass.
   *
   * A class field is used to bind 'this' to instance rather than change handler.
   * New object is created with object spread (values on right overwrite values on left).
   */
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  /**
   * Dispatches an action on Submit event.
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
      </form>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

/**
 * Determines what part of the state we expose to the component.
 * Requests only the data that the component needs.
 * @param {*} state
 * @param {*} ownProps
 */
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

export default connect(mapStateToProps)(CoursesPage);
