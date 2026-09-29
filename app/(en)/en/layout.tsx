import "@/app/globals.css";
import { rootMetadata, Shell } from "@/views/Shell";

export const metadata = rootMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
