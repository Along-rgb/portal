import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { SystemGrid } from "@/components/system-grid";
import { systems } from "@/data/systems";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center px-4 pb-16 md:px-6">
        <Hero />
        <div className="w-full max-w-7xl">
          <SystemGrid systems={systems} />
        </div>
      </main>
      <Footer />
    </>
  );
}
