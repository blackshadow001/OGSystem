import type { Metadata } from "next";
import InfoPage from "../info-page";

export const metadata: Metadata = {
  title: "Demo Privacy Notice | OfficeGuard",
  description: "How the OfficeGuard demonstration site handles demo enquiry details.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="DEMO PRIVACY NOTICE"
      title="How demo enquiries are handled."
      introduction="This is a sample notice for the current demonstration site. It describes the present form behavior and must be replaced with a reviewed policy before a public commercial launch."
    >
      <section>
        <h2>Information submitted</h2>
        <p>The demo form asks for a name, work email, company, approximate laptop count, and an optional message. Please do not enter passwords, confidential documents, or other sensitive information.</p>
      </section>
      <section>
        <h2>Purpose and storage</h2>
        <p>The site uses these details to demonstrate a sales enquiry workflow. Submissions are written to a local file on the server. The demo does not send an email or automatically transfer the enquiry to a sales system.</p>
      </section>
      <section>
        <h2>Retention and access</h2>
        <p>There is no automatic deletion schedule in this demo. The site operator must manage access to the server file, exports, and deletion. A real launch needs an approved retention period and a verified contact for privacy requests.</p>
      </section>
      <section>
        <h2>External resources</h2>
        <p>The current design may request web fonts from an external font host. No advertising tracker or cookie preference system has been added to this demo.</p>
      </section>
    </InfoPage>
  );
}
