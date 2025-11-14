import clsx from "clsx"
import Image from "next/image"
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "../forms/question-form/question-form";
import { CityOption } from "@/features/shared/types";
import { formatPhoneForLink } from "@/features/shared/utils/phone";

function FooterBlock({ cities }: { cities: CityOption[] }) {

    if (cities.length === 0) {
        return null;
    }

    return (
        <footer id="contact-block" className={clsx(
            "relative bg-green overflow-hidden",
            "mt-[calc(42px+48px+56px)] lg:mt-[calc(42px+64px+56px)] xl:mt-[calc(42px+56px+64px)]",
        )}>
            <section
                className={clsx(
                    "xl:max-w-[1440px] mx-auto relative z-[2]",
                    "py-[48px] lg:py-[64px] xl:py-[80px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
                )}
            >
                <div className="flex flex-col gap-[2.6rem]">

                    <div className="flex flex-col md:flex-row gap-[1.5rem] justify-between md:items-center">

                        <div className="flex flex-col gap-[1.5rem] md:gap-[2rem]">
                            <Text as="p" variant="h3" className="text-white font-medium uppercase">
                                Звоните, <br />
                                мы все устроим!
                            </Text>

                            <Text as="p" variant="body-large" className="text-white font-light">
                                Если у Вас нет возможности позвонить нам, <br />
                                напишите прямо здесь, в форме обратной связи. <br />
                                Мы перезвоним Вам в ближайшее время.
                            </Text>

                            <Modal
                                trigger={<Button variant="white" size="md" className="w-fit">Оформить заявку</Button>}
                                title="Оформить заявку"
                                size="md"
                            >
                                <ModalBody>
                                    <QuestionForm />
                                </ModalBody>
                            </Modal>
                        </div>

                        <div className="flex flex-col gap-[2rem] md:gap-[2.6rem]">

                            <div className="flex flex-col gap-[1rem]">
                                <Text as="p" variant="h4" className="text-white md:text-end">
                                    {cities[0].name}
                                </Text>
                                <Text href={`tel:${formatPhoneForLink(cities[0].phone)}`} variant="body-large" className="text-white md:text-end">
                                    {cities[0].phone}
                                </Text>
                                <Text href={`mailto:${cities[0].mail}`} variant="body-large" className="text-white md:text-end">
                                    {cities[0].mail}
                                </Text>
                            </div>

                            <div className="flex flex-col gap-[1rem]">
                                <Text as="p" variant="h5" className="text-white md:text-end">
                                    Время работы:
                                </Text>
                                <Text as="p" variant="h4" className="text-white md:text-end">
                                    {cities[0].open_time}
                                </Text>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col lg:flex-col gap-[1.5rem]">

                        <div className="flex flex-col lg:flex-row gap-[1.5rem] justify-between items-start">
                            <Text as="p" variant="body" className="text-white font-light">
                                Информация, представленная на сайте, не является публичной офертой.
                            </Text>
                            <Button variant="outline" size="md" className="text-white hover:text-green">
                                Стать франчайзи
                            </Button>
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
                                    {cities[0].address}
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

export default FooterBlock