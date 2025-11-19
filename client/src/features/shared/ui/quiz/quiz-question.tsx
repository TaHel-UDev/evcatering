/**
 * QuizQuestion Component
 * 
 * Компонент для отображения вопроса квиза
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QuizQuestionProps, QuizAnswer } from "./quiz-types";
import {
  quizQuestionStyles,
  quizOptionStyles,
  quizAnimations,
} from "./quiz-config";

/**
 * Компонент QuizQuestion
 */
export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentAnswer,
  onAnswer,
  animated = true,
  className = "",
}) => {
  const [textValue, setTextValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  // Инициализируем значение из currentAnswer
  useEffect(() => {
    if (currentAnswer) {
      if (question.type === "text") {
        setTextValue(currentAnswer.value as string);
      } else if (question.type === "multiple") {
        setSelectedOptions(currentAnswer.value as string[]);
      } else if (question.type === "single" || question.type === "boolean") {
        setSelectedOptions([currentAnswer.value as string]);
      }
    } else {
      setTextValue("");
      setSelectedOptions([]);
      setError("");
    }
  }, [question.id, currentAnswer, question.type]);

  /**
   * Обработчик выбора варианта (single/boolean)
   */
  const handleSingleSelect = (optionId: string, optionLabel: string, optionValue?: any) => {
    setError("");
    const answer: QuizAnswer = {
      questionId: question.id,
      questionTitle: question.title,
      value: optionValue !== undefined ? optionValue : optionId,
      labels: [optionLabel],
    };
    onAnswer(answer);
  };

  /**
   * Обработчик выбора нескольких вариантов (multiple)
   */
  const handleMultipleSelect = (optionId: string, optionLabel: string, optionValue?: any) => {
    setError("");
    const value = optionValue !== undefined ? optionValue : optionId;
    
    let newSelected: string[];
    let newLabels: string[];
    
    if (selectedOptions.includes(value)) {
      newSelected = selectedOptions.filter((id) => id !== value);
      newLabels = question.options
        ?.filter((opt) => newSelected.includes(opt.value !== undefined ? opt.value as string : opt.id))
        .map((opt) => opt.label) || [];
    } else {
      newSelected = [...selectedOptions, value];
      newLabels = question.options
        ?.filter((opt) => newSelected.includes(opt.value !== undefined ? opt.value as string : opt.id))
        .map((opt) => opt.label) || [];
    }

    setSelectedOptions(newSelected);

    // Автоматически не отправляем ответ, ждем кнопку "Далее"
  };

  /**
   * Обработчик текстового ввода
   */
  const handleTextChange = (value: string) => {
    setTextValue(value);
    setError("");
  };

  /**
   * Валидация и отправка текстового ответа
   */
  const handleTextSubmit = () => {
    if (question.required && !textValue.trim()) {
      setError("Это поле обязательно для заполнения");
      return;
    }

    if (question.validate) {
      const validationResult = question.validate(textValue);
      if (validationResult !== true) {
        setError(typeof validationResult === "string" ? validationResult : "Некорректное значение");
        return;
      }
    }

    const answer: QuizAnswer = {
      questionId: question.id,
      questionTitle: question.title,
      value: textValue,
    };
    onAnswer(answer);
  };

  /**
   * Отправка множественного выбора
   */
  const handleMultipleSubmit = () => {
    if (question.required && selectedOptions.length === 0) {
      setError("Выберите хотя бы один вариант");
      return;
    }

    const labels = question.options
      ?.filter((opt) => selectedOptions.includes(opt.value !== undefined ? opt.value as string : opt.id))
      .map((opt) => opt.label) || [];

    const answer: QuizAnswer = {
      questionId: question.id,
      questionTitle: question.title,
      value: selectedOptions,
      labels,
    };
    onAnswer(answer);
  };

  const containerClasses = [quizQuestionStyles.container, className]
    .filter(Boolean)
    .join(" ");

  const AnimationWrapper = animated ? motion.div : "div";
  const animationProps = animated
    ? {
        initial: "initial",
        animate: "animate",
        exit: "exit",
        variants: quizAnimations.questionEnter,
      }
    : {};

  return (
    <AnimationWrapper className={containerClasses} {...animationProps}>
      {/* Изображение */}
      {question.image && (
        <img
          src={question.image}
          alt={question.title}
          className={quizQuestionStyles.image}
        />
      )}

      {/* Заголовок и описание */}
      <div className={quizQuestionStyles.header}>
        <h3 className={quizQuestionStyles.title}>{question.title}</h3>
        {question.description && (
          <p className={quizQuestionStyles.description}>{question.description}</p>
        )}
      </div>

      {/* Варианты ответов */}
      {(question.type === "single" || question.type === "boolean") && (
        <div className={quizQuestionStyles.optionsContainer}>
          {question.options?.map((option) => {
            const isSelected = selectedOptions.includes(
              option.value !== undefined ? (option.value as string) : option.id
            );

            const optionClasses = [
              quizOptionStyles.base,
              isSelected && quizOptionStyles.selected,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <motion.div
                key={option.id}
                className={optionClasses}
                onClick={() => handleSingleSelect(option.id, option.label, option.value)}
                whileHover={quizAnimations.optionHover}
                whileTap={quizAnimations.optionTap}
              >
                {option.icon && (
                  <span className={quizOptionStyles.icon}>{option.icon}</span>
                )}
                <input
                  type="radio"
                  name={question.id}
                  checked={isSelected}
                  onChange={() => {}}
                  className={quizOptionStyles.radio}
                />
                <span className={quizOptionStyles.label}>{option.label}</span>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Множественный выбор */}
      {question.type === "multiple" && (
        <>
          <div className={quizQuestionStyles.optionsContainer}>
            {question.options?.map((option) => {
              const isSelected = selectedOptions.includes(
                option.value !== undefined ? (option.value as string) : option.id
              );

              const optionClasses = [
                quizOptionStyles.base,
                isSelected && quizOptionStyles.selected,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <motion.div
                  key={option.id}
                  className={optionClasses}
                  onClick={() => handleMultipleSelect(option.id, option.label, option.value)}
                  whileHover={quizAnimations.optionHover}
                  whileTap={quizAnimations.optionTap}
                >
                  {option.icon && (
                    <span className={quizOptionStyles.icon}>{option.icon}</span>
                  )}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className={quizOptionStyles.checkbox}
                  />
                  <span className={quizOptionStyles.label}>{option.label}</span>
                </motion.div>
              );
            })}
          </div>
          <button
            onClick={handleMultipleSubmit}
            className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={question.required && selectedOptions.length === 0}
          >
            Продолжить
          </button>
        </>
      )}

      {/* Текстовый ввод */}
      {question.type === "text" && (
        <>
          <textarea
            value={textValue}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder={question.placeholder}
            className={quizQuestionStyles.textarea}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleTextSubmit();
              }
            }}
          />
          <button
            onClick={handleTextSubmit}
            className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={question.required && !textValue.trim()}
          >
            Продолжить
          </button>
        </>
      )}

      {/* Ошибка валидации */}
      <AnimatePresence>
        {error && (
          <motion.p
            className={quizQuestionStyles.error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </AnimationWrapper>
  );
};

QuizQuestion.displayName = "QuizQuestion";

export default QuizQuestion;

