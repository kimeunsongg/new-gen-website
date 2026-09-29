import { TermsView } from "@/views/LegalViews";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "terms");

export default function Page() {
  return <TermsView locale="ko" />;
}
