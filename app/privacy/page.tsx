import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How THE DYOR DEPARTMENT handles local audit archives, public result URLs, external fonts and basic hosting requests.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "01 / WHAT THIS SITE IS",
    paragraphs: [
      "THE DYOR DEPARTMENT is a satirical entertainment website. It does not offer financial services, accounts, paid products, token sales, wallet connections or trading functionality.",
      "This notice describes the application's current behaviour. It is an operational transparency statement, not confirmation of legal compliance in every jurisdiction.",
    ],
  },
  {
    title: "02 / ACCOUNTS AND SUBMISSIONS",
    paragraphs: [
      "The site does not ask visitors to register an account, provide an email address, connect a wallet, upload documents or submit a real project for review. Its interactive experiences run from choices selected in the visitor's browser.",
      "Do not enter personal, confidential or commercially sensitive information as a project designation. Roadmap Generator and Whitepaper Factory place the sanitized project label in a shareable URL.",
    ],
  },
  {
    title: "03 / LOCAL AUDIT ARCHIVE",
    paragraphs: [
      "The DYOR Audit offers an optional archive of up to five result files in the visitor's browser using localStorage. A saved record contains the audit version, selected answer indexes and the time it was saved. The archive is not uploaded to an application database and is not synchronized across devices.",
      "Visitors can open or delete individual saved cases from the Audit interface. Clearing this site's stored data in the browser also removes the local archive. If local storage is unavailable, the Audit can still be completed without saving.",
    ],
  },
  {
    title: "04 / PUBLIC RESULT LINKS",
    paragraphs: [
      "Audit, Simulator, Utility Inspector, Roadmap Generator and Whitepaper Factory can create shareable URLs. These URLs encode the choices needed to reconstruct the fictional result. Roadmap Generator and Whitepaper Factory URLs also contain the sanitized project label.",
      "Anyone who receives a public case link can view the corresponding result. Links may remain in browser history, messages, social posts and hosting request records. The site does not maintain a private account that can revoke a copied link. Do not include personal or confidential details in a project label.",
    ],
  },
  {
    title: "05 / HOSTING AND THIRD-PARTY REQUESTS",
    paragraphs: [
      "The site is hosted on Vercel. As with other hosted websites, the hosting provider may process technical request information such as IP address, requested path, browser information and operational or security logs to deliver and protect the service. Log handling and retention are governed by the provider's own terms and privacy documentation; this application does not control those systems.",
      "The current stylesheet imports fonts from Google Fonts. A visitor's browser may contact Google Fonts to retrieve the font stylesheet and font files. This is a third-party network request made to render the site's typography.",
      "When a visitor chooses a 'Post to X' or 'Share on X' action, the browser opens an X intent URL containing the prepared post text and case link. The visitor decides whether to submit the post. The site does not embed an X tracking pixel.",
    ],
  },
  {
    title: "06 / COOKIES, ANALYTICS AND TRACKING",
    paragraphs: [
      "The application code does not intentionally set cookies for advertising, analytics or behavioural profiling. It does not include an application analytics dashboard, advertising pixels or cross-site tracking scripts.",
      "The optional Audit archive uses browser localStorage, which is different from a cookie. The hosting platform and any third-party services contacted by the browser may apply their own technical storage or processing under their own policies.",
    ],
  },
  {
    title: "07 / RETENTION AND CONTROL",
    paragraphs: [
      "The optional Audit archive remains in the visitor's browser until an individual case is deleted or the browser's site data is cleared. Public case information is encoded in the URL rather than stored in an application account. Copies of a URL shared elsewhere cannot be recalled by this site.",
      "Operational hosting logs, font requests and external share services are controlled by their respective providers. Their retention periods cannot be configured or verified by this application.",
    ],
  },
  {
    title: "08 / OPERATOR CONTACT",
    paragraphs: [
      "The legal identity and a dedicated contact channel for the site operator have not been supplied in this release. They must be added by the operator before this notice is treated as a complete statutory privacy notice or used as legal assurance.",
      "This page is dated 19 November 2026 and should be reviewed whenever application behaviour, providers or data flows change.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="audit-page legal-page" id="main-content">
      <DepartmentHeader statusMessage="PRIVACY / OPERATIONAL TRANSPARENCY" ctaHref="/" ctaLabel="BACK TO HQ" />
      <article className="legal-document shell" id="content-start" tabIndex={-1}>
        <div className="legal-document__meta"><span>THE DYOR DEPARTMENT / POLICY FILE</span><span>LAST REVIEWED / 19 NOV 2026</span></div>
        <p className="eyebrow">DEPARTMENT OF DATA MINIMIZATION</p>
        <h1>PRIVACY<br /><span>NOTICE.</span></h1>
        <p className="legal-document__lead">We built a department for questionable research. We do not need your identity to do it.</p>
        <div className="legal-document__notice">
          <strong>AT A GLANCE</strong>
          <p>No visitor accounts. No wallet connection. No app analytics or advertising pixels. One optional local Audit archive. Shareable case URLs are public to anyone who has the link.</p>
        </div>
        {sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <div className="legal-document__actions">
          <Link className="button button--quiet" href="/terms">READ TERMS & ENTERTAINMENT DISCLAIMER ↗</Link>
          <Link className="button button--quiet" href="/">RETURN TO THE DEPARTMENT ↗</Link>
        </div>
      </article>
      <DepartmentFooter message={["WE TAKE YOUR PRIVACY SERIOUSLY.", "THE MARKET, HOWEVER, REMAINS UNDER NO OBLIGATION."]} />
    </main>
  );
}
