import { collection } from "@/data/collection";
import { product } from "@/data/product";

// const currentDate = new Date().toISOString();

// 如果是部署在 CloudFlare 上的话，需要写成这种样式
const currentDate = "2025-04-01T13:54:21.653Z";

export default function sitemap() {
  return [
    {
      url: `${process.env.ROOT_URL}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...collection.map((item) => ({
      url: `${process.env.ROOT_URL}/collection/${item.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...product.map((item) => ({
      url: `${process.env.ROOT_URL}/product/${item.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    {
      url: `${process.env.ROOT_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${process.env.ROOT_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
