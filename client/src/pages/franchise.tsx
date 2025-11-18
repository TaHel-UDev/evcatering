import FAboutBlock from "@/features/components/f-about-block/f-about-block";
import FFirstScreen from "@/features/components/f-first-screen/f-first-screen";
import FOurFranchiseBlock from "@/features/components/f-our-franchise-block/f-our-franchise-block";
import WhatGetBlock from "@/features/components/f-what-get-block/f-what-get-block";
import { FAboutBlockProps, FMainScreen, FOurFranchiseBlockProps, WhatGetBlockProps } from "@/features/shared/types";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Head from "next/head";

export default function Franchise
    (
        {
            FMainScreenData,
            FAboutBlockData,
            FOurFranchiseBlockData,
            WhatGetBlockData,
        }:
            {
                FMainScreenData: FMainScreen,
                FAboutBlockData: FAboutBlockProps
                FOurFranchiseBlockData: FOurFranchiseBlockProps,
                WhatGetBlockData: WhatGetBlockProps,
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

            <FOurFranchiseBlock
                FOurFranchiseBlockData={FOurFranchiseBlockData}
            />

            <WhatGetBlock
                WhatGetBlockData={WhatGetBlockData}
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

        const FOurFranchiseBlockResult = await directus.request(readItems('f_our_franchise_block', {
            fields: ['*.*.*'],
        }));
        const FOurFranchiseBlockData = Array.isArray(FOurFranchiseBlockResult) ? FOurFranchiseBlockResult[0] : FOurFranchiseBlockResult

        const WhatGetBlockResult = await directus.request(readItems('what_get_block', {
            fields: ['*.*.*'],
        }));
        const WhatGetBlockData = Array.isArray(WhatGetBlockResult) ? WhatGetBlockResult[0] : WhatGetBlockResult


        return {
            props: {
                FMainScreenData,
                FAboutBlockData,
                FOurFranchiseBlockData,
                WhatGetBlockData,
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}

