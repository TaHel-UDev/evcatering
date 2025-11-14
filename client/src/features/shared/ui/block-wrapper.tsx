import clsx from "clsx";

function BlockWrapper({ children, id=null }: { children: React.ReactNode, id?: string | null }) {
    return (
        <section
            id={id || undefined}
            className={clsx(
                "xl:max-w-[1440px] mx-auto",
                "pt-[48px] lg:pt-[64px] xl:pt-[80px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
            )}
        >
            {children}
        </section>
    )
}

export default BlockWrapper;