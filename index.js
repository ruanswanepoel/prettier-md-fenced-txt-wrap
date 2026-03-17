const markdownParser = require("prettier/parser-markdown");

function wrapText(text, width = 80) {
  return text
    .split("\n\n")
    .map((line) => {
      const unwrapped = line.replace(/\s+/g, " ").trim();
      const words = unwrapped.split(" ");
      const lines = [];
      let current = "";
      for (const word of words) {
        if ((current + " " + word).trim().length > width) {
          if (current) lines.push(current);
          current = word;
        } else {
          current = current ? current + " " + word : word;
        }
      }
      if (current) lines.push(current);
      return lines.join("\n");
    })
    .join("\n\n")
    .trim();
}

function parseInfoString(info) {
  // Parse optional per-block override: ```txt wrap=50
  const options = {};
  if (!info) return options;
  const parts = info.trim().split(" ");
  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key === "wrap" && !isNaN(parseInt(value))) {
      options.wrap = parseInt(value);
    }
  });
  return options;
}

function preprocess(text, opts) {
  const defaultWidth = opts.fencedTxtWrapWidth ?? 40;

  return text.replace(/^```txt([^\r\n]*)\r?\n([\s\S]*?)\r?\n```/gm, (match, info, code) => {
    const blockOptions = parseInfoString(info);
    const wrapWidth = blockOptions.wrap || defaultWidth;
    const wrapped = wrapText(code, wrapWidth);
    return "```txt" + info + "\n" + wrapped + "\n```";
  });
}

module.exports = {
  // Plugin-scoped options only
  options: {
    fencedTxtWrapWidth: {
      type: "int",
      category: "Global",
      default: 40,
      description: "Default wrap width for txt code blocks",
    },
  },

  parsers: {
    markdown: {
      ...markdownParser.parsers.markdown,
      preprocess,
    },
    mdx: {
      ...markdownParser.parsers.mdx,
      preprocess,
    },
  },
};
