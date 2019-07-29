import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props //rest operator.
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErros] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(err => {
        alert("Loading course failed " + err);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(err => {
        alert("Loading authors failed " + err);
      });
    }
  }, [props.course]); // empty arrays ensures that this only runs once unless value in the list changes

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// Selector - as it selects data from the redux ste.
// It can also be used within the reducer to be re-used by other components
// or use Reselect library to memoize
function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}
console.log(mapStateToProps);
const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  saveCourse
};

//const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
