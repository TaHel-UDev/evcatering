import { Geologica } from "next/font/google";
import Navigation from "@/features/components/navigation/navigation";

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MainLayoutProps {
    children: React.ReactNode;
    hasCases?: boolean;
    hasPlaces?: boolean;
    hasReviews?: boolean;
}

function MainLayout({ children, hasCases = false, hasPlaces = false, hasReviews = false }: MainLayoutProps) {
    return (
        <main className={`${geologica.className} relative`}>
            <Navigation hasCases={hasCases} hasPlaces={hasPlaces} hasReviews={hasReviews} />
            {children}
        </main>
    )
}

export default MainLayout;