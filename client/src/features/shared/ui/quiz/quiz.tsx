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
import { useCitySelector } from "@/features/shared/context/city-selector-context";
import { QuizForm } from "./quiz-form";

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
              onSubmit={onSubmit}
              formFields={formFields}
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
  onSubmit,
}) => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose} size="md">
        <ModalHeader>
          <h3 className="text-xl font-semibold text-gray-900">{formTitle}</h3>
          {formDescription && (
            <p className="text-gray-600 text-sm mt-1">{formDescription}</p>
          )}
        </ModalHeader>

        <ModalBody>
          <QuizForm
            answers={answers}
            result={result}
            formFields={formFields}
            onSubmit={onSubmit}
            onCancel={onClose}
            showCancelButton={true}
          />
        </ModalBody>
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

