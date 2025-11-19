import { QuizConfig } from "@/features/shared/ui/quiz";

/**
 * Типы данных из Directus
 */
export interface DirectusQuiz {
  slug: string;
  title: string;
  description: string;
  show_progress: boolean;
  show_back_button: boolean;
  animated: boolean;
  form_title: string;
  form_description: string | null;
  start_question: {
    question_id: string;
  };
  questions: DirectusQuestion[];
  results: DirectusResult[];
}

export interface DirectusQuestion {
  question_id: string;
  title: string;
  description?: string | null;
  type: "single" | "multiple" | "text" | "boolean";
  placeholder?: string | null;
  required: boolean;
  options: DirectusOption[];
}

export interface DirectusOption {
  option_id: string;
  label: string;
  value: string;
  next_question_id?: string | null;
  result_id?: string | null;
}

export interface DirectusResult {
  result_id: string;
  title: string;
  description: string;
  button_text?: string;
}

/**
 * Преобразует данные из Directus в формат QuizConfig
 */
export function transformDirectusQuiz(directusData: DirectusQuiz): QuizConfig {
  return {
    startQuestionId: directusData.start_question?.question_id,

    questions: directusData.questions.map((q) => ({
      id: q.question_id,
      title: q.title,
      description: q.description || undefined,
      type: q.type,
      placeholder: q.placeholder || undefined,
      required: q.required,
      options: q.options?.map((opt) => ({
        id: opt.option_id,
        label: opt.label,
        value: opt.value,
        nextQuestionId: opt.next_question_id || undefined,
        resultId: opt.result_id || undefined,
      })),
    })),

    results: directusData.results.map((r) => ({
      id: r.result_id,
      title: r.title,
      description: r.description,
      buttonText: r.button_text || "Отправить",
    })),

    settings: {
      showProgress: directusData.show_progress,
      showBackButton: directusData.show_back_button,
      animated: directusData.animated,
    },
  };
}

