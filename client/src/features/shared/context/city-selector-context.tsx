import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CityOption } from '@/features/shared/types';

interface CitySelectorContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  cities: CityOption[];
  currentCity: CityOption | null;
  isMainPage: boolean;
}

const CitySelectorContext = createContext<CitySelectorContextType | undefined>(undefined);

export function CitySelectorProvider({ 
  children, 
  cities, 
  currentCity, 
  isMainPage 
}: { 
  children: ReactNode;
  cities: CityOption[];
  currentCity: CityOption | null;
  isMainPage: boolean;
}) {
  // Начинаем с закрытой модалки чтобы избежать hydration error
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Монтируем компонент только на клиенте
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Открываем модалку на главной странице после монтирования
  useEffect(() => {
    if (!isMounted || !isMainPage) return;

    // Проверяем, открыт ли сайт в iframe (Visual Editor)
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    
    // Проверяем параметр __directus_refresh__ в URL (признак Visual Editor)
    const urlParams = new URLSearchParams(window.location.search);
    const isInVisualEditor = urlParams.has('__directus_refresh__') || isInIframe;

    if (!isInVisualEditor) {
      console.log('🟢 ОТКРЫВАЮ МОДАЛКУ - ЭТО ГЛАВНАЯ СТРАНИЦА!');
      setIsOpen(true);
    } else {
      console.log('🔴 НЕ ОТКРЫВАЮ МОДАЛКУ - ОТКРЫТО В VISUAL EDITOR');
    }
  }, [isMounted, isMainPage]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    // На главной странице нельзя закрыть
    if (!isMainPage) {
      setIsOpen(false);
    }
  };

  return (
    <CitySelectorContext.Provider value={{ 
      isOpen, 
      openModal, 
      closeModal, 
      cities, 
      currentCity, 
      isMainPage 
    }}>
      {children}
    </CitySelectorContext.Provider>
  );
}

export function useCitySelector() {
  const context = useContext(CitySelectorContext);
  if (!context) {
    throw new Error('useCitySelector must be used within CitySelectorProvider');
  }
  return context;
}

