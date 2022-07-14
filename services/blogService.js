import { Remarkable } from "remarkable";
import * as fs from "node:fs";


export class BlogRenderer {
  constructor() {
    this.r = new Remarkable();
  }

  getMeta(metaValues) {
    const meta = {};
    metaValues.forEach((metaVal, index) => {
      if (index == 1) {
        return;
      }
      const [key, value] = metaVal.split(":");
      meta[key] = value;
    });
    return meta;
  }

  shouldPublish(meta) {
    if (meta.status.trim() !== "live") {
      console.log("IM NOT READY!");
      return false;
    }
    if (new Date(meta.publish).getTime() > new Date().getTime()) {
      return false;
    }
    return true;
  }

  async renderPost(filePath = "../posts/2022/testpost.md") {
    const file = (await fs.promises.readFile(filePath, { encoding: "utf8" })).split("\n");

    const rawMeta = file.splice(0, 5);
    const meta = getMeta(rawMeta);
    const isPublishable = shouldPublish(meta);

    if (!isPublishable) {
      return "";
    }

    const r = new Remarkable();
    const data = r.render(file.join("\n"))
    return data;
  }

}