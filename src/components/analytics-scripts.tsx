import Script from "next/script"

// Each tracker loads only when its ID is set at build time (see .env.example).
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const gaId = process.env.NEXT_PUBLIC_GA_ID
const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

export function AnalyticsScripts() {
  const gtagIds = [gaId, adsId].filter(Boolean) as string[]

  return (
    <>
      {gtagIds.length > 0 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${gtagIds
              .map((id) => `gtag('config','${id}');`)
              .join("")}`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  )
}

/** GTM's loader script, rendered in <head> by the root layout. */
export const gtmSnippet = gtmId
  ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
  : null

/** GTM's <noscript> fallback; render as the first thing inside <body>. */
export function GtmNoScript() {
  if (!gtmId) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}
