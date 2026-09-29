import { TermsView } from "@/views/LegalViews";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("en", "terms");

export default function Page() {
  return <TermsView locale="en" />;
}
