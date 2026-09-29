import FaqView from "@/views/FaqView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "faq");

export default function Page() {
  return <FaqView locale="ko" />;
}
