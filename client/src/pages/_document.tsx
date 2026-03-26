import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // Получаем хост из заголовков запроса
    const host = ctx.req?.headers.host || "";
    return { ...initialProps, host };
  }

  render() {
    const { host } = this.props as any;
    const subdomain = host ? host.split('.')[0] : '';
    
    // Определяем ключ AutoSchema в зависимости от поддомена
    // site.ru (основной) или другие -> sk_b74711a2cbe8b68e75b9afff01ecd1e0
    // msk.site.ru -> sk_b4ba75b52b2562d7d65e2f6ad3d2db3b
    const autoSchemaKey = subdomain === 'msk' 
      ? 'sk_b4ba75b52b2562d7d65e2f6ad3d2db3b' 
      : 'sk_b74711a2cbe8b68e75b9afff01ecd1e0';

    return (
      <Html lang="ru">
        <Head>
          {/* AutoSchema ONE-TIME STATIC MODE (CDN-only) */}
          <script
            src="https://www.autoschema.app/cdn/s.js"
            data-key={autoSchemaKey}
            data-api="https://www.autoschema.app"
            data-static-base="https://cdn.autoschema.app/schemas"
            data-static-only="1"
            async
          ></script>
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
