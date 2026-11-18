import Link from "next/link";

type DepartmentFooterProps = {
  message: [string, string];
};

export default function DepartmentFooter({ message }: DepartmentFooterProps) {
  return (
    <footer className="site-footer shell">
      <Link className="brand brand--footer" href="/" aria-label="The DYOR Department home">
        <span className="brand__mark" aria-hidden="true">D.</span>
        <span className="brand__name">THE DYOR<br />DEPARTMENT</span>
      </Link>
      <p>{message.map((line) => <span key={line}>{line}</span>)}</p>
      <div className="site-footer__right">
        <span>NO TOKEN. NO UTILITY. NO FINANCIAL ADVICE.</span>
        <span>© THE DEPARTMENT — FOR ENTERTAINMENT ONLY</span>
      </div>
    </footer>
  );
}
