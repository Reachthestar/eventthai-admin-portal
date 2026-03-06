import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./config";
import type { RequestConfig } from "next-intl/server";

export default getRequestConfig(
  async ({ requestLocale }): Promise<RequestConfig> => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  },
);
