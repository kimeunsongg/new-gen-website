import AcademicsView from "@/views/AcademicsView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "academics");

export default function Page() {
  return <AcademicsView locale="ko" />;
}
