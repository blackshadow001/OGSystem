import Link from "next/link";
import type { ReactNode } from "react";

type InfoPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  children: ReactNode;
};

export default function InfoPage({ eyebrow, title, introduction, children }: InfoPageProps) {
  return (
    <div className="info-site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="info-header">
        <div className="container info-header-inner">
          <Link className="info-brand" href="/" aria-label="OfficeGuard home">
            <span className="info-brand-mark" aria-hidden="true">OG</span>
            <span>OfficeGuard<small>BY OG SYSTEMS</small></span>
          </Link>
          <nav aria-label="Information pages">
            <Link href="/about">About</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/#contact" className="info-nav-cta">Request a demo</Link>
          </nav>
        </div>
      </header>
      <main className="info-main container" id="main">
        <p className="info-demo-label">DEMO WEBSITE · SAMPLE CONTENT</p>
        <p className="info-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="info-introduction">{introduction}</p>
        <div className="info-content">{children}</div>
        <div className="info-next-step">
          <div>
            <strong>Explore the OfficeGuard concept</strong>
            <p>Review the interactive preview or send a demo enquiry.</p>
          </div>
          <Link href="/#contact">Request a demo ↗</Link>
        </div>
      </main>
      <footer className="info-footer">
        <div className="container info-footer-inner">
          <span>© {new Date().getFullYear()} OG Systems · Demo business profile</span>
          <nav aria-label="Legal and company links">
            <Link href="/about">About</Link>
            <Link href="/updates">Updates</Link>
            <Link href="/privacy">Demo privacy notice</Link>
            <Link href="/terms">Demo terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
