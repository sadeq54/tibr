/**
 * Where readers, advertisers and regulators reach us.
 *
 * One source for every address the site publishes. The privacy policy promises
 * a reply to data requests within 30 days and the Organization schema exposes
 * `email`, so an address printed here has to be a mailbox that actually
 * receives mail — the domain needs MX records pointing somewhere real. Change
 * the constants here and the contact page, privacy policy, advertise page,
 * llms.txt and JSON-LD all follow.
 */
export const SUPPORT_EMAIL = "support@goldpricesarabia.com";
export const ADS_EMAIL = "ads@goldpricesarabia.com";

/** How long we take to answer, stated on the contact page and honoured. */
export const REPLY_WINDOW_HOURS = 48;

/** Corrections are faster than general mail — see /editorial-standards. */
export const CORRECTION_WINDOW_HOURS = 24;

/** Statutory deadline for a GDPR / PDPL data request, quoted in the policy. */
export const DATA_REQUEST_DAYS = 30;
