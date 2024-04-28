import Styles from "./how-cgpa-works.module.scss";

type InfoDataType = {
  title: String;
  details: String;
};

const data: InfoDataType[] = [
  {
    title: "1. Gather Your Course Grades",
    details:
      "Collect the grades (or grade points) for each of your courses or subjects. Grades are typically represented as letters (e.g., A, B, C) or numerical values (e.g., 4.0, 3.0, 2.0) depending on your schools grading system.",
  },
  {
    title: "2. Assign Grade Points",
    details:
      "Convert each grade into its equivalent grade point based on your school's grading scale. For example: A = 4.0 B = 3.0 C = 2.0 D = 1.0 F = 0.0 If your school uses a different scale, refer to your academic institution's guidelines for the appropriate grade point conversions.",
  },
  {
    title: "3. Calculate Credit Hours",
    details:
      "Determine the credit hours assigned to each course. Credit hours represent the weight or value of each course in your academic program.",
  },
  {
    title: "4. Compute Grade Points Earned",
    details:
      "Multiply the grade point for each course by its credit hours. This gives you the grade points earned for that course. For example, if you earned a grade of B (3.0) in a 3-credit-hour course:Grade Points Earned = Grade Point (3.0) × Credit Hours (3) = 9.0",
  },
  {
    title: "5. Total Grade Points",
    details: "Sum up all the grade points earned for all courses completed.",
  },
  {
    title: "6. Total Credit Hours",
    details: "Add up the total credit hours for all courses completed.",
  },
  {
    title: "7. Calculate CGPA",
    details:
      "Finally, divide the total grade points earned by the total credit hours to get your Cumulative Grade Point Average (CGPA). The formula is:CGPA = Total Grade Points Earned ÷ Total Credit Hours",
  },
  {
    title: "8. Interpret Your CGPA",
    details:
      "Your CGPA represents your overall academic performance based on the courses completed. CGPA is typically reported on a scale of 0.0 to 4.0, with higher values indicating better academic achievement.",
  },
];

function HowCgpaWorks() {
  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h2 className={Styles.heading}>How CGPA works page</h2>
        <div className={Styles.content}>
          {data.map((info, idx) => {
            return (
              <details className={Styles.info} key={idx}>
                <summary className={Styles.info__summary}>{info.title}</summary>
                <p className={Styles.info__text}>{info.details}</p>
              </details>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default HowCgpaWorks;
