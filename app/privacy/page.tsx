import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How THE DYOR DEPARTMENT handles local archives and Passport progress, public result URLs, external fonts and basic hosting requests.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "01 / WHAT THIS SITE IS",
    paragraphs: [
      "THE DYOR DEPARTMENT is a satirical entertainment website. A meme token associated with THE 99% CLUB is confirmed but has not been announced or launched. The site currently offers no token sale, purchase, claim, wallet connection or trading functionality.",
      "This notice describes the application's current behaviour. It is an operational transparency statement, not confirmation of legal compliance in every jurisdiction.",
    ],
  },
  {
    title: "02 / ACCOUNTS AND SUBMISSIONS",
    paragraphs: [
      "The site does not ask visitors to register an account, provide an email address, connect a wallet, upload documents or submit a real project for review. Most interactive answers and result generation are handled in the visitor's browser; the shared Department Case Thread makes a separate same-origin request described below.",
      "Do not enter personal, confidential or commercially sensitive information as a project designation. The CTO Emergency Office roadmap and Exit Liquidity Department token dossier place the sanitized project label in a shareable URL.",
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
    title: "04 / DEPARTMENT PASSPORT",
    paragraphs: [
      "The optional Department Passport uses browser localStorage only after the visitor explicitly enables it. It records visited Department sections, UTC dates on which The Trenches Desk is opened, and which interactive experiences or collection records have been completed for local Stamps and Achievement Badges.",
      "Passport information is not uploaded to an application database, does not create an account or public profile, is not synchronized across devices and is not used for a leaderboard. The 99% Club Community Intelligence desk reads existing Club fields from this opted-in local Passport to show a personal on-device summary; it does not create additional records or transmit them. Visitors can delete the complete Passport from its page or clear this site's browser data. Existing Passport records are migrated in the browser to the current format while preserving their visit stamps and Trenches Desk streak; earlier visits are not converted into completion badges.",
    ],
  },
  {
    title: "05 / PUBLIC RESULT LINKS",
    paragraphs: [
      "The FOMO Control Unit Audit, Pump.fun Intelligence paper-market simulator, 100X Research Bureau inspection, CTO Emergency Office roadmap, Exit Liquidity Department token dossier, cross-chain 99% Club membership, Copium Administration personal calibration, Airdrop Entitlement Office interview, Bridge Incident Office interview and Governance Accountability Office interview can each create shareable URLs. These URLs encode the choices needed to reconstruct the fictional result. CTO Emergency Office and Exit Liquidity Department URLs also contain the sanitized project label; the other personal-result links encode answer selections only. The Bridge Incident Office case URL encodes only the seven selected answer indexes; it does not contain a wallet, transaction hash or transfer reference. The Governance Accountability Office case URL likewise encodes only the seven selected answer indexes; it does not contain a DAO, proposal or vote reference.",
      "Anyone who receives a public case link can view the corresponding result. Links may remain in browser history, messages, social posts and hosting request records. The site does not maintain a private account that can revoke a copied link. Do not include personal or confidential details in a project label.",
    ],
  },
  {
    title: "06 / HOSTING AND THIRD-PARTY REQUESTS",
    paragraphs: [
      "The site is hosted on Vercel. As with other hosted websites, the hosting provider may process technical request information such as IP address, requested path, browser information and operational or security logs to deliver and protect the service. Log handling and retention are governed by the provider's own terms and privacy documentation; this application does not control those systems. On Department pages, the browser also makes a same-origin GET request to `/api/department-case` with the current Department identifier. The endpoint uses that identifier and the current UTC date to return a fictional three-office case narrative. It does not receive the visitor's interactive answers or free-text submissions, and it does not write to an application database or create a visitor profile. The request itself remains ordinary hosted website traffic and may appear in the provider's technical logs described above.",
      "The page layout links to Google Fonts. A visitor's browser may contact Google Fonts to retrieve the font stylesheet and font files. This is a third-party network request made to render the site's typography.",
      "When a visitor chooses a 'Post to X' or 'Share on X' action, the browser opens an X intent URL containing the prepared post text and case link. The visitor decides whether to submit the post. The site does not embed an X tracking pixel.",
    ],
  },
  {
    title: "07 / COOKIES, ANALYTICS AND TRACKING",
    paragraphs: [
      "The application code does not intentionally set cookies for advertising, analytics or behavioural profiling. It does not include an application analytics dashboard, advertising pixels or cross-site tracking scripts.",
      "The optional Audit archive and Department Passport use browser localStorage, which is different from a cookie. Passport data is created only after explicit opt-in and remains on the visitor's device. The hosting platform and any third-party services contacted by the browser may apply their own technical storage or processing under their own policies.",
    ],
  },
  {
    title: "08 / RETENTION AND CONTROL",
    paragraphs: [
      "The optional Audit archive remains in the visitor's browser until an individual case is deleted or the browser's site data is cleared. The Department Passport remains there until it is deleted from its page or the browser's site data is cleared. Public case information is encoded in the URL rather than stored in an application account. Copies of a URL shared elsewhere cannot be recalled by this site.",
      "Operational hosting logs, font requests and external share services are controlled by their respective providers. Their retention periods cannot be configured or verified by this application.",
    ],
  },
  {
    title: "09 / OPERATOR CONTACT",
    paragraphs: [
      "The legal identity and a dedicated contact channel for the site operator have not been supplied in this release. They must be added by the operator before this notice is treated as a complete statutory privacy notice or used as legal assurance.",
      "This page was last reviewed on 25 November 2026. It should be reviewed whenever application behaviour, providers or data flows change.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="audit-page legal-page" id="main-content">
      <DepartmentHeader statusMessage="PRIVACY / OPERATIONAL TRANSPARENCY" ctaHref="/" ctaLabel="BACK TO HQ" />
      <article className="legal-document shell" id="content-start" tabIndex={-1}>
        <div className="legal-document__meta"><span>THE DYOR DEPARTMENT / POLICY FILE</span><span>LAST REVIEWED / 25 NOV 2026</span></div>
        <p className="eyebrow">DEPARTMENT OF DATA MINIMIZATION</p>
        <h1>PRIVACY<br /><span>NOTICE.</span></h1>
        <p className="legal-document__lead">We built a department for questionable research. We do not need your identity to do it.</p>
        <div className="legal-document__notice">
          <strong>AT A GLANCE</strong>
          <p>No visitor accounts. No wallet connection. No app analytics or advertising pixels. One optional local Audit archive and one optional local Passport. The Passport records visits and achievement progress only after opt-in. Shareable case URLs are public to anyone who has the link.</p>
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
