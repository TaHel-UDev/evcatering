import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../features/layout/main-layout";
import { useEffect } from "react";
import { initializeVisualEditor } from "../../lib/visual-editor";
import { CitySelectorProvider } from "@/features/shared/context/city-selector-context";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Инициализация Directus Visual Editor после монтирования компонента
    initializeVisualEditor();
  }, []);

  // Извлекаем данные для CitySelectorProvider и навигации из pageProps
  const { 
    cities = [], 
    franchise = null, 
    isMainPage = false, 
    hasCases = false,
    hasPlaces = false,
    hasReviews = false,
    ...restPageProps 
  } = pageProps;

  return (
    <CitySelectorProvider cities={cities} currentCity={franchise} isMainPage={isMainPage}>
      <MainLayout hasCases={hasCases} hasPlaces={hasPlaces} hasReviews={hasReviews}>
        <Component {...restPageProps} cities={cities} franchise={franchise} isMainPage={isMainPage} />
    </MainLayout>
    </CitySelectorProvider>
  )
}
