import React from 'react';
import Quiz from '@/features/shared/ui/quiz/quiz';
import { franchiseQuizConfig } from './f-quiz-config';
import BlockWrapper from '@/features/shared/ui/block-wrapper';
import { FileText, Calculator, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { QuizConfig } from '@/features/shared/ui/quiz';

interface FQuizBlockProps {
    quizConfig: QuizConfig;
    email: string;
}

export default function FQuizBlock({ quizConfig, email }: FQuizBlockProps) {
    const config = {
        ...quizConfig,
        settings: {
            ...quizConfig.settings,
            title: (quizConfig as any).title
        }
    };

    const handleQuizSubmit = async (formData: Record<string, any>, answers: any[]) => {
        // Формируем текст ответов квиза
        let quizDataText = "";

        if (answers.length > 0) {
            quizDataText += "\n\n📝 Ответы из квиза:\n" + answers.map((answer) => {
                const value = Array.isArray(answer.value)
                    ? answer.labels?.join(", ") || answer.value.join(", ")
                    : typeof answer.value === "boolean"
                        ? answer.value ? "Да" : "Нет"
                        : answer.labels?.[0] || answer.value;
                return `${answer.questionTitle}: ${value}`;
            }).join("\n");
        }

        // Формируем итоговый комментарий
        const comments = (formData.comment || '') +
            (formData.city ? `\n\nГород: ${formData.city}` : '') +
            quizDataText;

        const response = await fetch('/api/f_requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                comment: comments,
                email: email,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Ошибка отправки заявки');
        }

        console.log('✅ Заявка успешно отправлена:', result.data);
    };

    return (
        <section id="quiz-block" className="py-16 md:py-24 overflow-hidden">
            <BlockWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                    {/* Left Column: Quiz */}
                    <div className="lg:col-span-7">
                        <Quiz
                            config={config}
                            className="mx-[0!important] max-w-[100%!important] bg-[#F5F5F5!important] shadow-[0!important] border-none p-0"
                            formTitle="Заполните контактные данные"
                            formDescription="Мы свяжемся с вами и отправим коммерческое предложение"
                            formFields={[
                                { name: 'city', label: 'Город', type: 'text', placeholder: 'Ваш город', required: true },
                                { name: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя', required: true },
                                { name: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (___) ___-__-__', required: true },
                                { name: 'email', label: 'Email', type: 'email', placeholder: 'example@mail.com', required: false },
                                { name: 'comment', label: 'Комментарий', type: 'textarea', placeholder: 'Дополнительная информация', required: false }
                            ]}
                            onSubmit={handleQuizSubmit}
                        />
                    </div>

                    {/* Right Column: Manager Card (Graphic Element) */}
                    <div className="lg:col-span-5 hidden lg:block h-full">
                        <div className="bg-soft-gray rounded-[2rem] p-8 border border-white/50 relative">
                            {/* Header with Avatar */}
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-16 h-16 rounded-full bg-soft-gray flex items-center justify-center text-brown border-2 border-white relative overflow-hidden">
                                    {/* Placeholder Avatar */}
                                    <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-dark">Мария</h3>
                                    <p className="text-gray-500 text-sm font-medium">Специалист по франшизе</p>
                                </div>
                            </div>

                            {/* Chat Bubble */}
                            <div className="bg-white rounded-2xl rounded-tl-none p-6 relative mb-8">
                                <p className="text-dark leading-relaxed text-[15px]">
                                    Здравствуйте! Меня зовут Мария. Я помогу вам пройти этот небольшой тест.
                                </p>
                                <p className="text-dark leading-relaxed text-[15px] mt-3">
                                    Мы подберем для вас оптимальный формат и рассчитаем инвестиции для вашего города.
                                </p>
                            </div>

                            {/* Benefits / Bonuses */}
                            <div className="pt-6 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
                                    После теста вы получите:
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white rounded-xl p-4 text-center group transition-colors cursor-default">
                                        <div className="w-10 h-10 bg-soft-gray rounded-full flex items-center justify-center mx-auto mb-3 text-green shadow-sm group-hover:scale-110 transition-transform">
                                            <Calculator size={20} />
                                        </div>
                                        <div className="text-xs font-semibold text-dark">Финансовую модель</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='opacity-50 absolute bottom-0 right-[20px] rounded-[2rem] w-[calc(514px/1.5)] h-[calc(505px/1.5)]'>
                        <Image
                            src="/static/quiz_filler.png"
                            alt="Quiz Background"
                            width={514}
                            height={505}
                            className="w-full h-full object-cover rounded-[2rem]"
                        />
                    </div> */}
                </div>


            </BlockWrapper>
        </section>
    );
}
