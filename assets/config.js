/**
 * RAYHAN AGENCY — Central Configuration
 * Values can be overridden from Admin Panel (localStorage key: ra_admin_settings)
 */
window.RA_DEFAULTS = {
  contact: {
    whatsapp: "01741564341",
    supportNote: "Registration করতে সমস্যা হলে এই নম্বরে Message করুন।"
  },
  payment: {
    bkash:  { label: "bKash",  number: "01741564341", logo: "../assets/logos/bkash.webp",  enabled: true },
    nagad:  { label: "Nagad",  number: "01741564341", logo: "../assets/logos/nagad.webp",  enabled: true },
    rocket: { label: "Rocket", number: "01741564341", logo: "../assets/logos/rocket.webp", enabled: true },
    binance:{ label: "Binance", id: "", logo: "../assets/logos/binance.webp", enabled: false, comingSoon: true }
  },
  diamondProviders: [
    { id: "chamet", name: "Diamonds Top Up Chamet", logo: "../assets/badge-diamond.png", status: "active", href: "diamond-topup.html" },
    { id: "imo",    name: "Diamonds Top Up IMO",    logo: "../assets/logos/imo.webp",     status: "coming_soon" },
    { id: "likee",  name: "Diamonds Top Up Likee",  logo: "../assets/logos/likee.webp",   status: "coming_soon" },
    { id: "bigo",   name: "Diamonds Top Up Bigo Live", logo: "../assets/logos/bigo.webp", status: "coming_soon" }
  ],
  aiPackages: [
    { id: "chatgpt-plus",  name: "ChatGPT Plus",        category: "Premium", price: 858,  logo: "../assets/logos/chatgpt.webp", status: "active" },
    { id: "chatgpt-pro",   name: "ChatGPT Pro",         category: "Premium", price: 659,  logo: "../assets/logos/chatgpt.webp", status: "active" },
    { id: "gemini-pro",    name: "Gemini Pro",          category: "Premium", price: 220,  logo: "../assets/logos/gemini.webp",  status: "active" },
    { id: "gemini-adv",    name: "Gemini Advanced",     category: "Premium", price: 499,  logo: "../assets/logos/gemini.webp",  status: "active" },
    { id: "gemini-ultra",  name: "Gemini Ultra",        category: "Premium", price: 950,  logo: "../assets/logos/gemini.webp",  status: "active" },
    { id: "grok-super",    name: "Grok SuperGrok",      category: "Premium", price: 2500, logo: "../assets/logos/grok.webp",    status: "active" },
    { id: "grok-heavy",    name: "Grok SuperGrok Heavy",category: "Premium", price: 1750, logo: "../assets/logos/grok.webp",    status: "active" },
    { id: "suno-pro",      name: "Suno Pro",            category: "Premium", price: 299,  logo: "../assets/logos/suno.webp",    status: "active" },
    { id: "suno-premier",  name: "Suno Premier",        category: "Premium", price: 450,  logo: "../assets/logos/suno.webp",    status: "active" },
    { id: "flow-premium",  name: "Flow Premium",        category: "Premium", price: 850,  logo: "../assets/logos/flow-ai.jpeg", status: "active" },
    { id: "canva-pro",     name: "Canva Pro",           category: "Premium", price: 0,    logo: "../assets/logos/canva-pro.webp", status: "active" },
    { id: "premium-apk",   name: "Premium APK Files",   category: "APK",     price: 650,  logo: "../assets/logos/premium-apk.jpeg", status: "active", type: "apk_request" }
  ],
  diamondPackages: [
    { diamonds: 15000,  price: 355 },
    { diamonds: 20000,  price: 470 },
    { diamonds: 25000,  price: 590 },
    { diamonds: 30000,  price: 705 },
    { diamonds: 50000,  price: 1175 },
    { diamonds: 100000, price: 2350 }
  ]
};

window.RA_CONFIG = (function () {
  var d = JSON.parse(JSON.stringify(window.RA_DEFAULTS));
  try {
    var ov = JSON.parse(localStorage.getItem("ra_admin_settings") || "{}");
    if (ov.payment) {
      Object.keys(ov.payment).forEach(function (k) {
        if (d.payment[k]) Object.assign(d.payment[k], ov.payment[k]);
      });
    }
    if (ov.contact) Object.assign(d.contact, ov.contact);
    if (Array.isArray(ov.aiPackages) && ov.aiPackages.length) d.aiPackages = ov.aiPackages;
    if (Array.isArray(ov.diamondPackages) && ov.diamondPackages.length) d.diamondPackages = ov.diamondPackages;
    if (Array.isArray(ov.diamondProviders) && ov.diamondProviders.length) d.diamondProviders = ov.diamondProviders;
  } catch (e) {}
  return d;
})();
