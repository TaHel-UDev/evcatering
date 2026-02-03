import React, { useState } from "react";
import { z } from "zod";
import { Button } from "../button";
import { FormProvider, FormField, formSchemaHelpers } from "../form";
import Input from "../input";
import Textarea from "../textarea";
import Checkbox from "../checkbox";
import Link from "next/link";
import { useCitySelector } from "@/features/shared/context/city-selector-context";
import { quizFormStyles } from "./quiz-config";
import { QuizFormField } from "./quiz-types";

// Базовая схема, которую мы будем расширять или использовать
const baseQuizFormSchema = z.object({
    name: formSchemaHelpers.string(2, "Минимум 2 символов"),
    phone: formSchemaHelpers.string().min(18, "Введите корректный номер телефона"),
    city: z.string().optional(),
    email: z.string().email("Введите корректный email").optional().or(z.literal("")),
    comment: z.string().optional(),
    policy: z.boolean().refine((val) => val === true, {
        message: "Для отправки формы необходимо согласиться с политикой конфиденциальности"
    }),
});

type QuizFormData = z.infer<typeof baseQuizFormSchema>;

interface QuizFormProps {
    answers: any[];
    result?: any;
    formFields?: QuizFormField[];
    formTitle?: string;
    formDescription?: string;
    onSubmit?: (formData: Record<string, any>, answers: any[]) => void;
    onCancel?: () => void;
    submitButtonText?: string;
    showCancelButton?: boolean;
}

export const QuizForm: React.FC<QuizFormProps> = ({
    answers,
    result,
    formFields,
    onSubmit: customOnSubmit,
    onCancel,
    submitButtonText = "Отправить",
    showCancelButton = false,
}) => {
    const { currentCity } = useCitySelector();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Определяем, какие поля показывать, основываясь на formFields
    // Если formFields не передан, показываем стандартный набор (имя, телефон, коммент)
    // Для совместимости с текущим кодом, если поля явно не настроены, показываем дефолтные
    const showCityField = formFields?.some(f => f.name === 'city') ?? false;
    const showEmailField = formFields?.some(f => f.name === 'email') ?? false;
    // Остальные поля (name, phone) считаем обязательными для базы, но можно настроить

    const handleSubmit = async (data: QuizFormData) => {
        setSubmitError(null);

        // Для франшизы город может быть введен вручную, поэтому проверка currentCity не всегда обязательна/корректна
        // Но если мы используем текущий API, нам нужен franchise_id
        // Если это форма франшизы, возможно логика отправки другая. 
        // Предполагаем, что customOnSubmit обработает логику если она отличается.

        if (!customOnSubmit && !currentCity?.id) {
            // Если дефолтная отправка и нет города - ошибка
            // Но если есть поле City, то мы отправляем его в тексте
        }

        try {
            // Клонируем данные для отправки
            const submitData = { ...data };

            if (customOnSubmit) {
                await customOnSubmit(submitData, answers);
            } else {
                // Стандартная логика
                // Проверяем наличие города: либо из контекста (выбран на сайте), либо введен вручную (если есть поле city)
                if (!currentCity?.id && !submitData.city) {
                    setSubmitError('Не удалось определить ваш город. Пожалуйста, укажите город.');
                    return;
                }

                let quizDataText = "";

                if (result) {
                    quizDataText += `\n\n📊 Результат: ${result.title}`;
                }

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

                const comments = (submitData.comment || '') + (submitData.city ? `\n\nГород: ${submitData.city}` : '') + quizDataText;

                const response = await fetch('/api/requests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: submitData.name,
                        phone: submitData.phone,
                        preferences: comments,
                        franchise_id: currentCity?.id || null,
                        franchiseEmail: currentCity?.mail || null,
                        franchiseName: currentCity?.name || null,
                    }),
                });

                const apiResult = await response.json();

                if (!response.ok) {
                    throw new Error(apiResult?.error || 'Ошибка отправки заявки');
                }

                console.log('✅ Заявка из квиза успешно отправлена:', apiResult.data);
            }

            setSubmitSuccess(true);
        } catch (error: any) {
            console.error('❌ Ошибка отправки заявки из квиза:', error);
            setSubmitError(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
        }
    };

    if (submitSuccess) {
        return (
            <div className="p-6 bg-green/10 border border-green rounded-lg text-center animate-fadeIn">
                <p className="text-green text-lg font-medium mb-2">✅ Заявка успешно отправлена!</p>
                <p className="text-dark">Мы свяжемся с вами в ближайшее время.</p>
            </div>
        );
    }

    return (
        <FormProvider
            schema={baseQuizFormSchema}
            defaultValues={{
                name: "",
                phone: "",
                city: "",
                email: "",
                comment: "",
                policy: false,
            }}
            onSubmit={handleSubmit}
            mode="onChange"
        >
            {({ formState }) => (
                <div className={quizFormStyles.container}>
                    {/* Результат и ответы пользователя (если есть) */}
                    {(result || (answers.length > 0 && !result?.showInlineForm)) && (
                        // Показываем ответы только если это НЕ инлайн форма результата (там ответы уже показаны выше обычно)
                        // Или если мы хотим дублировать. В инлайн режиме ответы обычно показываются в QuizResult компоненте перед формой.
                        // Здесь мы просто рендерим форму.
                        // Если передан result и это модалка - ответы полезны.
                        // Если это инлайн форма, ответы уже отображаются в QuizResult.
                        null
                    )}

                    <div className="space-y-4">
                        {submitError && (
                            <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                                {submitError}
                            </div>
                        )}

                        {showCityField && (
                            <FormField name="city">
                                {({ value, onChange, error, name }) => (
                                    <Input
                                        name={name}
                                        type="text"
                                        value={value || ""}
                                        onChange={(e) => onChange(e.target.value)}
                                        label="Город"
                                        placeholder="Введите ваш город"
                                        errorText={error}
                                        fullWidth
                                    />
                                )}
                            </FormField>
                        )}

                        <FormField name="name">
                            {({ value, onChange, error, name }) => (
                                <Input
                                    name={name}
                                    type="text"
                                    value={value || ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    label="Имя"
                                    placeholder="Иван"
                                    errorText={error}
                                    fullWidth
                                    required
                                />
                            )}
                        </FormField>

                        <FormField name="phone">
                            {({ value, onChange, error, name }) => (
                                <Input
                                    name={name}
                                    type="tel"
                                    value={value || ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    label="Номер телефона"
                                    placeholder="+7 (___) ___-__-__"
                                    mask="+7 (000) 000-00-00"
                                    errorText={error}
                                    fullWidth
                                    required
                                />
                            )}
                        </FormField>

                        {showEmailField && (
                            <FormField name="email">
                                {({ value, onChange, error, name }) => (
                                    <Input
                                        name={name}
                                        type="email"
                                        value={value || ""}
                                        onChange={(e) => onChange(e.target.value)}
                                        label="Email"
                                        placeholder="example@mail.com"
                                        errorText={error}
                                        fullWidth
                                        required={formFields?.find(f => f.name === 'email')?.required}
                                    />
                                )}
                            </FormField>
                        )}

                        <FormField name="comment">
                            {({ value, onChange, error, name }) => (
                                <Textarea
                                    name={name}
                                    value={value || ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    label="Комментарий"
                                    placeholder="Дополнительная информация (необязательно)"
                                    errorText={error}
                                    autoResize
                                    minRows={3}
                                    maxRows={6}
                                    fullWidth
                                />
                            )}
                        </FormField>

                        <FormField name="policy">
                            {({ value, onChange, error }) => (
                                <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                    label={
                                        <>
                                            Нажимая кнопку &quot;{submitButtonText}&quot; Вы соглашаетесь с{" "}
                                            <Link href="/policy" className="underline hover:text-green transition-colors duration-300">
                                                Политикой конфиденциальности
                                            </Link>
                                        </>
                                    }
                                    size="sm"
                                    errorText={error}
                                />
                            )}
                        </FormField>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                        {showCancelButton && onCancel && (
                            <Button variant="outline" onClick={onCancel}>
                                Отмена
                            </Button>
                        )}
                        <div className={showCancelButton ? "" : "w-full"}>
                            <Button
                                type="submit"
                                variant="primary"
                                loading={formState.isSubmitting}
                                disabled={!formState.isValid || formState.isSubmitting}
                                className={showCancelButton ? "" : "w-full"}
                            >
                                {submitButtonText}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </FormProvider>
    );
};
