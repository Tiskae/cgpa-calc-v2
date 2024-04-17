"use client";

import Link from "next/link";
import Styles from "./cgpa-calc.module.scss";
import { useState } from "react";
import Progress from "react-circle-progress-bar";
import FormField from "@/components/FormField/FormField";
import clsx from "clsx";

interface CGPAdataType {
  lastCGPA: string;
  completedSemesters: string;
  currentGPA: string;
}

// prettier-ignore
function CgpaCalculatorPage() {
  const [CGPAdata, setCGPAdata] = useState<CGPAdataType>({
    lastCGPA: "3.7", completedSemesters: "2", currentGPA: "5.0"
  })
  const [CGPA, setCGPA] = useState<number>(0);
  const [showResultPage, setShowResultPage] = useState<boolean>(false);

  const calculateCGPA = (): void => {
    let CGPA = ((+CGPAdata.lastCGPA * +CGPAdata.completedSemesters) + +CGPAdata.currentGPA) / (+CGPAdata.completedSemesters + 1);
    setCGPA(CGPA);
    setShowResultPage(true);
  }


  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <form className={clsx([Styles.cgpa__form, showResultPage && Styles.hidden])}>
        <h1 className={Styles.heading}>Calculate Your CGPA</h1>
          <FormField id="last-cgpa" label="Your last CGPA" type="number" value={CGPAdata.lastCGPA} onChange={
             e => {
              setCGPAdata(oldData => {
                const {completedSemesters, currentGPA} = oldData;
                const updatedData:CGPAdataType = {lastCGPA: e.target.value, completedSemesters, currentGPA};
                return updatedData
              })
            }
          }/>

          <FormField id="completed-semesters" label="No of completed semesters" type="number" value={CGPAdata.completedSemesters} onChange={
             e => {
              setCGPAdata(oldData => {
                const {lastCGPA, currentGPA} = oldData;
                const updatedData:CGPAdataType = {lastCGPA, completedSemesters: e.target.value, currentGPA};
                return updatedData
              })
            }
          }/>

          <FormField id="current-gpa" label="GPA for current semester" type="number" value={CGPAdata.currentGPA} onChange={
               e => {
                setCGPAdata(oldData => {
                  const {lastCGPA, completedSemesters} = oldData;
                  const updatedData:CGPAdataType = {lastCGPA, completedSemesters, currentGPA: e.target.value};
                  return updatedData
                })
              }
          }/>
          <div className={Styles.action_btns}>
            <Link href="/" className="btn">Back to menu</Link>
            <button className="btn" onClick={e => {
              e.preventDefault();
              calculateCGPA();
            }}>Calculate CGPA</button>
          </div>
        </form>

        <div className={clsx([Styles.result, showResultPage && Styles.visible])}>
          <h3>CGPA: {CGPA}</h3>
          <Progress
              progress={(CGPA / 5) * 100}
              subtitle={`${CGPA.toFixed(3)} / 5`}
              hideValue={true}
              reduction={0}
              hideBall={true}
              transitionDuration={0.7}
              className={Styles.circle_progress}
              strokeWidth={7}
            />
          <button className="btn" onClick={()=> setShowResultPage(false)}>Go back</button>
        </div>
      </div>
    </main>
  );
}

export default CgpaCalculatorPage;
