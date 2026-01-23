import { createQuizConfig } from "@/features/shared/ui/quiz/quiz-types";

export const franchiseQuizConfig = createQuizConfig({
    startQuestionId: "experience",
    questions: [
        {
            id: "experience",
            title: "1. Расскажите о своём опыте в общепите",
            type: "single",
            options: [
                { id: "restaurant", label: "Ресторан / кафе" },
                { id: "delivery", label: "Доставка еды" },
                { id: "catering", label: "Кейтеринг" },
                { id: "other_direction", label: "Другое направление (кофейня, столовая, отель, банкетный зал и т.д.)" },
                { id: "no_experience", label: "Пока нет опыта в общепите" },
            ],
        },
        {
            id: "business_now",
            title: "2. Ведёте ли вы бизнес сейчас?",
            type: "single",
            options: [
                { id: "yes_food", label: "Да, в сфере общепита" },
                { id: "yes_other", label: "Да, в другой сфере" },
                { id: "no_planning", label: "Нет, планирую запуск бизнеса" },
            ],
        },
        {
            id: "kitchen",
            title: "3. Есть ли у вас собственная кухня или пищевое производство?",
            description: "Это влияет на формат и сроки запуска.",
            type: "single",
            options: [
                { id: "yes", label: "Да, есть" },
                { id: "no", label: "Нет" },
            ],
        },
        {
            id: "why_catering",
            title: "4. Чем вас привлекает кейтеринг как бизнес?",
            description: "Выберите то, что откликается больше всего",
            type: "single",
            options: [
                { id: "large_orders", label: "Возможностью зарабатывать на крупных заказах и банкетах" },
                { id: "scalability", label: "Масштабируемостью и ростом прибыли" },
                { id: "extra_direction", label: "Дополнительным направлением для действующего бизнеса" },
                { id: "creativity", label: "Творчеством и эстетикой" },
                { id: "other", label: "Другое (можно указать свой вариант)" },
                // Note: "other" usually implies text input. 
                // Since "single" type doesn't support mixed input natively in this Quiz component 
                // without modifying QuizQuestion, we'll keep it as a label for now.
                // The user Triz said "Другое (можно указать свой вариант)". 
                // If strictly required, we would need to enhance QuizQuestion.
                // For now, selecting "Other" is enough to indicate interest.
            ],
        },
        {
            id: "important_criteria",
            title: "5. Что для вас самое важное при выборе франшизы?",
            type: "single",
            options: [
                { id: "system", label: "Готовая система и понятная экономика" },
                { id: "training", label: "Обучение и передача опыта" },
                { id: "support", label: "Поддержка после запуска и помощь в продажах" },
                { id: "brand", label: "Узнаваемый бренд и доверие клиентов" },
                { id: "other", label: "Другое (можно указать свой вариант)" },
            ],
        },
        {
            id: "investment_volume",
            title: "6. Какой объём инвестиций для запуска кейтеринга вы рассматриваете?",
            description: "Подберём формат под ваш бюджет",
            type: "single",
            options: [
                { id: "lt_3m", label: "До 3 млн ₽" },
                { id: "3_5m", label: "3–5 млн ₽" },
                { id: "gt_5m", label: "Более 5 млн ₽" },
            ],
        },
    ],
    results: [
        {
            id: "final_form",
            title: "7. В каком городе вы планируете запуск?",
            description: "И как с вами лучше связаться?",
            showInlineForm: true,
            buttonText: "Получить предложение", // Used as Submit button text in form
        },
    ],
    settings: {
        title: "Предлагаем вам пройти краткий квиз, чтобы получить самое оптимальное предложение.",
        showProgress: true,
        showBackButton: true,
        animated: true,
    },
});
