import { z } from "zod";
import { FormProvider, FormField, formSchemaHelpers } from "@/features/shared/ui/form";
import Input from "@/features/shared/ui/input";
import Button from "@/features/shared/ui/button";
import Textarea from "@/features/shared/ui/textarea";
import Checkbox from "@/features/shared/ui/checkbox";
import Link from "next/link";

// Схема валидации
const formSchema = z.object({
    name: formSchemaHelpers.string(2, "Минимум 2 символов"),
    phone: formSchemaHelpers.string().min(18, "Введите корректный номер телефона"),
    comment: z.string().optional(),
    policy: z.boolean().refine((val) => val === true, { message: "Для отправки формы необходимо согласиться с политикой конфиденциальности" }),
});

type FormData = z.infer<typeof formSchema>;

// Компонент формы
export default function QuestionForm() {
    const handleSubmit = (data: FormData) => {
        console.log("Form data:", data);
        // Здесь ваша логика отправки
    };

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
                                label="Предпочтения"
                                placeholder="Опишите ваши предпочтения по мероприятию и пространству"
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
                                label={<>Нажимая кнопку &quot;Отправить&quot; Вы автоматически соглашаетесь с <Link href="/policy" className="underline hover:text-green transition-colors duration-300">Политикой конфиденциальности</Link></>}
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