/**
 * Quiz Context
 * 
 * Контекст для управления состоянием квиза
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { QuizConfig, QuizQuestion, QuizAnswer, QuizResult, QuizState } from "./quiz-types";

interface QuizContextValue {
  state: QuizState;
  config: QuizConfig;
  goToNextQuestion: (answer: QuizAnswer) => void;
  goToPreviousQuestion: () => void;
  resetQuiz: () => void;
  isGoingBack: boolean;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

/**
 * Provider для контекста квиза
 */
export const QuizProvider: React.FC<{
  config: QuizConfig;
  onComplete?: (answers: QuizAnswer[]) => void;
  onQuestionChange?: (questionId: string) => void;
  children: React.ReactNode;
}> = ({ config, onComplete, onQuestionChange, children }) => {
  const [isGoingBack, setIsGoingBack] = useState(false);

  // Начальный вопрос
  const initialQuestion = useMemo(() => {
    const startId = config.startQuestionId;
    if (startId) {
      return config.questions.find((q) => q.id === startId) || config.questions[0];
    }
    return config.questions[0];
  }, [config]);

  // Начальное состояние
  const [state, setState] = useState<QuizState>({
    currentQuestion: initialQuestion || null,
    answers: [],
    questionHistory: [],
    currentResult: null,
    isCompleted: false,
    totalQuestionsAnswered: 0,
  });

  /**
   * Находит следующий вопрос на основе ответа
   */
  const findNextQuestion = useCallback(
    (currentQuestion: QuizQuestion, answer: QuizAnswer): QuizQuestion | null => {
      // Для одиночного выбора и boolean ищем выбранный вариант
      if (currentQuestion.type === "single" || currentQuestion.type === "boolean") {
        const selectedOption = currentQuestion.options?.find(
          (opt) => {
            // Сравниваем и value, и id для гибкости
            const optValue = opt.value !== undefined ? opt.value : opt.id;
            return optValue === answer.value || opt.id === answer.value;
          }
        );

        // Если указан nextQuestionId, используем его
        if (selectedOption?.nextQuestionId) {
          return (
            config.questions.find((q) => q.id === selectedOption.nextQuestionId) ||
            null
          );
        }

        // Если указан resultId, значит это конец ветки - вопросов больше нет
        if (selectedOption?.resultId) {
          return null;
        }
      }

      // Для множественного выбора и текста - берем следующий по порядку
      if (currentQuestion.type === "multiple" || currentQuestion.type === "text") {
        const currentIndex = config.questions.findIndex((q) => q.id === currentQuestion.id);
        if (currentIndex >= 0 && currentIndex < config.questions.length - 1) {
          return config.questions[currentIndex + 1];
        }
      }

      // Если ничего не найдено, возвращаем null (будет показан результат)
      return null;
    },
    [config.questions]
  );

  /**
   * Находит результат на основе ответа
   */
  const findResult = useCallback(
    (currentQuestion: QuizQuestion, answer: QuizAnswer): QuizResult | null => {
      // Для одиночного выбора и boolean ищем результат по выбранному варианту
      if (currentQuestion.type === "single" || currentQuestion.type === "boolean") {
        const selectedOption = currentQuestion.options?.find(
          (opt) => {
            const optValue = opt.value !== undefined ? opt.value : opt.id;
            return optValue === answer.value || opt.id === answer.value;
          }
        );

        if (selectedOption?.resultId) {
          return config.results.find((r) => r.id === selectedOption.resultId) || null;
        }
      }

      // Если результат не найден по ветвлению, возвращаем первый результат по умолчанию
      return config.results[0] || null;
    },
    [config.results]
  );

  /**
   * Переход к следующему вопросу
   */
  const goToNextQuestion = useCallback(
    (answer: QuizAnswer) => {
      setIsGoingBack(false);

      setState((prev) => {
        if (!prev.currentQuestion) return prev;

        // Обновляем или добавляем ответ
        const existingAnswerIndex = prev.answers.findIndex(
          (a) => a.questionId === answer.questionId
        );

        const newAnswers =
          existingAnswerIndex >= 0
            ? [
                ...prev.answers.slice(0, existingAnswerIndex),
                answer,
                ...prev.answers.slice(existingAnswerIndex + 1),
              ]
            : [...prev.answers, answer];

        // Добавляем текущий вопрос в историю
        const newHistory = [...prev.questionHistory, prev.currentQuestion.id];

        // Находим следующий вопрос или результат
        const nextQuestion = findNextQuestion(prev.currentQuestion, answer);
        const result = findResult(prev.currentQuestion, answer);

        // Если есть результат и нет следующего вопроса - завершаем квиз
        if (result && !nextQuestion) {
          onComplete?.(newAnswers);
          return {
            ...prev,
            answers: newAnswers,
            questionHistory: newHistory,
            currentQuestion: null,
            currentResult: result,
            isCompleted: true,
            totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
          };
        }

        // Переходим к следующему вопросу
        if (nextQuestion) {
          onQuestionChange?.(nextQuestion.id);
          return {
            ...prev,
            answers: newAnswers,
            questionHistory: newHistory,
            currentQuestion: nextQuestion,
            totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
          };
        }

        // Если нет ни следующего вопроса, ни результата - завершаем с дефолтным результатом
        const defaultResult = config.results[0];
        onComplete?.(newAnswers);
        return {
          ...prev,
          answers: newAnswers,
          questionHistory: newHistory,
          currentQuestion: null,
          currentResult: defaultResult,
          isCompleted: true,
          totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        };
      });
    },
    [findNextQuestion, findResult, onComplete, onQuestionChange, config.results]
  );

  /**
   * Возврат к предыдущему вопросу
   */
  const goToPreviousQuestion = useCallback(() => {
    setIsGoingBack(true);

    setState((prev) => {
      if (prev.questionHistory.length === 0) return prev;

      const previousQuestionId =
        prev.questionHistory[prev.questionHistory.length - 1];
      const previousQuestion = config.questions.find(
        (q) => q.id === previousQuestionId
      );

      if (!previousQuestion) return prev;

      // Удаляем последний вопрос из истории
      const newHistory = prev.questionHistory.slice(0, -1);

      // Удаляем ответ на текущий вопрос, если он был
      const newAnswers = prev.currentQuestion
        ? prev.answers.filter((a) => a.questionId !== prev.currentQuestion?.id)
        : prev.answers;

      onQuestionChange?.(previousQuestion.id);

      return {
        ...prev,
        currentQuestion: previousQuestion,
        questionHistory: newHistory,
        answers: newAnswers,
        currentResult: null,
        isCompleted: false,
        totalQuestionsAnswered: Math.max(0, prev.totalQuestionsAnswered - 1),
      };
    });
  }, [config.questions, onQuestionChange]);

  /**
   * Сброс квиза
   */
  const resetQuiz = useCallback(() => {
    setIsGoingBack(false);
    setState({
      currentQuestion: initialQuestion,
      answers: [],
      questionHistory: [],
      currentResult: null,
      isCompleted: false,
      totalQuestionsAnswered: 0,
    });
  }, [initialQuestion]);

  const value = useMemo(
    () => ({
      state,
      config,
      goToNextQuestion,
      goToPreviousQuestion,
      resetQuiz,
      isGoingBack,
    }),
    [state, config, goToNextQuestion, goToPreviousQuestion, resetQuiz, isGoingBack]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

/**
 * Hook для использования контекста квиза
 */
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
};

