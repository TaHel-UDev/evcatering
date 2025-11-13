import Head from "next/head";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { CaseData, CityOption, MainPageMetaData } from "@/features/shared/types";
import CasesBlock from "@/features/components/cases-block/cases-block";
import FooterBlock from "@/features/components/footer-block/footer-block";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";

export default function CasesPage(
    {
        metaData,
        casesData,
        franchise,
        cities,
        isMainPage,
    }: {
        metaData: MainPageMetaData,
        casesData: CaseData[],
        franchise: any,
        cities: CityOption[],
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

            {/* <CitySelectorModal /> */}

            {casesData.length > 0 && (
                <div className="pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)]">
                    <CasesBlock casesData={casesData} />
                </div>
            )}

            <QuestionFormBlock />

            <FooterBlock />
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

        return {
            props: {
                metaData,
                casesData,
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