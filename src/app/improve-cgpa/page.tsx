"use client";
import Styles from "./improve-cgpa.module.scss";

import FormField from "@/components/FormField/FormField";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

interface ImproveCGPAdataType {
  currentCGPA: string;
  semestersCompleted: string;
  semestersLeft: string;
  desiredCGPA: string;
}

interface ResultDataType {
  isFeasible: boolean;
  averageGPAtoMaintain: number;
  maxCGPAachievable: number;
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
    maxCGPAachievable: 5,
  });
  const [showResultPage, setShowResultPage] = useState<boolean>(false);

  const calculateImprovement = () => {
    const totalPointsNeeded =
      +userData.desiredCGPA *
      (+userData.semestersCompleted + +userData.semestersLeft);
    const currentPoints = +userData.currentCGPA * +userData.semestersCompleted;
    const pointsLeft = totalPointsNeeded - currentPoints;
    const avgGPAtoMaintain = pointsLeft / +userData.semestersLeft;
    const maxCGPAachievable =
      (currentPoints + 5 * +userData.semestersLeft) /
      (+userData.semestersCompleted + +userData.semestersLeft);

    setResultData({
      isFeasible: avgGPAtoMaintain <= 5,
      averageGPAtoMaintain: avgGPAtoMaintain,
      maxCGPAachievable,
    });
    setShowResultPage(true);
  };

  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h1 className={clsx([Styles.heading, showResultPage && Styles.hidden])}>
          Improve CGPA page
        </h1>
        <form className={clsx([Styles.form, showResultPage && Styles.hidden])}>
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

          <div
            className={clsx([
              Styles.action_btns,
              showResultPage && Styles.hidden,
            ])}
          >
            <Link className="btn" href="/">
              Back to menu
            </Link>
            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                calculateImprovement();
              }}
              disabled={Object.values(userData).some((el) => el === "")}
            >
              See improvement
            </button>
          </div>
        </form>

        <div className={clsx(Styles.result, showResultPage && Styles.visible)}>
          {/* <h2>Is possible: {String(resultData.isFeasible)}</h2>
          <h2>GPA to maintain: {resultData.averageGPAtoMaintain}</h2> */}
          <div>
            {resultData.isFeasible && (
              <h2>
                To achieve a CGPA of {userData.desiredCGPA} as your final CGPA
                at graduation, you have to maintain an average of{" "}
                <span>{resultData.averageGPAtoMaintain.toFixed(2)}</span> for
                the rest of your course study.
              </h2>
            )}
            {!resultData.isFeasible && (
              <h2>
                Unfortunately, it is mathematically impossible for you to
                achieve a CGPA of {userData.desiredCGPA} in your remaining{" "}
                {userData.semestersLeft} semesters. The maximum CGPA you can
                achieve is{" "}
                <span style={{ color: "red" }}>
                  {resultData.maxCGPAachievable}
                </span>
                , which is calculated assuming an avergage GPA of {"5.00"} per
                semester till you graduate.
              </h2>
            )}
          </div>
          <button className="btn" onClick={() => setShowResultPage(false)}>
            Go back
          </button>
        </div>

        <h2></h2>
      </div>
    </main>
  );
}

export default ImproveCgpaPage;
