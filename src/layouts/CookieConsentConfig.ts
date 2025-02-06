import type { CookieConsentConfig } from 'vanilla-cookieconsent';

// Extend the Window interface to include the dataLayer object
declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    dataLayer: Record<string, any>[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    gtag: (...args: any[]) => void;
  }
}


export const config: CookieConsentConfig = {
  // Indicate the consent to live in the #cc-container element
  root: "#cc-container",
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false
    },
    preferencesModal: {
      layout: 'box',
      position: 'right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      enabled: true,
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank">Google Analytics 4</a>',
          onAccept: () => {
            // Grant consent to the Google Analytics service
            console.log("ga4 granted");

            window.gtag("consent", "update", {
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
              analytics_storage: "granted",
            });
          },
          onReject: () => {
            console.log('ga4 rejected');
          },
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
        // another: {
        //   label: 'Another one (dummy)',
        // },
      },
    },
    marketing: {}
  },
  language: {
    default: 'en',
    autoDetect: 'browser',
    translations: {
      en: {
        consentModal: {
          title: "Welcome to Pocket Barcelona",
          description: "We use cookies to better understand our audiences and to improve and personalise your experience.",
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          showPreferencesBtn: 'Manage preferences',
          footer: "<a href=\"/privacy\">Privacy Policy</a>\n<a href=\"/terms-and-conditions\">Terms and conditions</a>",
        },
        preferencesModal: {
          title: 'Consent Preferences Center',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject all',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close modal',
          serviceCounterLabel: 'Service|Services',
          sections: [
            {
              title: 'Cookie Usage',
              description: "We use basic cookies to provide an excellent website experience.",
            },
            {
              title:
                'Strictly Necessary Cookies <span class="pm__badge">Always Enabled</span>',
              description: "These cookies are always on and do not include tracking, analytics, advertising or marketing.",
              linkedCategory: 'necessary',
            },
            {
              title: 'Functionality Cookies',
              description: "Supercharge your website experience!",
              linkedCategory: 'functionality',
            },
            {
              title: 'Analytics Cookies',
              description: "Allow us to implement analytics so we can help to improve the user experience for all.",
              linkedCategory: 'analytics',
            },
            {
              title: "Advertisement Cookies",
              description: "Allow a personalised advertising experience, using personalised cookies.",
              linkedCategory: "marketing"
            },
            {
              title: 'More information',
              description:
                'For any query in relation to our policy on cookies and your choices, please <a class="cc__link" href="/community">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
