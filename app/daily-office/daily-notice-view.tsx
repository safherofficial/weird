import Link from "next/link";
import DailyNoticeActions from "./daily-notice-actions";
import { shiftUtcDate, type DailyNotice } from "./daily-engine";

type DailyNoticeViewProps = {
  notice: DailyNotice;
  isArchive?: boolean;
};

export default function DailyNoticeView({ notice, isArchive = false }: DailyNoticeViewProps) {
  const path = isArchive ? "/daily-office/archive/" + notice.issueDate : "/daily-office";
  const absoluteUrl = "https://weird-zeta.vercel.app" + path;
  const shareText = [
    "THE DYOR DEPARTMENT / DAILY DEPARTMENTAL ABSURDITY",
    notice.headline,
    notice.finding,
    notice.action,
    "Fictional daily notice / not current news or market data.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(absoluteUrl);
  const previousDate = shiftUtcDate(notice.issueDate, -1);

  return (
    <article className="daily-notice shell" id="content-start" tabIndex={-1}>
      <div className="daily-notice__meta">
        <span>DAILY DOCKET / {notice.docketNumber}</span>
        <span>ISSUE DATE / UTC {notice.issueDate}</span>
      </div>

      <div className="daily-notice__document">
        <div className="daily-notice__document-head">
          <span>THE DYOR DEPARTMENT / CENTRAL OFFICE</span>
          <strong>{notice.classification}</strong>
        </div>
        <p className="eyebrow">{notice.department}</p>
        <h1>{notice.headline}</h1>
        <p className="daily-notice__subject"><span>SUBJECT /</span> {notice.subject}</p>

        <div className="daily-notice__body">
          {notice.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>

        <div className="daily-notice__finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{notice.finding}</strong>
        </div>

        <div className="daily-notice__action">
          <span>RECOMMENDED ADMINISTRATIVE ACTION</span>
          <p>{notice.action}</p>
        </div>

        <div className="daily-notice__signature">
          <div>
            <span>AUTHORIZED BY</span>
            <strong>THE OFFICE OF DAILY ABSURDITY</strong>
          </div>
          <div className="daily-notice__stamp">FICTIONAL<br />NOTICE</div>
        </div>
      </div>

      <div className="daily-notice__related">
        <div>
          <span>RELATED DEPARTMENT</span>
          <Link href={notice.relatedHref}>{notice.relatedLabel} ↗</Link>
        </div>
        <Link href={"/daily-office/archive/" + previousDate}>PREVIOUS ISSUE / {previousDate} ↗</Link>
      </div>

      <DailyNoticeActions title={notice.headline} text={shareText} url={absoluteUrl} xIntent={xIntent} />

      <div className="daily-notice__method">
        <strong>EDITORIAL / DATA NOTICE</strong>
        <p>{notice.methodology}</p>
      </div>

      <p className="daily-notice__disclaimer">
        THE DAILY DEPARTMENTAL ABSURDITY is a fictional satire format. It does not report real news, real
        projects, real people, live market activity or current events. The template set rotates by UTC date
        and repeats. No user submissions or external feeds are used.
      </p>
    </article>
  );
}
