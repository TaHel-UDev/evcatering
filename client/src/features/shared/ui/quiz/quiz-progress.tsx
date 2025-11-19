/**
 * QuizProgress Component
 * 
 * Компонент индикатора прогресса квиза
 */

import React from "react";
import { motion } from "motion/react";
import { QuizProgressProps } from "./quiz-types";
import { quizProgressStyles } from "./quiz-config";

/**
 * Компонент QuizProgress
 */
export const QuizProgress: React.FC<QuizProgressProps> = ({
  current,
  total,
  className = "",
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  const containerClasses = [quizProgressStyles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className={quizProgressStyles.bar}>
        <motion.div
          className={quizProgressStyles.fill}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className={quizProgressStyles.text}>
        Вопрос {current} из {total}
      </p>
    </div>
  );
};

QuizProgress.displayName = "QuizProgress";

export default QuizProgress;

