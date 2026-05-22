/**
 * XM affiliate banners (pipaffiliates) - full set, all languages and sizes.
 *
 * Source API:
 *   https://mypartners.xm.com/Affiliate/materials?affiliateId=1319158&campaignType=1
 *
 * Sanitized: tracking-template params ({?c,t} / {&c,t,p,l}) and the unresolved
 * social-tracking link were dropped. Click/image URLs are derived from the
 * banner id via the helpers below, bound to the affiliate campaign id.
 *
 * 1942 banners. Generated file - do not edit by hand.
 */

/** Affiliate campaign id - the `c` query param on every click/image URL. */
export const XM_CAMPAIGN_ID = "1228714";

export type XmLang = "ar" | "bn" | "cs" | "de" | "el" | "en" | "en-eu" | "es" | "fr" | "fr-eu" | "hi" | "hu" | "id" | "it" | "ko" | "mn" | "ms" | "nl" | "pl" | "pt" | "ru" | "si" | "sv" | "th" | "tl" | "tr" | "ur" | "uz" | "vi" | "zh-hans" | "zh-hant";
export type XmChannel = "facebook" | "other" | "x";
export type XmSize = "carousel" | "cover" | "other" | "post" | "story";

export interface XmBanner {
  /** pipaffiliates material id (the `m` param). */
  id: number;
  width: number;
  height: number;
  lang: XmLang;
  /** XM material category (1 = display banners, 2 = logos/buttons, 13 = social, ...). */
  categoryTypeId: number;
  channel: XmChannel;
  size: XmSize;
}

/** Resolved click-through URL for a banner id. */
export function xmClickUrl(id: number): string {
  return `https://clicks.pipaffiliates.com/c?m=${id}&c=${XM_CAMPAIGN_ID}`;
}

/** Resolved (tracked) image URL for a banner id. */
export function xmImageUrl(id: number): string {
  return `https://ads.pipaffiliates.com/i/${id}?c=${XM_CAMPAIGN_ID}`;
}

/** Packed rows: [id, width, height, lang, categoryTypeId, channel, size]. */
const RAW: [number, number, number, XmLang, number, XmChannel, XmSize][] = [
  [131250,120,600,"ar",1,"other","other"], [131290,120,600,"ar",1,"other","other"], [131762,120,600,"ar",1,"other","other"], [132357,120,600,"ar",1,"other","other"], [133130,120,600,"ar",1,"other","other"], [133170,120,600,"ar",1,"other","other"],
  [149850,120,600,"ar",1,"other","other"], [150395,120,600,"ar",1,"other","other"], [150525,120,600,"ar",1,"other","other"], [150685,120,600,"ar",1,"other","other"], [150815,120,600,"ar",1,"other","other"], [153124,120,600,"ar",1,"other","other"],
  [153444,120,600,"ar",1,"other","other"], [153830,120,600,"ar",1,"other","other"], [131310,300,250,"ar",1,"other","other"], [131350,300,250,"ar",1,"other","other"], [132161,300,250,"ar",1,"other","other"], [132358,300,250,"ar",1,"other","other"],
  [133190,300,250,"ar",1,"other","other"], [133230,300,250,"ar",1,"other","other"], [149851,300,250,"ar",1,"other","other"], [150396,300,250,"ar",1,"other","other"], [150526,300,250,"ar",1,"other","other"], [150686,300,250,"ar",1,"other","other"],
  [150816,300,250,"ar",1,"other","other"], [153125,300,250,"ar",1,"other","other"], [153445,300,250,"ar",1,"other","other"], [153831,300,250,"ar",1,"other","other"], [131370,320,100,"ar",1,"other","other"], [131410,320,100,"ar",1,"other","other"],
  [132180,320,100,"ar",1,"other","other"], [132359,320,100,"ar",1,"other","other"], [133250,320,100,"ar",1,"other","other"], [133290,320,100,"ar",1,"other","other"], [149852,320,100,"ar",1,"other","other"], [150397,320,100,"ar",1,"other","other"],
  [150527,320,100,"ar",1,"other","other"], [150687,320,100,"ar",1,"other","other"], [150817,320,100,"ar",1,"other","other"], [153126,320,100,"ar",1,"other","other"], [153446,320,100,"ar",1,"other","other"], [153832,320,100,"ar",1,"other","other"],
  [131430,600,90,"ar",1,"other","other"], [131470,600,90,"ar",1,"other","other"], [132199,600,90,"ar",1,"other","other"], [132360,600,90,"ar",1,"other","other"], [133310,600,90,"ar",1,"other","other"], [133350,600,90,"ar",1,"other","other"],
  [149853,600,90,"ar",1,"other","other"], [150398,600,90,"ar",1,"other","other"], [150528,600,90,"ar",1,"other","other"], [150688,600,90,"ar",1,"other","other"], [150818,600,90,"ar",1,"other","other"], [153127,600,90,"ar",1,"other","other"],
  [153447,600,90,"ar",1,"other","other"], [153833,600,90,"ar",1,"other","other"], [131490,728,90,"ar",1,"other","other"], [131530,728,90,"ar",1,"other","other"], [132218,728,90,"ar",1,"other","other"], [132361,728,90,"ar",1,"other","other"],
  [133370,728,90,"ar",1,"other","other"], [133410,728,90,"ar",1,"other","other"], [149854,728,90,"ar",1,"other","other"], [150399,728,90,"ar",1,"other","other"], [150529,728,90,"ar",1,"other","other"], [150689,728,90,"ar",1,"other","other"],
  [150819,728,90,"ar",1,"other","other"], [153128,728,90,"ar",1,"other","other"], [153448,728,90,"ar",1,"other","other"], [153834,728,90,"ar",1,"other","other"], [137150,800,418,"ar",13,"x","post"], [137151,800,800,"ar",13,"x","carousel"],
  [137152,1080,1350,"ar",13,"facebook","post"], [137153,1080,1920,"ar",13,"facebook","story"], [131291,120,600,"bn",1,"other","other"], [132362,120,600,"bn",1,"other","other"], [133131,120,600,"bn",1,"other","other"], [133171,120,600,"bn",1,"other","other"],
  [149855,120,600,"bn",1,"other","other"], [150400,120,600,"bn",1,"other","other"], [150530,120,600,"bn",1,"other","other"], [150690,120,600,"bn",1,"other","other"], [150820,120,600,"bn",1,"other","other"], [153129,120,600,"bn",1,"other","other"],
  [153449,120,600,"bn",1,"other","other"], [153835,120,600,"bn",1,"other","other"], [154050,120,600,"bn",10,"other","other"], [131351,300,250,"bn",1,"other","other"], [132363,300,250,"bn",1,"other","other"], [133191,300,250,"bn",1,"other","other"],
  [133231,300,250,"bn",1,"other","other"], [149856,300,250,"bn",1,"other","other"], [150401,300,250,"bn",1,"other","other"], [150531,300,250,"bn",1,"other","other"], [150691,300,250,"bn",1,"other","other"], [150821,300,250,"bn",1,"other","other"],
  [153370,300,250,"bn",1,"other","other"], [153450,300,250,"bn",1,"other","other"], [153836,300,250,"bn",1,"other","other"], [154051,300,250,"bn",10,"other","other"], [131411,320,100,"bn",1,"other","other"], [132364,320,100,"bn",1,"other","other"],
  [133251,320,100,"bn",1,"other","other"], [133291,320,100,"bn",1,"other","other"], [149857,320,100,"bn",1,"other","other"], [150402,320,100,"bn",1,"other","other"], [150532,320,100,"bn",1,"other","other"], [150692,320,100,"bn",1,"other","other"],
  [150822,320,100,"bn",1,"other","other"], [153371,320,100,"bn",1,"other","other"], [153451,320,100,"bn",1,"other","other"], [153837,320,100,"bn",1,"other","other"], [154052,320,100,"bn",10,"other","other"], [131471,600,90,"bn",1,"other","other"],
  [132365,600,90,"bn",1,"other","other"], [133311,600,90,"bn",1,"other","other"], [133351,600,90,"bn",1,"other","other"], [149858,600,90,"bn",1,"other","other"], [150403,600,90,"bn",1,"other","other"], [150533,600,90,"bn",1,"other","other"],
  [150693,600,90,"bn",1,"other","other"], [150823,600,90,"bn",1,"other","other"], [153372,600,90,"bn",1,"other","other"], [153452,600,90,"bn",1,"other","other"], [153838,600,90,"bn",1,"other","other"], [154053,600,90,"bn",10,"other","other"],
  [131531,728,90,"bn",1,"other","other"], [132366,728,90,"bn",1,"other","other"], [133371,728,90,"bn",1,"other","other"], [133411,728,90,"bn",1,"other","other"], [149859,728,90,"bn",1,"other","other"], [150404,728,90,"bn",1,"other","other"],
  [150534,728,90,"bn",1,"other","other"], [150694,728,90,"bn",1,"other","other"], [150824,728,90,"bn",1,"other","other"], [153373,728,90,"bn",1,"other","other"], [153453,728,90,"bn",1,"other","other"], [153839,728,90,"bn",1,"other","other"],
  [154054,728,90,"bn",10,"other","other"], [137154,800,418,"bn",13,"x","post"], [137155,800,800,"bn",13,"x","carousel"], [136930,120,600,"cs",1,"other","other"], [136970,120,600,"cs",1,"other","other"], [137030,120,600,"cs",1,"other","other"],
  [149860,120,600,"cs",1,"other","other"], [150405,120,600,"cs",1,"other","other"], [150535,120,600,"cs",1,"other","other"], [150695,120,600,"cs",1,"other","other"], [150825,120,600,"cs",1,"other","other"], [153454,120,600,"cs",1,"other","other"],
  [136938,300,250,"cs",1,"other","other"], [136971,300,250,"cs",1,"other","other"], [137031,300,250,"cs",1,"other","other"], [149861,300,250,"cs",1,"other","other"], [150406,300,250,"cs",1,"other","other"], [150536,300,250,"cs",1,"other","other"],
  [150696,300,250,"cs",1,"other","other"], [150826,300,250,"cs",1,"other","other"], [153455,300,250,"cs",1,"other","other"], [136946,320,100,"cs",1,"other","other"], [136972,320,100,"cs",1,"other","other"], [137032,320,100,"cs",1,"other","other"],
  [149862,320,100,"cs",1,"other","other"], [150407,320,100,"cs",1,"other","other"], [150537,320,100,"cs",1,"other","other"], [150697,320,100,"cs",1,"other","other"], [150827,320,100,"cs",1,"other","other"], [153456,320,100,"cs",1,"other","other"],
  [136954,600,90,"cs",1,"other","other"], [136973,600,90,"cs",1,"other","other"], [137033,600,90,"cs",1,"other","other"], [149863,600,90,"cs",1,"other","other"], [150408,600,90,"cs",1,"other","other"], [150538,600,90,"cs",1,"other","other"],
  [150698,600,90,"cs",1,"other","other"], [150828,600,90,"cs",1,"other","other"], [153457,600,90,"cs",1,"other","other"], [136962,728,90,"cs",1,"other","other"], [136974,728,90,"cs",1,"other","other"], [137034,728,90,"cs",1,"other","other"],
  [149864,728,90,"cs",1,"other","other"], [150409,728,90,"cs",1,"other","other"], [150539,728,90,"cs",1,"other","other"], [150699,728,90,"cs",1,"other","other"], [150829,728,90,"cs",1,"other","other"], [153458,728,90,"cs",1,"other","other"],
  [132342,120,600,"de",1,"other","other"], [136931,120,600,"de",1,"other","other"], [136975,120,600,"de",1,"other","other"], [149865,120,600,"de",1,"other","other"], [150410,120,600,"de",1,"other","other"], [150540,120,600,"de",1,"other","other"],
  [150700,120,600,"de",1,"other","other"], [150830,120,600,"de",1,"other","other"], [153459,120,600,"de",1,"other","other"], [132345,300,250,"de",1,"other","other"], [136939,300,250,"de",1,"other","other"], [136976,300,250,"de",1,"other","other"],
  [137036,300,250,"de",1,"other","other"], [149866,300,250,"de",1,"other","other"], [150411,300,250,"de",1,"other","other"], [150541,300,250,"de",1,"other","other"], [150701,300,250,"de",1,"other","other"], [150831,300,250,"de",1,"other","other"],
  [153460,300,250,"de",1,"other","other"], [132348,320,100,"de",1,"other","other"], [136947,320,100,"de",1,"other","other"], [136977,320,100,"de",1,"other","other"], [137037,320,100,"de",1,"other","other"], [149867,320,100,"de",1,"other","other"],
  [150412,320,100,"de",1,"other","other"], [150542,320,100,"de",1,"other","other"], [150702,320,100,"de",1,"other","other"], [150832,320,100,"de",1,"other","other"], [153461,320,100,"de",1,"other","other"], [132351,600,90,"de",1,"other","other"],
  [136955,600,90,"de",1,"other","other"], [136978,600,90,"de",1,"other","other"], [137038,600,90,"de",1,"other","other"], [149868,600,90,"de",1,"other","other"], [150413,600,90,"de",1,"other","other"], [150543,600,90,"de",1,"other","other"],
  [150703,600,90,"de",1,"other","other"], [150833,600,90,"de",1,"other","other"], [153462,600,90,"de",1,"other","other"], [132354,728,90,"de",1,"other","other"], [136963,728,90,"de",1,"other","other"], [136979,728,90,"de",1,"other","other"],
  [137039,728,90,"de",1,"other","other"], [149869,728,90,"de",1,"other","other"], [150414,728,90,"de",1,"other","other"], [150544,728,90,"de",1,"other","other"], [150704,728,90,"de",1,"other","other"], [150834,728,90,"de",1,"other","other"],
  [153463,728,90,"de",1,"other","other"], [136932,120,600,"el",1,"other","other"], [136980,120,600,"el",1,"other","other"], [137040,120,600,"el",1,"other","other"], [149870,120,600,"el",1,"other","other"], [150415,120,600,"el",1,"other","other"],
  [150545,120,600,"el",1,"other","other"], [150705,120,600,"el",1,"other","other"], [150835,120,600,"el",1,"other","other"], [153464,120,600,"el",1,"other","other"], [136940,300,250,"el",1,"other","other"], [136981,300,250,"el",1,"other","other"],
  [137041,300,250,"el",1,"other","other"], [149871,300,250,"el",1,"other","other"], [150416,300,250,"el",1,"other","other"], [150546,300,250,"el",1,"other","other"], [150706,300,250,"el",1,"other","other"], [150836,300,250,"el",1,"other","other"],
  [153465,300,250,"el",1,"other","other"], [136948,320,100,"el",1,"other","other"], [137042,320,100,"el",1,"other","other"], [148165,320,100,"el",1,"other","other"], [149872,320,100,"el",1,"other","other"], [150417,320,100,"el",1,"other","other"],
  [150547,320,100,"el",1,"other","other"], [150707,320,100,"el",1,"other","other"], [150837,320,100,"el",1,"other","other"], [153466,320,100,"el",1,"other","other"], [136956,600,90,"el",1,"other","other"], [136982,600,90,"el",1,"other","other"],
  [137043,600,90,"el",1,"other","other"], [149873,600,90,"el",1,"other","other"], [150418,600,90,"el",1,"other","other"], [150548,600,90,"el",1,"other","other"], [150708,600,90,"el",1,"other","other"], [150838,600,90,"el",1,"other","other"],
  [153467,600,90,"el",1,"other","other"], [136964,728,90,"el",1,"other","other"], [136983,728,90,"el",1,"other","other"], [137044,728,90,"el",1,"other","other"], [149874,728,90,"el",1,"other","other"], [150419,728,90,"el",1,"other","other"],
  [150549,728,90,"el",1,"other","other"], [150709,728,90,"el",1,"other","other"], [150839,728,90,"el",1,"other","other"], [153468,728,90,"el",1,"other","other"], [131074,56,43,"en",2,"other","other"], [131075,56,43,"en",2,"other","other"],
  [131076,56,43,"en",2,"other","other"], [131077,56,43,"en",2,"other","other"], [131078,90,56,"en",2,"other","other"], [131079,90,56,"en",2,"other","other"], [131080,90,56,"en",2,"other","other"], [131081,90,56,"en",2,"other","other"],
  [130970,100,33,"en",2,"other","other"], [130971,100,33,"en",2,"other","other"], [130972,100,33,"en",2,"other","other"], [130973,100,33,"en",2,"other","other"], [130974,101,26,"en",2,"other","other"], [130975,101,26,"en",2,"other","other"],
  [130976,101,26,"en",2,"other","other"], [130977,101,26,"en",2,"other","other"], [130978,120,60,"en",2,"other","other"], [130979,120,60,"en",2,"other","other"], [130980,120,60,"en",2,"other","other"], [130981,120,60,"en",2,"other","other"],
  [131252,120,600,"en",1,"other","other"], [131292,120,600,"en",1,"other","other"], [131763,120,600,"en",1,"other","other"], [132382,120,600,"en",1,"other","other"], [133132,120,600,"en",1,"other","other"], [133172,120,600,"en",1,"other","other"],
  [149875,120,600,"en",1,"other","other"], [150420,120,600,"en",1,"other","other"], [150550,120,600,"en",1,"other","other"], [150710,120,600,"en",1,"other","other"], [150840,120,600,"en",1,"other","other"], [153374,120,600,"en",1,"other","other"],
  [153469,120,600,"en",1,"other","other"], [153840,120,600,"en",1,"other","other"], [154055,120,600,"en",10,"other","other"], [130982,123,46,"en",2,"other","other"], [130983,123,46,"en",2,"other","other"], [130984,123,46,"en",2,"other","other"],
  [130985,123,46,"en",2,"other","other"], [130986,125,41,"en",2,"other","other"], [130987,125,41,"en",2,"other","other"], [130988,125,41,"en",2,"other","other"], [130989,125,41,"en",2,"other","other"], [130990,125,43,"en",2,"other","other"],
  [130991,125,43,"en",2,"other","other"], [130992,125,43,"en",2,"other","other"], [130993,125,43,"en",2,"other","other"], [130999,130,60,"en",2,"other","other"], [131001,130,60,"en",2,"other","other"], [131003,130,60,"en",2,"other","other"],
  [131005,130,60,"en",2,"other","other"], [130994,130,100,"en",2,"other","other"], [130995,130,100,"en",2,"other","other"], [130996,130,100,"en",2,"other","other"], [130997,130,100,"en",2,"other","other"], [130998,135,30,"en",2,"other","other"],
  [131000,135,30,"en",2,"other","other"], [131002,135,30,"en",2,"other","other"], [131004,135,30,"en",2,"other","other"], [131006,137,66,"en",2,"other","other"], [131007,137,66,"en",2,"other","other"], [131008,137,66,"en",2,"other","other"],
  [131009,137,66,"en",2,"other","other"], [131010,150,35,"en",2,"other","other"], [131011,150,35,"en",2,"other","other"], [131012,150,35,"en",2,"other","other"], [131013,150,35,"en",2,"other","other"], [131014,150,60,"en",2,"other","other"],
  [131015,150,60,"en",2,"other","other"], [131016,150,60,"en",2,"other","other"], [131017,150,60,"en",2,"other","other"], [131018,162,42,"en",2,"other","other"], [131019,162,42,"en",2,"other","other"], [131020,162,42,"en",2,"other","other"],
  [131021,162,42,"en",2,"other","other"], [131022,170,57,"en",2,"other","other"], [131023,170,57,"en",2,"other","other"], [131024,170,57,"en",2,"other","other"], [131025,170,57,"en",2,"other","other"], [131026,170,75,"en",2,"other","other"],
  [131027,170,75,"en",2,"other","other"], [131028,170,75,"en",2,"other","other"], [131029,170,75,"en",2,"other","other"], [131034,180,60,"en",2,"other","other"], [131035,180,60,"en",2,"other","other"], [131036,180,60,"en",2,"other","other"],
  [131037,180,60,"en",2,"other","other"], [131030,180,100,"en",2,"other","other"], [131031,180,100,"en",2,"other","other"], [131032,180,100,"en",2,"other","other"], [131033,180,100,"en",2,"other","other"], [131038,225,75,"en",2,"other","other"],
  [131039,225,75,"en",2,"other","other"], [131040,225,75,"en",2,"other","other"], [131042,234,60,"en",2,"other","other"], [131043,234,60,"en",2,"other","other"], [131044,234,60,"en",2,"other","other"], [131045,234,60,"en",2,"other","other"],
  [131046,250,75,"en",2,"other","other"], [131047,250,75,"en",2,"other","other"], [131048,250,75,"en",2,"other","other"], [131049,250,75,"en",2,"other","other"], [131051,252,55,"en",2,"other","other"], [131053,252,55,"en",2,"other","other"],
  [131055,252,55,"en",2,"other","other"], [131057,252,55,"en",2,"other","other"], [131058,252,88,"en",2,"other","other"], [131059,252,88,"en",2,"other","other"], [131060,252,88,"en",2,"other","other"], [131061,252,88,"en",2,"other","other"],
  [131062,275,60,"en",2,"other","other"], [131063,275,60,"en",2,"other","other"], [131064,275,60,"en",2,"other","other"], [131065,275,60,"en",2,"other","other"], [131066,278,128,"en",2,"other","other"], [131067,278,128,"en",2,"other","other"],
  [131068,278,128,"en",2,"other","other"], [131069,278,128,"en",2,"other","other"], [131312,300,250,"en",1,"other","other"], [131352,300,250,"en",1,"other","other"], [132162,300,250,"en",1,"other","other"], [132383,300,250,"en",1,"other","other"],
  [133192,300,250,"en",1,"other","other"], [133232,300,250,"en",1,"other","other"], [149876,300,250,"en",1,"other","other"], [150421,300,250,"en",1,"other","other"], [150551,300,250,"en",1,"other","other"], [150711,300,250,"en",1,"other","other"],
  [150841,300,250,"en",1,"other","other"], [153375,300,250,"en",1,"other","other"], [153470,300,250,"en",1,"other","other"], [153841,300,250,"en",1,"other","other"], [154056,300,250,"en",10,"other","other"], [131372,320,100,"en",1,"other","other"],
  [131412,320,100,"en",1,"other","other"], [132181,320,100,"en",1,"other","other"], [132384,320,100,"en",1,"other","other"], [133252,320,100,"en",1,"other","other"], [133292,320,100,"en",1,"other","other"], [149877,320,100,"en",1,"other","other"],
  [150422,320,100,"en",1,"other","other"], [150552,320,100,"en",1,"other","other"], [150712,320,100,"en",1,"other","other"], [150842,320,100,"en",1,"other","other"], [153376,320,100,"en",1,"other","other"], [153471,320,100,"en",1,"other","other"],
  [153842,320,100,"en",1,"other","other"], [154057,320,100,"en",10,"other","other"], [131070,337,85,"en",2,"other","other"], [131071,337,85,"en",2,"other","other"], [131072,337,85,"en",2,"other","other"], [131073,337,85,"en",2,"other","other"],
  [131432,600,90,"en",1,"other","other"], [131472,600,90,"en",1,"other","other"], [132200,600,90,"en",1,"other","other"], [132385,600,90,"en",1,"other","other"], [133312,600,90,"en",1,"other","other"], [133352,600,90,"en",1,"other","other"],
  [149878,600,90,"en",1,"other","other"], [150423,600,90,"en",1,"other","other"], [150553,600,90,"en",1,"other","other"], [150713,600,90,"en",1,"other","other"], [150843,600,90,"en",1,"other","other"], [153377,600,90,"en",1,"other","other"],
  [153472,600,90,"en",1,"other","other"], [153843,600,90,"en",1,"other","other"], [154058,600,90,"en",10,"other","other"], [150424,728,9,"en",1,"other","other"], [131492,728,90,"en",1,"other","other"], [131532,728,90,"en",1,"other","other"],
  [132219,728,90,"en",1,"other","other"], [132386,728,90,"en",1,"other","other"], [133372,728,90,"en",1,"other","other"], [133412,728,90,"en",1,"other","other"], [149879,728,90,"en",1,"other","other"], [150554,728,90,"en",1,"other","other"],
  [150714,728,90,"en",1,"other","other"], [150844,728,90,"en",1,"other","other"], [153378,728,90,"en",1,"other","other"], [153473,728,90,"en",1,"other","other"], [153844,728,90,"en",1,"other","other"], [154059,728,90,"en",10,"other","other"],
  [137157,800,418,"en",13,"x","post"], [137158,800,800,"en",13,"x","carousel"], [137159,1080,1350,"en",13,"facebook","post"], [137160,1080,1920,"en",13,"facebook","story"], [132343,120,600,"en-eu",1,"other","other"], [136933,120,600,"en-eu",1,"other","other"],
  [136984,120,600,"en-eu",1,"other","other"], [137045,120,600,"en-eu",1,"other","other"], [132346,300,250,"en-eu",1,"other","other"], [136941,300,250,"en-eu",1,"other","other"], [136985,300,250,"en-eu",1,"other","other"], [137046,300,250,"en-eu",1,"other","other"],
  [132349,320,100,"en-eu",1,"other","other"], [136949,320,100,"en-eu",1,"other","other"], [136986,320,100,"en-eu",1,"other","other"], [137047,320,100,"en-eu",1,"other","other"], [132352,600,90,"en-eu",1,"other","other"], [136957,600,90,"en-eu",1,"other","other"],
  [136987,600,90,"en-eu",1,"other","other"], [137048,600,90,"en-eu",1,"other","other"], [132355,728,90,"en-eu",1,"other","other"], [136965,728,90,"en-eu",1,"other","other"], [136988,728,90,"en-eu",1,"other","other"], [137049,728,90,"en-eu",1,"other","other"],
  [131253,120,600,"es",1,"other","other"], [131293,120,600,"es",1,"other","other"], [131764,120,600,"es",1,"other","other"], [132387,120,600,"es",1,"other","other"], [133133,120,600,"es",1,"other","other"], [133173,120,600,"es",1,"other","other"],
  [148150,120,600,"es",1,"other","other"], [148153,120,600,"es",1,"other","other"], [149880,120,600,"es",1,"other","other"], [150425,120,600,"es",1,"other","other"], [150555,120,600,"es",1,"other","other"], [150715,120,600,"es",1,"other","other"],
  [150845,120,600,"es",1,"other","other"], [153379,120,600,"es",1,"other","other"], [153474,120,600,"es",1,"other","other"], [153845,120,600,"es",1,"other","other"], [131313,300,250,"es",1,"other","other"], [131353,300,250,"es",1,"other","other"],
  [132163,300,250,"es",1,"other","other"], [132388,300,250,"es",1,"other","other"], [133193,300,250,"es",1,"other","other"], [133233,300,250,"es",1,"other","other"], [148156,300,250,"es",1,"other","other"], [148159,300,250,"es",1,"other","other"],
  [149881,300,250,"es",1,"other","other"], [150426,300,250,"es",1,"other","other"], [150556,300,250,"es",1,"other","other"], [150716,300,250,"es",1,"other","other"], [150846,300,250,"es",1,"other","other"], [153380,300,250,"es",1,"other","other"],
  [153475,300,250,"es",1,"other","other"], [153846,300,250,"es",1,"other","other"], [131373,320,100,"es",1,"other","other"], [131413,320,100,"es",1,"other","other"], [132182,320,100,"es",1,"other","other"], [132389,320,100,"es",1,"other","other"],
  [133253,320,100,"es",1,"other","other"], [133293,320,100,"es",1,"other","other"], [148162,320,100,"es",1,"other","other"], [148166,320,100,"es",1,"other","other"], [149882,320,100,"es",1,"other","other"], [150427,320,100,"es",1,"other","other"],
  [150557,320,100,"es",1,"other","other"], [150717,320,100,"es",1,"other","other"], [150847,320,100,"es",1,"other","other"], [153381,320,100,"es",1,"other","other"], [153476,320,100,"es",1,"other","other"], [153847,320,100,"es",1,"other","other"],
  [131433,600,90,"es",1,"other","other"], [131473,600,90,"es",1,"other","other"], [132201,600,90,"es",1,"other","other"], [132390,600,90,"es",1,"other","other"], [133313,600,90,"es",1,"other","other"], [133353,600,90,"es",1,"other","other"],
  [148169,600,90,"es",1,"other","other"], [148172,600,90,"es",1,"other","other"], [149883,600,90,"es",1,"other","other"], [150428,600,90,"es",1,"other","other"], [150558,600,90,"es",1,"other","other"], [150718,600,90,"es",1,"other","other"],
  [150848,600,90,"es",1,"other","other"], [153382,600,90,"es",1,"other","other"], [153477,600,90,"es",1,"other","other"], [153848,600,90,"es",1,"other","other"], [131493,728,90,"es",1,"other","other"], [131533,728,90,"es",1,"other","other"],
  [132220,728,90,"es",1,"other","other"], [132391,728,90,"es",1,"other","other"], [133373,728,90,"es",1,"other","other"], [133413,728,90,"es",1,"other","other"], [148175,728,90,"es",1,"other","other"], [148178,728,90,"es",1,"other","other"],
  [149884,728,90,"es",1,"other","other"], [150429,728,90,"es",1,"other","other"], [150559,728,90,"es",1,"other","other"], [150719,728,90,"es",1,"other","other"], [150849,728,90,"es",1,"other","other"], [153383,728,90,"es",1,"other","other"],
  [153478,728,90,"es",1,"other","other"], [153849,728,90,"es",1,"other","other"], [137161,800,418,"es",13,"x","post"], [137162,800,800,"es",13,"x","carousel"], [137164,1080,1350,"es",13,"facebook","post"], [137165,1080,1920,"es",13,"facebook","story"],
  [137163,1640,856,"es",13,"facebook","cover"], [131254,120,600,"fr",1,"other","other"], [131294,120,600,"fr",1,"other","other"], [131765,120,600,"fr",1,"other","other"], [132392,120,600,"fr",1,"other","other"], [133134,120,600,"fr",1,"other","other"],
  [133174,120,600,"fr",1,"other","other"], [134213,120,600,"fr",11,"other","other"], [149885,120,600,"fr",1,"other","other"], [150430,120,600,"fr",1,"other","other"], [150560,120,600,"fr",1,"other","other"], [150720,120,600,"fr",1,"other","other"],
  [150850,120,600,"fr",1,"other","other"], [153479,120,600,"fr",1,"other","other"], [153850,120,600,"fr",1,"other","other"], [154060,120,600,"fr",10,"other","other"], [131314,300,250,"fr",1,"other","other"], [131354,300,250,"fr",1,"other","other"],
  [132164,300,250,"fr",1,"other","other"], [132393,300,250,"fr",1,"other","other"], [133194,300,250,"fr",1,"other","other"], [133234,300,250,"fr",1,"other","other"], [134296,300,250,"fr",11,"other","other"], [149886,300,250,"fr",1,"other","other"],
  [150431,300,250,"fr",1,"other","other"], [150561,300,250,"fr",1,"other","other"], [150721,300,250,"fr",1,"other","other"], [150851,300,250,"fr",1,"other","other"], [153480,300,250,"fr",1,"other","other"], [153851,300,250,"fr",1,"other","other"],
  [154061,300,250,"fr",10,"other","other"], [131374,320,100,"fr",1,"other","other"], [131414,320,100,"fr",1,"other","other"], [132183,320,100,"fr",1,"other","other"], [132394,320,100,"fr",1,"other","other"], [133254,320,100,"fr",1,"other","other"],
  [133294,320,100,"fr",1,"other","other"], [134380,320,100,"fr",11,"other","other"], [149887,320,100,"fr",1,"other","other"], [150432,320,100,"fr",1,"other","other"], [150562,320,100,"fr",1,"other","other"], [150722,320,100,"fr",1,"other","other"],
  [150852,320,100,"fr",1,"other","other"], [153481,320,100,"fr",1,"other","other"], [153852,320,100,"fr",1,"other","other"], [154062,320,100,"fr",10,"other","other"], [131434,600,90,"fr",1,"other","other"], [131474,600,90,"fr",1,"other","other"],
  [132202,600,90,"fr",1,"other","other"], [132395,600,90,"fr",1,"other","other"], [133314,600,90,"fr",1,"other","other"], [133354,600,90,"fr",1,"other","other"], [134464,600,90,"fr",11,"other","other"], [149888,600,90,"fr",1,"other","other"],
  [150433,600,90,"fr",1,"other","other"], [150563,600,90,"fr",1,"other","other"], [150723,600,90,"fr",1,"other","other"], [150853,600,90,"fr",1,"other","other"], [153482,600,90,"fr",1,"other","other"], [153853,600,90,"fr",1,"other","other"],
  [154063,600,90,"fr",10,"other","other"], [131494,728,90,"fr",1,"other","other"], [131534,728,90,"fr",1,"other","other"], [132221,728,90,"fr",1,"other","other"], [132396,728,90,"fr",1,"other","other"], [133374,728,90,"fr",1,"other","other"],
  [133414,728,90,"fr",1,"other","other"], [134548,728,90,"fr",11,"other","other"], [149889,728,90,"fr",1,"other","other"], [150434,728,90,"fr",1,"other","other"], [150564,728,90,"fr",1,"other","other"], [150724,728,90,"fr",1,"other","other"],
  [150854,728,90,"fr",1,"other","other"], [153483,728,90,"fr",1,"other","other"], [153854,728,90,"fr",1,"other","other"], [154064,728,90,"fr",10,"other","other"], [137166,800,418,"fr",13,"x","post"], [137167,800,800,"fr",13,"x","carousel"],
  [137168,1080,1350,"fr",13,"facebook","post"], [137169,1080,1920,"fr",13,"facebook","story"], [136934,120,600,"fr-eu",1,"other","other"], [136989,120,600,"fr-eu",1,"other","other"], [137050,120,600,"fr-eu",1,"other","other"], [136942,300,250,"fr-eu",1,"other","other"],
  [136990,300,250,"fr-eu",1,"other","other"], [137051,300,250,"fr-eu",1,"other","other"], [136950,320,100,"fr-eu",1,"other","other"], [136991,320,100,"fr-eu",1,"other","other"], [137052,320,100,"fr-eu",1,"other","other"], [136958,600,90,"fr-eu",1,"other","other"],
  [136992,600,90,"fr-eu",1,"other","other"], [137053,600,90,"fr-eu",1,"other","other"], [136966,728,90,"fr-eu",1,"other","other"], [136993,728,90,"fr-eu",1,"other","other"], [137054,728,90,"fr-eu",1,"other","other"], [131295,120,600,"hi",1,"other","other"],
  [131895,120,600,"hi",1,"other","other"], [132873,120,600,"hi",1,"other","other"], [133135,120,600,"hi",1,"other","other"], [133175,120,600,"hi",1,"other","other"], [149890,120,600,"hi",1,"other","other"], [150435,120,600,"hi",1,"other","other"],
  [150565,120,600,"hi",1,"other","other"], [150725,120,600,"hi",1,"other","other"], [150855,120,600,"hi",1,"other","other"], [153484,120,600,"hi",1,"other","other"], [153855,120,600,"hi",1,"other","other"], [131355,300,250,"hi",1,"other","other"],
  [131897,300,250,"hi",1,"other","other"], [132874,300,250,"hi",1,"other","other"], [133195,300,250,"hi",1,"other","other"], [133235,300,250,"hi",1,"other","other"], [149891,300,250,"hi",1,"other","other"], [150436,300,250,"hi",1,"other","other"],
  [150566,300,250,"hi",1,"other","other"], [150726,300,250,"hi",1,"other","other"], [150856,300,250,"hi",1,"other","other"], [153485,300,250,"hi",1,"other","other"], [153856,300,250,"hi",1,"other","other"], [131415,320,100,"hi",1,"other","other"],
  [131899,320,100,"hi",1,"other","other"], [132875,320,100,"hi",1,"other","other"], [133255,320,100,"hi",1,"other","other"], [133295,320,100,"hi",1,"other","other"], [149892,320,100,"hi",1,"other","other"], [150437,320,100,"hi",1,"other","other"],
  [150567,320,100,"hi",1,"other","other"], [150727,320,100,"hi",1,"other","other"], [150857,320,100,"hi",1,"other","other"], [153486,320,100,"hi",1,"other","other"], [153857,320,100,"hi",1,"other","other"], [131475,600,90,"hi",1,"other","other"],
  [131901,600,90,"hi",1,"other","other"], [132876,600,90,"hi",1,"other","other"], [133315,600,90,"hi",1,"other","other"], [133355,600,90,"hi",1,"other","other"], [149893,600,90,"hi",1,"other","other"], [150438,600,90,"hi",1,"other","other"],
  [150568,600,90,"hi",1,"other","other"], [150728,600,90,"hi",1,"other","other"], [150858,600,90,"hi",1,"other","other"], [153487,600,90,"hi",1,"other","other"], [153858,600,90,"hi",1,"other","other"], [131535,728,90,"hi",1,"other","other"],
  [131903,728,90,"hi",1,"other","other"], [132877,728,90,"hi",1,"other","other"], [133375,728,90,"hi",1,"other","other"], [133415,728,90,"hi",1,"other","other"], [149894,728,90,"hi",1,"other","other"], [150439,728,90,"hi",1,"other","other"],
  [150569,728,90,"hi",1,"other","other"], [150729,728,90,"hi",1,"other","other"], [150859,728,90,"hi",1,"other","other"], [153488,728,90,"hi",1,"other","other"], [153859,728,90,"hi",1,"other","other"], [137171,800,800,"hi",13,"x","carousel"],
  [137172,1080,1350,"hi",13,"facebook","post"], [137173,1080,1920,"hi",13,"facebook","story"], [136935,120,600,"hu",1,"other","other"], [136994,120,600,"hu",1,"other","other"], [137055,120,600,"hu",1,"other","other"], [149895,120,600,"hu",1,"other","other"],
  [150440,120,600,"hu",1,"other","other"], [150570,120,600,"hu",1,"other","other"], [150730,120,600,"hu",1,"other","other"], [150860,120,600,"hu",1,"other","other"], [153489,120,600,"hu",1,"other","other"], [136943,300,250,"hu",1,"other","other"],
  [136995,300,250,"hu",1,"other","other"], [137056,300,250,"hu",1,"other","other"], [149896,300,250,"hu",1,"other","other"], [150441,300,250,"hu",1,"other","other"], [150571,300,250,"hu",1,"other","other"], [150731,300,250,"hu",1,"other","other"],
  [150861,300,250,"hu",1,"other","other"], [153490,300,250,"hu",1,"other","other"], [136951,320,100,"hu",1,"other","other"], [136996,320,100,"hu",1,"other","other"], [137057,320,100,"hu",1,"other","other"], [149897,320,100,"hu",1,"other","other"],
  [150442,320,100,"hu",1,"other","other"], [150572,320,100,"hu",1,"other","other"], [150732,320,100,"hu",1,"other","other"], [150862,320,100,"hu",1,"other","other"], [153491,320,100,"hu",1,"other","other"], [136959,600,90,"hu",1,"other","other"],
  [136997,600,90,"hu",1,"other","other"], [137058,600,90,"hu",1,"other","other"], [149898,600,90,"hu",1,"other","other"], [150443,600,90,"hu",1,"other","other"], [150573,600,90,"hu",1,"other","other"], [150733,600,90,"hu",1,"other","other"],
  [150863,600,90,"hu",1,"other","other"], [153492,600,90,"hu",1,"other","other"], [136967,728,90,"hu",1,"other","other"], [136998,728,90,"hu",1,"other","other"], [137059,728,90,"hu",1,"other","other"], [149899,728,90,"hu",1,"other","other"],
  [150444,728,90,"hu",1,"other","other"], [150574,728,90,"hu",1,"other","other"], [150734,728,90,"hu",1,"other","other"], [150864,728,90,"hu",1,"other","other"], [153493,728,90,"hu",1,"other","other"], [131296,120,600,"id",1,"other","other"],
  [132407,120,600,"id",1,"other","other"], [133136,120,600,"id",1,"other","other"], [133176,120,600,"id",1,"other","other"], [149900,120,600,"id",1,"other","other"], [150575,120,600,"id",1,"other","other"], [150865,120,600,"id",1,"other","other"],
  [153384,120,600,"id",1,"other","other"], [153494,120,600,"id",1,"other","other"], [153860,120,600,"id",1,"other","other"], [154065,120,600,"id",10,"other","other"], [131356,300,250,"id",1,"other","other"], [132408,300,250,"id",1,"other","other"],
  [133196,300,250,"id",1,"other","other"], [133236,300,250,"id",1,"other","other"], [149901,300,250,"id",1,"other","other"], [150576,300,250,"id",1,"other","other"], [150866,300,250,"id",1,"other","other"], [153385,300,250,"id",1,"other","other"],
  [153495,300,250,"id",1,"other","other"], [153861,300,250,"id",1,"other","other"], [154066,300,250,"id",10,"other","other"], [131416,320,100,"id",1,"other","other"], [132409,320,100,"id",1,"other","other"], [133256,320,100,"id",1,"other","other"],
  [133296,320,100,"id",1,"other","other"], [149902,320,100,"id",1,"other","other"], [150577,320,100,"id",1,"other","other"], [150867,320,100,"id",1,"other","other"], [153386,320,100,"id",1,"other","other"], [153496,320,100,"id",1,"other","other"],
  [153862,320,100,"id",1,"other","other"], [154067,320,100,"id",10,"other","other"], [131476,600,90,"id",1,"other","other"], [132410,600,90,"id",1,"other","other"], [133316,600,90,"id",1,"other","other"], [133356,600,90,"id",1,"other","other"],
  [149903,600,90,"id",1,"other","other"], [150578,600,90,"id",1,"other","other"], [150868,600,90,"id",1,"other","other"], [153387,600,90,"id",1,"other","other"], [153497,600,90,"id",1,"other","other"], [153863,600,90,"id",1,"other","other"],
  [154068,600,90,"id",10,"other","other"], [131536,728,90,"id",1,"other","other"], [132411,728,90,"id",1,"other","other"], [133376,728,90,"id",1,"other","other"], [133416,728,90,"id",1,"other","other"], [149904,728,90,"id",1,"other","other"],
  [150579,728,90,"id",1,"other","other"], [150869,728,90,"id",1,"other","other"], [153388,728,90,"id",1,"other","other"], [153498,728,90,"id",1,"other","other"], [153864,728,90,"id",1,"other","other"], [154069,728,90,"id",10,"other","other"],
  [137174,800,418,"id",13,"x","post"], [137175,800,800,"id",13,"x","carousel"], [137176,1080,1350,"id",13,"facebook","post"], [137177,1080,1920,"id",13,"facebook","story"], [132344,120,600,"it",1,"other","other"], [136936,120,600,"it",1,"other","other"],
  [136999,120,600,"it",1,"other","other"], [137060,120,600,"it",1,"other","other"], [149905,120,600,"it",1,"other","other"], [150445,120,600,"it",1,"other","other"], [150580,120,600,"it",1,"other","other"], [150735,120,600,"it",1,"other","other"],
  [150870,120,600,"it",1,"other","other"], [153499,120,600,"it",1,"other","other"], [132347,300,250,"it",1,"other","other"], [136944,300,250,"it",1,"other","other"], [137000,300,250,"it",1,"other","other"], [137061,300,250,"it",1,"other","other"],
  [149906,300,250,"it",1,"other","other"], [150446,300,250,"it",1,"other","other"], [150581,300,250,"it",1,"other","other"], [150736,300,250,"it",1,"other","other"], [150871,300,250,"it",1,"other","other"], [153500,300,250,"it",1,"other","other"],
  [132350,320,100,"it",1,"other","other"], [136952,320,100,"it",1,"other","other"], [137001,320,100,"it",1,"other","other"], [137062,320,100,"it",1,"other","other"], [149907,320,100,"it",1,"other","other"], [150447,320,100,"it",1,"other","other"],
  [150582,320,100,"it",1,"other","other"], [150737,320,100,"it",1,"other","other"], [150872,320,100,"it",1,"other","other"], [153501,320,100,"it",1,"other","other"], [132353,600,90,"it",1,"other","other"], [136960,600,90,"it",1,"other","other"],
  [137002,600,90,"it",1,"other","other"], [137063,600,90,"it",1,"other","other"], [149908,600,90,"it",1,"other","other"], [150448,600,90,"it",1,"other","other"], [150738,600,90,"it",1,"other","other"], [150873,600,90,"it",1,"other","other"],
  [153502,600,90,"it",1,"other","other"], [132356,728,90,"it",1,"other","other"], [136968,728,90,"it",1,"other","other"], [137003,728,90,"it",1,"other","other"], [137064,728,90,"it",1,"other","other"], [149909,728,90,"it",1,"other","other"],
  [150449,728,90,"it",1,"other","other"], [150584,728,90,"it",1,"other","other"], [150739,728,90,"it",1,"other","other"], [150874,728,90,"it",1,"other","other"], [153503,728,90,"it",1,"other","other"], [131257,120,600,"ko",1,"other","other"],
  [131297,120,600,"ko",1,"other","other"], [132417,120,600,"ko",1,"other","other"], [133177,120,600,"ko",1,"other","other"], [149910,120,600,"ko",1,"other","other"], [150450,120,600,"ko",1,"other","other"], [150585,120,600,"ko",1,"other","other"],
  [150740,120,600,"ko",1,"other","other"], [150875,120,600,"ko",1,"other","other"], [153389,120,600,"ko",1,"other","other"], [153504,120,600,"ko",1,"other","other"], [153865,120,600,"ko",1,"other","other"], [154070,120,600,"ko",10,"other","other"],
  [131317,300,250,"ko",1,"other","other"], [131357,300,250,"ko",1,"other","other"], [132418,300,250,"ko",1,"other","other"], [133237,300,250,"ko",1,"other","other"], [149911,300,250,"ko",1,"other","other"], [150451,300,250,"ko",1,"other","other"],
  [150586,300,250,"ko",1,"other","other"], [150741,300,250,"ko",1,"other","other"], [150876,300,250,"ko",1,"other","other"], [153390,300,250,"ko",1,"other","other"], [153505,300,250,"ko",1,"other","other"], [153866,300,250,"ko",1,"other","other"],
  [154071,300,250,"ko",10,"other","other"], [131377,320,100,"ko",1,"other","other"], [131417,320,100,"ko",1,"other","other"], [132419,320,100,"ko",1,"other","other"], [133297,320,100,"ko",1,"other","other"], [149912,320,100,"ko",1,"other","other"],
  [150452,320,100,"ko",1,"other","other"], [150587,320,100,"ko",1,"other","other"], [150742,320,100,"ko",1,"other","other"], [150877,320,100,"ko",1,"other","other"], [153391,320,100,"ko",1,"other","other"], [153506,320,100,"ko",1,"other","other"],
  [153867,320,100,"ko",1,"other","other"], [154072,320,100,"ko",10,"other","other"], [131437,600,90,"ko",1,"other","other"], [131477,600,90,"ko",1,"other","other"], [132420,600,90,"ko",1,"other","other"], [133357,600,90,"ko",1,"other","other"],
  [149913,600,90,"ko",1,"other","other"], [150453,600,90,"ko",1,"other","other"], [150588,600,90,"ko",1,"other","other"], [150743,600,90,"ko",1,"other","other"], [150878,600,90,"ko",1,"other","other"], [153392,600,90,"ko",1,"other","other"],
  [153507,600,90,"ko",1,"other","other"], [153868,600,90,"ko",1,"other","other"], [154073,600,90,"ko",10,"other","other"], [131497,728,90,"ko",1,"other","other"], [131537,728,90,"ko",1,"other","other"], [132421,728,90,"ko",1,"other","other"],
  [133417,728,90,"ko",1,"other","other"], [149914,728,90,"ko",1,"other","other"], [150454,728,90,"ko",1,"other","other"], [150589,728,90,"ko",1,"other","other"], [150744,728,90,"ko",1,"other","other"], [150879,728,90,"ko",1,"other","other"],
  [153393,728,90,"ko",1,"other","other"], [153508,728,90,"ko",1,"other","other"], [153869,728,90,"ko",1,"other","other"], [154074,728,90,"ko",10,"other","other"], [137178,800,418,"ko",13,"x","post"], [137179,800,800,"ko",13,"x","carousel"],
  [137180,1080,1350,"ko",13,"facebook","post"], [137181,1080,1920,"ko",13,"facebook","story"], [148436,120,600,"mn",1,"other","other"], [148446,120,600,"mn",1,"other","other"], [148476,120,600,"mn",1,"other","other"], [149915,120,600,"mn",1,"other","other"],
  [150455,120,600,"mn",1,"other","other"], [150590,120,600,"mn",1,"other","other"], [150745,120,600,"mn",1,"other","other"], [150880,120,600,"mn",1,"other","other"], [153394,120,600,"mn",1,"other","other"], [148437,300,250,"mn",1,"other","other"],
  [148447,300,250,"mn",1,"other","other"], [148477,300,250,"mn",1,"other","other"], [149916,300,250,"mn",1,"other","other"], [150456,300,250,"mn",1,"other","other"], [150591,300,250,"mn",1,"other","other"], [150746,300,250,"mn",1,"other","other"],
  [150881,300,250,"mn",1,"other","other"], [153395,300,250,"mn",1,"other","other"], [148438,320,100,"mn",1,"other","other"], [148448,320,100,"mn",1,"other","other"], [148478,320,100,"mn",1,"other","other"], [149917,320,100,"mn",1,"other","other"],
  [150457,320,100,"mn",1,"other","other"], [150592,320,100,"mn",1,"other","other"], [150747,320,100,"mn",1,"other","other"], [150882,320,100,"mn",1,"other","other"], [153396,320,100,"mn",1,"other","other"], [148439,600,90,"mn",1,"other","other"],
  [148449,600,90,"mn",1,"other","other"], [148479,600,90,"mn",1,"other","other"], [149918,600,90,"mn",1,"other","other"], [150458,600,90,"mn",1,"other","other"], [150593,600,90,"mn",1,"other","other"], [150748,600,90,"mn",1,"other","other"],
  [150883,600,90,"mn",1,"other","other"], [153397,600,90,"mn",1,"other","other"], [148440,728,90,"mn",1,"other","other"], [148470,728,90,"mn",1,"other","other"], [148480,728,90,"mn",1,"other","other"], [149919,728,90,"mn",1,"other","other"],
  [150459,728,90,"mn",1,"other","other"], [150594,728,90,"mn",1,"other","other"], [150749,728,90,"mn",1,"other","other"], [150884,728,90,"mn",1,"other","other"], [153398,728,90,"mn",1,"other","other"], [131258,120,600,"ms",1,"other","other"],
  [131278,120,600,"ms",1,"other","other"], [131298,120,600,"ms",1,"other","other"], [132422,120,600,"ms",1,"other","other"], [133138,120,600,"ms",1,"other","other"], [133178,120,600,"ms",1,"other","other"], [149920,120,600,"ms",1,"other","other"],
  [150460,120,600,"ms",1,"other","other"], [150595,120,600,"ms",1,"other","other"], [150750,120,600,"ms",1,"other","other"], [150885,120,600,"ms",1,"other","other"], [153509,120,600,"ms",1,"other","other"], [153514,120,600,"ms",1,"other","other"],
  [153870,120,600,"ms",1,"other","other"], [154075,120,600,"ms",10,"other","other"], [131318,300,250,"ms",1,"other","other"], [131338,300,250,"ms",1,"other","other"], [131358,300,250,"ms",1,"other","other"], [132423,300,250,"ms",1,"other","other"],
  [133198,300,250,"ms",1,"other","other"], [133238,300,250,"ms",1,"other","other"], [149921,300,250,"ms",1,"other","other"], [150461,300,250,"ms",1,"other","other"], [150596,300,250,"ms",1,"other","other"], [150751,300,250,"ms",1,"other","other"],
  [150886,300,250,"ms",1,"other","other"], [153510,300,250,"ms",1,"other","other"], [153515,300,250,"ms",1,"other","other"], [153871,300,250,"ms",1,"other","other"], [154076,300,250,"ms",10,"other","other"], [150887,320,10,"ms",1,"other","other"],
  [131378,320,100,"ms",1,"other","other"], [131398,320,100,"ms",1,"other","other"], [131418,320,100,"ms",1,"other","other"], [132424,320,100,"ms",1,"other","other"], [133258,320,100,"ms",1,"other","other"], [133298,320,100,"ms",1,"other","other"],
  [149922,320,100,"ms",1,"other","other"], [150462,320,100,"ms",1,"other","other"], [150597,320,100,"ms",1,"other","other"], [150752,320,100,"ms",1,"other","other"], [153511,320,100,"ms",1,"other","other"], [153516,320,100,"ms",1,"other","other"],
  [153872,320,100,"ms",1,"other","other"], [154077,320,100,"ms",10,"other","other"], [131438,600,90,"ms",1,"other","other"], [131458,600,90,"ms",1,"other","other"], [131478,600,90,"ms",1,"other","other"], [132425,600,90,"ms",1,"other","other"],
  [133318,600,90,"ms",1,"other","other"], [133358,600,90,"ms",1,"other","other"], [149923,600,90,"ms",1,"other","other"], [150463,600,90,"ms",1,"other","other"], [150598,600,90,"ms",1,"other","other"], [150753,600,90,"ms",1,"other","other"],
  [150888,600,90,"ms",1,"other","other"], [153512,600,90,"ms",1,"other","other"], [153517,600,90,"ms",1,"other","other"], [153873,600,90,"ms",1,"other","other"], [154078,600,90,"ms",10,"other","other"], [131518,728,90,"ms",1,"other","other"],
  [131538,728,90,"ms",1,"other","other"], [132426,728,90,"ms",1,"other","other"], [133378,728,90,"ms",1,"other","other"], [133418,728,90,"ms",1,"other","other"], [149924,728,90,"ms",1,"other","other"], [150464,728,90,"ms",1,"other","other"],
  [150599,728,90,"ms",1,"other","other"], [150754,728,90,"ms",1,"other","other"], [150889,728,90,"ms",1,"other","other"], [153513,728,90,"ms",1,"other","other"], [153518,728,90,"ms",1,"other","other"], [153874,728,90,"ms",1,"other","other"],
  [154079,728,90,"ms",10,"other","other"], [137182,800,418,"ms",13,"x","post"], [137183,800,800,"ms",13,"x","carousel"], [137184,1080,1350,"ms",13,"facebook","post"], [137185,1080,1920,"ms",13,"facebook","story"], [132993,28,90,"nl",1,"other","other"],
  [132953,120,600,"nl",1,"other","other"], [137004,120,600,"nl",1,"other","other"], [137065,120,600,"nl",1,"other","other"], [149925,120,600,"nl",1,"other","other"], [150465,120,600,"nl",1,"other","other"], [150600,120,600,"nl",1,"other","other"],
  [150755,120,600,"nl",1,"other","other"], [150890,120,600,"nl",1,"other","other"], [153519,120,600,"nl",1,"other","other"], [132963,300,250,"nl",1,"other","other"], [137005,300,250,"nl",1,"other","other"], [137066,300,250,"nl",1,"other","other"],
  [149926,300,250,"nl",1,"other","other"], [150466,300,250,"nl",1,"other","other"], [150601,300,250,"nl",1,"other","other"], [150756,300,250,"nl",1,"other","other"], [150891,300,250,"nl",1,"other","other"], [153520,300,250,"nl",1,"other","other"],
  [132973,320,100,"nl",1,"other","other"], [137006,320,100,"nl",1,"other","other"], [137067,320,100,"nl",1,"other","other"], [149927,320,100,"nl",1,"other","other"], [150467,320,100,"nl",1,"other","other"], [150602,320,100,"nl",1,"other","other"],
  [150757,320,100,"nl",1,"other","other"], [150892,320,100,"nl",1,"other","other"], [153521,320,100,"nl",1,"other","other"], [132983,600,90,"nl",1,"other","other"], [137007,600,90,"nl",1,"other","other"], [137068,600,90,"nl",1,"other","other"],
  [149928,600,90,"nl",1,"other","other"], [150468,600,90,"nl",1,"other","other"], [150603,600,90,"nl",1,"other","other"], [150758,600,90,"nl",1,"other","other"], [150893,600,90,"nl",1,"other","other"], [153522,600,90,"nl",1,"other","other"],
  [137008,728,90,"nl",1,"other","other"], [137069,728,90,"nl",1,"other","other"], [149929,728,90,"nl",1,"other","other"], [150469,728,90,"nl",1,"other","other"], [150604,728,90,"nl",1,"other","other"], [150759,728,90,"nl",1,"other","other"],
  [150894,728,90,"nl",1,"other","other"], [153523,728,90,"nl",1,"other","other"], [148151,120,600,"pl",1,"other","other"], [148154,120,600,"pl",1,"other","other"], [149930,120,600,"pl",1,"other","other"], [150470,120,600,"pl",1,"other","other"],
  [150605,120,600,"pl",1,"other","other"], [150760,120,600,"pl",1,"other","other"], [150895,120,600,"pl",1,"other","other"], [153524,120,600,"pl",1,"other","other"], [148157,300,250,"pl",1,"other","other"], [148160,300,250,"pl",1,"other","other"],
  [149931,300,250,"pl",1,"other","other"], [150471,300,250,"pl",1,"other","other"], [150606,300,250,"pl",1,"other","other"], [150761,300,250,"pl",1,"other","other"], [150896,300,250,"pl",1,"other","other"], [153525,300,250,"pl",1,"other","other"],
  [148163,320,100,"pl",1,"other","other"], [148167,320,100,"pl",1,"other","other"], [149932,320,100,"pl",1,"other","other"], [150472,320,100,"pl",1,"other","other"], [150607,320,100,"pl",1,"other","other"], [150762,320,100,"pl",1,"other","other"],
  [150897,320,100,"pl",1,"other","other"], [153526,320,100,"pl",1,"other","other"], [148170,600,90,"pl",1,"other","other"], [148173,600,90,"pl",1,"other","other"], [149933,600,90,"pl",1,"other","other"], [150473,600,90,"pl",1,"other","other"],
  [150608,600,90,"pl",1,"other","other"], [150763,600,90,"pl",1,"other","other"], [150898,600,90,"pl",1,"other","other"], [153527,600,90,"pl",1,"other","other"], [148176,728,90,"pl",1,"other","other"], [148179,728,90,"pl",1,"other","other"],
  [149934,728,90,"pl",1,"other","other"], [150474,728,90,"pl",1,"other","other"], [150609,728,90,"pl",1,"other","other"], [150764,728,90,"pl",1,"other","other"], [150899,728,90,"pl",1,"other","other"], [153528,728,90,"pl",1,"other","other"],
  [131259,120,600,"pt",1,"other","other"], [131299,120,600,"pt",1,"other","other"], [131767,120,600,"pt",1,"other","other"], [132437,120,600,"pt",1,"other","other"], [133139,120,600,"pt",1,"other","other"], [133179,120,600,"pt",1,"other","other"],
  [148152,120,600,"pt",1,"other","other"], [148155,120,600,"pt",1,"other","other"], [149935,120,600,"pt",1,"other","other"], [150475,120,600,"pt",1,"other","other"], [150610,120,600,"pt",1,"other","other"], [150765,120,600,"pt",1,"other","other"],
  [150900,120,600,"pt",1,"other","other"], [153529,120,600,"pt",1,"other","other"], [154080,120,600,"pt",10,"other","other"], [131319,300,250,"pt",1,"other","other"], [131359,300,250,"pt",1,"other","other"], [132166,300,250,"pt",1,"other","other"],
  [132438,300,250,"pt",1,"other","other"], [133199,300,250,"pt",1,"other","other"], [133239,300,250,"pt",1,"other","other"], [148158,300,250,"pt",1,"other","other"], [148161,300,250,"pt",1,"other","other"], [149936,300,250,"pt",1,"other","other"],
  [150476,300,250,"pt",1,"other","other"], [150611,300,250,"pt",1,"other","other"], [150766,300,250,"pt",1,"other","other"], [150901,300,250,"pt",1,"other","other"], [153530,300,250,"pt",1,"other","other"], [154081,300,250,"pt",10,"other","other"],
  [131379,320,100,"pt",1,"other","other"], [131419,320,100,"pt",1,"other","other"], [132185,320,100,"pt",1,"other","other"], [132439,320,100,"pt",1,"other","other"], [133259,320,100,"pt",1,"other","other"], [133299,320,100,"pt",1,"other","other"],
  [148164,320,100,"pt",1,"other","other"], [148168,320,100,"pt",1,"other","other"], [149937,320,100,"pt",1,"other","other"], [150477,320,100,"pt",1,"other","other"], [150612,320,100,"pt",1,"other","other"], [150767,320,100,"pt",1,"other","other"],
  [150902,320,100,"pt",1,"other","other"], [153531,320,100,"pt",1,"other","other"], [154082,320,100,"pt",10,"other","other"], [131439,600,90,"pt",1,"other","other"], [131479,600,90,"pt",1,"other","other"], [132204,600,90,"pt",1,"other","other"],
  [132440,600,90,"pt",1,"other","other"], [133319,600,90,"pt",1,"other","other"], [133359,600,90,"pt",1,"other","other"], [148171,600,90,"pt",1,"other","other"], [148174,600,90,"pt",1,"other","other"], [149938,600,90,"pt",1,"other","other"],
  [150478,600,90,"pt",1,"other","other"], [150613,600,90,"pt",1,"other","other"], [150768,600,90,"pt",1,"other","other"], [150903,600,90,"pt",1,"other","other"], [153532,600,90,"pt",1,"other","other"], [154083,600,90,"pt",10,"other","other"],
  [131499,728,90,"pt",1,"other","other"], [131539,728,90,"pt",1,"other","other"], [132223,728,90,"pt",1,"other","other"], [132441,728,90,"pt",1,"other","other"], [133379,728,90,"pt",1,"other","other"], [133419,728,90,"pt",1,"other","other"],
  [148177,728,90,"pt",1,"other","other"], [148180,728,90,"pt",1,"other","other"], [149939,728,90,"pt",1,"other","other"], [150479,728,90,"pt",1,"other","other"], [150614,728,90,"pt",1,"other","other"], [150769,728,90,"pt",1,"other","other"],
  [150904,728,90,"pt",1,"other","other"], [153533,728,90,"pt",1,"other","other"], [154084,728,90,"pt",10,"other","other"], [137186,800,418,"pt",13,"x","post"], [137187,800,800,"pt",13,"x","carousel"], [137188,1080,1350,"pt",13,"facebook","post"],
  [137189,1080,1920,"pt",13,"facebook","story"], [131300,120,600,"ru",1,"other","other"], [131768,120,600,"ru",1,"other","other"], [133140,120,600,"ru",1,"other","other"], [133180,120,600,"ru",1,"other","other"], [149940,120,600,"ru",1,"other","other"],
  [150480,120,600,"ru",1,"other","other"], [150615,120,600,"ru",1,"other","other"], [150770,120,600,"ru",1,"other","other"], [150905,120,600,"ru",1,"other","other"], [153399,120,600,"ru",1,"other","other"], [153534,120,600,"ru",1,"other","other"],
  [153875,120,600,"ru",1,"other","other"], [154085,120,600,"ru",10,"other","other"], [131360,300,250,"ru",1,"other","other"], [132167,300,250,"ru",1,"other","other"], [133200,300,250,"ru",1,"other","other"], [133240,300,250,"ru",1,"other","other"],
  [149941,300,250,"ru",1,"other","other"], [150481,300,250,"ru",1,"other","other"], [150616,300,250,"ru",1,"other","other"], [150771,300,250,"ru",1,"other","other"], [150906,300,250,"ru",1,"other","other"], [153400,300,250,"ru",1,"other","other"],
  [153535,300,250,"ru",1,"other","other"], [153876,300,250,"ru",1,"other","other"], [154086,300,250,"ru",10,"other","other"], [131420,320,100,"ru",1,"other","other"], [132186,320,100,"ru",1,"other","other"], [133260,320,100,"ru",1,"other","other"],
  [133300,320,100,"ru",1,"other","other"], [149942,320,100,"ru",1,"other","other"], [150482,320,100,"ru",1,"other","other"], [150617,320,100,"ru",1,"other","other"], [150772,320,100,"ru",1,"other","other"], [150907,320,100,"ru",1,"other","other"],
  [153401,320,100,"ru",1,"other","other"], [153536,320,100,"ru",1,"other","other"], [153877,320,100,"ru",1,"other","other"], [154087,320,100,"ru",10,"other","other"], [131480,600,90,"ru",1,"other","other"], [132205,600,90,"ru",1,"other","other"],
  [133320,600,90,"ru",1,"other","other"], [133360,600,90,"ru",1,"other","other"], [149943,600,90,"ru",1,"other","other"], [150483,600,90,"ru",1,"other","other"], [150618,600,90,"ru",1,"other","other"], [150773,600,90,"ru",1,"other","other"],
  [150908,600,90,"ru",1,"other","other"], [153402,600,90,"ru",1,"other","other"], [153537,600,90,"ru",1,"other","other"], [153878,600,90,"ru",1,"other","other"], [154088,600,90,"ru",10,"other","other"], [131540,728,90,"ru",1,"other","other"],
  [132224,728,90,"ru",1,"other","other"], [133380,728,90,"ru",1,"other","other"], [133420,728,90,"ru",1,"other","other"], [149944,728,90,"ru",1,"other","other"], [150484,728,90,"ru",1,"other","other"], [150619,728,90,"ru",1,"other","other"],
  [150774,728,90,"ru",1,"other","other"], [150909,728,90,"ru",1,"other","other"], [153403,728,90,"ru",1,"other","other"], [153538,728,90,"ru",1,"other","other"], [153879,728,90,"ru",1,"other","other"], [154089,728,90,"ru",10,"other","other"],
  [137190,800,418,"ru",13,"x","post"], [137191,800,800,"ru",13,"x","carousel"], [137192,1080,1350,"ru",13,"facebook","post"], [137193,1080,1920,"ru",13,"facebook","story"], [131301,120,600,"si",1,"other","other"], [132878,120,600,"si",1,"other","other"],
  [133141,120,600,"si",1,"other","other"], [133181,120,600,"si",1,"other","other"], [149950,120,600,"si",1,"other","other"], [150485,120,600,"si",1,"other","other"], [150620,120,600,"si",1,"other","other"], [150775,120,600,"si",1,"other","other"],
  [150910,120,600,"si",1,"other","other"], [153404,120,600,"si",1,"other","other"], [153539,120,600,"si",1,"other","other"], [153880,120,600,"si",1,"other","other"], [154090,120,600,"si",10,"other","other"], [131361,300,250,"si",1,"other","other"],
  [132879,300,250,"si",1,"other","other"], [133201,300,250,"si",1,"other","other"], [133241,300,250,"si",1,"other","other"], [149951,300,250,"si",1,"other","other"], [150486,300,250,"si",1,"other","other"], [150621,300,250,"si",1,"other","other"],
  [150776,300,250,"si",1,"other","other"], [150911,300,250,"si",1,"other","other"], [153405,300,250,"si",1,"other","other"], [153540,300,250,"si",1,"other","other"], [153881,300,250,"si",1,"other","other"], [154091,300,250,"si",10,"other","other"],
  [131421,320,100,"si",1,"other","other"], [132880,320,100,"si",1,"other","other"], [133261,320,100,"si",1,"other","other"], [133301,320,100,"si",1,"other","other"], [149952,320,100,"si",1,"other","other"], [150487,320,100,"si",1,"other","other"],
  [150622,320,100,"si",1,"other","other"], [150777,320,100,"si",1,"other","other"], [150912,320,100,"si",1,"other","other"], [153406,320,100,"si",1,"other","other"], [153541,320,100,"si",1,"other","other"], [153882,320,100,"si",1,"other","other"],
  [154092,320,100,"si",10,"other","other"], [131481,600,90,"si",1,"other","other"], [132881,600,90,"si",1,"other","other"], [133321,600,90,"si",1,"other","other"], [133361,600,90,"si",1,"other","other"], [149953,600,90,"si",1,"other","other"],
  [150488,600,90,"si",1,"other","other"], [150623,600,90,"si",1,"other","other"], [150778,600,90,"si",1,"other","other"], [150913,600,90,"si",1,"other","other"], [153407,600,90,"si",1,"other","other"], [153542,600,90,"si",1,"other","other"],
  [153883,600,90,"si",1,"other","other"], [154093,600,90,"si",10,"other","other"], [131541,728,90,"si",1,"other","other"], [132882,728,90,"si",1,"other","other"], [133381,728,90,"si",1,"other","other"], [133421,728,90,"si",1,"other","other"],
  [149954,728,90,"si",1,"other","other"], [150489,728,90,"si",1,"other","other"], [150624,728,90,"si",1,"other","other"], [150779,728,90,"si",1,"other","other"], [150914,728,90,"si",1,"other","other"], [153408,728,90,"si",1,"other","other"],
  [153543,728,90,"si",1,"other","other"], [153884,728,90,"si",1,"other","other"], [154094,728,90,"si",10,"other","other"], [137194,800,418,"si",13,"x","post"], [137195,800,800,"si",13,"x","carousel"], [137196,1080,1350,"si",13,"facebook","post"],
  [137197,1080,1920,"si",13,"facebook","story"], [136937,120,600,"sv",1,"other","other"], [137009,120,600,"sv",1,"other","other"], [137070,120,600,"sv",1,"other","other"], [149945,120,600,"sv",1,"other","other"], [150490,120,600,"sv",1,"other","other"],
  [150625,120,600,"sv",1,"other","other"], [150780,120,600,"sv",1,"other","other"], [150915,120,600,"sv",1,"other","other"], [153544,120,600,"sv",1,"other","other"], [136945,300,250,"sv",1,"other","other"], [137010,300,250,"sv",1,"other","other"],
  [137071,300,250,"sv",1,"other","other"], [149946,300,250,"sv",1,"other","other"], [150491,300,250,"sv",1,"other","other"], [150626,300,250,"sv",1,"other","other"], [150781,300,250,"sv",1,"other","other"], [150916,300,250,"sv",1,"other","other"],
  [153545,300,250,"sv",1,"other","other"], [136953,320,100,"sv",1,"other","other"], [137011,320,100,"sv",1,"other","other"], [137072,320,100,"sv",1,"other","other"], [149947,320,100,"sv",1,"other","other"], [150492,320,100,"sv",1,"other","other"],
  [150627,320,100,"sv",1,"other","other"], [150782,320,100,"sv",1,"other","other"], [150917,320,100,"sv",1,"other","other"], [153546,320,100,"sv",1,"other","other"], [136961,600,90,"sv",1,"other","other"], [137012,600,90,"sv",1,"other","other"],
  [137073,600,90,"sv",1,"other","other"], [149948,600,90,"sv",1,"other","other"], [150493,600,90,"sv",1,"other","other"], [150628,600,90,"sv",1,"other","other"], [150783,600,90,"sv",1,"other","other"], [150918,600,90,"sv",1,"other","other"],
  [153547,600,90,"sv",1,"other","other"], [136969,728,90,"sv",1,"other","other"], [137013,728,90,"sv",1,"other","other"], [137074,728,90,"sv",1,"other","other"], [149949,728,90,"sv",1,"other","other"], [150494,728,90,"sv",1,"other","other"],
  [150629,728,90,"sv",1,"other","other"], [150784,728,90,"sv",1,"other","other"], [150919,728,90,"sv",1,"other","other"], [153548,728,90,"sv",1,"other","other"], [131262,120,600,"th",1,"other","other"], [131302,120,600,"th",1,"other","other"],
  [131769,120,600,"th",1,"other","other"], [132457,120,600,"th",1,"other","other"], [133142,120,600,"th",1,"other","other"], [133182,120,600,"th",1,"other","other"], [134223,120,600,"th",11,"other","other"], [149955,120,600,"th",1,"other","other"],
  [150495,120,600,"th",1,"other","other"], [150630,120,600,"th",1,"other","other"], [150785,120,600,"th",1,"other","other"], [150920,120,600,"th",1,"other","other"], [153409,120,600,"th",1,"other","other"], [153549,120,600,"th",1,"other","other"],
  [153885,120,600,"th",1,"other","other"], [154095,120,600,"th",10,"other","other"], [131322,300,250,"th",1,"other","other"], [131362,300,250,"th",1,"other","other"], [132168,300,250,"th",1,"other","other"], [132458,300,250,"th",1,"other","other"],
  [133202,300,250,"th",1,"other","other"], [133242,300,250,"th",1,"other","other"], [134307,300,250,"th",11,"other","other"], [149956,300,250,"th",1,"other","other"], [150496,300,250,"th",1,"other","other"], [150631,300,250,"th",1,"other","other"],
  [150786,300,250,"th",1,"other","other"], [150921,300,250,"th",1,"other","other"], [153410,300,250,"th",1,"other","other"], [153550,300,250,"th",1,"other","other"], [153886,300,250,"th",1,"other","other"], [154096,300,250,"th",10,"other","other"],
  [131382,320,100,"th",1,"other","other"], [131422,320,100,"th",1,"other","other"], [132187,320,100,"th",1,"other","other"], [132459,320,100,"th",1,"other","other"], [133262,320,100,"th",1,"other","other"], [133302,320,100,"th",1,"other","other"],
  [134391,320,100,"th",11,"other","other"], [149957,320,100,"th",1,"other","other"], [150497,320,100,"th",1,"other","other"], [150632,320,100,"th",1,"other","other"], [150787,320,100,"th",1,"other","other"], [150922,320,100,"th",1,"other","other"],
  [153411,320,100,"th",1,"other","other"], [153551,320,100,"th",1,"other","other"], [153887,320,100,"th",1,"other","other"], [154097,320,100,"th",10,"other","other"], [131442,600,90,"th",1,"other","other"], [131482,600,90,"th",1,"other","other"],
  [132206,600,90,"th",1,"other","other"], [132460,600,90,"th",1,"other","other"], [133322,600,90,"th",1,"other","other"], [133362,600,90,"th",1,"other","other"], [134475,600,90,"th",11,"other","other"], [149958,600,90,"th",1,"other","other"],
  [150498,600,90,"th",1,"other","other"], [150633,600,90,"th",1,"other","other"], [150788,600,90,"th",1,"other","other"], [150923,600,90,"th",1,"other","other"], [153412,600,90,"th",1,"other","other"], [153552,600,90,"th",1,"other","other"],
  [153888,600,90,"th",1,"other","other"], [154098,600,90,"th",10,"other","other"], [131502,728,90,"th",1,"other","other"], [131542,728,90,"th",1,"other","other"], [132225,728,90,"th",1,"other","other"], [132461,728,90,"th",1,"other","other"],
  [133382,728,90,"th",1,"other","other"], [133422,728,90,"th",1,"other","other"], [134559,728,90,"th",11,"other","other"], [149959,728,90,"th",1,"other","other"], [150499,728,90,"th",1,"other","other"], [150634,728,90,"th",1,"other","other"],
  [150789,728,90,"th",1,"other","other"], [150924,728,90,"th",1,"other","other"], [153413,728,90,"th",1,"other","other"], [153553,728,90,"th",1,"other","other"], [153889,728,90,"th",1,"other","other"], [154099,728,90,"th",10,"other","other"],
  [137198,800,418,"th",13,"x","post"], [137199,800,800,"th",13,"x","carousel"], [137200,1080,1350,"th",13,"facebook","post"], [137201,1080,1920,"th",13,"facebook","story"], [131303,120,600,"tl",1,"other","other"], [132462,120,600,"tl",1,"other","other"],
  [133143,120,600,"tl",1,"other","other"], [133183,120,600,"tl",1,"other","other"], [149960,120,600,"tl",1,"other","other"], [150500,120,600,"tl",1,"other","other"], [150635,120,600,"tl",1,"other","other"], [150790,120,600,"tl",1,"other","other"],
  [150925,120,600,"tl",1,"other","other"], [153554,120,600,"tl",1,"other","other"], [153890,120,600,"tl",1,"other","other"], [154100,120,600,"tl",10,"other","other"], [131363,300,250,"tl",1,"other","other"], [132463,300,250,"tl",1,"other","other"],
  [133203,300,250,"tl",1,"other","other"], [133243,300,250,"tl",1,"other","other"], [149961,300,250,"tl",1,"other","other"], [150501,300,250,"tl",1,"other","other"], [150636,300,250,"tl",1,"other","other"], [150791,300,250,"tl",1,"other","other"],
  [150926,300,250,"tl",1,"other","other"], [153555,300,250,"tl",1,"other","other"], [153891,300,250,"tl",1,"other","other"], [154101,300,250,"tl",10,"other","other"], [131423,320,100,"tl",1,"other","other"], [132464,320,100,"tl",1,"other","other"],
  [133263,320,100,"tl",1,"other","other"], [133303,320,100,"tl",1,"other","other"], [149962,320,100,"tl",1,"other","other"], [150502,320,100,"tl",1,"other","other"], [150637,320,100,"tl",1,"other","other"], [150792,320,100,"tl",1,"other","other"],
  [150927,320,100,"tl",1,"other","other"], [153556,320,100,"tl",1,"other","other"], [153892,320,100,"tl",1,"other","other"], [154102,320,100,"tl",10,"other","other"], [131483,600,90,"tl",1,"other","other"], [132465,600,90,"tl",1,"other","other"],
  [133363,600,90,"tl",1,"other","other"], [149963,600,90,"tl",1,"other","other"], [150503,600,90,"tl",1,"other","other"], [150638,600,90,"tl",1,"other","other"], [150793,600,90,"tl",1,"other","other"], [150928,600,90,"tl",1,"other","other"],
  [153557,600,90,"tl",1,"other","other"], [153893,600,90,"tl",1,"other","other"], [154103,600,90,"tl",10,"other","other"], [131543,728,90,"tl",1,"other","other"], [132466,728,90,"tl",1,"other","other"], [133383,728,90,"tl",1,"other","other"],
  [133423,728,90,"tl",1,"other","other"], [149964,728,90,"tl",1,"other","other"], [150504,728,90,"tl",1,"other","other"], [150639,728,90,"tl",1,"other","other"], [150794,728,90,"tl",1,"other","other"], [150929,728,90,"tl",1,"other","other"],
  [153558,728,90,"tl",1,"other","other"], [153894,728,90,"tl",1,"other","other"], [154104,728,90,"tl",10,"other","other"], [137202,800,418,"tl",13,"x","post"], [137203,800,800,"tl",13,"x","carousel"], [137204,1080,1350,"tl",13,"facebook","post"],
  [137205,1080,1920,"tl",13,"facebook","story"], [131264,120,600,"tr",1,"other","other"], [131304,120,600,"tr",1,"other","other"], [132150,120,600,"tr",1,"other","other"], [132467,120,600,"tr",1,"other","other"], [133144,120,600,"tr",1,"other","other"],
  [133184,120,600,"tr",1,"other","other"], [149965,120,600,"tr",1,"other","other"], [150505,120,600,"tr",1,"other","other"], [150640,120,600,"tr",1,"other","other"], [150795,120,600,"tr",1,"other","other"], [150930,120,600,"tr",1,"other","other"],
  [153414,120,600,"tr",1,"other","other"], [153559,120,600,"tr",1,"other","other"], [153895,120,600,"tr",1,"other","other"], [131324,300,250,"tr",1,"other","other"], [131364,300,250,"tr",1,"other","other"], [132169,300,250,"tr",1,"other","other"],
  [132468,300,250,"tr",1,"other","other"], [133204,300,250,"tr",1,"other","other"], [133244,300,250,"tr",1,"other","other"], [149966,300,250,"tr",1,"other","other"], [150506,300,250,"tr",1,"other","other"], [150641,300,250,"tr",1,"other","other"],
  [150796,300,250,"tr",1,"other","other"], [150931,300,250,"tr",1,"other","other"], [153415,300,250,"tr",1,"other","other"], [153560,300,250,"tr",1,"other","other"], [153896,300,250,"tr",1,"other","other"], [131384,320,100,"tr",1,"other","other"],
  [131424,320,100,"tr",1,"other","other"], [132188,320,100,"tr",1,"other","other"], [132469,320,100,"tr",1,"other","other"], [133264,320,100,"tr",1,"other","other"], [133304,320,100,"tr",1,"other","other"], [149967,320,100,"tr",1,"other","other"],
  [150507,320,100,"tr",1,"other","other"], [150642,320,100,"tr",1,"other","other"], [150797,320,100,"tr",1,"other","other"], [150932,320,100,"tr",1,"other","other"], [153416,320,100,"tr",1,"other","other"], [153561,320,100,"tr",1,"other","other"],
  [153897,320,100,"tr",1,"other","other"], [131444,600,90,"tr",1,"other","other"], [131484,600,90,"tr",1,"other","other"], [132207,600,90,"tr",1,"other","other"], [132470,600,90,"tr",1,"other","other"], [133324,600,90,"tr",1,"other","other"],
  [133364,600,90,"tr",1,"other","other"], [149968,600,90,"tr",1,"other","other"], [150508,600,90,"tr",1,"other","other"], [150643,600,90,"tr",1,"other","other"], [150798,600,90,"tr",1,"other","other"], [150933,600,90,"tr",1,"other","other"],
  [153417,600,90,"tr",1,"other","other"], [153562,600,90,"tr",1,"other","other"], [153898,600,90,"tr",1,"other","other"], [131504,728,90,"tr",1,"other","other"], [131544,728,90,"tr",1,"other","other"], [132226,728,90,"tr",1,"other","other"],
  [132471,728,90,"tr",1,"other","other"], [133384,728,90,"tr",1,"other","other"], [133424,728,90,"tr",1,"other","other"], [149969,728,90,"tr",1,"other","other"], [150509,728,90,"tr",1,"other","other"], [150644,728,90,"tr",1,"other","other"],
  [150799,728,90,"tr",1,"other","other"], [150934,728,90,"tr",1,"other","other"], [153418,728,90,"tr",1,"other","other"], [153563,728,90,"tr",1,"other","other"], [153899,728,90,"tr",1,"other","other"], [131305,120,600,"ur",1,"other","other"],
  [132883,120,600,"ur",1,"other","other"], [133145,120,600,"ur",1,"other","other"], [133185,120,600,"ur",1,"other","other"], [149970,120,600,"ur",1,"other","other"], [150510,120,600,"ur",1,"other","other"], [150645,120,600,"ur",1,"other","other"],
  [150800,120,600,"ur",1,"other","other"], [150935,120,600,"ur",1,"other","other"], [153564,120,600,"ur",1,"other","other"], [153900,120,600,"ur",1,"other","other"], [154105,120,600,"ur",10,"other","other"], [131365,300,250,"ur",1,"other","other"],
  [132884,300,250,"ur",1,"other","other"], [133205,300,250,"ur",1,"other","other"], [133245,300,250,"ur",1,"other","other"], [149971,300,250,"ur",1,"other","other"], [150511,300,250,"ur",1,"other","other"], [150646,300,250,"ur",1,"other","other"],
  [150801,300,250,"ur",1,"other","other"], [150936,300,250,"ur",1,"other","other"], [153565,300,250,"ur",1,"other","other"], [153901,300,250,"ur",1,"other","other"], [154106,300,250,"ur",10,"other","other"], [131425,320,100,"ur",1,"other","other"],
  [132885,320,100,"ur",1,"other","other"], [133265,320,100,"ur",1,"other","other"], [133305,320,100,"ur",1,"other","other"], [149972,320,100,"ur",1,"other","other"], [150512,320,100,"ur",1,"other","other"], [150647,320,100,"ur",1,"other","other"],
  [150802,320,100,"ur",1,"other","other"], [150937,320,100,"ur",1,"other","other"], [153566,320,100,"ur",1,"other","other"], [153902,320,100,"ur",1,"other","other"], [154107,320,100,"ur",10,"other","other"], [131485,600,90,"ur",1,"other","other"],
  [132886,600,90,"ur",1,"other","other"], [133325,600,90,"ur",1,"other","other"], [133365,600,90,"ur",1,"other","other"], [149973,600,90,"ur",1,"other","other"], [150513,600,90,"ur",1,"other","other"], [150648,600,90,"ur",1,"other","other"],
  [150803,600,90,"ur",1,"other","other"], [150938,600,90,"ur",1,"other","other"], [153567,600,90,"ur",1,"other","other"], [153903,600,90,"ur",1,"other","other"], [154108,600,90,"ur",10,"other","other"], [131545,728,90,"ur",1,"other","other"],
  [132887,728,90,"ur",1,"other","other"], [133385,728,90,"ur",1,"other","other"], [133425,728,90,"ur",1,"other","other"], [149974,728,90,"ur",1,"other","other"], [150514,728,90,"ur",1,"other","other"], [150649,728,90,"ur",1,"other","other"],
  [150804,728,90,"ur",1,"other","other"], [150939,728,90,"ur",1,"other","other"], [153568,728,90,"ur",1,"other","other"], [153904,728,90,"ur",1,"other","other"], [154109,728,90,"ur",10,"other","other"], [137206,800,418,"ur",13,"x","post"],
  [137207,800,800,"ur",13,"x","carousel"], [137208,1080,1350,"ur",13,"facebook","post"], [137209,1080,1920,"ur",13,"facebook","story"], [131266,120,600,"uz",1,"other","other"], [131306,120,600,"uz",1,"other","other"], [132898,120,600,"uz",1,"other","other"],
  [133146,120,600,"uz",1,"other","other"], [133186,120,600,"uz",1,"other","other"], [149975,120,600,"uz",1,"other","other"], [150515,120,600,"uz",1,"other","other"], [150650,120,600,"uz",1,"other","other"], [150805,120,600,"uz",1,"other","other"],
  [150940,120,600,"uz",1,"other","other"], [153419,120,600,"uz",1,"other","other"], [153569,120,600,"uz",1,"other","other"], [153905,120,600,"uz",1,"other","other"], [131326,300,250,"uz",1,"other","other"], [131366,300,250,"uz",1,"other","other"],
  [132899,300,250,"uz",1,"other","other"], [133206,300,250,"uz",1,"other","other"], [133246,300,250,"uz",1,"other","other"], [149976,300,250,"uz",1,"other","other"], [150516,300,250,"uz",1,"other","other"], [150651,300,250,"uz",1,"other","other"],
  [150806,300,250,"uz",1,"other","other"], [150941,300,250,"uz",1,"other","other"], [153420,300,250,"uz",1,"other","other"], [153570,300,250,"uz",1,"other","other"], [153906,300,250,"uz",1,"other","other"], [131386,320,100,"uz",1,"other","other"],
  [131426,320,100,"uz",1,"other","other"], [132900,320,100,"uz",1,"other","other"], [133266,320,100,"uz",1,"other","other"], [133306,320,100,"uz",1,"other","other"], [149977,320,100,"uz",1,"other","other"], [150517,320,100,"uz",1,"other","other"],
  [150652,320,100,"uz",1,"other","other"], [150807,320,100,"uz",1,"other","other"], [150942,320,100,"uz",1,"other","other"], [153421,320,100,"uz",1,"other","other"], [153571,320,100,"uz",1,"other","other"], [153907,320,100,"uz",1,"other","other"],
  [131446,600,90,"uz",1,"other","other"], [131486,600,90,"uz",1,"other","other"], [132901,600,90,"uz",1,"other","other"], [133326,600,90,"uz",1,"other","other"], [133366,600,90,"uz",1,"other","other"], [149978,600,90,"uz",1,"other","other"],
  [150518,600,90,"uz",1,"other","other"], [150653,600,90,"uz",1,"other","other"], [150808,600,90,"uz",1,"other","other"], [150943,600,90,"uz",1,"other","other"], [153422,600,90,"uz",1,"other","other"], [153572,600,90,"uz",1,"other","other"],
  [153908,600,90,"uz",1,"other","other"], [131506,728,90,"uz",1,"other","other"], [131546,728,90,"uz",1,"other","other"], [132902,728,90,"uz",1,"other","other"], [133386,728,90,"uz",1,"other","other"], [133426,728,90,"uz",1,"other","other"],
  [149979,728,90,"uz",1,"other","other"], [150519,728,90,"uz",1,"other","other"], [150654,728,90,"uz",1,"other","other"], [150809,728,90,"uz",1,"other","other"], [150944,728,90,"uz",1,"other","other"], [153423,728,90,"uz",1,"other","other"],
  [153573,728,90,"uz",1,"other","other"], [153909,728,90,"uz",1,"other","other"], [137210,800,418,"uz",13,"x","post"], [137211,800,800,"uz",13,"x","carousel"], [137212,1080,1350,"uz",13,"facebook","post"], [137213,1080,1920,"uz",13,"facebook","story"],
  [131307,120,600,"vi",1,"other","other"], [132477,120,600,"vi",1,"other","other"], [133147,120,600,"vi",1,"other","other"], [133187,120,600,"vi",1,"other","other"], [149980,120,600,"vi",1,"other","other"], [150520,120,600,"vi",1,"other","other"],
  [150655,120,600,"vi",1,"other","other"], [150810,120,600,"vi",1,"other","other"], [150945,120,600,"vi",1,"other","other"], [153424,120,600,"vi",1,"other","other"], [153574,120,600,"vi",1,"other","other"], [153910,120,600,"vi",1,"other","other"],
  [131367,300,250,"vi",1,"other","other"], [132478,300,250,"vi",1,"other","other"], [133207,300,250,"vi",1,"other","other"], [133247,300,250,"vi",1,"other","other"], [149981,300,250,"vi",1,"other","other"], [150521,300,250,"vi",1,"other","other"],
  [150656,300,250,"vi",1,"other","other"], [150811,300,250,"vi",1,"other","other"], [150946,300,250,"vi",1,"other","other"], [153425,300,250,"vi",1,"other","other"], [153575,300,250,"vi",1,"other","other"], [153911,300,250,"vi",1,"other","other"],
  [131427,320,100,"vi",1,"other","other"], [132479,320,100,"vi",1,"other","other"], [133267,320,100,"vi",1,"other","other"], [133307,320,100,"vi",1,"other","other"], [149982,320,100,"vi",1,"other","other"], [150522,320,100,"vi",1,"other","other"],
  [150657,320,100,"vi",1,"other","other"], [150812,320,100,"vi",1,"other","other"], [150947,320,100,"vi",1,"other","other"], [153426,320,100,"vi",1,"other","other"], [153576,320,100,"vi",1,"other","other"], [153912,320,100,"vi",1,"other","other"],
  [131487,600,90,"vi",1,"other","other"], [132480,600,90,"vi",1,"other","other"], [133327,600,90,"vi",1,"other","other"], [133367,600,90,"vi",1,"other","other"], [149983,600,90,"vi",1,"other","other"], [150523,600,90,"vi",1,"other","other"],
  [150658,600,90,"vi",1,"other","other"], [150813,600,90,"vi",1,"other","other"], [150948,600,90,"vi",1,"other","other"], [153427,600,90,"vi",1,"other","other"], [153577,600,90,"vi",1,"other","other"], [153913,600,90,"vi",1,"other","other"],
  [131547,728,90,"vi",1,"other","other"], [132481,728,90,"vi",1,"other","other"], [133387,728,90,"vi",1,"other","other"], [133427,728,90,"vi",1,"other","other"], [149984,728,90,"vi",1,"other","other"], [150524,728,90,"vi",1,"other","other"],
  [150659,728,90,"vi",1,"other","other"], [150814,728,90,"vi",1,"other","other"], [150949,728,90,"vi",1,"other","other"], [153428,728,90,"vi",1,"other","other"], [153578,728,90,"vi",1,"other","other"], [153914,728,90,"vi",1,"other","other"],
  [137214,800,418,"vi",13,"x","post"], [137215,800,800,"vi",13,"x","carousel"], [137216,1080,1350,"vi",13,"facebook","post"], [137217,1080,1920,"vi",13,"facebook","story"], [131308,120,600,"zh-hans",1,"other","other"], [132888,120,600,"zh-hans",1,"other","other"],
  [132943,120,600,"zh-hans",1,"other","other"], [133148,120,600,"zh-hans",1,"other","other"], [133188,120,600,"zh-hans",1,"other","other"], [149985,120,600,"zh-hans",1,"other","other"], [150660,120,600,"zh-hans",1,"other","other"], [150950,120,600,"zh-hans",1,"other","other"],
  [153579,120,600,"zh-hans",1,"other","other"], [153915,120,600,"zh-hans",1,"other","other"], [131368,300,250,"zh-hans",1,"other","other"], [132889,300,250,"zh-hans",1,"other","other"], [132944,300,250,"zh-hans",1,"other","other"], [133208,300,250,"zh-hans",1,"other","other"],
  [133248,300,250,"zh-hans",1,"other","other"], [149986,300,250,"zh-hans",1,"other","other"], [150661,300,250,"zh-hans",1,"other","other"], [150951,300,250,"zh-hans",1,"other","other"], [153580,300,250,"zh-hans",1,"other","other"], [153916,300,250,"zh-hans",1,"other","other"],
  [131428,320,100,"zh-hans",1,"other","other"], [132890,320,100,"zh-hans",1,"other","other"], [132945,320,100,"zh-hans",1,"other","other"], [133268,320,100,"zh-hans",1,"other","other"], [133308,320,100,"zh-hans",1,"other","other"], [149987,320,100,"zh-hans",1,"other","other"],
  [150662,320,100,"zh-hans",1,"other","other"], [150952,320,100,"zh-hans",1,"other","other"], [153581,320,100,"zh-hans",1,"other","other"], [153917,320,100,"zh-hans",1,"other","other"], [131488,600,90,"zh-hans",1,"other","other"], [132891,600,90,"zh-hans",1,"other","other"],
  [132946,600,90,"zh-hans",1,"other","other"], [133328,600,90,"zh-hans",1,"other","other"], [133368,600,90,"zh-hans",1,"other","other"], [149988,600,90,"zh-hans",1,"other","other"], [150663,600,90,"zh-hans",1,"other","other"], [150953,600,90,"zh-hans",1,"other","other"],
  [153582,600,90,"zh-hans",1,"other","other"], [153918,600,90,"zh-hans",1,"other","other"], [131548,728,90,"zh-hans",1,"other","other"], [132892,728,90,"zh-hans",1,"other","other"], [132947,728,90,"zh-hans",1,"other","other"], [133388,728,90,"zh-hans",1,"other","other"],
  [133428,728,90,"zh-hans",1,"other","other"], [149989,728,90,"zh-hans",1,"other","other"], [150664,728,90,"zh-hans",1,"other","other"], [150954,728,90,"zh-hans",1,"other","other"], [153583,728,90,"zh-hans",1,"other","other"], [153919,728,90,"zh-hans",1,"other","other"],
  [137218,800,418,"zh-hans",13,"x","post"], [137219,800,800,"zh-hans",13,"x","carousel"], [137220,1080,1350,"zh-hans",13,"facebook","post"], [137221,1080,1920,"zh-hans",13,"facebook","story"], [131309,120,600,"zh-hant",1,"other","other"], [132893,120,600,"zh-hant",1,"other","other"],
  [132948,120,600,"zh-hant",1,"other","other"], [133149,120,600,"zh-hant",1,"other","other"], [133189,120,600,"zh-hant",1,"other","other"], [149990,120,600,"zh-hant",1,"other","other"], [150665,120,600,"zh-hant",1,"other","other"], [150955,120,600,"zh-hant",1,"other","other"],
  [153584,120,600,"zh-hant",1,"other","other"], [153920,120,600,"zh-hant",1,"other","other"], [131369,300,250,"zh-hant",1,"other","other"], [132894,300,250,"zh-hant",1,"other","other"], [132949,300,250,"zh-hant",1,"other","other"], [133209,300,250,"zh-hant",1,"other","other"],
  [133249,300,250,"zh-hant",1,"other","other"], [149991,300,250,"zh-hant",1,"other","other"], [150666,300,250,"zh-hant",1,"other","other"], [150956,300,250,"zh-hant",1,"other","other"], [153585,300,250,"zh-hant",1,"other","other"], [153921,300,250,"zh-hant",1,"other","other"],
  [131429,320,100,"zh-hant",1,"other","other"], [132895,320,100,"zh-hant",1,"other","other"], [133090,320,100,"zh-hant",1,"other","other"], [133269,320,100,"zh-hant",1,"other","other"], [133309,320,100,"zh-hant",1,"other","other"], [149992,320,100,"zh-hant",1,"other","other"],
  [150667,320,100,"zh-hant",1,"other","other"], [150957,320,100,"zh-hant",1,"other","other"], [153586,320,100,"zh-hant",1,"other","other"], [153922,320,100,"zh-hant",1,"other","other"], [131489,600,90,"zh-hant",1,"other","other"], [132896,600,90,"zh-hant",1,"other","other"],
  [133091,600,90,"zh-hant",1,"other","other"], [133329,600,90,"zh-hant",1,"other","other"], [133369,600,90,"zh-hant",1,"other","other"], [149993,600,90,"zh-hant",1,"other","other"], [150668,600,90,"zh-hant",1,"other","other"], [150958,600,90,"zh-hant",1,"other","other"],
  [153587,600,90,"zh-hant",1,"other","other"], [153923,600,90,"zh-hant",1,"other","other"], [131549,728,90,"zh-hant",1,"other","other"], [132897,728,90,"zh-hant",1,"other","other"], [133092,728,90,"zh-hant",1,"other","other"], [133389,728,90,"zh-hant",1,"other","other"],
  [133429,728,90,"zh-hant",1,"other","other"], [149994,728,90,"zh-hant",1,"other","other"], [150669,728,90,"zh-hant",1,"other","other"], [150959,728,90,"zh-hant",1,"other","other"], [153588,728,90,"zh-hant",1,"other","other"], [153924,728,90,"zh-hant",1,"other","other"],
  [137222,800,418,"zh-hant",13,"x","post"], [137223,800,800,"zh-hant",13,"x","carousel"], [137224,1080,1350,"zh-hant",13,"facebook","post"], [137225,1080,1920,"zh-hant",13,"facebook","story"],
];

/** Every XM banner, sanitized. */
export const XM_BANNERS: XmBanner[] = RAW.map(
  ([id, width, height, lang, categoryTypeId, channel, size]) => ({
    id,
    width,
    height,
    lang,
    categoryTypeId,
    channel,
    size,
  }),
);

/** 300x250 display banners - the size used by the sidebar AdSlot. */
export const XM_BANNERS_300x250: XmBanner[] = XM_BANNERS.filter(
  (b) => b.width === 300 && b.height === 250,
);

/** 600x90 leaderboard banners. */
export const XM_BANNERS_600x90: XmBanner[] = XM_BANNERS.filter(
  (b) => b.width === 600 && b.height === 90,
);

/** All banners for a language. */
export function bannersByLang(lang: XmLang): XmBanner[] {
  return XM_BANNERS.filter((b) => b.lang === lang);
}

/** All banners of a given pixel size. */
export function bannersBySize(width: number, height: number): XmBanner[] {
  return XM_BANNERS.filter((b) => b.width === width && b.height === height);
}

/** Banners matching both a language and a size. */
export function bannersFor(
  lang: XmLang,
  width: number,
  height: number,
): XmBanner[] {
  return XM_BANNERS.filter(
    (b) => b.lang === lang && b.width === width && b.height === height,
  );
}

/**
 * Pick one banner for a locale + size (defaults to 300x250).
 * Falls back to English, then to any 300x250 banner.
 */
export function pickXmBanner(
  lang: XmLang,
  width = 300,
  height = 250,
): XmBanner {
  return (
    bannersFor(lang, width, height)[0] ??
    bannersFor("en", width, height)[0] ??
    XM_BANNERS_300x250[0]
  );
}
