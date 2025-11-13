/* eslint-env node */
import { SitemapStream } from "sitemap";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { pipeline as streamPipeline } from "stream/promises";

async function generateSitemap() {
  const smStream = new SitemapStream({
    hostname: "https://linkzapurl.vercel.app",
  });

  const writeStream = createWriteStream(
    resolve(process.cwd(), "public", "sitemap.xml")
  );

  smStream.write({
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
  });

  smStream.write({
    url: "/auth",
    changefreq: "monthly",
    priority: 0.8,
  });

  smStream.end();

  // Use Node's stream pipeline to wait for the write to finish
  await streamPipeline(smStream, writeStream);
  console.log("sitemap written to public/sitemap.xml");
}

generateSitemap().catch((err) => {
  console.error(err);
  process.exit(1);
});
