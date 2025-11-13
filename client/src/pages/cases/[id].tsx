import FooterBlock from "@/features/components/footer-block/footer-block";
import { CityOption } from "@/features/shared/types";
import { CaseData } from "@/features/shared/types/cases.types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Text from "@/features/shared/ui/text/text";
import Head from "next/head";
import Image from "next/image";

export default function CasePage(
    {
        caseData,
        franchise,
    }: {
        caseData: CaseData,
        franchise: any,
    }
) {
    return (
        <>
            <Head>
                <title>{caseData.name} - Кейс - {franchise?.name}</title>
            </Head>

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
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${caseData.preview.id}.png`}
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
                                        src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${caseData.decision_image.id}.png`}
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