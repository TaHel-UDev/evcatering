import { DirectusQuiz, transformDirectusQuiz } from "@/lib/directus-quiz-transformer";
import Quiz from "../shared/ui/quiz";

export default function QuizMain({
    QuizData
}: {
    QuizData: DirectusQuiz,
}) {
    // Трансформируем данные из Directus в формат QuizConfig
    const config = transformDirectusQuiz(QuizData);

    const handleSubmit = async (formData: Record<string, any>, answers: any[]) => {
        console.log("📋 Данные формы:", formData);
        console.log("✅ Ответы на вопросы:", answers);

        alert(
            `Заявка отправлена!\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\n\nРезультат: ${answers[answers.length - 1]?.questionTitle}`
        );
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="container mx-auto px-4">
                {/* Заголовок */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {QuizData.title}
                    </h1>
                    <p className="text-lg text-gray-600">{QuizData.description}</p>
                </div>

                {/* Квиз */}
                <Quiz
                    config={config}
                    onSubmit={handleSubmit}
                    formTitle={QuizData.form_title}
                />
            </div>
        </div>
    );
}
