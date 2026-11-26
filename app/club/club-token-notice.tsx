import { CLUB_TOKEN_ANNOUNCEMENT, isOfficialClubTokenLink } from "./club-token-config";

type ClubTokenNoticeProps = {
  placement: "home" | "club";
};

function DetailValue({ value, fallback }: { value: string | null; fallback: string }) {
  return <strong>{value?.trim() || fallback}</strong>;
}

export default function ClubTokenNotice({ placement }: ClubTokenNoticeProps) {
  const announcement = CLUB_TOKEN_ANNOUNCEMENT;
  const hasTicker = Boolean(announcement.ticker?.trim());
  const hasNetwork = Boolean(announcement.network?.trim());
  const hasContract = Boolean(announcement.contractAddress?.trim());
  const hasMarketLink = isOfficialClubTokenLink(announcement.marketUrl);
  const hasExplorerLink = isOfficialClubTokenLink(announcement.explorerUrl);
  const hasPublishedDetails = hasTicker && hasNetwork && hasContract && hasMarketLink && hasExplorerLink;
  const titleId = "club-token-notice-title-" + placement;

  return (
    <section
      className={"club-token-notice club-token-notice--" + placement}
      aria-labelledby={titleId}
    >
      <header className="club-token-notice__header">
        <div>
          <span>THE 99% CLUB / OFFICIAL TOKEN NOTICE</span>
          <h2 id={titleId}>THE TOKEN <em>STATUS.</em></h2>
        </div>
        <span className={"club-token-notice__status" + (hasPublishedDetails ? " is-published" : "")} role="status">
          <i aria-hidden="true" />
          {hasPublishedDetails ? "OFFICIAL DETAILS PUBLISHED" : announcement.status}
        </span>
      </header>

      <p className="club-token-notice__lead">
        A meme token associated with THE 99% CLUB is planned. It has not been announced or launched.
        Its ticker, network, contract address and official market links will be published here only
        after they are confirmed.
      </p>

      <div className="club-token-notice__details" aria-label="Official token information">
        <div><span>PROJECT</span><DetailValue value={announcement.projectName} fallback="THE 99% CLUB" /></div>
        <div><span>TICKER</span><DetailValue value={announcement.ticker} fallback="NOT ANNOUNCED" /></div>
        <div><span>NETWORK</span><DetailValue value={announcement.network} fallback="NOT CONFIRMED" /></div>
        <div className="club-token-notice__address"><span>CONTRACT ADDRESS</span><DetailValue value={announcement.contractAddress} fallback="NOT ISSUED" /></div>
        <div>
          <span>MARKET / DEX</span>
          {hasMarketLink
            ? <a href={announcement.marketUrl!} target="_blank" rel="noopener noreferrer">OPEN OFFICIAL MARKET ↗</a>
            : <strong>NOT LIVE</strong>}
        </div>
        <div>
          <span>BLOCK EXPLORER</span>
          {hasExplorerLink
            ? <a href={announcement.explorerUrl!} target="_blank" rel="noopener noreferrer">VIEW CONTRACT ↗</a>
            : <strong>NOT AVAILABLE</strong>}
        </div>
      </div>

      <div className="club-token-notice__warning">
        <strong>ANTI-SCAM NOTICE / READ BEFORE YOU CONNECT</strong>
        <p>
          The token is planned, but no ticker, network, contract address or official market link has
          been announced. Until those details appear in this notice, unrelated tokens, copied tickers,
          unsolicited messages and external links are not verified as connected to the Club.
          This site currently offers no wallet connection, presale, purchase or claim function.
        </p>
      </div>
    </section>
  );
}
