const markdownParser = require("prettier/parser-markdown");

function wrapText(text, width = 40) {
  return text
    .split("\n")
    .map((line) => {
      const words = line.split(" ");
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
    .join("\n")
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
  const defaultWidth = opts.txtWrapWidth || 40;

  return text.replace(/```txt(.*?)\n([\s\S]*?)```/g, (match, info, code) => {
    const blockOptions = parseInfoString(info);
    const wrapWidth = blockOptions.wrap || defaultWidth;
    const wrapped = wrapText(code, wrapWidth);
    return "```txt" + info + "\n" + wrapped + "\n```";
  });
}

module.exports = {
  // Plugin-scoped options only
  options: {
    txtWrapWidth: {
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
