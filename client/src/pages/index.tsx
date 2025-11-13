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
import { createDirectus, readItems, rest } from "@directus/sdk";
import { MainPageMetaData, FirstScreenData, MissionBlockData, WorkBlockData, ServiceFormatsBlockData } from "@/features/shared/types";
import Head from "next/head";

export default function Home
  (
    {
      metaData,
      firstScreenData,
      missionBlockData,
      workBlockData,
      serviceFormatsBlockData,
    }:
      {
        metaData: MainPageMetaData,
        firstScreenData: FirstScreenData,
        missionBlockData: MissionBlockData,
        workBlockData: WorkBlockData,
        serviceFormatsBlockData: ServiceFormatsBlockData,
      }
  ) {
  return (
    <>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
      </Head>

      <FirstMainScreen
        firstScreenData={firstScreenData}
      />

      <MissionBlock
        missionBlockData={missionBlockData}
        workBlockData={workBlockData}
      />

      <ServiceFormatsBlock
        serviceFormatsBlockData={serviceFormatsBlockData}
      />

      <DecideMenuBlock />

      <WhyUsBlock />

      <CasesBlock />

      <PlacesBlock />

      <ReviewBlock />

      <QuestionFormBlock />

      <FooterBlock />
    </>
  );
}

export async function getServerSideProps() {
  const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest())

  const metaData = await directus.request(readItems('main_page'));

  const firstScreenData = await directus.request(readItems('first_screen', {
    fields: ['*.*.*'],
  }));

  const missionBlockData = await directus.request(readItems('mission_block', {
    fields: ['*.*.*'],
  }));

  const workBlockData = await directus.request(readItems('work_block', {
    fields: ['*.*.*'],
  }));

  const serviceFormatsBlockDataResult = await directus.request(readItems('service_formats_block', {
    fields: ['*.*.*'],
  }));

  // Берем первый элемент из массива
  const serviceFormatsBlockData = serviceFormatsBlockDataResult[0];

  return { props: { metaData, firstScreenData, missionBlockData, workBlockData, serviceFormatsBlockData } }
}
