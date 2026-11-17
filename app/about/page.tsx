import type { Metadata } from "next";
import InfoPage from "../info-page";

export const metadata: Metadata = {
  title: "About OG Systems | OfficeGuard Demo",
  description: "A demo profile of the team and purpose behind the OfficeGuard commercial concept.",
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="ABOUT THE CONCEPT"
      title="Practical protection for everyday office work."
      introduction="OG Systems is the demo brand presenting OfficeGuard: a proposed platform for approved local file sharing, managed devices, and administrator visibility."
    >
      <section>
        <h2>What we are designing</h2>
        <p>OfficeGuard brings the employee transfer experience, device management, security policies, and audit activity into one proposed workflow for organizations with managed laptops.</p>
      </section>
      <section>
        <h2>How a customer engagement could work</h2>
        <p>A technical discussion would establish the current environment, confirm the required controls, define a pilot group, and agree on validation steps before any wider rollout.</p>
      </section>
      <section>
        <h2>Demo business profile</h2>
        <p>The address and telephone number shown on this site are fictional sample details. No named team members, customer relationships, or certifications are claimed in this demo.</p>
      </section>
    </InfoPage>
  );
}
