const DEV = false;

const hostname = DEV ? `http://${"localhost"}` : "https://ultracapitals.org";

const client_domain = DEV ? `${hostname}:3000` : `https://ultracapitals.org`;

const domain = DEV ? `${hostname}:1459` : `https://api.ultracapitals.org`;

const default_admin = "adminstrators~123seminar~1234567890123";

const PAYMENT_LIVE = false;

const Paystack_public_key = PAYMENT_LIVE
  ? "pk_live_6cd13fb4fd5c17c366bbd44862d639aea71e5670"
  : "pk_test_88c19524a2abc3ad156a72952316e0f77ca87f4e";
const Paystack_private_key = PAYMENT_LIVE
  ? "sk_live_195a61d2e959c741a42ca1b9eafeb35d53b4e169"
  : "sk_test_8f53d8f0d9303a18a856d4aeba97603d0795fdcb";

const month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec",
});

const months = new Array(
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
);

const dow_index = new Object({
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
});

const dow_index_inverse = new Object({
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
});

const organisation_name = "Ultra Capitals";

export {
  domain,
  hostname,
  client_domain,
  month_index,
  default_admin,
  organisation_name,
  DEV,
  dow_index,
  dow_index_inverse,
  Paystack_private_key,
  Paystack_public_key,
  months,
};
