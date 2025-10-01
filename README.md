# prettier-md-fenced-txt-wrap

A basic Prettier plugin that formats fenced `txt` code blocks in Markdown (or mdx) files.

## Example

Suppose you have a markdown file that contains:
````md
```txt
This is some long text that you might want to wrap automatically, but Prettier doesn't format these `txt` code blocks. So the solution was to write a custom Prettier plugin that can do this for me automatically.
```
````

It will format to:
````md
```txt
This is some long text that you might want to wrap automatically, but Prettier
doesn't format these `txt` code blocks. So the solution was to write a custom
Prettier plugin that can do this for me automatically.
```
````

## Getting Started

1. Install the plugin:
   ```sh
   npm i -D prettier-md-fenced-txt-wrap
   ```

2. Add the plugin to your Prettier config.
   Ex. in `.prettierrc`:
   ```json filename=".prettierrc"
   {
       "plugins": [ "prettier-md-fenced-txt-wrap" ]
   }
   ```

## Options

### fencedTxtWrapWidth

Configures the text wrap width to the specified number of characters (Default 80).

Ex. in `.prettierrc`:
```json
{
    "plugins": [ "prettier-md-fenced-txt-wrap" ]
    "fencedTxtWrapWidth": 40
}
```

## Overrides

### wrap

Override the configured text wrap width for a specific fenced code block.

Ex. markdown:
````md
Some standard markdown...

```
This will wrap to the configured width (80 by default).
```

```txt wrap=20
This will always wrap to 20 characters.
```
````

---

## TODOs
- Add override to ignore formatting for specific blocks
