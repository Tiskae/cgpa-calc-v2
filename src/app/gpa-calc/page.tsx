"use client";

import clsx from "clsx";
import Styles from "./gpa-calc.module.scss";
import { useState } from "react";
import Progress from "react-circle-progress-bar";
import Link from "next/link";

const GPA_SCALE = 5;

// Child component
type GradeType = "A" | "B" | "C" | "D" | "E" | "F";

interface GPAFormFieldProps {
  id: number;
  coursecode: string;
  unit: number;
  grade: GradeType;
  deleteHandler: Function;
  inputsUpdateHandler: Function;
}

////////

type GPAClassType =
  | ""
  | "First Class"
  | "Second Class (Upper)"
  | "Second Class (Lower)"
  | "Third Class"
  | "Pass"
  | "Probation";

type RemarkType = "" | "Excellent" | "Very Good" | "Good" | "Fair" | "Poor";

interface ResultsType {
  noOfCourses: number;
  totalUnits: number;
  totalPoints: number;
  GPA: number;
  GPAClass: GPAClassType;
  remark: RemarkType;
}

// prettier-ignore
function GPAFormField({ id, coursecode, unit, grade, deleteHandler, inputsUpdateHandler }: GPAFormFieldProps) {
  return (
    <div className={Styles.form__field}>
      <button className={Styles.form__field__delete} onClick={e => {
        e.preventDefault();
        deleteHandler(id);
      }}>x</button>

      <input type="text" className={Styles.form__field__coursecode} value={coursecode} onChange={e => inputsUpdateHandler(id, "coursecode", e.target.value)}/>

      <select className={Styles.form__field__unit} name="unit" value={unit} defaultValue={unit} onChange={e => inputsUpdateHandler(id, "unit", +e.target.value)}>
        {/* 0 - 15 */}
        {new Array(16).fill(0).map((_, idx) => (
          <option key={idx} value={idx}>
            {idx}
          </option>
        ))}
      </select>

      <select className={clsx([ Styles.form__field__grade, Styles[grade]])} name="grade" value={grade} defaultValue={grade} onChange={e => inputsUpdateHandler(id, "grade", e.target.value)}>
        {["A", "B", "C", "D", "E", "F"].map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
}

// Main page
function GPACalcPage() {
  const [coursesData, setCoursesData] = useState<
    Omit<GPAFormFieldProps, "deleteHandler" | "inputsUpdateHandler">[]
  >([
    { id: 0, coursecode: "CHM 101", unit: 4, grade: "A" },
    { id: 1, coursecode: "CHM 103", unit: 1, grade: "A" },
    { id: 2, coursecode: "MTH 101", unit: 5, grade: "A" },
    { id: 3, coursecode: "BOT 101", unit: 3, grade: "A" },
    { id: 4, coursecode: "BOT 103", unit: 1, grade: "C" },
    { id: 5, coursecode: "ZOO 101", unit: 3, grade: "C" },
    { id: 6, coursecode: "ZOO 103", unit: 1, grade: "E" },
    // { id: 7, coursecode: "", unit: 8, grade: "B" },
  ]);

  const [resultsData, setResultsData] = useState<ResultsType>({
    noOfCourses: 0,
    totalUnits: 0,
    totalPoints: 0,
    GPA: 0,
    GPAClass: "",
    remark: "",
  });

  const [showResultPage, setShowResultPage] = useState<boolean>(false);

  const inputFieldChangeHandler = (
    courseId: number,
    field: "coursecode" | "unit" | "grade",
    newValue: string | number | GradeType
  ): void => {
    console.log(courseId, field, newValue);

    setCoursesData((oldData) => {
      const updatedData = oldData.map((course) => {
        if (course.id === courseId) {
          const updatedCourse = { ...course };

          // @ts-ignore
          updatedCourse[field] = newValue;
          return updatedCourse;
        }

        return course;
      });

      return updatedData;
    });
  };

  const addCourseHandler = () => {
    setCoursesData((oldData) => {
      const newCourse: Omit<
        GPAFormFieldProps,
        "deleteHandler" | "inputsUpdateHandler"
      > = {
        id: oldData.length > 0 ? oldData[oldData.length - 1].id + 1 : 0,
        coursecode: "",
        unit: 0,
        grade: "A",
      };

      return [...oldData, newCourse];
    });
    console.log(coursesData);
  };

  const deleteCourseHandler = (id: number) => {
    setCoursesData((oldData) => {
      const updatedCourses = oldData.filter((course) => course.id !== id);
      return updatedCourses;
    });

    console.log(coursesData);
  };

  const calculateGPA = () => {
    const noOfCourses = coursesData.length;
    const totalUnits = coursesData
      .map((c) => c.unit)
      .reduce((p, n) => p + n, 0);

    // Total grade points
    let totalPoints = 0;
    coursesData.forEach((course, idx) => {
      const correspondingUnit = course.unit;

      switch (course.grade) {
        case "A":
          totalPoints += 5 * correspondingUnit; //😍
          break;
        case "B":
          totalPoints += 4 * correspondingUnit; //🙂
          break;
        case "C":
          totalPoints += 3 * correspondingUnit; //🙄
          break;
        case "D":
          totalPoints += 2 * correspondingUnit; //😥
          break;
        case "E":
          totalPoints += 1 * correspondingUnit; //😫
          break;
        case "F":
          totalPoints += 0; //😭
          break;

        default:
          totalPoints + 0;
          break;
      }
    });

    // Maximum points achievable
    const maxPoints =
      coursesData.map((c) => c.unit).reduce((p, n) => p + n, 0) * 5;

    // Calculate GPA
    const GPA = (totalPoints / maxPoints) * GPA_SCALE;

    // GPA class
    let GPAClass: GPAClassType = "First Class";
    let remark: RemarkType = "Excellent";

    if (isNaN(GPA)) {
    } else if (GPA >= 4.5) {
      GPAClass = "First Class";
      remark = "Excellent";
    } else if (GPA >= 3.5) {
      GPAClass = "Second Class (Upper)";
      remark = "Very Good";
    } else if (GPA >= 2.4) {
      GPAClass = "Second Class (Lower)";
      remark = "Good";
    } else if (GPA >= 1.5) {
      GPAClass = "Third Class";
      remark = "Fair";
    } else if (GPA < 1.5 && GPA >= 1.0) {
      GPAClass = "Pass";
      remark = "Poor";
    } else if (GPA < 1.0) {
      GPAClass = "Probation";
      remark = "Poor";
    }

    setResultsData({
      noOfCourses,
      totalUnits,
      totalPoints,
      GPA,
      GPAClass,
      remark,
    });
  };

  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        {/* <div className={Styles.title}>
          <h1 className={Styles.title__text}>GPA Calculator</h1>
        </div> */}

        <form className={clsx([Styles.form, showResultPage && Styles.hidden])}>
          <div className={Styles.form__header}>
            <h3 className={Styles.form__header__text}>Couse code</h3>
            <h3 className={Styles.form__header__text}>Unit</h3>
            <h3 className={Styles.form__header__text}>Grade</h3>
          </div>

          {coursesData.length === 0 && (
            <div className={Styles.form__empty}>
              <p className={Styles.form__empty__text}>
                Nothing to calculate here, add new fields to get started :)
              </p>
            </div>
          )}

          {coursesData.map((course) => (
            <GPAFormField
              key={course.id}
              id={course.id}
              coursecode={course.coursecode}
              unit={course.unit}
              grade={course.grade}
              deleteHandler={deleteCourseHandler}
              inputsUpdateHandler={inputFieldChangeHandler}
            />
          ))}
        </form>

        <div
          className={clsx([
            Styles.form__actions,
            showResultPage && Styles.hidden,
          ])}
        >
          <Link href="/" className="btn" style={{ marginRight: "auto" }}>
            Back to menu
          </Link>
          <button
            className={clsx(["btn"])}
            onClick={(e) => {
              e.preventDefault();
              addCourseHandler();
            }}
          >
            + Add new field
          </button>
          <button
            className={clsx(["btn"])}
            onClick={(e) => {
              e.preventDefault();
              setShowResultPage(true);
            }}
            disabled={coursesData
              .map((crs) => crs.coursecode)
              .some((el) => el === "")}
          >
            Calculate GPA
          </button>
        </div>

        {/* Result page */}
        <div
          className={clsx([Styles.results, showResultPage && Styles.visible])}
        >
          <div className={Styles.results__content}>
            <div className={Styles.a}>
              <h3 className={Styles.a}>No of Courses</h3>
              <p className={Styles.a}>{resultsData.noOfCourses}</p>
            </div>

            <div className={Styles.a}>
              <h3 className={Styles.a}>Total units</h3>
              <p className={Styles.a}>{resultsData.totalUnits}</p>
            </div>

            <div className={Styles.a}>
              <h3 className={Styles.a}>Total points</h3>
              <p className={Styles.a}>{resultsData.totalPoints}</p>
            </div>

            <div className={Styles.a}>
              <h3 className={Styles.a}>Remark</h3>
              <p className={Styles.a}>{resultsData.remark}</p>
            </div>

            <div>
              <h3>GPA</h3>
              <p>
                {resultsData.GPA.toFixed(2)} / {GPA_SCALE.toFixed(2)}
              </p>
            </div>
            <div>
              <h3>GPA Class</h3>
              <p>{resultsData.GPAClass}</p>
            </div>
          </div>

          {/* https://www.npmjs.com/package/react-circle-progress-bar */}
          {showResultPage && (
            <Progress
              progress={(resultsData.GPA / GPA_SCALE) * 100}
              subtitle={`${resultsData.GPA.toFixed(2)} / ${GPA_SCALE.toFixed(
                2
              )}`}
              hideValue={true}
              reduction={0}
              hideBall={true}
              transitionDuration={0.7}
              className={Styles.circle_progress}
              strokeWidth={7}
            />
          )}

          <button
            className={clsx(["btn"])}
            onClick={() => setShowResultPage(false)}
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}

export default GPACalcPage;
