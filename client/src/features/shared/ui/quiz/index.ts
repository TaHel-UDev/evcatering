/**
 * Quiz Component Exports
 */

export { Quiz, default } from "./quiz";
export { QuizQuestion } from "./quiz-question";
export { QuizResult } from "./quiz-result";
export { QuizProgress } from "./quiz-progress";
export { QuizProvider, useQuiz } from "./quiz-context";

export type {
  QuizProps,
  QuizConfig,
  QuizQuestion as QuizQuestionType,
  QuizOption,
  QuizResult as QuizResultType,
  QuizAnswer,
  QuizState,
  QuizSettings,
  QuizFormField,
  QuestionType,
  QuizQuestionProps,
  QuizResultProps,
  QuizProgressProps,
  TypedQuizConfig,
} from "./quiz-types";

export { createQuizConfig } from "./quiz-types";

export {
  quizContainerStyles,
  quizHeaderStyles,
  quizProgressStyles,
  quizQuestionStyles,
  quizOptionStyles,
  quizResultStyles,
  quizControlStyles,
  quizFormStyles,
  quizAnimations,
  defaultFormFields,
  type QuizStylesConfig,
} from "./quiz-config";

