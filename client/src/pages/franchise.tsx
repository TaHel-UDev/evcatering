import FAboutBlock from "@/features/components/f-about-block/f-about-block";
import FFirstScreen from "@/features/components/f-first-screen/f-first-screen";
import { FAboutBlockProps, FMainScreen } from "@/features/shared/types";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Head from "next/head";

export default function Franchise
    (
        {
            FMainScreenData,
            FAboutBlockData,
        }:
            {
                FMainScreenData: FMainScreen,
                FAboutBlockData: FAboutBlockProps
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

            <FAboutBlock
                FAboutData={FAboutBlockData}
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

        const FAboutBlockResult = await directus.request(readItems('f_about_block', {
            fields: ['*.*.*'],
        }));
        const FAboutBlockData = Array.isArray(FAboutBlockResult) ? FAboutBlockResult[0] : FAboutBlockResult

        return {
            props: {
                FMainScreenData,
                FAboutBlockData,
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}

