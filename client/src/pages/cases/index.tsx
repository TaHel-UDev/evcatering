import Head from "next/head";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { CaseData, CityOption, MainPageMetaData, MapElementData } from "@/features/shared/types";
import CasesBlock from "@/features/components/cases-block/cases-block";
import FooterBlock from "@/features/components/footer-block/footer-block";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";
import CitySelectorModal from "@/features/components/city-selector/city-selector-modal";

export default function CasesPage(
    {
        metaData,
        casesData,
        mapData,
        franchise,
        cities,
        FilteredCities,
        isMainPage,
    }: {
        metaData: MainPageMetaData,
        casesData: CaseData[],
        mapData: MapElementData | null,
        franchise: any,
        cities: CityOption[],
        FilteredCities: CityOption[],
        isMainPage: boolean,
    }
) {
    return (
        <>
            <Head>
                <title>{metaData.title} - Кейсы - {franchise?.name}</title>
                <meta name="description" content={metaData.description} />
                <meta name="keywords" content={metaData.keywords} />
                <meta property="og:title" content={`${metaData.title} - Кейсы - ${franchise?.name}`} />
                <meta property="og:description" content={metaData.description} />
            </Head>

            <CitySelectorModal />

            {casesData.length > 0 && (
                <div className="pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)]">
                    <CasesBlock casesData={casesData} withLink={false} />
                </div>
            )}

            <QuestionFormBlock mapData={mapData} />

            <FooterBlock cities={FilteredCities}/>
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest())

        // Определяем франчайзи по поддомену
        const host = context.req.headers.host || '';
        const subdomain = host.split('.')[0]; // например: msk.yourdomain.com → msk

        // Получаем список всех франчайзи (городов)
        const citiesResult = await directus.request(readItems('franchises', {
            fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address'],
            sort: ['name']
        }));
        const cities: CityOption[] = (Array.isArray(citiesResult) ? citiesResult : [citiesResult]) as CityOption[];

        const FilteredCities = cities.filter(city => city.subdomain === subdomain);

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

        if (!metaData) {
            console.error('❌ Критические данные отсутствуют!');
            throw new Error('Missing required data from Directus');
        }

        const casesDataResult = await directus.request(readItems('case', {
            fields: ['*.*.*'],
            filter: {
                franchise_id: { _eq: franchise?.id || null }
            },
            sort: ['-date']  // Новые кейсы первыми
        }));
        const casesData = Array.isArray(casesDataResult) ? casesDataResult : [];

        // Загружаем данные карты для франчайзи
        let mapData = null;
        if (franchise?.id) {
            const mapDataResult = await directus.request(readItems('map_element', {
                fields: ['*.*.*'],
                filter: {
                    franchise_id: { _eq: franchise.id }
                },
                limit: 1
            }));
            mapData = Array.isArray(mapDataResult) ? mapDataResult[0] : mapDataResult;
        }

        return {
            props: {
                metaData,
                casesData,
                mapData: mapData || null,
                franchise,
                cities,
                FilteredCities,
                isMainPage,
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}