import HomeView from "@/views/HomeView";
import { pageMetadata } from "@/views/Shell";

export const metadata = pageMetadata("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
