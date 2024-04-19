"use client";

import FormField from "@/components/FormField/FormField";
import Styles from "./improve-cgpa.module.scss";
import { useState } from "react";

interface ImproveCGPAdataType {
  currentCGPA: string;
  semestersCompleted: string;
  semestersLeft: string;
  desiredCGPA: string;
}

interface ResultDataType {
  isFeasible: boolean;
  averageGPAtoMaintain: number;
}

function ImproveCgpaPage() {
  const [userData, setUserData] = useState<ImproveCGPAdataType>({
    currentCGPA: "",
    semestersCompleted: "",
    semestersLeft: "",
    desiredCGPA: "",
  });
  const [resultData, setResultData] = useState<ResultDataType>({
    isFeasible: true,
    averageGPAtoMaintain: 56,
  });

  const calculateImprovement = () => {
    const totalPointsNeeded =
      +userData.desiredCGPA *
      (+userData.semestersCompleted + +userData.semestersLeft);
    const currentPoints = +userData.currentCGPA * +userData.semestersCompleted;
    const pointsLeft = totalPointsNeeded - currentPoints;
    const avgGPAtoMaintain = pointsLeft / +userData.semestersLeft;
    setResultData({
      isFeasible: avgGPAtoMaintain <= 5,
      averageGPAtoMaintain: avgGPAtoMaintain,
    });
  };

  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h1 className={Styles.heading}>Improve CGPA page</h1>
        <form className={Styles.form}>
          <FormField
            id="semesters-completed"
            type="number"
            label="No of semesters completed"
            value={userData.semestersCompleted}
            onChange={(e) => {
              const { currentCGPA, semestersLeft, desiredCGPA } = userData;
              setUserData((old) => ({
                currentCGPA,
                semestersCompleted: e.target.value,
                semestersLeft,
                desiredCGPA,
              }));
            }}
          />

          <FormField
            id="semesters-left"
            type="number"
            label="No of semesters left (including current one if not yet completed)"
            value={userData.semestersLeft}
            onChange={(e) => {
              const { currentCGPA, semestersCompleted, desiredCGPA } = userData;
              setUserData((old) => ({
                currentCGPA,
                semestersCompleted,
                semestersLeft: e.target.value,
                desiredCGPA,
              }));
            }}
          />

          <FormField
            id="current-cgpa"
            type="number"
            label="Your current CGPA"
            value={userData.currentCGPA}
            onChange={(e) => {
              const { semestersCompleted, semestersLeft, desiredCGPA } =
                userData;
              setUserData((old) => ({
                currentCGPA: e.target.value,
                semestersCompleted,
                semestersLeft,
                desiredCGPA,
              }));
            }}
          />

          <FormField
            id="current-cgpa"
            type="number"
            label="Desired CGPA"
            value={userData.desiredCGPA}
            onChange={(e) => {
              const { currentCGPA, semestersCompleted, semestersLeft } =
                userData;
              setUserData((old) => ({
                currentCGPA,
                semestersCompleted,
                semestersLeft,
                desiredCGPA: e.target.value,
              }));
            }}
          />

          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              calculateImprovement();
            }}
          >
            See improvement
          </button>
        </form>

        <h2>Is possible: {String(resultData.isFeasible)}</h2>
        <h2>GPA to maintain: {resultData.averageGPAtoMaintain}</h2>
        <h2></h2>
      </div>
    </main>
  );
}

export default ImproveCgpaPage;
