import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../features/layout/main-layout";
import { useVisualEditor } from "@/features/shared/hooks/useVisualEditor";

export default function App({ Component, pageProps }: AppProps) {
  // Инициализация Directus Visual Editor
  useVisualEditor();

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
