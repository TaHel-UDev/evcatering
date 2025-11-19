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
  header: "space-y-2",
  title: "text-xl md:text-2xl font-semibold text-gray-900",
  description: "text-gray-600",
  image: "w-full h-48 object-cover rounded-lg mb-4",
  optionsContainer: "space-y-3",
  textInput: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
  textarea: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none min-h-[120px]",
  error: "text-red-500 text-sm mt-1",
};

/**
 * Стили для вариантов ответов
 */
export const quizOptionStyles = {
  base: "flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-green hover:bg-green/20",
  selected: "border-brown bg-green/20",
  disabled: "opacity-50 cursor-not-allowed",
  checkbox: "w-5 h-5 accent-green cursor-pointer",
  radio: "w-5 h-5 accent-green cursor-pointer",
  icon: "flex-shrink-0",
  label: "flex-1 text-gray-900 font-medium",
};

/**
 * Стили для результата
 */
export const quizResultStyles = {
  container: "space-y-6 text-center",
  image: "w-full max-w-md mx-auto h-64 object-cover rounded-lg mb-6",
  title: "text-2xl md:text-3xl font-bold text-gray-900 mb-4",
  description: "text-gray-600 text-lg mb-6",
  content: "text-left",
  answersContainer: "bg-gray-50 rounded-lg p-4 mb-6 hidden",
  answersTitle: "font-semibold text-gray-900 mb-3",
  answerItem: "mb-2 text-sm",
  answerQuestion: "font-medium text-gray-700",
  answerValue: "text-gray-600 ml-2",
};

/**
 * Стили для кнопок управления
 */
export const quizControlStyles = {
  container: "flex justify-between items-center mt-8",
  buttonContainer: "flex gap-3",
  backButton: "px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors",
  nextButton: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
  submitButton: "px-8 py-4 bg-green text-white text-lg font-semibold rounded-lg hover:bg-green/80 active:bg-green/80 transition-all shadow-lg",
  resetButton: "px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors text-sm",
};

/**
 * Стили для формы заявки
 */
export const quizFormStyles = {
  container: "space-y-4",
  field: "space-y-2",
  label: "block text-sm font-medium text-gray-700",
  input: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
  textarea: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none min-h-[100px]",
  error: "text-red-500 text-sm",
  answersSection: "bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto",
  answersTitle: "font-semibold text-gray-900 mb-2 text-sm",
  answersList: "space-y-1 text-sm",
  submitButton: "w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
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

