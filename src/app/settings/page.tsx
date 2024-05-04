"use client";

import Styles from "./settings.module.scss";

import { useState } from "react";
import { CGPAscaleType } from "@/utils/types";
import Link from "next/link";

// prettier-ignore
function SettingsPage() {
  const [CGPAscale, setCGPAscale] = useState<CGPAscaleType>(5);
  const [saveData, setSaveData] = useState<boolean>(true);
  const [theme, setTheme] = useState<"Light"| "Dark"| "System preference">("System preference");
  const [cookieConsent, setCookieConsent] = useState<boolean>(true);

  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h2 className={Styles.heading}>Settings</h2>

        <form className={Styles.form}>
          <div className={Styles.form__sect}>
            <h3 className={Styles.form__sect__heading}>CGPA Scale</h3>
            <div className={Styles.form__sect__options}>
              {[4, 5, 7].map((scale) => (
                <div key={scale} className={Styles.form__sect__option}>
                  <input className={Styles.form__sect__radio} type="radio" name="cgpa-scale" id={"cgpa-scale-" + scale}
                    value={scale}
                    checked={scale === CGPAscale}
                    // @ts-ignore
                    onChange={e => setCGPAscale(+e.target.value)}
                    />
                  <label className={Styles.form__sect__label} htmlFor={"cgpa-scale-" + scale}>{scale}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.form__sect}>
            <h3 className={Styles.form__sect__heading}>Save your data for next time</h3>
                {/* <label className={Styles.form__sect__label} htmlFor={"save-data-" + value}>{value}</label> */}
                <input className={Styles.form__sect__switch} type="checkbox" name="save-data" id={"save-data"}
                  checked={saveData}
                  // @ts-ignore
                  onChange={_ => setSaveData(old => !old)}
                /> 
          </div>

          <div className={Styles.form__sect}>
            <h3 className={Styles.form__sect__heading}>Theme</h3>
            <div className={Styles.form__sect__options}>
            {["Light", "Dark", "System preference"].map((value) => (
                <div key={value} className={Styles.form__sect__option}>
                  <input className={Styles.form__sect__radio} type="radio" name="theme" id={value + "-theme"} 
                    value={value}
                    checked={value === theme}
                    // @ts-ignore
                    onChange={e => setTheme(e.target.value)}
                  />
                  <label className={Styles.form__sect__label} htmlFor={value + "-theme"}>{value}</label>
                </div>
              ))}
            </div>
          </div>

          <div className={Styles.form__sect}>
            <h2 className={Styles.form__sect__heading}>Analytics + Cookies Consent</h2>
                {/* <label className={Styles.form__sect__label} htmlFor={"cookie-" + value}>{value}</label> */}
                <input className={Styles.form__sect__switch} type="checkbox" name="accept-cookie" id={"accept-cookie"}
                  checked={cookieConsent}
                  // @ts-ignore
                  onChange={e => setCookieConsent(old => !old)}
                />
              </div>
        </form>

      {/* <Link href="/" className="btn">Go back</Link> */}
      </div>

    </main>
  );
}

export default SettingsPage;
