import Modal from "@/features/shared/ui/modal";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import { useCitySelector } from "@/features/shared/context/city-selector-context";
import { CityOption } from "@/features/shared/types";

export default function CitySelectorModal() {
  const { isOpen, closeModal, cities, currentCity, isMainPage } = useCitySelector();

  const handleCitySelect = (city: CityOption) => {
    // Редирект на поддомен выбранного города
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // Определяем базовый домен (убираем поддомен если есть)
    const parts = hostname.split('.');
    const baseDomain = parts.length > 2 ? parts.slice(-2).join('.') : hostname;
    
    // Формируем новый URL
    const newUrl = `${protocol}//${city.subdomain}.${baseDomain}`;
    
    window.location.href = newUrl;
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
      title="Выберите ваш город"
      size="lg"
      closeOnBackdropClick={!isMainPage}
      closeOnEscape={!isMainPage}
      showCloseButton={!isMainPage}
    >
      <div className="flex flex-col gap-4 p-6">
        <Text as="p" variant="body-large" className="text-center mb-4">
          {isMainPage 
            ? "Для продолжения выберите ваш город" 
            : "Сменить город"}
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cities.map((city) => (
            <Button
              key={city.id}
              variant={currentCity?.id === city.id ? "primary" : "secondary"}
              size="md"
              fullWidth
              onClick={() => handleCitySelect(city)}
            >
              {city.name}
            </Button>
          ))}
        </div>

        {isMainPage && (
          <Text as="p" variant="body-small" className="text-center text-gray-500 mt-4">
            * Выбор города обязателен для продолжения
          </Text>
        )}
      </div>
    </Modal>
  );
}

