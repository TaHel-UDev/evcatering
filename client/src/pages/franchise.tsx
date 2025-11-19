import FAbleToWorkBlock from "@/features/components/f-able-to-work-block/f-able-to-work-block";
import FAboutBlock from "@/features/components/f-about-block/f-about-block";
import FAboutCateringBlock from "@/features/components/f-about-catering-block/f-about-catering-block";
import FBesidesBlock from "@/features/components/f-besides-block/f-besides-block";
import FBrandBlock from "@/features/components/f-brand-block/f-brand-block";
import FConditionsBlock from "@/features/components/f-conditions-block/f-conditions-block";
import FFirstScreen from "@/features/components/f-first-screen/f-first-screen";
import FInvestmentBlock from "@/features/components/f-investment-block/f-investment-block";
import FOurFranchiseBlock from "@/features/components/f-our-franchise-block/f-our-franchise-block";
import FPartnersBlock from "@/features/components/f-partners-block/f-partners-block";
import FProspectsBlock from "@/features/components/f-prospects-block/f-prospects-block";
import FValuesBlock from "@/features/components/f-values-block/f-values-block";
import WhatGetBlock from "@/features/components/f-what-get-block/f-what-get-block";
import FWhoSuitableBlock from "@/features/components/f-who-suitable-block/f-who-suitable-block";
import FFooterBlock from "@/features/components/footer-block/f-footer-block";
import { ConditionsBlockProps, FAbleToWorkBlockProps, FAboutBlockProps, FAboutCateringBlockProps, FBesidesBlockProps, FBrandBlockProps, FFooterBlockProps, FInvestmentBlockProps, FMainScreen, FOurFranchiseBlockProps, FPartnersBlockProps, FProspectsBlockProps, FValuesBlockProps, WhatGetBlockProps, WhoSuitableBlockProps } from "@/features/shared/types";
import { createDirectus, readItems, rest } from "@directus/sdk";
import Head from "next/head";

export default function Franchise
    (
        {
            FMainScreenData,
            FAboutBlockData,
            FOurFranchiseBlockData,
            WhatGetBlockData,
            ConditionsBlockData,
            FInvestmentBlockData,
            FProspectsBlockData,
            FBesidesBlockData,
            FAbleToWorkBlockData,
            WhoSuitableBlockData,
            FBrandBlockData,
            FValuesBlockData,
            FAboutCateringBlockData,
            FPartnersBlockData,
            FFooterBlockData,
        }:
            {
                FMainScreenData: FMainScreen,
                FAboutBlockData: FAboutBlockProps
                FOurFranchiseBlockData: FOurFranchiseBlockProps,
                WhatGetBlockData: WhatGetBlockProps,
                ConditionsBlockData: ConditionsBlockProps,
                FInvestmentBlockData: FInvestmentBlockProps,
                FProspectsBlockData: FProspectsBlockProps,
                FBesidesBlockData: FBesidesBlockProps,
                FAbleToWorkBlockData: FAbleToWorkBlockProps,
                WhoSuitableBlockData: WhoSuitableBlockProps,
                FBrandBlockData: FBrandBlockProps,
                FValuesBlockData: FValuesBlockProps,
                FAboutCateringBlockData: FAboutCateringBlockProps,
                FPartnersBlockData: FPartnersBlockProps,
                FFooterBlockData: FFooterBlockProps,
            }
    ) {
    return (
        <>
            <Head>
                <title>
                    Эстетика Вкуса - Франшиза
                </title>
                <meta name="description" content="Эстетика Вкуса - Франшиза" />
                <meta property="og:title" content="Эстетика Вкуса - Франшиза" />
                <meta property="og:description" content="Эстетика Вкуса - Франшиза" />
            </Head>

            <FFirstScreen
                FMainScreenData={FMainScreenData}
            />

            <FAboutBlock
                FAboutData={FAboutBlockData}
            />

            <FOurFranchiseBlock
                FOurFranchiseBlockData={FOurFranchiseBlockData}
                email={FFooterBlockData.mail}
            />

            <WhatGetBlock
                WhatGetBlockData={WhatGetBlockData}
                email={FFooterBlockData.mail}
            />

            <FConditionsBlock
                ConditionsBlockData={ConditionsBlockData}
            />

            <FInvestmentBlock
                FInvestmentBlockData={FInvestmentBlockData}
                email={FFooterBlockData.mail}
            />

            <FProspectsBlock
                FProspectsBlockData={FProspectsBlockData}
                email={FFooterBlockData.mail}
            />

            <FBesidesBlock
                FBesidesBlockData={FBesidesBlockData}
                email={FFooterBlockData.mail}
            />

            <FAbleToWorkBlock
                FAbleToWorkBlockData={FAbleToWorkBlockData}
                email={FFooterBlockData.mail}
            />

            <FWhoSuitableBlock
                WhoSuitableBlockData={WhoSuitableBlockData}
                email={FFooterBlockData.mail}
            />

            <FBrandBlock
                FBrandBlockData={FBrandBlockData}
                email={FFooterBlockData.mail}
            />

            <FValuesBlock
                FValuesBlockData={FValuesBlockData}
            />

            <FAboutCateringBlock
                FAboutCateringBlockData={FAboutCateringBlockData}
            />

            <FPartnersBlock
                FPartnersBlockData={FPartnersBlockData}
            />

            <FFooterBlock
                FFooterBlockData={FFooterBlockData}
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

        const ConditionsBlockResult = await directus.request(readItems('conditions_block', {
            fields: ['*.*.*'],
        }));
        const ConditionsBlockData = Array.isArray(ConditionsBlockResult) ? ConditionsBlockResult[0] : ConditionsBlockResult

        const FInvestmentBlockResult = await directus.request(readItems('f_investment_block', {
            fields: ['*.*.*'],
        }));
        const FInvestmentBlockData = Array.isArray(FInvestmentBlockResult) ? FInvestmentBlockResult[0] : FInvestmentBlockResult

        const FProspectsBlockResult = await directus.request(readItems('f_prospects_block', {
            fields: ['*.*.*'],
        }));
        const FProspectsBlockData = Array.isArray(FProspectsBlockResult) ? FProspectsBlockResult[0] : FProspectsBlockResult

        const FBesidesBlockResult = await directus.request(readItems('f_besides_block', {
            fields: ['*.*.*'],
        }));
        const FBesidesBlockData = Array.isArray(FBesidesBlockResult) ? FBesidesBlockResult[0] : FBesidesBlockResult

        const FAbleToWorkBlockResult = await directus.request(readItems('f_able_to_work_block', {
            fields: ['*.*.*'],
        }));
        const FAbleToWorkBlockData = Array.isArray(FAbleToWorkBlockResult) ? FAbleToWorkBlockResult[0] : FAbleToWorkBlockResult

        const WhoSuitableBlockResult = await directus.request(readItems('who_suitable_block', {
            fields: ['*.*.*'],
        }));
        const WhoSuitableBlockData = Array.isArray(WhoSuitableBlockResult) ? WhoSuitableBlockResult[0] : WhoSuitableBlockResult

        const FBrandBlockResult = await directus.request(readItems('f_brand_block', {
            fields: ['*.*.*'],
        }));
        const FBrandBlockData = Array.isArray(FBrandBlockResult) ? FBrandBlockResult[0] : FBrandBlockResult

        const FValuesBlockResult = await directus.request(readItems('f_values_block', {
            fields: ['*.*.*'],
        }));
        const FValuesBlockData = Array.isArray(FValuesBlockResult) ? FValuesBlockResult[0] : FValuesBlockResult

        const FAboutCateringBlockResult = await directus.request(readItems('f_about_catering_block', {
            fields: ['*.*.*'],
        }));
        const FAboutCateringBlockData = Array.isArray(FAboutCateringBlockResult) ? FAboutCateringBlockResult[0] : FAboutCateringBlockResult

        const FPartnersBlockResult = await directus.request(readItems('f_partners_block', {
            fields: ['*.*.*'],
        }));
        const FPartnersBlockData = Array.isArray(FPartnersBlockResult) ? FPartnersBlockResult[0] : FPartnersBlockResult

        const FFooterBlockResult = await directus.request(readItems('f_footer_block', {
            fields: ['*.*.*'],
        }));
        const FFooterBlockData = Array.isArray(FFooterBlockResult) ? FFooterBlockResult[0] : FFooterBlockResult


        return {
            props: {
                FMainScreenData,
                FAboutBlockData,
                FOurFranchiseBlockData,
                WhatGetBlockData,
                ConditionsBlockData,
                FInvestmentBlockData,
                FProspectsBlockData,
                FBesidesBlockData,
                FAbleToWorkBlockData,
                WhoSuitableBlockData,
                FBrandBlockData,
                FValuesBlockData,
                FAboutCateringBlockData,
                FPartnersBlockData,
                FFooterBlockData,
                franchiseEmail: FFooterBlockData.mail,
            }
        }
    } catch (error) {
        console.error('❌ Error fetching data from Directus:', error);
        throw error;
    }
}

