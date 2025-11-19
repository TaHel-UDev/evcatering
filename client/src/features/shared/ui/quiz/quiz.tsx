/**
 * Quiz Component
 * 
 * Универсальный компонент маркетингового квиза с поддержкой:
 * - Ветвления в зависимости от ответов
 * - Различных типов вопросов (одиночный выбор, множественный, текст, да/нет)
 * - JSON конфигурации
 * - Модальной формы для отправки заявки
 * - Передачи ответов квиза в форму
 * - Анимаций через framer-motion
 */

import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { z } from "zod";
import { QuizProps } from "./quiz-types";
import { QuizProvider, useQuiz } from "./quiz-context";
import { QuizQuestion } from "./quiz-question";
import { QuizResult } from "./quiz-result";
import { QuizProgress } from "./quiz-progress";
import {
  quizContainerStyles,
  quizHeaderStyles,
  quizControlStyles,
  defaultFormFields,
  quizFormStyles,
} from "./quiz-config";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../modal";
import { Button } from "../button";
import { FormProvider, FormField, formSchemaHelpers } from "../form";
import Input from "../input";
import Textarea from "../textarea";
import Checkbox from "../checkbox";
import Link from "next/link";
import { useCitySelector } from "@/features/shared/context/city-selector-context";

/**
 * Внутренний компонент квиза (использует контекст)
 */
const QuizContent: React.FC<
  Omit<QuizProps, "config"> & {
    onFormModalOpen: () => void;
  }
> = ({
  onComplete,
  onSubmit,
  formFields = defaultFormFields,
  formTitle = "Оставьте заявку",
  formDescription,
  className = "",
  onReset,
  onFormModalOpen,
}) => {
  const { state, config, goToNextQuestion, goToPreviousQuestion, resetQuiz } =
    useQuiz();

  const settings = config.settings || {};
  const showProgress = settings.showProgress !== false;
  const showBackButton = settings.showBackButton !== false;
  const animated = settings.animated !== false;

  const canGoBack = state.questionHistory.length > 0 && !state.isCompleted;

  const handleBack = () => {
    if (canGoBack) {
      goToPreviousQuestion();
    }
  };

  const handleReset = () => {
    resetQuiz();
    onReset?.();
  };

  const handleFormOpen = () => {
    onFormModalOpen();
  };

  const containerClasses = [
    quizContainerStyles.base,
    quizContainerStyles.padding,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Общее количество вопросов для прогресса
  const totalQuestions = config.questions.length;
  const currentQuestionNumber = state.totalQuestionsAnswered + 1;

  return (
    <div className={containerClasses}>
      {/* Заголовок квиза */}
      {(settings.title || settings.description) && !state.isCompleted && (
        <div className={quizHeaderStyles.container}>
          {settings.title && (
            <h2 className={quizHeaderStyles.title}>{settings.title}</h2>
          )}
          {settings.description && (
            <p className={quizHeaderStyles.description}>
              {settings.description}
            </p>
          )}
        </div>
      )}

      {/* Прогресс */}
      {showProgress && !state.isCompleted && state.currentQuestion && (
        <QuizProgress current={currentQuestionNumber} total={totalQuestions} />
      )}

      {/* Вопрос или результат */}
      <AnimatePresence mode="wait">
        {state.currentQuestion && !state.isCompleted && (
          <QuizQuestion
            key={state.currentQuestion.id}
            question={state.currentQuestion}
            currentAnswer={state.answers.find(
              (a) => a.questionId === state.currentQuestion?.id
            )}
            onAnswer={goToNextQuestion}
            animated={animated}
          />
        )}

        {state.isCompleted && state.currentResult && (
          <QuizResult
            key="result"
            result={state.currentResult}
            answers={state.answers}
            onFormOpen={handleFormOpen}
            onReset={handleReset}
            animated={animated}
          />
        )}
      </AnimatePresence>

      {/* Кнопка "Назад" */}
      {showBackButton && canGoBack && (
        <div className={quizControlStyles.container}>
          <button onClick={handleBack} className={quizControlStyles.backButton}>
            <ChevronLeft size={20} className="inline" />
            Назад
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Схема валидации формы квиза
 */
const quizFormSchema = z.object({
  name: formSchemaHelpers.string(2, "Минимум 2 символов"),
  phone: formSchemaHelpers.string().min(18, "Введите корректный номер телефона"),
  comment: z.string().optional(),
  policy: z.boolean().refine((val) => val === true, { 
    message: "Для отправки формы необходимо согласиться с политикой конфиденциальности" 
  }),
});

type QuizFormData = z.infer<typeof quizFormSchema>;

/**
 * Модальная форма заявки с использованием QuestionForm компонентов
 */
const QuizFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  answers: any[];
  result: any;
  formFields: any[];
  formTitle: string;
  formDescription?: string;
  onSubmit?: (formData: Record<string, any>, answers: any[]) => void;
}> = ({
  isOpen,
  onClose,
  answers,
  result,
  formFields,
  formTitle,
  formDescription,
  onSubmit: customOnSubmit,
}) => {
  const { currentCity } = useCitySelector();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: QuizFormData) => {
    setSubmitError(null);

    if (!currentCity?.id) {
      setSubmitError('Не удалось определить ваш город. Пожалуйста, выберите город.');
      return;
    }

    try {
      // Если передан кастомный onSubmit, используем его
      if (customOnSubmit) {
        await customOnSubmit(data, answers);
      } else {
        // Иначе используем стандартную отправку
        // Формируем комментарий с результатом и ответами из квиза
        let quizDataText = "";
        
        // Добавляем результат в начало
        if (result) {
          quizDataText += `\n\n📊 Результат: ${result.title}`;
          if (result.description) {
            quizDataText += `\n${result.description}`;
          }
        }
        
        // Добавляем ответы
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

        const response = await fetch('/api/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            preferences: (data.comment || '') + quizDataText,
            franchise_id: currentCity.id,
          }),
        });

        const apiResult = await response.json();

        if (!response.ok) {
          throw new Error(apiResult.error || 'Ошибка отправки заявки');
        }

        console.log('✅ Заявка из квиза успешно отправлена:', apiResult.data);
      }

      setSubmitSuccess(true);

      // Закрытие модального окна через 2 секунды
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);

    } catch (error: any) {
      console.error('❌ Ошибка отправки заявки из квиза:', error);
      setSubmitError(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  // Если заявка отправлена успешно
  if (submitSuccess) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
        <ModalBody>
          <div className="p-6 bg-green/10 border border-green rounded-lg text-center">
            <p className="text-green text-lg font-medium mb-2">✅ Заявка успешно отправлена!</p>
            <p className="text-dark">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
      <ModalHeader>
        <h3 className="text-xl font-semibold text-gray-900">{formTitle}</h3>
        {formDescription && (
          <p className="text-gray-600 text-sm mt-1">{formDescription}</p>
        )}
      </ModalHeader>

      <FormProvider
        schema={quizFormSchema}
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
          <>
            <ModalBody>
              {/* Результат и ответы пользователя из квиза */}
              {(result || answers.length > 0) && (
                <div className={quizFormStyles.answersSection + " mb-4"}>
                  <h4 className={quizFormStyles.answersTitle}>Результаты квиза:</h4>
                  <div className={quizFormStyles.answersList}>
                    {/* Отображаем результат в начале */}
                    {result && (
                      <div className="mb-3 pb-3 border-b border-gray-200">
                        <strong className="text-green">📊 Результат:</strong>{" "}
                        <span className="font-semibold">{result.title}</span>
                        {result.description && (
                          <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                        )}
                      </div>
                    )}
                    
                    {/* Отображаем ответы */}
                    {answers.length > 0 && (
                      <>
                        {answers.map((answer, index) => (
                          <div key={index}>
                            <strong>{answer.questionTitle}:</strong>{" "}
                            {Array.isArray(answer.value)
                              ? answer.labels?.join(", ") || answer.value.join(", ")
                              : typeof answer.value === "boolean"
                              ? answer.value ? "Да" : "Нет"
                              : answer.labels?.[0] || answer.value}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Форма с использованием QuestionForm компонентов */}
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
                      placeholder="Дополнительная информация"
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
                          Нажимая кнопку &quot;Отправить&quot; Вы соглашаетесь с{" "}
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
            </ModalBody>

            <ModalFooter align="right">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={formState.isSubmitting}
                disabled={!formState.isValid || formState.isSubmitting}
              >
                Отправить
              </Button>
            </ModalFooter>
          </>
        )}
      </FormProvider>
    </Modal>
  );
};

/**
 * Компонент для захвата результата из контекста квиза
 */
const QuizResultCapture: React.FC<{
  onResultChange: (result: any) => void;
}> = ({ onResultChange }) => {
  const { state } = useQuiz();
  
  React.useEffect(() => {
    if (state.currentResult) {
      onResultChange(state.currentResult);
    }
  }, [state.currentResult, onResultChange]);

  return null;
};

/**
 * Внутренний компонент для доступа к контексту квиза
 */
const QuizWithContext: React.FC<
  Omit<QuizProps, "config"> & {
    onFormModalOpen: () => void;
    quizAnswers: any[];
    quizResult: any;
  }
> = ({
  onComplete,
  onQuestionChange,
  onSubmit,
  formFields = defaultFormFields,
  formTitle = "Оставьте заявку",
  formDescription,
  className = "",
  onReset,
  onFormModalOpen,
  quizAnswers,
  quizResult,
}) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleFormModalOpen = () => {
    setIsFormModalOpen(true);
    onFormModalOpen();
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
  };

  return (
    <>
      <QuizContent
        onComplete={onComplete}
        onSubmit={onSubmit}
        formFields={formFields}
        formTitle={formTitle}
        formDescription={formDescription}
        className={className}
        onReset={onReset}
        onFormModalOpen={handleFormModalOpen}
      />

      <QuizFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormModalClose}
        answers={quizAnswers}
        result={quizResult}
        formFields={formFields}
        formTitle={formTitle}
        formDescription={formDescription}
        onSubmit={onSubmit}
      />
    </>
  );
};

/**
 * Основной компонент Quiz
 */
export const Quiz: React.FC<QuizProps> = ({
  config,
  onComplete,
  onQuestionChange,
  onSubmit,
  formFields = defaultFormFields,
  formTitle = "Оставьте заявку",
  formDescription,
  className = "",
  onReset,
}) => {
  const [quizAnswers, setQuizAnswers] = useState<any[]>([]);
  const [quizResult, setQuizResult] = useState<any>(null);

  const handleComplete = (answers: any[]) => {
    setQuizAnswers(answers);
    onComplete?.(answers);
  };

  const handleFormModalOpen = () => {
    // Ничего не делаем, состояние управляется внутри QuizWithContext
  };

  return (
    <QuizProvider
      config={config}
      onComplete={handleComplete}
      onQuestionChange={onQuestionChange}
    >
      <QuizResultCapture onResultChange={setQuizResult} />
      <QuizWithContext
        onComplete={onComplete}
        onQuestionChange={onQuestionChange}
        onSubmit={onSubmit}
        formFields={formFields}
        formTitle={formTitle}
        formDescription={formDescription}
        className={className}
        onReset={onReset}
        onFormModalOpen={handleFormModalOpen}
        quizAnswers={quizAnswers}
        quizResult={quizResult}
      />
    </QuizProvider>
  );
};

Quiz.displayName = "Quiz";

export default Quiz;

