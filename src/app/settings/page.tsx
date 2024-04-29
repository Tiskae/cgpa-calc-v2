import Styles from "./settings.module.scss";

function SettingsPage() {
  return (
    <main className={Styles.page}>
      <div className={Styles.container}>
        <h2 className={Styles.heading}>Settings</h2>
        <ul>
          <li>CGPA Scale: 4 / 5 / 7</li>
          <li>Save your data for next time: True / False</li>
          <li>Theme: Light / Dark / System</li>
          <li>Analytics + Cookies Consent: Accept / Reject</li>
          <li>Report Issue</li>
        </ul>
      </div>
    </main>
  );
}

export default SettingsPage;
