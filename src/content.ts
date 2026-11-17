// Copy and menu data, taken verbatim from `Meghboroni Feedback.dc.html`.
// NOTE: the Bangla strings should be proofread by a native speaker before launch.

export type Lang = 'en' | 'bn';

export const GOOGLE_REVIEW_URL = 'https://g.page/r/Cbx5NhGIIr2sEBM/review';
export const COUPON_CODE = 'MEGH10';

export const TX = {
  en: {
    brand: 'Meghboroni', step: 'Step',
    h1: 'How was your dining experience?',
    sub: "We'd love to hear your thoughts. Your feedback helps us serve you better.",
    overallQ: 'How would you rate your overall experience?',
    foodQ: 'How would you rate the food?',
    serviceQ: 'How would you rate our service?',
    tap: 'Tap to rate', labels: ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'],
    noSignup: 'No sign-up needed · takes about 15 seconds',
    cont: 'Continue', skip: 'Skip for now', submit: 'Submit feedback', sending: 'Sending…',
    sendFailed: "We couldn't send your feedback. Please check your connection and try again.",
    s2Title: 'What stood out?', s2Sub: 'Tap anything that applies. All optional.',
    ordered: 'What did you order?', food: 'Food', service: 'Service',
    anything: 'Would you like to tell us anything else?', optional: 'Optional',
    commentPh: 'A dish you loved, or something we missed…',
    s3Title: 'Thank you for sharing', s3Sub: 'Your feedback matters to us. Thank you for helping us improve.',
    overall: 'Overall',
    sorry: "We're sorry your experience wasn't perfect. Please tell us how we can make things right.",
    private: 'Private — goes straight to our manager', privatePh: 'What happened, and how can we help?',
    googleK: 'Share it publicly', googleTitle: 'Help other diners find us',
    googleBody: 'A Google review means a lot to our kitchen. Entirely up to you.', googleBtn: 'Review us on Google',
    thanksH: 'Thank you for dining with us!', thanksSub: 'Your feedback has been successfully submitted.',
    incK: 'A thank-you from our kitchen', incTitle: 'Enjoy 10% off your next visit', incShow: 'Show your server',
    incNote: 'For every guest who completes this survey — whatever you rated, review or not.',
    signature: 'Our signature dishes', alsoHad: 'Also from our menu', loved: 'What we got right',
    improve: 'What could be better', googleThanks: 'Optional — opens Google in a new tab.',
    back: 'Back', ofFive: 'of 5',
  },
  bn: {
    brand: 'মেঘবরণী', step: 'ধাপ',
    h1: 'আপনার খাবারের অভিজ্ঞতা কেমন ছিল?',
    sub: 'আপনার মতামত জানতে আমরা আগ্রহী। আপনার মতামত আমাদের আরও ভালো সেবা দিতে সাহায্য করে।',
    overallQ: 'সামগ্রিক অভিজ্ঞতাকে আপনি কত রেটিং দেবেন?',
    foodQ: 'খাবার কেমন লেগেছে?',
    serviceQ: 'আমাদের সেবা কেমন ছিল?',
    tap: 'রেটিং দিতে ট্যাপ করুন', labels: ['', 'খারাপ', 'মোটামুটি', 'ভালো', 'খুব ভালো', 'অসাধারণ'],
    noSignup: 'সাইন-আপ লাগবে না · মাত্র ১৫ সেকেন্ড',
    cont: 'এগিয়ে যান', skip: 'এখন বাদ দিন', submit: 'মতামত জমা দিন', sending: 'পাঠানো হচ্ছে…',
    sendFailed: 'মতামত পাঠানো যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।',
    s2Title: 'কোন বিষয়গুলো ভালো বা খারাপ লেগেছে?', s2Sub: 'যেগুলো প্রযোজ্য সেগুলোতে ট্যাপ করুন। সবই ঐচ্ছিক।',
    ordered: 'আপনি কী অর্ডার করেছিলেন?', food: 'খাবার', service: 'সেবা',
    anything: 'আর কিছু বলতে চান?', optional: 'ঐচ্ছিক',
    commentPh: 'পছন্দের কোনো পদ, বা আমাদের কোনো ভুল…',
    s3Title: 'মতামত দেওয়ার জন্য ধন্যবাদ', s3Sub: 'আপনার মতামত আমাদের কাছে মূল্যবান। আরও ভালো হতে সাহায্য করার জন্য ধন্যবাদ।',
    overall: 'সামগ্রিক',
    sorry: 'আপনার অভিজ্ঞতা নিখুঁত না হওয়ায় আমরা দুঃখিত। কীভাবে বিষয়টি ঠিক করতে পারি, অনুগ্রহ করে জানান।',
    private: 'গোপনীয় — সরাসরি ম্যানেজারের কাছে যাবে', privatePh: 'কী হয়েছিল, আর আমরা কীভাবে সাহায্য করতে পারি?',
    googleK: 'সবার সাথে শেয়ার করুন', googleTitle: 'অন্য অতিথিদের আমাদের খুঁজে পেতে সাহায্য করুন',
    googleBody: 'একটি গুগল রিভিউ আমাদের কাছে অনেক কিছু। এটি সম্পূর্ণ আপনার ইচ্ছা।', googleBtn: 'গুগলে রিভিউ দিন',
    thanksH: 'আমাদের সাথে খাওয়ার জন্য ধন্যবাদ!', thanksSub: 'আপনার মতামত সফলভাবে জমা হয়েছে।',
    incK: 'আমাদের রান্নাঘর থেকে ধন্যবাদ', incTitle: 'পরবর্তী ভিজিটে ১০% ছাড়', incShow: 'ওয়েটারকে দেখান',
    incNote: 'যে রেটিংই দিন, রিভিউ দিন বা না দিন — সার্ভে সম্পন্ন করা সব অতিথির জন্য।',
    signature: 'আমাদের সিগনেচার পদ', alsoHad: 'মেনু থেকে আরও যা খেয়েছেন', loved: 'যা ভালো লেগেছে',
    improve: 'যা আরও ভালো হতে পারত', googleThanks: 'ঐচ্ছিক — নতুন ট্যাবে গুগল খুলবে।',
    back: 'ফিরে যান', ofFive: '/ ৫',
  },
} as const;

export type Copy = (typeof TX)[Lang];

/** [English, Bangla] pairs. The English label is the stable id sent to the backend. */
export type Pair = readonly [string, string];

export const DISHES: readonly (readonly [string, string, string])[] = [
  ['Lahori Platter', 'লাহোরি প্ল্যাটার', 'lahori-platter'],
  ['Multani Thali', 'মুলতানি থালি', 'multani-thali'],
  ['Seafood Platter', 'সি-ফুড প্ল্যাটার', 'seafood-platter'],
  ['Dum Pukht', 'দম পুখত', 'dum-pukht'],
  ['Beef Kabuli Polao', 'বিফ কাবুলি পোলাও', 'beef-kabuli-polao'],
  ['Chicken Mandi Biryani', 'চিকেন মান্দি বিরিয়ানি', 'chicken-mandi-biryani'],
];

export const MENU_CATS: readonly Pair[] = [
  ['Kababs', 'কাবাব'], ['Karahi & Nehari', 'কড়াই ও নেহারি'], ['Naan & Paratha', 'নান ও পরোটা'],
  ['Chinese', 'চাইনিজ'], ['Set menu', 'সেট মেনু'], ['Desserts', 'ডেজার্ট'], ['Coffee & Juices', 'কফি ও জুস'],
];

export const FOOD_GOOD: readonly Pair[] = [
  ['Authentic flavour', 'আসল স্বাদ'], ['Tender kabab', 'নরম কাবাব'], ['Perfect smoky grill', 'চমৎকার গ্রিল'],
  ['Fragrant polao', 'সুগন্ধি পোলাও'], ['Generous portions', 'যথেষ্ট পরিমাণ'],
  ['Beautiful presentation', 'সুন্দর পরিবেশন'], ['Fresh ingredients', 'তাজা উপকরণ'],
];
export const FOOD_BAD: readonly Pair[] = [
  ['Too salty', 'বেশি লবণ'], ['Too spicy', 'বেশি ঝাল'], ['Too oily', 'বেশি তেল'],
  ['Kabab was dry', 'কাবাব শুকনো ছিল'], ['Served cold', 'ঠান্ডা পরিবেশন'], ['Long wait for food', 'খাবার আসতে দেরি'],
];
export const SERVICE_GOOD: readonly Pair[] = [
  ['Friendly staff', 'আন্তরিক কর্মী'], ['Attentive service', 'মনোযোগী সেবা'],
  ['Fast service', 'দ্রুত সেবা'], ['Professional staff', 'পেশাদার কর্মী'],
];
export const SERVICE_BAD: readonly Pair[] = [
  ['Slow service', 'ধীর সেবা'], ['Staff was inattentive', 'কর্মীরা অমনোযোগী ছিলেন'],
  ['Order was incorrect', 'ভুল অর্ডার'], ['Poor communication', 'যোগাযোগে সমস্যা'],
];

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const localNum = (lang: Lang, n: number | string) =>
  lang === 'bn' ? String(n).replace(/\d/g, (d) => BN_DIGITS[+d]) : String(n);
