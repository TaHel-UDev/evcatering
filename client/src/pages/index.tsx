import DecideMenuBlock from "@/features/components/decide-menu-block/decide-menu-block";
import MissionBlock from "@/features/components/mission-block/mission-block";
import ServiceFormatsBlock from "@/features/components/service-formats-block/service-formats-block";
import WhyUsBlock from "@/features/components/why-us-block/why-us-block";
import CasesBlock from "@/features/components/cases-block/cases-block";
import PlacesBlock from "@/features/components/places-block/places-block";
import ReviewBlock from "@/features/components/review-block/review-block";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";
import FirstMainScreen from "@/features/components/first-main-screen/first-main-screen";
import FooterBlock from "@/features/components/footer-block/footer-block";

export default function Home() {
  return (
    <>
      <FirstMainScreen />

      <MissionBlock />

      <ServiceFormatsBlock />

      <DecideMenuBlock />

      <WhyUsBlock />

      <CasesBlock />

      <PlacesBlock />

      <ReviewBlock />

      <QuestionFormBlock />

      <FooterBlock/>
    </>
  );
}
