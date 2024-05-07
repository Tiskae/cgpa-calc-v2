import { CGPAscaleType, GPAClassType, RemarkType } from "./types";

interface GetGradeReturnType {
  CGPAclass: GPAClassType;
  remark: RemarkType;
}

export function getGradeClassWithRemark(CGPA: number): GetGradeReturnType {
  // @ts-ignore
  const CGPAscale: CGPAscaleType =
    Number(localStorage.getItem("cgpa-scale")) || 5;

  let CGPAclass: GPAClassType = "";
  let remark: RemarkType = "";

  if (CGPAscale === 4) {
    if (CGPA >= 3.5) {
      CGPAclass = "First Class";
      remark = "Excellent";
    } else if (CGPA >= 3) {
      CGPAclass = "Second Class (Upper)";
      remark = "Very Good";
    } else if (CGPA >= 2) {
      CGPAclass = "Second Class (Lower)";
      remark = "Good";
    } else if (CGPA >= 1.0) {
      CGPAclass = "Third Class";
      remark = "Fair";
    }
    //  else if (CGPA < 1.5 && CGPA >= 1.0) {
    //   CGPAclass = "Pass";
    //   remark = "Poor";
    // }
    else if (CGPA < 1.0) {
      CGPAclass = "Probation";
      remark = "Poor";
    }
  }

  if (CGPAscale === 5) {
    if (CGPA >= 4.5) {
      CGPAclass = "First Class";
      remark = "Excellent";
    } else if (CGPA >= 3.5) {
      CGPAclass = "Second Class (Upper)";
      remark = "Very Good";
    } else if (CGPA >= 2.4) {
      CGPAclass = "Second Class (Lower)";
      remark = "Good";
    } else if (CGPA >= 1.5) {
      CGPAclass = "Third Class";
      remark = "Fair";
    } else if (CGPA < 1.5 && CGPA >= 1.0) {
      CGPAclass = "Pass";
      remark = "Poor";
    } else if (CGPA < 1.0) {
      CGPAclass = "Probation";
      remark = "Poor";
    }
  }

  if (CGPAscale === 7) {
    if (CGPA >= 6.0) {
      CGPAclass = "First Class";
      remark = "Excellent";
    } else if (CGPA >= 4.6) {
      CGPAclass = "Second Class (Upper)";
      remark = "Very Good";
    } else if (CGPA >= 2.6) {
      CGPAclass = "Second Class (Lower)";
      remark = "Good";
    } else if (CGPA >= 1.6) {
      CGPAclass = "Third Class";
      remark = "Fair";
    }
    // else if (CGPA < 1.5 && CGPA >= 1.0) {
    //   CGPAclass = "Pass";
    //   remark = "Poor";
    // }
    else if (CGPA < 1.6) {
      CGPAclass = "Probation";
      remark = "Poor";
    }
  }

  return { CGPAclass, remark };
}
