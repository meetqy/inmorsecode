export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "In Morse Code",
  description:
    "Translate text to Morse code and listen to the rhythmic patterns",
  navItems: [
    {
      label: "Translator",
      href: "/",
    },
    {
      label: "To Text",
      href: "/morse-code-to-text",
    },
    {
      label: "List",
      href: "/in",
    },
    {
      label: "Generator of Morse Code",
      href: "/tool/generator-morse-code-worksheet",
    },
  ],
};
