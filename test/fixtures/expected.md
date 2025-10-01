This line should wrap normally at 80 characters when Prettier runs. It should
not wrap at 40 lines.

This is a short line of normal prose that should not wrap at all.

```txt
This is a very long line of text in a
txt code block that should wrap at
default width 40. This is a short line
of text This one should also wrap after
running the formatter!
```

```txt wrap=10
This
should
wrap at 10
characters
becuase of
the
override.
```

```txt
This should unwrap

This should also unwrap but then it
should also wrap at the appropriate
number of characters
```
