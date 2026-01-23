/**
 * Quiz Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Quiz
 */

import { Variants } from "motion/react";

/**
 * Базовые стили контейнера квиза
 */
export const quizContainerStyles = {
  base: "w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden",
  padding: "p-6 md:p-8",
};

/**
 * Стили заголовка квиза
 */
export const quizHeaderStyles = {
  container: "mb-6",
  title: "text-2xl md:text-3xl font-bold text-gray-900 mb-2",
  description: "text-gray-600",
};

/**
 * Стили для прогресс-бара
 */
export const quizProgressStyles = {
  container: "mb-8",
  bar: "w-full h-2 bg-gray-200 rounded-full overflow-hidden",
  fill: "h-full bg-green transition-all duration-500 ease-out",
  text: "mt-2 text-sm text-gray-600 text-center",
};

/**
 * Стили для вопроса
 */
export const quizQuestionStyles = {
  container: "space-y-6",
  header: "space-y-4",
  title: "text-2xl md:text-3xl font-bold text-dark leading-tight",
  description: "text-lg text-gray-500",
  image: "w-full h-56 object-cover rounded-xl mb-6 shadow-md",
  optionsContainer: "space-y-3",
  textInput: "w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all bg-white",
  textarea: "w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all resize-none min-h-[140px] bg-white",
  error: "text-red-500 text-sm mt-2 font-medium",
};

/**
 * Стили для вариантов ответов
 */
export const quizOptionStyles = {
  base: "group flex items-center gap-4 p-5 border border-gray-200 rounded-xl cursor-pointer transition-all hover:border-green/50 hover:bg-green/5 hover:shadow-md bg-white",
  selected: "border-green bg-green/10 shadow-sm",
  disabled: "opacity-50 cursor-not-allowed",
  checkbox: "w-6 h-6 accent-green cursor-pointer text-green rounded focus:ring-green",
  radio: "w-6 h-6 accent-green cursor-pointer text-green focus:ring-green",
  icon: "flex-shrink-0 text-gray-400 group-hover:text-green transition-colors",
  label: "flex-1 text-dark font-medium text-lg",
};

/**
 * Стили для результата
 */
export const quizResultStyles = {
  container: "space-y-8 text-center py-4",
  image: "w-full max-w-md mx-auto h-64 object-cover rounded-2xl mb-8 shadow-lg",
  title: "text-3xl md:text-4xl font-bold text-brown mb-4",
  description: "text-gray-600 text-xl mb-8 leading-relaxed",
  content: "text-left",
  answersContainer: "bg-white rounded-2xl p-6 mb-8 hidden shadow-sm",
  answersTitle: "font-semibold text-dark mb-4",
  answerItem: "mb-3 text-sm flex justify-between border-b border-gray-100 pb-2 last:border-0",
  answerQuestion: "font-medium text-gray-500 text-left w-2/3 pr-4",
  answerValue: "text-dark font-medium text-right w-1/3",
};

/**
 * Стили для кнопок управления
 */
export const quizControlStyles = {
  container: "flex justify-between items-center mt-10",
  buttonContainer: "flex gap-4",
  backButton: "px-6 py-3 text-gray-500 hover:text-brown transition-colors font-medium flex items-center gap-2",
  nextButton: "px-8 py-4 bg-brown text-white text-lg font-medium rounded-xl hover:bg-brown/90 active:bg-brown/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5",
  submitButton: "px-10 py-5 bg-green text-white text-xl font-bold rounded-xl hover:bg-green/90 active:bg-green/95 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full md:w-auto",
  resetButton: "px-4 py-2 text-gray-400 hover:text-brown transition-colors text-sm flex items-center gap-1 mx-auto mt-4",
};

/**
 * Стили для формы заявки
 */
export const quizFormStyles = {
  container: "space-y-6",
  field: "space-y-2",
  label: "block text-sm font-semibold text-gray-700 ml-1",
  input: "w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all bg-white",
  textarea: "w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green transition-all resize-none min-h-[120px] bg-white",
  error: "text-red-500 text-xs mt-1 ml-1",
  answersSection: "bg-soft-gray/30 rounded-xl p-5 border border-gray-100",
  answersTitle: "font-bold text-dark mb-3 text-base",
  answersList: "space-y-2 text-sm text-gray-600",
  submitButton: "w-full px-8 py-4 bg-brown text-white text-lg font-bold rounded-xl hover:bg-brown/90 active:bg-brown/95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
};

/**
 * Анимации для квиза
 */
export const quizAnimations = {
  /**
   * Анимация появления вопроса
   */
  questionEnter: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.3 },
  } as Variants,

  /**
   * Анимация появления вопроса при возврате назад
   */
  questionEnterBack: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.3 },
  } as Variants,

  /**
   * Анимация появления результата
   */
  resultEnter: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.4 },
  } as Variants,

  /**
   * Анимация варианта ответа
   */
  optionHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },

  /**
   * Анимация клика на вариант
   */
  optionTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

/**
 * Стандартные поля формы
 */
export const defaultFormFields = [
  {
    name: "name",
    label: "Имя",
    type: "text" as const,
    placeholder: "Введите ваше имя",
    required: true,
  },
  {
    name: "phone",
    label: "Телефон",
    type: "tel" as const,
    placeholder: "+7 (999) 123-45-67",
    required: true,
    validate: (value: string) => {
      const phoneRegex = /^[\d\s+()-]+$/;
      return phoneRegex.test(value) || "Введите корректный номер телефона";
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "example@mail.com",
    required: false,
    validate: (value: string) => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || "Введите корректный email";
    },
  },
  {
    name: "comment",
    label: "Комментарий",
    type: "textarea" as const,
    placeholder: "Дополнительная информация (необязательно)",
    required: false,
  },
];

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface QuizStylesConfig {
  containerStyles?: typeof quizContainerStyles;
  headerStyles?: typeof quizHeaderStyles;
  progressStyles?: typeof quizProgressStyles;
  questionStyles?: typeof quizQuestionStyles;
  optionStyles?: typeof quizOptionStyles;
  resultStyles?: typeof quizResultStyles;
  controlStyles?: typeof quizControlStyles;
  formStyles?: typeof quizFormStyles;
  animations?: typeof quizAnimations;
}

