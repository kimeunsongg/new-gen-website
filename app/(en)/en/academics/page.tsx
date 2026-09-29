import AcademicsView from "@/views/AcademicsView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("en", "academics");

export default function Page() {
  return <AcademicsView locale="en" />;
}
