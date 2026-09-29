import "@/app/globals.css";
import { rootMetadata, Shell } from "@/views/Shell";

export const metadata = rootMetadata("ko");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell locale="ko">{children}</Shell>;
}
