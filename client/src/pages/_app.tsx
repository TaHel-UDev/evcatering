import "@/styles/globals.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import type { AppProps } from "next/app";
import MainLayout from "../features/layout/main-layout";
import { useEffect } from "react";
import { initializeVisualEditor } from "../../lib/visual-editor";
import { CitySelectorProvider } from "@/features/shared/context/city-selector-context";
import { YandexMetricaProvider } from 'next-yandex-metrica';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Инициализация Directus Visual Editor после монтирования компонента
    initializeVisualEditor();

    // Инициализация Fancybox глобально
    import("@fancyapps/ui").then((module) => {
      const { Fancybox } = module;
      Fancybox.bind("[data-fancybox]", {
        // Опции Fancybox
      });
    });

    return () => {
      import("@fancyapps/ui").then((module) => {
        const { Fancybox } = module;
        Fancybox.destroy();
      });
    };
  }, []);

  // Извлекаем данные для CitySelectorProvider и навигации из pageProps
  const { 
    cities = [], 
    franchise = null, 
    isMainPage = false, 
    hasCases = false,
    hasPlaces = false,
    hasReviews = false,
    franchiseEmail = undefined,
    metrikaCode = null,
    ...restPageProps 
  } = pageProps;

  // Определяем код метрики: для франчайзи берем из franchise.code, для франшизы из metrikaCode
  const yandexMetricaId = franchise?.code || metrikaCode;

  // Контент приложения
  const appContent = (
    <CitySelectorProvider cities={cities} currentCity={franchise} isMainPage={isMainPage}>
      <MainLayout hasCases={hasCases} hasPlaces={hasPlaces} hasReviews={hasReviews} franchiseEmail={franchiseEmail}>
        <Component {...restPageProps} cities={cities} franchise={franchise} isMainPage={isMainPage} />
      </MainLayout>
    </CitySelectorProvider>
  );

  // Если есть код метрики - оборачиваем в провайдер, иначе возвращаем как есть
  if (yandexMetricaId) {
    return (
      <YandexMetricaProvider
        tagID={parseInt(yandexMetricaId)}
        initParameters={{ 
          clickmap: true, 
          trackLinks: true, 
          accurateTrackBounce: true,
          webvisor: true 
        }}
        router="pages"
      >
        {appContent}
      </YandexMetricaProvider>
    );
  }

  return appContent;
}
