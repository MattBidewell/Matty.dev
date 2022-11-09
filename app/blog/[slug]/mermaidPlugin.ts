import mermaid from "mermaid";
import { Remarkable } from "remarkable";

// mermaid js doesnt current support SSR... annoyingly.
export default function mermaidPlugin(
  md: Remarkable,
  options: Remarkable.Options
) {
  md.renderer.rules.fence_custom["mermaid"] = function (tokens, idx) {
    const token = tokens[idx];
    let result = "a";
    mermaid.initialize({ startOnLoad: true });
    mermaid.render("id1", token.content, (output: any) => {
      result += output;
    });
    return result;
  };

  //     = function (tokens, index) {
  //     const token = tokens[index];
  //     let result;
  //     mermaid.render('id1', token.content, function(cbResult){
  //       result = cbResult;
  //     });
  //     return result;
  // }
}
