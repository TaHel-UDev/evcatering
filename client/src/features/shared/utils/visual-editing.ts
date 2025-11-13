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
  // Проверяем, находимся ли мы на сервере (SSR)
  if (typeof window === 'undefined') {
    return undefined;
  }

  // Генерируем атрибут для Visual Editor
  // Важно: атрибуты будут работать только когда страница открыта внутри iframe Directus
  return directusSetAttr({ collection, item, fields, mode });
}

/**
 * URL вашего Directus инстанса
 */
export const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS || 'http://localhost:8055';

