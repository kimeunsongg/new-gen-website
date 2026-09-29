import AboutView from "@/views/AboutView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "about");

export default function Page() {
  return <AboutView locale="ko" />;
}
