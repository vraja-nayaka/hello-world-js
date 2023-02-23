import { Grammar, GrammarValue } from "prismjs";

const features = [
  { name: "customButton", pattern: /§§.+§§/ },
  { name: "customInput", pattern: /§_.+§_/ },
  { name: "sequence", pattern: /§>.+§>/ },
  { name: "comment", pattern: /\/\/[^§\n]*|\/\*[\s\S>]*?(?:\*\/|$)/ },
];

export const withFeatures = (grammar: Grammar) => {
  features.forEach(({ name, pattern }) => {
    (grammar as Record<string, GrammarValue>)[name] = {
      pattern,
      greedy: true,
    };
  });

  return grammar;
};
