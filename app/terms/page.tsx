import type { Metadata } from "next";
import InfoPage from "../info-page";

export const metadata: Metadata = {
  title: "Demo Terms | OfficeGuard",
  description: "Sample terms describing the OfficeGuard demonstration website.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="DEMO TERMS"
      title="A preview of the proposed product."
      introduction="These sample terms explain the purpose of this demonstration website. They are not a final customer contract or a promise of product availability."
    >
      <section>
        <h2>Website purpose</h2>
        <p>The site presents a proposed commercial offering. Dashboards, transfer flows, device records, and security events shown here are illustrative demonstrations.</p>
      </section>
      <section>
        <h2>Enquiries</h2>
        <p>Sending a demo request does not create an account, purchase, subscription, service agreement, or deployment commitment. Any pilot scope, price, support, and operating terms would be agreed separately.</p>
      </section>
      <section>
        <h2>Before public launch</h2>
        <p>Replace this sample page with reviewed terms that identify the actual business operator, jurisdiction, service scope, customer responsibilities, and support process.</p>
      </section>
    </InfoPage>
  );
}
