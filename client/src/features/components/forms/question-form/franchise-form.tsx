import { z } from "zod";
import { FormProvider, FormField, formSchemaHelpers } from "@/features/shared/ui/form";
import Input from "@/features/shared/ui/input";
import Button from "@/features/shared/ui/button";
import Textarea from "@/features/shared/ui/textarea";
import Checkbox from "@/features/shared/ui/checkbox";
import Link from "next/link";
import { useCitySelector } from "@/features/shared/context/city-selector-context";
import { useState } from "react";

// Схема валидации
const formSchema = z.object({
    name: formSchemaHelpers.string(2, "Минимум 2 символов"),
    phone: formSchemaHelpers.string().min(18, "Введите корректный номер телефона"),
    comment: z.string().optional(),
    policy: z.boolean().refine((val) => val === true, { message: "Для отправки формы необходимо согласиться с политикой конфиденциальности" }),
});

type FormData = z.infer<typeof formSchema>;

// Компонент формы
export default function FranchiseForm({ email }: { email: string }) {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (data: FormData) => {
        setSubmitError(null);

        try {
            const response = await fetch('/api/f_requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone,
                    comment: data.comment || null,
                    email: email,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Ошибка отправки заявки');
            }

            setSubmitSuccess(true);
            console.log('✅ Заявка успешно отправлена:', result.data);

            // Сброс формы через 3 секунды
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);

        } catch (error: any) {
            console.error('❌ Ошибка отправки заявки:', error);
            setSubmitError(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
        }
    };

    // Если заявка отправлена успешно
    if (submitSuccess) {
        return (
            <div className="p-6 bg-green/10 border border-green rounded-lg text-center">
                <p className="text-green text-lg font-medium mb-2">✅ Заявка успешно отправлена!</p>
                <p className="text-dark">Мы свяжемся с вами в ближайшее время.</p>
            </div>
        );
    }

    return (
        <FormProvider
            schema={formSchema}
            defaultValues={{
                name: "",
                phone: "",
                comment: "",
                policy: false,
            }}
            onSubmit={handleSubmit}
            mode="onChange"
        >
            {({ formState }) => (
                <div className="space-y-4">
                    {submitError && (
                        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                            {submitError}
                        </div>
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

                    <FormField name="comment">
                        {({ value, onChange, error, name }) => (
                            <Textarea
                                name={name}
                                value={value || ""}
                                onChange={(e) => onChange(e.target.value)}
                                label="Комментарий"
                                placeholder="Комментарий"
                                errorText={error}
                                autoResize
                                minRows={3}
                                maxRows={8}
                                fullWidth
                            />
                        )}
                    </FormField>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={formState.isSubmitting}
                        disabled={!formState.isValid || formState.isSubmitting}
                        fullWidth
                    >
                        Отправить
                    </Button>

                    <FormField name="policy">
                        {({ value, onChange, error }) => (
                            <Checkbox
                                checked={value}
                                onChange={onChange}
                                label={<>Нажимая кнопку &quot;Отправить&quot; Вы соглашаетесь с <Link href="/policy" className="underline hover:text-green transition-colors duration-300">Политикой конфиденциальности</Link></>}
                                size="sm"
                                errorText={error}
                            />
                        )}
                    </FormField>
                </div>
            )}
        </FormProvider>
    );
}