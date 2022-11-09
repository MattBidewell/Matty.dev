import { Remarkable } from "remarkable";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import mermaidPlugin from "./mermaidPlugin";

const renderer = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ""; // use external default escaping
  },
});

renderer.use(mermaidPlugin);

export default renderer;
