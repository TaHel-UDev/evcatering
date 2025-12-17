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
import { MainPageMetaData, FirstScreenData, MissionBlockData, WorkBlockData, ServiceFormatsBlockData, CityOption, ChooseFormatBlockData, CaseData, PlacesData, ReviewsData, MapElementData, DecideMenuBlockData, WhyUsBlockData, FoodExampleBlockData, AddColorsBlockProps } from "@/features/shared/types";
import Head from "next/head";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import AddColorsBlock from "@/features/components/add-colors-block/add-colors-block";
import { GeneralFooterBlockProps } from "@/features/shared/types/general-footer-block.types";
import { DirectusQuiz } from "@/lib/directus-quiz-transformer";
import { requestWithRetry, getDirectusClient } from "@/lib/directus";

export default function Home
  (
    {
      metaData,
      firstScreenData,
      missionBlockData,
      workBlockData,
      serviceFormatsBlockData,
      chooseFormatBlockData,
      decideMenuBlockData,
      foodExampleBlockData,
      whyUsBlockData,
      casesData,
      placesData,
      reviewsData,
      mapData,
      FilteredCities,
      franchise,
      cities,
      isMainPage,
      AddColorsBlockData,
      GeneralFooterBlockData,
      QuizData,
    }:
      {
        metaData: MainPageMetaData,
        firstScreenData: FirstScreenData,
        missionBlockData: MissionBlockData,
        workBlockData: WorkBlockData,
        serviceFormatsBlockData: ServiceFormatsBlockData,
        chooseFormatBlockData: ChooseFormatBlockData,
        decideMenuBlockData: DecideMenuBlockData,
        foodExampleBlockData: FoodExampleBlockData,
        whyUsBlockData: WhyUsBlockData,
        casesData: CaseData[],
        placesData: PlacesData[],
        reviewsData: ReviewsData[],
        mapData: MapElementData | null,
        FilteredCities: CityOption[],
        franchise: any,
        cities: CityOption[],
        isMainPage: boolean,
        AddColorsBlockData: AddColorsBlockProps,
        GeneralFooterBlockData: GeneralFooterBlockProps,
        QuizData: DirectusQuiz,
      }
  ) {
  return (
    <>
      <Head>
        <title>
          {metaData.title} {franchise?.name ? `- ${franchise?.name}` : ''}
        </title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={`${metaData.title} ${franchise?.name ? `- ${franchise?.name}` : ''}`} />
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
        QuizData={QuizData}
      />

      <DecideMenuBlock decideMenuBlockData={decideMenuBlockData} foodExampleBlockData={foodExampleBlockData} />

      <AddColorsBlock
        AddColorsBlockData={AddColorsBlockData}
      />

      <WhyUsBlock whyUsBlockData={whyUsBlockData} />

      {casesData.length > 0 && (
        <CasesBlock casesData={casesData} limit={3} />
      )}

      {placesData.length > 0 && (
        <PlacesBlock placesData={placesData} />
      )}

      {reviewsData.length > 0 && (
        <ReviewBlock reviewsData={reviewsData} />
      )}

      <QuestionFormBlock mapData={mapData} />

      <FooterBlock
        cities={FilteredCities}
        GeneralFooterBlockData={GeneralFooterBlockData}
      />
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const directus = getDirectusClient()

    // Определяем франчайзи по поддомену
    const host = context.req.headers.host || '';
    const subdomain = host.split('.')[0]; // например: msk.yourdomain.com → msk

    // Helper to unwrap single items
    const unwrap = (res: any) => Array.isArray(res) ? res[0] : res;

    // BATCH 1: Fetch Global Data, Cities, and Potential Franchise Data (in parallel)
    const [
      citiesResult,
      metaDataResult,
      firstScreenDataResult,
      missionBlockDataResult,
      workBlockDataResult,
      serviceFormatsBlockDataResult,
      chooseFormatBlockDataResult,
      decideMenuBlockDataResult,
      foodExampleBlockDataResult,
      whyUsBlockDataResult,
      AddColorsBlockResult,
      GeneralFooterBlockResult,
      QuizResult,
      franchisePotentialResult // Optimistically fetch franchise
    ] = await Promise.all([
      requestWithRetry(directus, readItems<any, any, any>('franchises', {
        fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address'],
        sort: ['name']
      })),
      requestWithRetry(directus, readItems<any, any, any>('main_page')),
      requestWithRetry(directus, readItems<any, any, any>('first_screen', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('mission_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('work_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('service_formats_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('choose_format_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('decide_menu_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('food_example_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('why_us_block', { fields: ['*.*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('add_colors_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('general_footer_block', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('quizzes', { fields: ['*.*.*'] })),
      requestWithRetry(directus, readItems<any, any, any>('franchises', {
        fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address', 'code'],
        filter: { subdomain: { _eq: subdomain } },
        limit: 1
      })),
    ]);

    const cities: CityOption[] = (Array.isArray(citiesResult) ? citiesResult : [citiesResult]) as CityOption[];
    const FilteredCities = cities.filter(city => city.subdomain === subdomain);
    const isMainPage = subdomain === 'localhost' || !cities.some(city => city.subdomain === subdomain);

    let franchise = null;
    if (!isMainPage) {
      franchise = unwrap(franchisePotentialResult);
      if (!franchise) {
        console.error('❌ Франчайзи не найден для поддомена:', subdomain);
        return { notFound: true };
      }
      console.log('✅ Франчайзи найден:', franchise?.name, 'ID:', franchise?.id);
    }

    const metaData = unwrap(metaDataResult);
    const firstScreenData = unwrap(firstScreenDataResult);
    const missionBlockData = unwrap(missionBlockDataResult);
    const workBlockData = unwrap(workBlockDataResult);
    const serviceFormatsBlockData = unwrap(serviceFormatsBlockDataResult);
    const chooseFormatBlockData = unwrap(chooseFormatBlockDataResult);
    const decideMenuBlockData = unwrap(decideMenuBlockDataResult);
    const foodExampleBlockData = unwrap(foodExampleBlockDataResult);
    const whyUsBlockData = unwrap(whyUsBlockDataResult);
    const AddColorsBlockData = unwrap(AddColorsBlockResult);
    const GeneralFooterBlockData = unwrap(GeneralFooterBlockResult);
    const QuizData = unwrap(QuizResult);

    if (!metaData) {
      console.error('❌ Критические данные отсутствуют!');
      throw new Error('Missing required data from Directus');
    }

    // BATCH 2: Franchise Dependent Data
    let casesData: any[] = [];
    let placesData: any[] = [];
    let reviewsData: any[] = [];
    let mapData = null;

    const franchiseId = franchise?.id || null;

    const [casesDataResult, placesDataResult, reviewsDataResult, mapDataResult] = await Promise.all([
      requestWithRetry(directus, readItems<any, any, any>('case', {
        fields: ['*.*.*'],
        filter: { franchise_id: { _eq: franchiseId } }
      })),
      requestWithRetry(directus, readItems<any, any, any>('places', {
        fields: ['*.*.*'],
        filter: { franchise_id: { _eq: franchiseId } }
      })),
      requestWithRetry(directus, readItems<any, any, any>('review_block', {
        fields: ['*.*.*'],
        filter: { franchise_id: { _eq: franchiseId } }
      })),
      franchise?.id ? requestWithRetry(directus, readItems<any, any, any>('map_element', {
        fields: ['*.*.*'],
        filter: { franchise_id: { _eq: franchise.id } },
        limit: 1
      })) : Promise.resolve(null)
    ]);

    casesData = Array.isArray(casesDataResult) ? casesDataResult : (casesDataResult ? [casesDataResult] : []);
    placesData = Array.isArray(placesDataResult) ? placesDataResult : (placesDataResult ? [placesDataResult] : []);
    reviewsData = Array.isArray(reviewsDataResult) ? reviewsDataResult : (reviewsDataResult ? [reviewsDataResult] : []);
    mapData = mapDataResult ? unwrap(mapDataResult) : null;

    // Проверяем наличие данных для навигации
    const hasCases = casesData && casesData.length > 0;
    const hasPlaces = placesData && placesData.length > 0;
    const hasReviews = reviewsData && reviewsData.length > 0;

    return {
      props: {
        metaData,
        firstScreenData,
        missionBlockData,
        workBlockData,
        serviceFormatsBlockData,
        chooseFormatBlockData,
        decideMenuBlockData,
        foodExampleBlockData,
        whyUsBlockData,
        casesData,
        placesData,
        reviewsData,
        mapData,
        franchise,
        cities,
        FilteredCities,
        isMainPage,
        hasCases,
        hasPlaces,
        hasReviews,
        AddColorsBlockData,
        GeneralFooterBlockData,
        QuizData,
      }
    }
  } catch (error) {
    console.error('❌ Error fetching data from Directus:', error);
    throw error;
  }
}
