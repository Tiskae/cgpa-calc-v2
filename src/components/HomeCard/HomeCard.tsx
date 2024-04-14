import { MouseEventHandler } from "react";
import Styles from "./HomeCard.module.scss";
import Link from "next/link";
import clsx from "clsx";

export interface HomeCardProps {
  cardNo: number;
  title: string;
  description: string;
  link: string;
  bgColor: string;
}

function HomeCard({
  title,
  description,
  link,
  bgColor,
  cardNo,
}: HomeCardProps) {
  return (
    <Link
      href={link}
      className={clsx([Styles.homecard, Styles[`homecard__${cardNo}`]])}
      style={{ backgroundColor: bgColor }}
    >
      {/* <div
        className={Styles.homecard}
        id={`homecard__${cardNo}`}
        style={{ backgroundColor: bgColor }}
      > */}
      <h3 className={Styles.homecard__title}>{title}</h3>
      <p className={Styles.homecard__desc}>{description}</p>
      {/* </div> */}
    </Link>
  );
}

export default HomeCard;
