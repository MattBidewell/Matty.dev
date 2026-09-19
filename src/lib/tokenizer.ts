import { getEncoding, type Tiktoken } from "js-tiktoken";

export interface Token {
  text: string;
  // Real BPE vocabularies mark a new word with a leading space baked into the
  // token itself; a token without one is glued onto the previous one.
  isNewWord: boolean;
}

let encoder: Tiktoken | null = null;

// GPT-4o's encoding — same one powering the tokens you see in ChatGPT today.
export function tokenize(text: string): Token[] {
  encoder ??= getEncoding("o200k_base");
  return encoder.encode(text).map((id) => {
    const raw = encoder!.decode([id]);
    return { text: raw.replace(/^ /, ""), isNewWord: raw.startsWith(" ") };
  });
}
