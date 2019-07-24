import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "../../redux/actions/courseActions";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  state = {
    // Class field - removing constructor
    course: {
      title: ""
    }
  };
  // No longer necessary as we're using class field
  // this.handleChange = this.handleChange.bind(this);

  handleChange = e => {
    // Class field
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = e => {
    e.preventDefault();
    //this.props.dispatch(courseActions.createCourse(this.state.course)); // An anction must always be dispatched
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>

        <input
          type="text"
          value={this.state.course.title}
          onChange={this.handleChange}
        />
        <input type="submit" value="Save" />

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseActions.createCourse(course)) // An action is being still passed
    actions: bindActionCreators(courseActions, dispatch) // better method
  };
}

//const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
