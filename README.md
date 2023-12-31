# Advent of Code 2023

🎅 Solutions for Advent of Code 2023 written in TypeScript.

I'm using [Bun](https://bun.sh) this year. Find instructions to install the Bun executable [here](https://bun.sh/docs/installation).

## Set Up

Install the dependencies using Bun.

```bash
bun install
```

Create a `.env` file at the root that contains your Advent `session` cookie. You can find this cookie value by inspecting the network request made to `https://adventofcode.com` in the browser.

```bash
# .env

ADVENT_SESSION=YOUR_SESSION_COOKIE
```

## Scaffolding Each Day

I've provided a `scaffold` `package.json` script that will set up the files needed for solving both parts for each day, as well as pulling your unique input. It will output them in a `solutions/DAY_NUMBER` directory.

```bash
# The following will create a solutions/01 directory and place all necessary files there.

bun scaffold 1
```

## Solving Each Day

Run the `solve` `package.json` script to execute the solution code for a given day.

```bash
bun solve 1
```

You can pass a `--debug` or `-d` flag to launch the [Bun web debugger](https://bun.sh/guides/runtime/web-debugger).

```bash
bun solve 1 -d
```
