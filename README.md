# Rspack vs Parcel vs Vite vs Turbopack HMR Benchmark

> _Based on [this benchmark](https://github.com/yyx990803/vite-vs-next-turbo-hmr) by Evan You, creator of Vite._

## Methodology

1. There are 3 projects in this repo: Next.js 13 with Turbopack, Vite with SWC plugin, and Parcel.

2. `genFiles.(m)js` is run in each project to generate 1000 components. All components are imported in the app's root component (in Next's case, the root page component) and rendered together. This step is already done and the files are already checked in, but the script is included for reference.

3. For Next, `app/page.js` has the `'use client'` directive so it renders in client mode. This is necessary to ensure proper comparison, since server components incurs non-trivial HMR overhead (4x slower).

4. Start the projects by running `yarn dev` in each project, and open the page in Chrome.

5. Run `update.mjs` within each project, with either `leaf` or `root` as an argument. This updates either the leaf or root components respectively, which renders the current time in the browser at the time React rerenders minus the time the file was written. This measures the total amount of time taken from saving a change to seeing it reflected.

## Numbers

- Recorded over 5 runs
- Time in ms
- Tested on M1 Ultra Mac Studio

|         | Vite (root) | Vite (leaf) | Turbopack (root)   | Turbopack (leaf)   | Parcel (root)   | Parcel (leaf)   |
| ------- | ----------- | ----------- | ------------------ | ------------------ | --------------- | --------------- |
| 1       | 285         | 147         | 292                | 58                 | 94              | 38              |
| 2       | 291         | 143         | 262                | 57                 | 94              | 38              |
| 3       | 296         | 140         | 274                | 57                 | 87              | 36              |
| 4       | 302         | 145         | 275                | 57                 | 81              | 37              |
| 5       | 292         | 144         | 271                | 56                 | 87              | 38              |
| Average | 293.5       | 143.8       | 274.8              | 57                 | 88.6            | 37.4            |

## Notes

- macOS FSEvents adds ~13 ms of latency between when a file is modified to when tools start building. That latency is included in these results.
- Parcel is 34% faster than Turbopack, and 74% faster than Vite at updating the leaf component.
- Parcel is 68% faster than Turbopack, and 70% faster than Vite at updating the root component.
