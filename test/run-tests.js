const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const plugin = require("../index.js");

async function testFile(inputPath, expectedPath) {
  const input = fs.readFileSync(inputPath, "utf8");
  const expected = fs.readFileSync(expectedPath, "utf8");

  const formatted = await prettier.format(input, {
    parser: "markdown",
    plugins: [plugin],
    printWidth: 80,
    proseWrap: "always",
  });

  const passed = formatted === expected;

  if (!passed) {
    console.log("❌ Test failed for file: ", inputPath);
    console.log("--- Formatted ---\n", formatted);
    console.log("--- Expected ---\n", expected);
  }

  return passed;
}

async function runTest() {
  const file1test = await testFile(
    path.join(__dirname, "fixtures/input.md"),
    path.join(__dirname, "fixtures/expected.md"),
  );

  const file2test = await testFile(
    path.join(__dirname, "fixtures/input.mdx"),
    path.join(__dirname, "fixtures/expected.mdx"),
  );

  if (file1test && file2test) {
    console.log("✅ Tests passed!");
  }
}

runTest();
