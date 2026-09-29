import { PrivacyView } from "@/views/LegalViews";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <PrivacyView locale="en" />;
}
