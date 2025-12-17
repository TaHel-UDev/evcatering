import FooterBlock from "@/features/components/footer-block/footer-block";
import { CityOption, MainPageMetaData, PlacesData, MapElementData } from "@/features/shared/types";
import { GeneralFooterBlockProps } from "@/features/shared/types/general-footer-block.types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Text from "@/features/shared/ui/text/text";
import Head from "next/head";
import Image from "next/image";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";
import CitySelectorModal from "@/features/components/city-selector/city-selector-modal";
import { getDirectusClient, requestWithRetry } from "@/lib/directus";

export default function PlacePage(
    {
        placeData,
        mapData,
        franchise,
        metaData,
        FilteredCities,
        GeneralFooterBlockData,
    }: {
        placeData: PlacesData,
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
                <title>{metaData.title} - Площадка {placeData.name} - {franchise?.name}</title>
                <meta name="description" content={metaData.description} />
                <meta name="keywords" content={metaData.keywords} />
                <meta property="og:title" content={`${metaData.title} - Площадка ${placeData.name} - ${franchise?.name}`} />
                <meta property="og:description" content={metaData.description} />
            </Head>

            <CitySelectorModal />

            <div className="pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)]">

                <BlockWrapper>
                    <div className="flex flex-col gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                        <Text as="h1" variant="h1">
                            {placeData.name}
                        </Text>

                        <div className="flex flex-col gap-[2rem] bg-soft-gray rounded-[0.625rem] p-[1.25rem] lg:p-[1.5rem] 2xl:p-[1.8rem]">

                            <div className="w-full flex flex-col gap-[1rem]">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${placeData.banner.id}`}
                                    alt={placeData.name}
                                    width={1920}
                                    height={1080}
                                    quality={100}
                                    className="w-full object-cover rounded-[0.625rem]"
                                />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                                    <div className="col-span-1 bg-brown text-white rounded-[0.625rem] p-[1rem]">
                                        <Text as="p" variant="body-large" className="font-light text-white">
                                            {placeData.area.toString() + " м²"}
                                        </Text>
                                    </div>
                                    <div className="col-span-1 bg-brown text-white rounded-[0.625rem] p-[1rem]">
                                        <Text as="p" variant="body-large" className="font-light text-white">
                                            {placeData.capacity.toString() + " гостей"}
                                        </Text>
                                    </div>

                                </div>
                            </div>

                            <Text as="h4" variant="h4">
                                Адрес: {placeData.adress}
                            </Text>

                            <div
                                className="advice_content"
                                dangerouslySetInnerHTML={{ __html: placeData.full_description }}
                            />

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
        const placeId = context.params.id;
        const franchiseId = franchise?.id || null;

        const [
            metaDataResult,
            GeneralFooterBlockResult,
            placeDataResult,
            casesDataResult,
            placesCountResult,
            reviewsDataResult,
            mapDataResult
        ] = await Promise.all([
            requestWithRetry(directus, readItems<any, any, any>('main_page')),
            requestWithRetry(directus, readItems<any, any, any>('general_footer_block', { fields: ['*.*.*'] })),
            requestWithRetry(directus, readItems<any, any, any>('places', {
                fields: ['*.*.*'],
                filter: {
                    id: { _eq: placeId },
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
        const placeData = unwrap(placeDataResult);

        if (!metaData) {
            console.error('❌ Критические данные отсутствуют!');
            throw new Error('Missing required data from Directus');
        }

        if (!placeData) {
            return { notFound: true };
        }

        const hasCases = ensureArray(casesDataResult).length > 0;
        const hasPlaces = ensureArray(placesCountResult).length > 0;
        const hasReviews = ensureArray(reviewsDataResult).length > 0;
        const mapData = mapDataResult ? unwrap(mapDataResult) : null;

        return {
            props: {
                metaData,
                placeData,
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