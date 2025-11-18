import FooterBlock from "@/features/components/footer-block/footer-block";
import { CityOption, MainPageMetaData, MapElementData } from "@/features/shared/types";
import { GeneralFooterBlockProps } from "@/features/shared/types/general-footer-block.types";
import { CaseData } from "@/features/shared/types/cases.types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Text from "@/features/shared/ui/text/text";
import Head from "next/head";
import Image from "next/image";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";
import CitySelectorModal from "@/features/components/city-selector/city-selector-modal";

export default function CasePage(
    {
        caseData,
        mapData,
        franchise,
        metaData,
        FilteredCities,
        GeneralFooterBlockData,
    }: {
        caseData: CaseData,
        mapData: MapElementData | null,
        franchise: any,
        metaData: MainPageMetaData,
        FilteredCities: CityOption[],
        GeneralFooterBlockData: GeneralFooterBlockProps
    }
) {
    return (
        <>
            <Head>
                <title>{metaData.title} - Кейс {caseData.name} - {franchise?.name}</title>
                <meta name="description" content={metaData.description} />
                <meta name="keywords" content={metaData.keywords} />
                <meta property="og:title" content={`${metaData.title} - Кейс ${caseData.name} - ${franchise?.name}`} />
                <meta property="og:description" content={metaData.description} />
            </Head>

            <CitySelectorModal />

            <div className="pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)]">

                <BlockWrapper>
                    <div className="flex flex-col gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                        <Text as="h1" variant="h1">
                            {caseData.name}
                        </Text>

                        <div className="flex flex-col gap-[2rem] bg-soft-gray rounded-[0.625rem] p-[1.25rem] lg:p-[1.5rem] 2xl:p-[1.8rem]">

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                                <div className="col-span-1">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${caseData.preview.id}`}
                                        alt={caseData.name}
                                        width={530}
                                        height={358}
                                        quality={100}
                                        className="w-full object-cover min-h-[358px] rounded-[0.625rem]"
                                    />
                                </div>

                                <div className="col-span-1 flex flex-col gap-[1rem]">
                                    <Text as="h2" variant="h2">
                                        Задача
                                    </Text>
                                    <div
                                        className="advice_content"
                                        dangerouslySetInnerHTML={{ __html: caseData.task_content }}
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                                <div className="col-span-1 flex flex-col gap-[1rem]">
                                    <Text as="h2" variant="h2">
                                        Решение
                                    </Text>
                                    <div
                                        className="advice_content"
                                        dangerouslySetInnerHTML={{ __html: caseData.decision_content }}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${caseData.decision_image.id}`}
                                        alt={caseData.name}
                                        width={530}
                                        height={358}
                                        quality={100}
                                        className="w-full object-cover min-h-[358px] rounded-[0.625rem]"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </BlockWrapper>

            </div>

            <QuestionFormBlock mapData={mapData} />

            <FooterBlock 
                cities={FilteredCities}
                GeneralFooterBlockData={GeneralFooterBlockData}
            />
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
                fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address'],
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

            console.log('✅ Франчайзи найден:', franchise?.name, 'ID:', franchise?.id);
        }

        // Глобальные данные (одинаковые для всех франчайзи)
        const metaDataResult = await directus.request(readItems('main_page'));
        const metaData = Array.isArray(metaDataResult) ? metaDataResult[0] : metaDataResult;

        const GeneralFooterBlockResult = await directus.request(readItems('general_footer_block', {
            fields: ['*.*.*'],
        }));
        const GeneralFooterBlockData = Array.isArray(GeneralFooterBlockResult) ? GeneralFooterBlockResult[0] : GeneralFooterBlockResult;

        if (!metaData) {
            console.error('❌ Критические данные отсутствуют!');
            throw new Error('Missing required data from Directus');
        }

        // Получаем ID кейса из URL
        const caseId = context.params.id;

        // Загружаем ОДИН конкретный кейс по ID
        const caseDataResult = await directus.request(readItems('case', {
            fields: ['*.*.*'],
            filter: {
                id: { _eq: caseId },
                franchise_id: { _eq: franchise?.id || null }
            },
            limit: 1
        }));
        const caseData = Array.isArray(caseDataResult) ? caseDataResult[0] : caseDataResult;

        // Если кейс не найден - 404
        if (!caseData) {
            return { notFound: true };
        }

        // Проверяем наличие кейсов, площадок и отзывов для навигации
        const casesCountResult = await directus.request(readItems('case', {
            fields: ['id'],
            filter: {
                franchise_id: { _eq: franchise?.id || null }
            },
            limit: 1
        }));
        const hasCases = Array.isArray(casesCountResult) && casesCountResult.length > 0;

        const placesDataResult = await directus.request(readItems('places', {
            fields: ['id'],
            filter: {
                franchise_id: { _eq: franchise?.id || null }
            },
            limit: 1
        }));
        const hasPlaces = Array.isArray(placesDataResult) && placesDataResult.length > 0;

        const reviewsDataResult = await directus.request(readItems('review_block', {
            fields: ['id'],
            filter: {
                franchise_id: { _eq: franchise?.id || null }
            },
            limit: 1
        }));
        const hasReviews = Array.isArray(reviewsDataResult) && reviewsDataResult.length > 0;

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
                caseData,
                mapData: mapData || null,
                franchise,
                cities,
                FilteredCities,
                isMainPage,
                hasCases,
                hasPlaces,
                hasReviews,
                GeneralFooterBlockData,
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}