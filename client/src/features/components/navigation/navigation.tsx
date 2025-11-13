import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Text } from "@/features/shared/ui/text";
import { ChevronDown, Menu, X } from "lucide-react";
import Button from "@/features/shared/ui/button";
import { useState } from "react";
import Modal from "@/features/shared/ui/modal";
import { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "../forms/question-form/question-form";
import { useCitySelector } from "@/features/shared/context/city-selector-context";

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openModal, currentCity, isMainPage } = useCitySelector();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const menuItems = [
        { label: "Форматы", href: "/" },
        { label: "Меню", href: "/" },
        { label: "Почему мы?", href: "/" },
        { label: "Кейсы", href: "/" },
        { label: "Площадки", href: "/" },
        { label: "Контакты", href: "/" },
    ];

    return (
        <>
            <div className="fixed top-0 left-[50%] translate-x-[-50%] w-full z-[4] max-w-[1440px] px-[24px] lg:px-[48px] 2xl:px-[80px]">
                <div className={clsx(
                    "flex flex-row",
                    "mt-[42px] bg-brown rounded-[0.75rem] p-[0.75rem]",
                )}>
                    <div className="flex flex-row items-center gap-[1.5rem] justify-between w-full">
                        {/* Левая часть - Лого и город */}
                        <div className="flex flex-row items-center gap-[0.75rem]">
                            <Link href="/">
                                <Image
                                    src="/static/header-logo.svg"
                                    alt="Эстетика Вкуса"
                                    width={30}
                                    height={32}
                                />
                            </Link>
                            <button 
                                onClick={openModal}
                                className="hidden sm:flex flex-row items-center gap-[0.25rem] cursor-pointer hover:opacity-80 transition-opacity"
                            >
                                <Text as="p" variant="body-large" className="text-white">
                                    {currentCity?.name || 'Выберите город'}
                                </Text>
                                <ChevronDown className="text-white" size={16} />
                            </button>
                        </div>

                        {/* Центральная часть - Меню навигации (скрыто на lg и ниже) */}
                        <div className="hidden xl:flex flex-row items-center gap-[1.5rem]">
                            {menuItems.map((item, index) => (
                                <Text key={index} href={item.href} variant="body-large" className="text-white no-underline">
                                    {item.label}
                                </Text>
                            ))}
                        </div>

                        {/* Правая часть - Телефон и кнопка (скрыто на lg и ниже) */}
                        <div className="hidden xl:flex flex-row items-center gap-[0.75rem]">
                            <Text href="/" variant="body-large" className="text-white no-underline">
                                +7 (999) 999-99-99
                            </Text>
                            <Modal
                                trigger={<Button variant="white" size="md">Оформить заявку</Button>}
                                title="Оформить заявку"
                                size="md"
                            >
                                <ModalBody>
                                    <QuestionForm />
                                </ModalBody>
                            </Modal>
                        </div>

                        {/* Кнопка гамбургера (показана на lg и ниже) */}
                        <button
                            onClick={toggleMenu}
                            className="xl:hidden text-white focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильное меню */}
            <div
                className={clsx(
                    "fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-brown z-[5] transform transition-transform duration-300 ease-in-out xl:hidden",
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="flex flex-col h-full p-[1.5rem]">
                    {/* Заголовок с кнопкой закрытия */}
                    <div className="flex flex-row items-center justify-between mb-[2rem]">
                        <Text as="p" variant="body-large" className="text-white font-semibold">
                            Меню
                        </Text>
                        <button
                            onClick={closeMenu}
                            className="text-white focus:outline-none"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Город */}
                    <button 
                        onClick={openModal}
                        className="flex flex-row items-center gap-[0.25rem] mb-[2rem] sm:hidden cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <Text as="p" variant="body-large" className="text-white">
                            {currentCity?.name || 'Выберите город'}
                        </Text>
                        <ChevronDown className="text-white" size={16} />
                    </button>

                    {/* Навигационные ссылки */}
                    <nav className="flex flex-col gap-[1.25rem] mb-[2rem]">
                        {menuItems.map((item, index) => (
                            <Text
                                key={index}
                                href={item.href}
                                variant="body-large"
                                className="text-white no-underline"
                                onClick={closeMenu}
                            >
                                {item.label}
                            </Text>
                        ))}
                    </nav>

                    {/* Контактная информация и кнопка */}
                    <div className="mt-auto flex flex-col gap-[1rem]">
                        <Text href="/" variant="body-large" className="text-white no-underline">
                            +7 (999) 999-99-99
                        </Text>
                        <Modal
                            trigger={<Button variant="white" size="md" className="w-full">Оформить заявку</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <QuestionForm />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>

            {/* Overlay (затемнение фона) */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[3] xl:hidden"
                    onClick={closeMenu}
                />
            )}
        </>
    )
}

export default Navigation;