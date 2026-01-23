/**
 * Quiz Component Types
 * 
 * Типы и интерфейсы для маркетингового квиза с ветвлением
 */

import { ReactNode } from "react";

/**
 * Тип вопроса
 */
export type QuestionType = "single" | "multiple" | "text" | "boolean";

/**
 * Утилитарный тип для извлечения ID из массива объектов
 */
type ExtractId<T extends readonly { id: string }[]> = T[number]["id"];

/**
 * Вариант ответа с типизированными ID для ветвления
 */
export interface QuizOption<
  QuestionIds extends string = string,
  ResultIds extends string = string
> {
  /**
   * Уникальный идентификатор варианта
   */
  id: string;

  /**
   * Текст варианта ответа
   */
  label: string;

  /**
   * Значение варианта (для отправки в форму)
   */
  value?: string | number | boolean;

  /**
   * ID следующего вопроса при выборе этого варианта
   * TypeScript подскажет доступные ID из вашего config
   */
  nextQuestionId?: QuestionIds;

  /**
   * ID результата для показа при выборе этого варианта
   * TypeScript подскажет доступные ID из вашего config
   */
  resultId?: ResultIds;

  /**
   * Иконка для варианта ответа
   */
  icon?: ReactNode;
}

/**
 * Вопрос квиза с типизированными ID для ветвления
 */
export interface QuizQuestion<
  QuestionIds extends string = string,
  ResultIds extends string = string
> {
  /**
   * Уникальный идентификатор вопроса
   */
  id: string;

  /**
   * Заголовок вопроса
   */
  title: string;

  /**
   * Описание или дополнительный текст
   */
  description?: string;

  /**
   * Тип вопроса
   * @default "single"
   */
  type?: QuestionType;

  /**
   * Варианты ответов (для типов single, multiple, boolean)
   */
  options?: QuizOption<QuestionIds, ResultIds>[];

  /**
   * Placeholder для текстового ответа (для типа text)
   */
  placeholder?: string;

  /**
   * Обязательный ли вопрос
   * @default true
   */
  required?: boolean;

  /**
   * Изображение для вопроса
   */
  image?: string;

  /**
   * Функция валидации (для текстовых ответов)
   */
  validate?: (value: string) => boolean | string;
}

/**
 * Результат квиза
 */
export interface QuizResult {
  /**
   * Уникальный идентификатор результата
   */
  id: string;

  /**
   * Заголовок результата
   */
  title: string;

  /**
   * Описание результата
   */
  description?: string;

  /**
   * Изображение для результата
   */
  image?: string;

  /**
   * Дополнительный контент (React элемент)
   */
  content?: ReactNode;

  /**
   * Текст кнопки для показа формы
   * @default "Получить консультацию"
   */
  buttonText?: string;

  /**
   * Показывать ли форму сразу вместо кнопки
   * @default false
   */
  showInlineForm?: boolean;
}

/**
 * JSON конфигурация квиза (базовый тип без строгой типизации)
 */
export interface QuizConfig {
  /**
   * ID начального вопроса
   */
  startQuestionId?: string;

  /**
   * Массив вопросов
   */
  questions: QuizQuestion[];

  /**
   * Массив результатов
   */
  results: QuizResult[];

  /**
   * Настройки отображения
   */
  settings?: QuizSettings;
}

/**
 * Типизированная конфигурация квиза с автодополнением ID
 * 
 * @example
 * ```typescript
 * const config = {
 *   questions: [
 *     { id: "q1", title: "Вопрос 1", type: "single", options: [...] },
 *     { id: "q2", title: "Вопрос 2", type: "single", options: [...] },
 *   ],
 *   results: [
 *     { id: "result1", title: "Результат 1" },
 *     { id: "result2", title: "Результат 2" },
 *   ],
 * } as const;
 * 
 * type Config = TypedQuizConfig<typeof config>;
 * // Теперь nextQuestionId будет "q1" | "q2"
 * // А resultId будет "result1" | "result2"
 * ```
 */
export type TypedQuizConfig<T extends QuizConfig> = {
  startQuestionId?: ExtractId<T["questions"]>;
  questions: Array<
    QuizQuestion<ExtractId<T["questions"]>, ExtractId<T["results"]>> & {
      id: ExtractId<T["questions"]>;
    }
  >;
  results: Array<QuizResult & { id: ExtractId<T["results"]> }>;
  settings?: QuizSettings;
};

/**
 * Хелпер-функция для создания типизированного конфига
 * Автоматически выводит типы ID из вашей конфигурации
 * 
 * @example
 * ```typescript
 * const config = createQuizConfig({
 *   questions: [
 *     {
 *       id: "start",
 *       title: "Есть сайт?",
 *       type: "boolean",
 *       options: [
 *         {
 *           id: "yes",
 *           label: "Да",
 *           nextQuestionId: "improve", // ← TypeScript подскажет: "start" | "improve" | "create"
 *         },
 *       ],
 *     },
 *     { id: "improve", title: "Что улучшить?", type: "text" },
 *     { id: "create", title: "Какой тип?", type: "single", options: [...] },
 *   ],
 *   results: [
 *     { id: "result1", title: "Результат 1" },
 *   ],
 * });
 * ```
 */
export function createQuizConfig<
  const Questions extends readonly QuizQuestion[],
  const Results extends readonly QuizResult[]
>(config: {
  questions: Questions;
  results: Results;
  startQuestionId?: ExtractId<Questions>;
  settings?: QuizSettings;
}): {
  questions: Array<
    QuizQuestion<ExtractId<Questions>, ExtractId<Results>> & {
      id: ExtractId<Questions>;
    }
  >;
  results: Array<QuizResult & { id: ExtractId<Results> }>;
  startQuestionId?: ExtractId<Questions>;
  settings?: QuizSettings;
} {
  return config as any;
}

/**
 * Настройки квиза
 */
export interface QuizSettings {
  /**
   * Показывать ли прогресс-бар
   * @default true
   */
  showProgress?: boolean;

  /**
   * Показывать ли кнопку "Назад"
   * @default true
   */
  showBackButton?: boolean;

  /**
   * Анимация переходов
   * @default true
   */
  animated?: boolean;

  /**
   * Заголовок квиза
   */
  title?: string;

  /**
   * Описание квиза
   */
  description?: string;
}

/**
 * Ответ пользователя
 */
export interface QuizAnswer {
  /**
   * ID вопроса
   */
  questionId: string;

  /**
   * Заголовок вопроса
   */
  questionTitle: string;

  /**
   * Значение ответа (может быть строкой, массивом или булевым)
   */
  value: string | string[] | boolean;

  /**
   * Метки выбранных вариантов (для удобства чтения)
   */
  labels?: string[];
}

/**
 * Состояние квиза
 */
export interface QuizState {
  /**
   * Текущий вопрос
   */
  currentQuestion: QuizQuestion | null;

  /**
   * Все ответы пользователя
   */
  answers: QuizAnswer[];

  /**
   * История вопросов (для кнопки "Назад")
   */
  questionHistory: string[];

  /**
   * Текущий результат (если квиз завершен)
   */
  currentResult: QuizResult | null;

  /**
   * Завершен ли квиз
   */
  isCompleted: boolean;

  /**
   * Общее количество пройденных вопросов
   */
  totalQuestionsAnswered: number;
}

/**
 * Свойства компонента Quiz
 */
export interface QuizProps {
  /**
   * JSON конфигурация квиза
   */
  config: QuizConfig;

  /**
   * Callback при завершении квиза
   * Получает массив всех ответов
   */
  onComplete?: (answers: QuizAnswer[]) => void;

  /**
   * Callback при изменении текущего вопроса
   */
  onQuestionChange?: (questionId: string) => void;

  /**
   * Callback при отправке формы заявки
   * Получает данные формы и все ответы квиза
   */
  onSubmit?: (formData: Record<string, any>, answers: QuizAnswer[]) => void;

  /**
   * Поля формы для заявки
   * Если не указано, используются стандартные поля (имя, телефон, email)
   */
  formFields?: QuizFormField[];

  /**
   * Заголовок формы заявки
   * @default "Оставьте заявку"
   */
  formTitle?: string;

  /**
   * Описание формы заявки
   */
  formDescription?: string;

  /**
   * Дополнительные CSS классы
   */
  className?: string;

  /**
   * Callback при сбросе квиза
   */
  onReset?: () => void;
}

/**
 * Поле формы заявки
 */
export interface QuizFormField {
  /**
   * Имя поля
   */
  name: string;

  /**
   * Лейбл поля
   */
  label: string;

  /**
   * Тип поля
   */
  type: "text" | "email" | "tel" | "textarea";

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Обязательное ли поле
   * @default false
   */
  required?: boolean;

  /**
   * Функция валидации
   */
  validate?: (value: string) => boolean | string;
}

/**
 * Свойства компонента QuizQuestion
 */
export interface QuizQuestionProps {
  /**
   * Данные вопроса
   */
  question: QuizQuestion;

  /**
   * Текущий ответ (если есть)
   */
  currentAnswer?: QuizAnswer;

  /**
   * Callback при выборе ответа
   */
  onAnswer: (answer: QuizAnswer) => void;

  /**
   * Показывать ли анимацию
   */
  animated?: boolean;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Свойства компонента QuizResult
 */
export interface QuizResultProps {
  /**
   * Данные результата
   */
  result: QuizResult;

  /**
   * Все ответы пользователя
   */
  answers: QuizAnswer[];

  /**
   * Callback при клике на кнопку формы
   */
  onFormOpen: () => void;

  /**
   * Callback при сбросе квиза
   */
  onReset?: () => void;

  /**
   * Callback при отправке формы
   */
  onSubmit?: (formData: Record<string, any>, answers: QuizAnswer[]) => void;

  /**
   * Поля формы
   */
  formFields?: QuizFormField[];

  /**
   * Показывать ли анимацию
   */
  animated?: boolean;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Свойства компонента QuizProgress
 */
export interface QuizProgressProps {
  /**
   * Текущее количество пройденных вопросов
   */
  current: number;

  /**
   * Общее количество вопросов
   */
  total: number;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

