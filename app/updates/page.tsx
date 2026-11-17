import type { Metadata } from "next";
import InfoPage from "../info-page";

export const metadata: Metadata = {
  title: "Demo Updates | OfficeGuard",
  description: "Sample progress updates for the OfficeGuard commercial demonstration.",
};

export default function UpdatesPage() {
  return (
    <InfoPage
      eyebrow="DEMO UPDATES"
      title="Follow the OfficeGuard concept."
      introduction="This page is a sample updates channel. It gives the demo site a working destination without inventing external social profiles."
    >
      <section>
        <h2>Commercial preview</h2>
        <p>The current website includes illustrative transfer, policy, device health, and audit views. Visitors can explore these flows and submit a demo enquiry.</p>
      </section>
      <section>
        <h2>Next demonstration milestone</h2>
        <p>A future pilot would validate the proposed controls on real managed devices and replace illustrative claims with documented results.</p>
      </section>
    </InfoPage>
  );
}
