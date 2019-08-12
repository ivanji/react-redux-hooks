import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props //rest operator.
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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

    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required!.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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

// Selector - as it selects data from the redux store.
// It can also be used within a reducer to be re-used by other components
// or use Reselect library to memoize
function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// MapStateToProps runs every time the redux store changes.
// In this case, it'll run again when the API getCourses call completes
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
