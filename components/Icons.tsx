type P = { size?: number };

export function KakaoIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 3.2c-5.08 0-9.2 3.24-9.2 7.24 0 2.58 1.72 4.85 4.31 6.13l-.88 3.23c-.08.29.25.52.5.35l3.86-2.56c.46.06.93.09 1.41.09 5.08 0 9.2-3.24 9.2-7.24S17.08 3.2 12 3.2Z" />
    </svg>
  );
}

export function ChevronIcon({ size = 20, dir = "right" }: P & { dir?: "left" | "right" | "up" | "down" }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M9 5.5 15.5 12 9 18.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export function BlogIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M4 3.5h16A1.5 1.5 0 0 1 21.5 5v11a1.5 1.5 0 0 1-1.5 1.5h-5.3L12 20.6l-2.7-3.1H4A1.5 1.5 0 0 1 2.5 16V5A1.5 1.5 0 0 1 4 3.5Zm2.2 4.1v6.2h2.2c1.3 0 2.1-.7 2.1-1.7 0-.7-.4-1.2-1-1.4.5-.3.8-.7.8-1.3 0-1-.8-1.8-2-1.8H6.2Zm1.5 1.2h.7c.4 0 .6.2.6.6s-.2.6-.6.6h-.7V8.8Zm0 2.3h.8c.5 0 .7.3.7.6 0 .4-.3.7-.7.7h-.8v-1.3Zm5.1-3.5v6.2h1.5V7.6h-1.5Zm4.4 2a2.1 2.1 0 1 0 0 4.3 2.1 2.1 0 0 0 0-4.3Zm0 1.3a.8.8 0 1 1 0 1.7.8.8 0 0 1 0-1.7Z" />
    </svg>
  );
}

export function ImageIcon({ size = 24 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5" strokeLinejoin="round" />
    </svg>
  );
}
