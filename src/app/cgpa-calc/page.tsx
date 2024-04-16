"use client";

import Styles from "./cgpa-calc.module.scss";
import { useState } from "react";

interface CGPAdataType {
  lastCGPA: string;
  completedSemesters: string;
  currentGPA: string;
}

// prettier-ignore
function CgpaCalculatorPage() {
  const [CGPAdata, setCGPAdata] = useState<CGPAdataType>({
    lastCGPA: "", completedSemesters: "", currentGPA: ""
  })
  const [CGPA, setCGPA] = useState<number>();

  const calculateCGPA = (): void => {
    let CGPA = ((+CGPAdata.lastCGPA * +CGPAdata.completedSemesters) + +CGPAdata.currentGPA) / (+CGPAdata.completedSemesters + 1);
    setCGPA(CGPA);
  }


  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h1 className={Styles.heading}>Calculate Your CGPA</h1>
        <form className={Styles.cgpa__form}>
          <div className={Styles.cgpa__form__field}>
            <label className={Styles.cgpa__form__label} htmlFor="last-cgpa">Your last CGPA</label>
            <input className={Styles.cgpa__form__input} type="number" id="last-cgpa" value={CGPAdata.lastCGPA}
              onChange={
                e => {
                  setCGPAdata(oldData => {
                    const {completedSemesters, currentGPA} = oldData;
                    const updatedData:CGPAdataType = {lastCGPA: e.target.value, completedSemesters, currentGPA};
                    return updatedData
                  })
                }
              } />
          </div>

          <div className={Styles.cgpa__form__field}>
            <label className={Styles.cgpa__form__label} htmlFor="completed-semesters">No of Completed Semester</label>
            <input className={Styles.cgpa__form__input} type="number" id="completed-semesters" value={CGPAdata.completedSemesters}
              onChange={
                e => {
                  setCGPAdata(oldData => {
                    const {lastCGPA, currentGPA} = oldData;
                    const updatedData:CGPAdataType = {lastCGPA, completedSemesters: e.target.value, currentGPA};
                    return updatedData
                  })
                }
              } />
          </div>

          <div className={Styles.cgpa__form__field}>
            <label className={Styles.cgpa__form__label} htmlFor="current-gpa">GPA for current semester</label>
            <input className={Styles.cgpa__form__input} type="number" id="current-gpa" value={CGPAdata.currentGPA}
              onChange={
                e => {
                  setCGPAdata(oldData => {
                    const {lastCGPA, completedSemesters} = oldData;
                    const updatedData:CGPAdataType = {lastCGPA, completedSemesters, currentGPA: e.target.value};
                    return updatedData
                  })
                }
              }/>
          </div>

          <button className="btn" onClick={e => {
            e.preventDefault();
            calculateCGPA();
          }}>Calculate CGPA</button>
        </form>

        <div>
          <h3>CGPA: {CGPA}</h3>
        </div>
      </div>
    </main>
  );
}

export default CgpaCalculatorPage;
