import { useEffect } from 'react';
import { apply } from '@directus/visual-editing';
import { DIRECTUS_URL } from '../utils/visual-editing';

/**
 * Хук для инициализации Directus Visual Editor
 * Должен вызываться один раз на уровне приложения
 */
export function useVisualEditor() {
  useEffect(() => {
    // Проверяем, находимся ли мы в режиме визуального редактирования
    const isVisualEditingMode = 
      typeof window !== 'undefined' && 
      (window.location.search.includes('visual-editing=true') ||
       process.env.NODE_ENV === 'development');

    if (!isVisualEditingMode) {
      return;
    }

    let cleanup: (() => void) | undefined;

    // Инициализация Visual Editor
    const initVisualEditor = async () => {
      try {
        const { remove } = await apply({
          directusUrl: DIRECTUS_URL,
          // Добавляем кастомный класс для стилизации overlay элементов
          customClass: ['directus-editable'],
          // Callback после сохранения
          onSaved: ({ collection, item, payload }) => {
            console.log('Visual Editor: данные сохранены', { collection, item, payload });
            // Перезагружаем страницу для отображения изменений
            window.location.reload();
          },
        });

        cleanup = remove;
        console.log('Visual Editor инициализирован');
      } catch (error) {
        console.error('Ошибка инициализации Visual Editor:', error);
      }
    };

    initVisualEditor();

    // Очистка при размонтировании
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
}

