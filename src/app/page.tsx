"use client";

import Styles from "./index.module.scss";
import HomeCard, { HomeCardProps } from "@/components/HomeCard/HomeCard";

// primary: "#007AFF",
// primaryLight: "#a5d8ff",
// cyanLight: "#e3fafc",
// tealLight: "#e6fcf5",
// greenLight: "#d3f9d8",
// yellowLight: "#fff9db",
// orangeLight: "#fff4e6",
// pinkLight: "#fff0f6",
// redLight: "#ffe3e3",
// greyLight: "#e9ecef",
// violetLight: "#e5dbff",

// prettier-ignore
const homecards: HomeCardProps[] = [
  {cardNo: 1, title: "GPA calculator", description: "Calculate your Grade Point Average (GPA) for a single semester", bgColor: "#a5d8ff", link: "/gpa-calc"},
  {cardNo: 2, title: "CGPA calculator", description: "Calculate your Cummulative Grade Point Average (CGPA) for all semesters", bgColor: "#d3f9d8", link: "/cgpa-calc"},
  {cardNo: 3, title: "Improve CPGA class", description: "Get a breakdown of how you can possibly move up your CGPA class", bgColor: "#fff4e6", link: "/improve-cgpa"},
  {cardNo: 4, title: "How CGPA works", description: "Understand how the CGPA system works, how to calculate it, and how different grades affect your CGPA", bgColor: "#e5dbff", link: "/how-cgpa-works"},
  {cardNo: 5, title: "Settings", description: "Set your preferences for the app, privacy, and much more", bgColor: "#e9ecef", link: "/settings"},
  {cardNo: 6, title: "About me", description: "Learn more about me", bgColor: "#fff9db", link: "/about"},
]

function IndexPage() {
  return (
    <main className={Styles.container}>
      <div className={Styles.cards}>
        {homecards.map((card, idx) => (
          <HomeCard
            key={card.title}
            cardNo={card.cardNo}
            title={card.title}
            description={card.description}
            bgColor={card.bgColor}
            link={card.link}
          />
        ))}
      </div>
    </main>
  );
}

export default IndexPage;
