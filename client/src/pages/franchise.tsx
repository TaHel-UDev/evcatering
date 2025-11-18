import FFirstScreen from "@/features/components/f-first-screen/f-first-screen";
import { FMainScreen } from "@/features/shared/types";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Head from "next/head";

export default function Franchise
    (
        {
            FMainScreenData
        }:
            {
                FMainScreenData: FMainScreen
            }
    ) {
    return (
        <>
            <Head>
                <title>
                    Эстетика Вкуса - Франшиза
                </title>
                <meta name="description" content="Описание" />
                <meta name="keywords" content="Ключевые слова" />
                <meta property="og:title" content="Эстетика Вкуса - Франшиза" />
                <meta property="og:description" content="Описание" />
            </Head>

            <FFirstScreen
                FMainScreenData={FMainScreenData}
            />
        </>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const directus = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS || '').with(rest())

        const FMainScreenResult = await directus.request(readItems('f_main_screen', {
            fields: ['*.*.*'],
        }));
        const FMainScreenData = Array.isArray(FMainScreenResult) ? FMainScreenResult[0] : FMainScreenResult

        return {
            props: {
                FMainScreenData
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}

