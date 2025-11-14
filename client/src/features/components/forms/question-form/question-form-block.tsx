import BlockWrapper from "@/features/shared/ui/block-wrapper";
import QuestionForm from "./question-form";
import { Text } from "@/features/shared/ui/text";
import { createDirectus, readItems, rest } from "@directus/sdk";
import { CityOption, MapElementData } from "@/features/shared/types";

function QuestionFormBlock({ mapData }: { mapData?: MapElementData[] | null }) {
    return (
        <BlockWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className="col-span-1 p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-soft-gray rounded-[0.75rem]">
                    <div className="flex flex-col gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                        <Text as="p" variant="h3" className="text-dark font-medium">
                            Остались вопросы?
                        </Text>
                        <Text as="p" variant="body-large" className="text-dark">
                            Оставьте заявку - мы подготовим предложение за 1 час
                        </Text>
                    </div>

                    <QuestionForm />
                </div>

                {mapData && mapData.length > 0 && (
                    <div className="col-span-1">
                    <iframe
                        src={mapData[0].yandex_src}
                        width="613"
                        height="720"
                        frameBorder="0"
                        className="w-full h-[300px] lg:h-full rounded-[0.75rem]"
                        >
                        </iframe>
                    </div>
                )}

            </div>
        </BlockWrapper>
    )
}

export default QuestionFormBlock;

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

        const mapDataResult = await directus.request(readItems('review_block', {
            fields: ['*.*.*'],
            filter: {
                franchise_id: { _eq: franchise?.id || null }
            }
        }));
        const mapData = Array.isArray(mapDataResult) ? mapDataResult : mapDataResult;

        return {
            props: {
                mapData,
            }
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}