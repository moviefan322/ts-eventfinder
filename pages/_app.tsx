import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
