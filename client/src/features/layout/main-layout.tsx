import { Geologica } from "next/font/google";
import Navigation from "@/features/components/navigation/navigation";
import { useRouter } from "next/router";
import Modal, { ModalBody } from "../shared/ui/modal";
import Button from "../shared/ui/button/button";
import FranchiseForm from "../components/forms/question-form/franchise-form";
import { Presentation } from "lucide-react";

const geologica = Geologica({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MainLayoutProps {
    children: React.ReactNode;
    hasCases?: boolean;
    hasPlaces?: boolean;
    hasReviews?: boolean;
    franchiseEmail?: string;
}

function MainLayout({ children, hasCases = false, hasPlaces = false, hasReviews = false, franchiseEmail }: MainLayoutProps) {
    const router = useRouter();

    return (
        <main className={`${geologica.className} relative`}>
            {router.pathname === "/franchise" && franchiseEmail &&
                <div className="flex flex-col gap-8 fixed bottom-[20px] right-[20px] z-[3]">


                    <div className="bg-soft-gray border border-green rounded-[0.75rem] p-4 flex flex-col gap-1">
                        <p className="text-sm font-bold">
                            Особенное предложение только в мае!
                        </p>

                        <p className="text-sm">
                            Скидка -40% на паушальный взнос
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Modal
                            trigger=
                            {
                                <div className="">
                                    <Button variant="secondary" size="md" fullWidth className="rounded-full animate-bounce transition-all duration-300 ease-in-out bg-dark hover:bg-dark/60 w-fit">
                                        <div className="flex flex-row gap-2 items-center w-fit">
                                            {/* <p className="mb-1 hidden lg:block">Задать вопрос</p> */}
                                            <Presentation size={20} />
                                        </div>
                                    </Button>
                                </div>
                            }
                            title={<>Получить презентацию <br /> и финмодель франшизы</>}
                            size="md"
                        >
                            <ModalBody>
                                <FranchiseForm email={franchiseEmail} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            }
            <Navigation hasCases={hasCases} hasPlaces={hasPlaces} hasReviews={hasReviews} />
            {children}
        </main>
    )
}

export default MainLayout;