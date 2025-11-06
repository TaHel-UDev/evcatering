import { Geologica } from "next/font/google";
import Navigation from "@/features/components/navigation/navigation";

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={`${geologica.className} relative`}>
            <Navigation />
            {children}
        </main>
    )
}

export default MainLayout;