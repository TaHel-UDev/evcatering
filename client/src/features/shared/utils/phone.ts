/**
 * Очищает телефон от всех символов кроме цифр и +
 * Пример: "+7 (495) 790-51-81" -> "+74957905181"
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

