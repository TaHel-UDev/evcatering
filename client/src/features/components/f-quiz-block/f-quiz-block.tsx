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
                userEmail: formData.email,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Ошибка отправки заявки');
        }

        console.log('✅ Заявка успешно отправлена:', result.data);
    };

    return (
        <section id="quiz-block" className="py-8 md:py-12 overflow-hidden bg-green">
            <BlockWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative pb-[48px] lg:pb-[64px] xl:pb-[80px]">
                    {/* Left Column: Quiz */}
                    <div className="lg:col-span-7 [&_h2]:!text-xl [&_.md\:text-3xl]:!text-2xl [&_.text-lg]:!text-base [&_.p-5]:!p-3.5 [&_input]:!py-3 [&_input]:!text-base [&_textarea]:!py-3 [&_textarea]:!text-base [&_textarea]:!min-h-[100px] [&_.space-y-6]:!space-y-4">
                        <Quiz
                            config={config}
                            className="mx-[0!important] max-w-[100%!important] bg-[#F5F5F5!important] shadow-[0!important] border-none p-0 w-full"
                            formTitle="Заполните контактные данные"
                            formDescription="Мы свяжемся с вами и отправим коммерческое предложение"
                            formFields={[
                                { name: 'city', label: 'Город', type: 'text', placeholder: 'Ваш город', required: true },
                                { name: 'name', label: 'Имя', type: 'text', placeholder: 'Ваше имя', required: true },
                                { name: 'phone', label: 'Телефон', type: 'tel', placeholder: '+7 (___) ___-__-__', required: true },
                                { name: 'email', label: 'Email', type: 'email', placeholder: 'example@mail.com', required: true },
                                { name: 'comment', label: 'Комментарий', type: 'textarea', placeholder: 'Дополнительная информация', required: false }
                            ]}
                            onSubmit={handleQuizSubmit}
                        />
                    </div>

                    {/* Right Column: Manager Card (Graphic Element) */}
                    <div className="lg:col-span-5 hidden lg:block h-full">
                        <div className="bg-soft-gray rounded-3xl p-6 border border-white/50 relative">
                            {/* Header with Avatar */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-24 h-24 rounded-full bg-soft-gray flex items-center justify-center text-brown border-2 border-white relative overflow-hidden flex-shrink-0">
                                    {/* Placeholder Avatar */}
                                    <Image
                                        src={"/static/f_manager.jpg"}
                                        alt="Иван"
                                        width={640}
                                        height={640}
                                        quality={100}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-dark leading-tight">Иван</h3>
                                    <p className="text-gray-500 text-xs font-medium">Специалист по франшизе</p>
                                </div>
                            </div>

                            {/* Chat Bubble */}
                            <div className="bg-white rounded-2xl rounded-tl-none p-5 relative mb-6 shadow-sm">
                                <p className="text-dark leading-relaxed text-sm">
                                    Здравствуйте! Меня зовут Иван. Я помогу вам пройти этот небольшой тест.
                                </p>
                                <p className="text-dark leading-relaxed text-sm mt-2">
                                    Мы подберем для вас оптимальный формат и рассчитаем инвестиции для вашего города.
                                </p>
                            </div>

                            {/* Benefits / Bonuses */}
                            <div className="pt-5 border-t border-gray-100">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">
                                    После теста вы получите:
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-white rounded-xl p-3 text-center group transition-colors cursor-default border border-transparent hover:border-green/20">
                                        <div className="w-8 h-8 bg-soft-gray rounded-full flex items-center justify-center mx-auto mb-2 text-green shadow-sm group-hover:scale-110 transition-transform">
                                            <Calculator size={16} />
                                        </div>
                                        <div className="text-xs font-semibold text-dark">Финансовую модель</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BlockWrapper>
        </section>
    );
}
