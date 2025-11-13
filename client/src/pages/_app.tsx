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

  // Извлекаем данные для CitySelectorProvider из pageProps
  const { cities = [], franchise = null, isMainPage = false, ...restPageProps } = pageProps;

  return (
    <CitySelectorProvider cities={cities} currentCity={franchise} isMainPage={isMainPage}>
      <MainLayout>
        <Component {...restPageProps} cities={cities} franchise={franchise} isMainPage={isMainPage} />
      </MainLayout>
    </CitySelectorProvider>
  )
}
