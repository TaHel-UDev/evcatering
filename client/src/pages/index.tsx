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
      canEdit,
      franchise,
    }:
      {
        metaData: MainPageMetaData,
        firstScreenData: FirstScreenData,
        missionBlockData: MissionBlockData,
        workBlockData: WorkBlockData,
        serviceFormatsBlockData: ServiceFormatsBlockData,
        canEdit: boolean,
        franchise: any,
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
        canEdit={canEdit}
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

export async function getServerSideProps(context: any) {
  try {
    const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest())
    
    // Определяем франчайзи по поддомену
    const host = context.req.headers.host || '';
    const subdomain = host.split('.')[0]; // например: msk.yourdomain.com → msk
    
    console.log('🏢 Текущий франчайзи (subdomain):', subdomain);

    // Получаем данные франчайзи из Directus
    const franchiseResult = await directus.request(readItems('franchises', {
      filter: {
        subdomain: { _eq: subdomain }
      },
      limit: 1
    }));
    const franchise = Array.isArray(franchiseResult) ? franchiseResult[0] : franchiseResult;

    if (!franchise) {
      console.error('❌ Франчайзи не найден для поддомена:', subdomain);
      return { notFound: true };
    }

    console.log('✅ Франчайзи найден:', franchise.name, 'ID:', franchise.id);

    // Определяем права доступа пользователя (из query параметра или токена)
    // Visual Editor передаёт токен через query параметр
    const accessToken = context.query.access_token;
    const canEdit = !!accessToken; // Если есть токен - значит пользователь в Visual Editor
    
    console.log('🔐 Режим редактирования:', canEdit);

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
      filter: {
        franchise_id: { _eq: franchise.id }
      }
    }));
    const serviceFormatsBlockData = Array.isArray(serviceFormatsBlockDataResult) ? serviceFormatsBlockDataResult[0] : serviceFormatsBlockDataResult;

    // Логирование для отладки
    console.log('📊 Данные загружены:', {
      metaData: !!metaData,
      firstScreenData: !!firstScreenData,
      missionBlockData: !!missionBlockData,
      workBlockData: !!workBlockData,
      serviceFormatsBlockData: !!serviceFormatsBlockData,
      serviceFormatsBlockDataDetails: {
        id: serviceFormatsBlockData?.id,
        title: serviceFormatsBlockData?.title,
        formatsCount: serviceFormatsBlockData?.formats?.length,
      }
    });

    // Проверка на undefined данные
    if (!metaData || !firstScreenData || !missionBlockData || !workBlockData || !serviceFormatsBlockData) {
      console.error('❌ Некоторые данные отсутствуют!');
      throw new Error('Missing required data from Directus');
    }

    return { 
      props: { 
        metaData, 
        firstScreenData, 
        missionBlockData, 
        workBlockData, 
        serviceFormatsBlockData,
        canEdit, // Передаём флаг возможности редактирования
        franchise // Передаём данные франчайзи
      } 
    }
  } catch (error) {
    console.error('❌ Error fetching data from Directus:', error);
    throw error;
  }
}
