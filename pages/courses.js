import React from "react";
import CourseManager from "components/courses";
import styles from "styles/Home.module.css";
import { Header } from "components/header";

const Courses = () => {
  return (
    <div className={styles.container + " container mx-auto"}>
      <Header />
      <CourseManager />
    </div>
  );
};

export default Courses;
