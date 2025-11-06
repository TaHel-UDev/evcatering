/**
 * TimeSelector Component Configuration
 * 
 * Централизованная конфигурация стилей для компонента TimeSelector
 */

/**
 * Базовые стили для TimeSelector
 */
export const timeSelectorContainerStyles = {
  base: "bg-white rounded-lg border border-gray-200 shadow-lg p-4 min-w-[280px]",
};

/**
 * Стили для header
 */
export const timeSelectorHeaderStyles = {
  base: "text-center text-base font-semibold text-gray-900 mb-4",
};

/**
 * Стили для grid времени
 */
export const timeSelectorGridStyles = {
  base: "flex items-end justify-center gap-2",
  separator: "text-2xl font-bold text-gray-700 pb-2.5",
  column: "flex flex-col items-center gap-1.5",
  label: "text-xs font-medium text-gray-600 uppercase tracking-wide",
};

/**
 * Стили для input полей
 */
export const timeSelectorInputStyles = {
  input: "w-14 text-2xl font-semibold text-center text-gray-900 border-2 border-gray-300 rounded-lg py-2 px-1 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all hover:border-gray-400",
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface TimeSelectorStylesConfig {
  containerStyles?: typeof timeSelectorContainerStyles;
  headerStyles?: typeof timeSelectorHeaderStyles;
  gridStyles?: typeof timeSelectorGridStyles;
  inputStyles?: typeof timeSelectorInputStyles;
}
