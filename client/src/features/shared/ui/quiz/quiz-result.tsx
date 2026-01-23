/**
 * QuizResult Component
 * 
 * Компонент для отображения результата квиза
 */

import React from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { QuizResultProps } from "./quiz-types";
import { quizResultStyles, quizAnimations, quizControlStyles } from "./quiz-config";
import { QuizForm } from "./quiz-form";

/**
 * Компонент QuizResult
 */
export const QuizResult: React.FC<QuizResultProps> = ({
  result,
  answers,
  onFormOpen,
  onReset,
  onSubmit,
  formFields,
  animated = true,
  className = "",
}) => {
  const containerClasses = [quizResultStyles.container, className]
    .filter(Boolean)
    .join(" ");

  const AnimationWrapper = animated ? motion.div : "div";
  const animationProps = animated
    ? {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants: quizAnimations.resultEnter,
    }
    : {};

  return (
    <AnimationWrapper className={containerClasses} {...animationProps}>
      {/* Изображение результата */}
      {result.image && (
        <motion.img
          src={result.image}
          alt={result.title}
          className={quizResultStyles.image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
      )}

      {/* Заголовок */}
      <motion.h2
        className={quizResultStyles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {result.title}
      </motion.h2>

      {/* Описание */}
      {result.description && (
        <motion.p
          className={quizResultStyles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {result.description}
        </motion.p>
      )}

      {/* Дополнительный контент */}
      {result.content && (
        <motion.div
          className={quizResultStyles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {result.content}
        </motion.div>
      )}

      {/* Ответы пользователя */}
      {answers.length > 0 && (
        <motion.div
          className={quizResultStyles.answersContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <h3 className={quizResultStyles.answersTitle}>Ваши ответы:</h3>
          {answers.map((answer, index) => (
            <div key={index} className={quizResultStyles.answerItem}>
              <span className={quizResultStyles.answerQuestion}>
                {answer.questionTitle}:
              </span>
              <span className={quizResultStyles.answerValue}>
                {Array.isArray(answer.value)
                  ? answer.labels?.join(", ") || answer.value.join(", ")
                  : typeof answer.value === "boolean"
                    ? answer.value
                      ? "Да"
                      : "Нет"
                    : answer.labels?.[0] || answer.value}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Форма или кнопка */}
      {result.showInlineForm ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6 text-left"
        >
          <QuizForm
            answers={answers}
            result={result}
            onSubmit={onSubmit}
            submitButtonText={result.buttonText || "Отправить заявку"}
            // Используем переданные formFields, если они есть.
            // Если нет, используем дефолтные hardcoded (как было раньше для обратной совместимости, если formFields не переданы)
            // Но лучше если formFields передаются сверху. 
            // В данном случае мы приоритет отдаем пропу formFields
            formFields={formFields || [
              { name: "city", label: "Город", type: "text", required: false }, // Fallback если не переданы
              { name: "name", label: "Имя", type: "text", required: true },
              { name: "phone", label: "Телефон", type: "tel", required: true },
            ]}
          />
        </motion.div>
      ) : (
        <motion.button
          onClick={onFormOpen}
          className={quizControlStyles.submitButton}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {result.buttonText || "Получить консультацию"}
        </motion.button>
      )}

      {/* Кнопка сброса */}
      {onReset && (
        <motion.button
          onClick={onReset}
          className={quizControlStyles.resetButton}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <RotateCcw size={16} className="inline mr-1" />
          Пройти заново
        </motion.button>
      )}
    </AnimationWrapper>
  );
};

QuizResult.displayName = "QuizResult";

export default QuizResult;

