import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function getLetterHtml() {
  const filePath = path.join(process.cwd(), "content", "letter.md");
  const file = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);

  return {
    meta: data as { title?: string; date?: string },
    html: processed.toString(),
  };
}
