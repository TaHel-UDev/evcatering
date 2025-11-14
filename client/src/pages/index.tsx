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
import CitySelectorModal from "@/features/components/city-selector/city-selector-modal";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { MainPageMetaData, FirstScreenData, MissionBlockData, WorkBlockData, ServiceFormatsBlockData, CityOption, ChooseFormatBlockData, CaseData, PlacesData } from "@/features/shared/types";
import Head from "next/head";

export default function Home
  (
    {
      metaData,
      firstScreenData,
      missionBlockData,
      workBlockData,
      serviceFormatsBlockData,
      chooseFormatBlockData,
      casesData,
      placesData,
      franchise,
      cities,
      isMainPage,
    }:
      {
        metaData: MainPageMetaData,
        firstScreenData: FirstScreenData,
        missionBlockData: MissionBlockData,
        workBlockData: WorkBlockData,
        serviceFormatsBlockData: ServiceFormatsBlockData,
        chooseFormatBlockData: ChooseFormatBlockData,
        casesData: CaseData[],
        placesData: PlacesData[],
        franchise: any,
        cities: CityOption[],
        isMainPage: boolean,
      }
  ) {
  return (
    <>
      <Head>
        <title>{metaData.title} - {franchise?.name}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={`${metaData.title} - ${franchise?.name}`} />
        <meta property="og:description" content={metaData.description} />
      </Head>

      {/* Модальное окно выбора города */}
      <CitySelectorModal />

      <FirstMainScreen
        firstScreenData={firstScreenData}
      />

      <MissionBlock
        missionBlockData={missionBlockData}
        workBlockData={workBlockData}
      />

      <ServiceFormatsBlock
        serviceFormatsBlockData={serviceFormatsBlockData}
        chooseFormatBlockData={chooseFormatBlockData}
      />

      <DecideMenuBlock />

      <WhyUsBlock />

      {casesData.length > 0 && (
        <CasesBlock casesData={casesData} limit={3} />
      )}

      {placesData.length > 0 && (
        <PlacesBlock placesData={placesData} />
      )}

      <ReviewBlock />

      <QuestionFormBlock />

      <FooterBlock />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest())

    // Определяем франчайзи по поддомену
    const host = context.req.headers.host || '';
    const subdomain = host.split('.')[0]; // например: msk.yourdomain.com → msk

    // Получаем список всех франчайзи (городов)
    const citiesResult = await directus.request(readItems('franchises', {
      fields: ['id', 'name', 'subdomain'],
      sort: ['name']
    }));
    const cities: CityOption[] = (Array.isArray(citiesResult) ? citiesResult : [citiesResult]) as CityOption[];

    const isMainPage = subdomain === 'localhost' || !cities.some(city => city.subdomain === subdomain);

    let franchise = null;

    // Если это страница франчайзи - получаем его данные
    if (!isMainPage) {
      const franchiseResult = await directus.request(readItems('franchises', {
        filter: {
          subdomain: { _eq: subdomain }
        },
        limit: 1
      }));
      franchise = Array.isArray(franchiseResult) ? franchiseResult[0] : franchiseResult;

      if (!franchise) {
        console.error('❌ Франчайзи не найден для поддомена:', subdomain);
        return { notFound: true };
      }

      console.log('✅ Франчайзи найден:', franchise.name, 'ID:', franchise.id);
    }

    // Глобальные данные (одинаковые для всех франчайзи)
    const metaDataResult = await directus.request(readItems('main_page'));
    const metaData = Array.isArray(metaDataResult) ? metaDataResult[0] : metaDataResult;

    // Данные франчайзи с фильтрацией по franchise_id
    const firstScreenDataResult = await directus.request(readItems('first_screen', {
      fields: ['*.*.*'],
    }));
    const firstScreenData = Array.isArray(firstScreenDataResult) ? firstScreenDataResult[0] : firstScreenDataResult;

    const missionBlockDataResult = await directus.request(readItems('mission_block', {
      fields: ['*.*.*'],
    }));
    const missionBlockData = Array.isArray(missionBlockDataResult) ? missionBlockDataResult[0] : missionBlockDataResult;

    const workBlockDataResult = await directus.request(readItems('work_block', {
      fields: ['*.*.*'],
    }));
    const workBlockData = Array.isArray(workBlockDataResult) ? workBlockDataResult[0] : workBlockDataResult;

    const serviceFormatsBlockDataResult = await directus.request(readItems('service_formats_block', {
      fields: ['*.*.*'],
    }));
    const serviceFormatsBlockData = Array.isArray(serviceFormatsBlockDataResult) ? serviceFormatsBlockDataResult[0] : serviceFormatsBlockDataResult;

    const chooseFormatBlockDataResult = await directus.request(readItems('choose_format_block', {
      fields: ['*.*.*'],
    }));
    const chooseFormatBlockData = Array.isArray(chooseFormatBlockDataResult) ? chooseFormatBlockDataResult[0] : chooseFormatBlockDataResult;

    if (!metaData) {
      console.error('❌ Критические данные отсутствуют!');
      throw new Error('Missing required data from Directus');
    }

    const casesDataResult = await directus.request(readItems('case', {
      fields: ['*.*.*'],
      filter: {
        franchise_id: { _eq: franchise?.id || null }
      }
    }));
    const casesData = Array.isArray(casesDataResult) ? casesDataResult : casesDataResult;

    const placesDataResult = await directus.request(readItems('places', {
      fields: ['*.*.*'],
      filter: {
        franchise_id: { _eq: franchise?.id || null }
      }
    }));
    const placesData = Array.isArray(placesDataResult) ? placesDataResult : placesDataResult;

    return {
      props: {
        metaData,
        firstScreenData,
        missionBlockData,
        workBlockData,
        serviceFormatsBlockData,
        chooseFormatBlockData,
        casesData,
        placesData,
        franchise,
        cities,
        isMainPage,
      }
    }
  } catch (error) {
    console.error('❌ Error fetching data from Directus:', error);
    throw error;
  }
}
