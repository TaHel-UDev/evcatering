import { setAttr as directusSetAttr } from '@directus/visual-editing';

/**
 * Утилита для генерации data-directus атрибутов для Visual Editor
 * @param collection - Название коллекции Directus
 * @param item - ID элемента
 * @param fields - Поле или массив полей для редактирования
 * @param mode - Режим отображения редактора ('drawer', 'modal', 'popover')
 */
export function setAttr({
  collection,
  item,
  fields,
  mode = 'drawer',
}: {
  collection: string;
  item: string | number;
  fields: string | string[];
  mode?: 'drawer' | 'modal' | 'popover';
}) {
  // Проверяем, находимся ли мы в режиме визуального редактирования
  // Это можно определить по query параметру или переменной окружения
  if (typeof window === 'undefined') {
    return undefined;
  }

  // Для безопасности, показываем атрибуты только в режиме редактирования
  const isVisualEditingMode = 
    window.location.search.includes('visual-editing=true') ||
    process.env.NODE_ENV === 'development';

  if (!isVisualEditingMode) {
    return undefined;
  }

  return directusSetAttr({ collection, item, fields, mode });
}

/**
 * URL вашего Directus инстанса
 */
export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS || 'http://localhost:8055';

