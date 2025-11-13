/**
 * Типы для метаданных главной страницы
 */

/**
 * Данные метаинформации страницы
 */
export interface MainPageMetaData {
  /** ID записи */
  id: number;
  /** Заголовок страницы */
  title: string;
  /** Описание страницы для SEO */
  description: string;
  /** Ключевые слова для SEO */
  keywords: string;
}

/**
 * Ответ от API с метаданными
 */
export interface MainPageMetaDataResponse {
  data: MainPageMetaData;
}

