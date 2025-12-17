import FooterBlock from "@/features/components/footer-block/footer-block";
import { CityOption, MainPageMetaData, MapElementData } from "@/features/shared/types";
import { GeneralFooterBlockProps } from "@/features/shared/types/general-footer-block.types";
import { CaseData } from "@/features/shared/types/cases.types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Text from "@/features/shared/ui/text/text";
import { getDirectusClient, requestWithRetry } from "@/lib/directus";
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
        const directus = getDirectusClient();

        // Определяем франчайзи по поддомену
        const host = context.req.headers.host || '';
        const subdomain = host.split('.')[0]; // например: msk.yourdomain.com → msk

        // Helper to unwrap single items
        const unwrap = (res: any) => Array.isArray(res) ? res[0] : res;
        const ensureArray = (res: any) => Array.isArray(res) ? res : (res ? [res] : []);

        // BATCH 1: Fetch Global Cities and Franchise (Parallel)
        const [citiesResult, franchiseResult] = await Promise.all([
            requestWithRetry(directus, readItems<any, any, any>('franchises', {
                fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address'],
                sort: ['name']
            })),
            subdomain !== 'localhost' ? requestWithRetry(directus, readItems<any, any, any>('franchises', {
                fields: ['id', 'name', 'subdomain', 'phone', 'mail', 'open_time', 'address'],
                filter: { subdomain: { _eq: subdomain } },
                limit: 1
            })) : Promise.resolve(null)
        ]);

        const cities: CityOption[] = ensureArray(citiesResult) as CityOption[];
        const FilteredCities = cities.filter(city => city.subdomain === subdomain);
        const isMainPage = subdomain === 'localhost' || !cities.some(city => city.subdomain === subdomain);

        let franchise = null;
        if (!isMainPage) {
            franchise = unwrap(franchiseResult);
            if (!franchise) {
                console.error('❌ Франчайзи не найден для поддомена:', subdomain);
                return { notFound: true };
            }
            console.log('✅ Франчайзи найден:', franchise?.name, 'ID:', franchise?.id);
        }

        // BATCH 2: Fetch Page Content (Parallel)
        const caseId = context.params.id;
        const franchiseId = franchise?.id || null;

        const [
            metaDataResult,
            GeneralFooterBlockResult,
            caseDataResult,
            casesCountResult,
            placesDataResult,
            reviewsDataResult,
            mapDataResult
        ] = await Promise.all([
            requestWithRetry(directus, readItems<any, any, any>('main_page')),
            requestWithRetry(directus, readItems<any, any, any>('general_footer_block', { fields: ['*.*.*'] })),
            requestWithRetry(directus, readItems<any, any, any>('case', {
                fields: ['*.*.*'],
                filter: {
                    id: { _eq: caseId },
                    franchise_id: { _eq: franchiseId }
                },
                limit: 1
            })),
            // Navigation checks
            requestWithRetry(directus, readItems<any, any, any>('case', {
                fields: ['id'],
                filter: { franchise_id: { _eq: franchiseId } },
                limit: 1
            })),
            requestWithRetry(directus, readItems<any, any, any>('places', {
                fields: ['id'],
                filter: { franchise_id: { _eq: franchiseId } },
                limit: 1
            })),
            requestWithRetry(directus, readItems<any, any, any>('review_block', {
                fields: ['id'],
                filter: { franchise_id: { _eq: franchiseId } },
                limit: 1
            })),
            // Map data
            franchise?.id ? requestWithRetry(directus, readItems<any, any, any>('map_element', {
                fields: ['*.*.*'],
                filter: { franchise_id: { _eq: franchise.id } },
                limit: 1
            })) : Promise.resolve(null)
        ]);

        const metaData = unwrap(metaDataResult);
        const GeneralFooterBlockData = unwrap(GeneralFooterBlockResult);
        const caseData = unwrap(caseDataResult);

        if (!metaData) {
            console.error('❌ Критические данные отсутствуют!');
            throw new Error('Missing required data from Directus');
        }

        if (!caseData) {
            return { notFound: true };
        }

        const hasCases = ensureArray(casesCountResult).length > 0;
        const hasPlaces = ensureArray(placesDataResult).length > 0;
        const hasReviews = ensureArray(reviewsDataResult).length > 0;
        const mapData = mapDataResult ? unwrap(mapDataResult) : null;

        return {
            props: {
                metaData,
                caseData,
                mapData,
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