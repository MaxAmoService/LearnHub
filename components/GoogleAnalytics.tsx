"use client";

import Script from "next/script";
import { getConsent } from "./CookieConsent";

const GA_MEASUREMENT_ID = "G-7GQD24BRCR";

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Consent Mode v2 — Default: denied (immer, DSGVO-konform) */}
      <Script id="google-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        `}
      </Script>

      {/* Google Analytics Library — Consent Mode v2 verhindert Tracking bei denied */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Nur config senden wenn Consent bereits erteilt wurde
          // Bei denied wird nur ein cookieless Ping gesendet (Consent Mode v2)
          var storedConsent = null;
          try { storedConsent = localStorage.getItem('learnhub-cookie-consent'); } catch(e) {}
          if (storedConsent === 'all') {
            gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted'
            });
          }
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
