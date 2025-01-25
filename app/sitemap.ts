import { MetadataRoute } from "next";
import { inLists } from "@/utils/in-list";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inmorsecode.fun";

  // Generate sitemap entries for all items in inLists
  const morseCodeRoutes = inLists.map((item) => ({
    url: `${baseUrl}/in/${encodeURIComponent(item)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Add the home page
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...morseCodeRoutes,
  ];

  return routes;
}
