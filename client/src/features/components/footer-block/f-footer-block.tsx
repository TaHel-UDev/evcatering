import clsx from "clsx"
import Image from "next/image"
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { FFooterBlockProps } from "@/features/shared/types";
import { formatPhoneForLink } from "@/features/shared/utils/phone";
import { setAttr } from "@directus/visual-editing";
import FranchiseForm from "../forms/question-form/franchise-form";
import Link from "next/link";

function FFooterBlock({ FFooterBlockData }: { FFooterBlockData: FFooterBlockProps }) {

    return (
        <footer id="contact-block" className={clsx(
            "relative bg-green overflow-hidden",
            "mt-[calc(42px+48px+56px)] lg:mt-[calc(42px+64px+56px)] xl:mt-[calc(42px+56px+64px)]",
        )}
            data-directus={setAttr({
                collection: 'f_footer_block',
                item: FFooterBlockData.id,
                fields: 'title, subtitle, cta_button_text, city, phone, mail, time, adress',
                mode: 'drawer'
            })}
        >
            <section
                className={clsx(
                    "xl:max-w-[1440px] mx-auto relative z-[2]",
                    "py-[48px] lg:py-[64px] xl:py-[80px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
                )}
            >
                <div className="flex flex-col gap-[2.6rem]">

                    <div className="flex flex-col md:flex-row gap-[1.5rem] justify-between md:items-center">

                        <div className="flex flex-col gap-[1.5rem] md:gap-[2rem] max-w-[540px]">
                            <Text as="p" variant="h3" className="text-white font-medium uppercase">
                                {FFooterBlockData.title}
                            </Text>

                            <Text as="p" variant="body-large" className="text-white font-light">
                                {FFooterBlockData.subtitle}
                            </Text>

                            <Modal
                                trigger={<Button variant="white" size="md" className="w-fit">{FFooterBlockData.cta_button_text}</Button>}
                                title={FFooterBlockData.cta_button_text}
                                size="md"
                            >
                                <ModalBody>
                                    <FranchiseForm email={FFooterBlockData.mail} />
                                </ModalBody>
                            </Modal>
                        </div>

                        <div className="flex flex-col gap-[2rem] md:gap-[2.6rem]">

                            <div className="flex flex-col gap-[1rem]">
                                {FFooterBlockData.city &&
                                    <Text as="p" variant="h4" className="text-white md:text-end">
                                        {FFooterBlockData.city}
                                    </Text>
                                }
                                <Text href={`tel:${formatPhoneForLink(FFooterBlockData.phone)}`} variant="body-large" className="text-white md:text-end">
                                    {FFooterBlockData.phone}
                                </Text>
                                <Text href={`mailto:${FFooterBlockData.mail}`} variant="body-large" className="text-white md:text-end">
                                    {FFooterBlockData.mail}
                                </Text>
                            </div>

                            <div className="flex flex-col gap-[1rem]">
                                <Text as="p" variant="h5" className="text-white md:text-end">
                                    Время работы:
                                </Text>
                                <Text as="p" variant="h4" className="text-white md:text-end">
                                    {FFooterBlockData.time}
                                </Text>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col lg:flex-col gap-[1.5rem]">

                        <div className="flex flex-col lg:flex-row gap-[1.5rem] justify-between items-start">
                            <Text as="p" variant="body" className="text-white font-light">
                                Информация, представленная на сайте, не является публичной офертой.
                            </Text>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-[1.5rem] justify-between items-start">
                            <div className="flex flex-col gap-[0.75rem]">
                                <Text href="/" variant="body" className="text-white font-light underline">
                                    Политика конфиденциальности
                                </Text>
                                <Text href="/" variant="body" className="text-white font-light underline">
                                    Правовая информация
                                </Text>
                            </div>

                            <div className="flex flex-col gap-[0.75rem]">
                                <Text as="p" variant="body" className="text-white font-light">
                                    {FFooterBlockData.adress}
                                </Text>
                                <Text as="p" variant="body" className="text-white font-light">
                                    © Эстетика Вкуса
                                </Text>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[1] w-full h-full max-w-[1030px]">
                <Image
                    src={"/static/footer-bg.svg"}
                    alt=""
                    width={1030}
                    height={1026}
                    quality={100}
                    className="object-cover h-full w-full"
                />
            </div>
        </footer>
    )
}

export default FFooterBlock