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
import { MainPageMetaData, FirstScreenData, MissionBlockData, WorkBlockData, ServiceFormatsBlockData, CityOption } from "@/features/shared/types";
import Head from "next/head";

export default function Home
  (
    {
      metaData,
      firstScreenData,
      missionBlockData,
      workBlockData,
      serviceFormatsBlockData,
      franchise,
      cities,
      isMainPage,
    }:
      {
        metaData: MainPageMetaData,
        firstScreenData: FirstScreenData,
        missionBlockData: MissionBlockData,
        workBlockData: WorkBlockData,
        serviceFormatsBlockData: ServiceFormatsBlockData | null,
        franchise: any,
        cities: CityOption[],
        isMainPage: boolean,
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

      {/* Модальное окно выбора города */}
      <CitySelectorModal />

      <FirstMainScreen
        firstScreenData={firstScreenData}
      />

      <MissionBlock
        missionBlockData={missionBlockData}
        workBlockData={workBlockData}
      />

      {serviceFormatsBlockData && (
        <ServiceFormatsBlock
          serviceFormatsBlockData={serviceFormatsBlockData}
        />
      )}

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
    
    // Определяем, главная ли это страница (без поддомена франчайзи)
    // Если subdomain === 'localhost' или не найден в списке франчайзи - это главная
    const isMainPage = subdomain === 'localhost' || !cities.some(city => city.subdomain === subdomain);
    
    console.log('🏠 Тип страницы:', isMainPage ? 'ГЛАВНАЯ' : 'ФРАНЧАЙЗИ');
    console.log('🏢 Текущий поддомен:', subdomain);

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

    // Для главной страницы не загружаем данные франчайзи
    let serviceFormatsBlockData = null;
    if (!isMainPage && franchise) {
      const serviceFormatsBlockDataResult = await directus.request(readItems('service_formats_block', {
        fields: ['*.*.*'],
        filter: {
          franchise_id: { _eq: franchise.id }
        }
      }));
      serviceFormatsBlockData = Array.isArray(serviceFormatsBlockDataResult) ? serviceFormatsBlockDataResult[0] : serviceFormatsBlockDataResult;
    }

    // Логирование для отладки
    console.log('📊 Данные загружены:', {
      isMainPage,
      metaData: !!metaData,
      firstScreenData: !!firstScreenData,
      missionBlockData: !!missionBlockData,
      workBlockData: !!workBlockData,
      serviceFormatsBlockData: !!serviceFormatsBlockData,
      citiesCount: cities.length,
    });

    // Проверка обязательных данных
    if (!metaData || !firstScreenData || !missionBlockData || !workBlockData) {
      console.error('❌ Критические данные отсутствуют!');
      throw new Error('Missing required data from Directus');
    }

    // serviceFormatsBlockData необязателен - если нет, передаём null
    return { 
      props: { 
        metaData, 
        firstScreenData, 
        missionBlockData, 
        workBlockData, 
        serviceFormatsBlockData: serviceFormatsBlockData || null,
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
