import HomeView from "@/views/HomeView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("ko", "home");

export default function Page() {
  return <HomeView locale="ko" />;
}
