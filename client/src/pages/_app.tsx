import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../features/layout/main-layout";
import { useEffect } from "react";
import { initializeVisualEditor } from "../../lib/visual-editor";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Инициализация Directus Visual Editor после монтирования компонента
    initializeVisualEditor();
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
