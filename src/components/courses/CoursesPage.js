import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(err => {
        alert("Loading course failed " + err);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(err => {
        alert("Loading authors failed " + err);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>

        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                a => a.id === parseInt(course.authorId) // had to force coercion here, as id is saved in API as string
              ).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseActions.createCourse(course)) // An action is being still passed
    // better method:
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

//const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
