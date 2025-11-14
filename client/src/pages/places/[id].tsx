import FooterBlock from "@/features/components/footer-block/footer-block";
import { CityOption, MainPageMetaData, PlacesData, MapElementData } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Text from "@/features/shared/ui/text/text";
import Head from "next/head";
import Image from "next/image";
import QuestionFormBlock from "@/features/components/forms/question-form/question-form-block";
import CitySelectorModal from "@/features/components/city-selector/city-selector-modal";

export default function PlacePage(
    {
        placeData,
        mapData,
        franchise,
        metaData,
        FilteredCities,
    }: {
        placeData: PlacesData,
        mapData: MapElementData | null,
        franchise: any,
        metaData: MainPageMetaData,
        FilteredCities: CityOption[],
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

            console.log('✅ Франчайзи найден:', franchise.name, 'ID:', franchise.id);
        }

        // Глобальные данные (одинаковые для всех франчайзи)
        const metaDataResult = await directus.request(readItems('main_page'));
        const metaData = Array.isArray(metaDataResult) ? metaDataResult[0] : metaDataResult;

        if (!metaData) {
            console.error('❌ Критические данные отсутствуют!');
            throw new Error('Missing required data from Directus');
        }

        // Получаем ID кейса из URL
        const placeId = context.params.id;

        // Загружаем ОДИН конкретный кейс по ID
        const placeDataResult = await directus.request(readItems('places', {
            fields: ['*.*.*'],
            filter: {
                id: { _eq: placeId },
                franchise_id: { _eq: franchise?.id || null }
            },
            limit: 1
        }));
        const placeData = Array.isArray(placeDataResult) ? placeDataResult[0] : placeDataResult;

        // Если кейс не найден - 404
        if (!placeData) {
            return { notFound: true };
        }

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
                placeData,
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