import Header from "@/components/Header";
import { Footer } from "@/components/RemainingSections";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <div className="portfolio-page"><Header /><main id="main-content">{children}</main><Footer /></div>;
}
