import Link from "next/link";
import { ChevronIcon, ImageIcon } from "./Icons";

export function PageHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="container page-header">
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  id,
  link,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  link?: { href: string; label: string };
  as?: "h2" | "h3";
}) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Tag id={id} className="section-title">
          {title}
        </Tag>
      </div>
      {link && (
        <Link href={link.href} className="text-link">
          {link.label}
          <ChevronIcon size={16} />
        </Link>
      )}
    </div>
  );
}

/** 소재 미수급 이미지 자리 */
export function ImageSlot({ label, ratio = "4 / 3", className = "" }: { label: string; ratio?: string; className?: string }) {
  return (
    <div className={`image-slot ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={`${label} (이미지 준비 중)`}>
      <ImageIcon />
      <span>{label}</span>
    </div>
  );
}

/** 클라이언트 입력이 필요한 문구 */
export function Pending({ children = "입력 필요" }: { children?: React.ReactNode }) {
  return <span className="pending">{children}</span>;
}
