# Release — how the package is cut

- `release.json` is the allowlist: what goes in, what's left out and why. Only paths listed under `include` ship.
- `files.json` is generated at build time: every file in the zip. `selfcheck/index.html` › **Check package** compares against it.
- The zip unpacks to `bishs-rv-design-system/`, the folder name `templates/prototype-canvas-shell/ds-base.js` looks for at `_ds/bishs-rv-design-system/`.

## Cutting a new release
1. Bump the version in all four places listed in `selfcheck/README.md` §7.
2. Add a `CHANGELOG.md` entry.
3. Run `tools/build-release.js` (maintainer script). It writes `release/files.json` and `release/bishs-rv-design-system-v<version>.zip`.
4. Unzip, serve the folder, open `selfcheck/index.html`, press **Check package**, then run the self-check on `conversions/floor-workspace/index.html`. Version rules: `selfcheck/README.md` §7.
