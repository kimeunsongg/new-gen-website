import { PrivacyView } from "@/views/LegalViews";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "privacy");

export default function Page() {
  return <PrivacyView locale="ko" />;
}
