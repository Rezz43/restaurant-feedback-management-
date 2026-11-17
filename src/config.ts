import type { Lang } from './content';

const env = import.meta.env;
const flag = (v: string | undefined, dflt: boolean) => (v == null || v === '' ? dflt : v !== 'false');

const urlLang = new URLSearchParams(location.search).get('lang');

export const config = {
  feedbackEndpoint: (env.VITE_FEEDBACK_ENDPOINT as string | undefined) || '',
  showIncentive: flag(env.VITE_SHOW_INCENTIVE, true),
  privateNote: flag(env.VITE_PRIVATE_NOTE, true),
  startLang: (urlLang === 'bn' || urlLang === 'en' ? urlLang : env.VITE_START_LANG === 'bn' ? 'bn' : 'en') as Lang,
};
