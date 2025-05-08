# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Fix unnecessary override field for kOutHeaders
- Fix signature of _setHeader
- Lock @types/node to 18.6.4 to ensure successful builds
- Clarify license for Node.js portions

### Updated

- Update TypeScript and vitest
- Polyfills referenced directly, no more Webpack requirement

## [1.1.5] - 2025-01-06

### Added

- Release to npmjs using CI workflow

### Fixed

- Updated dependency versions

## [1.1.4] - 2024-01-25

### Fixed

- Fix: Multiple Set-Cookie headers should not be overwritten

## [1.1.3] - 2024-01-25

### Fixed

- Fix: set req complete when pushing null

## [1.1.2] - 2023-11-08

- Apply "Compute" branding change.

## [1.1.1] - 2023-10-14

### Updated

- Ensure ESM compatibility

## [1.1.0] - 2023-09-19

### Updated

- Position @fastly/js-compute as a devDependency and peerDependency.

## [1.0.0] - 2023-05-19

### Changed

- Updated to @fastly/js-compute@2.0.0

## [0.4.0] - 2022-12-23

### Changed

- Updated to @fastly/js-compute@1.0.0

## [0.3.2] - 2022-12-02

### Changed

- Updated to js-compute@0.5.12
- Removed polyfills for setTimeout and clearTimeout, as they are now supported natively in js-compute

## [0.3.1] - 2022-10-22

### Changed

- Changed to use TextEncoder instead of Buffer.from() for converting UTF-8 text streams to binary, giving massive performance improvement

[unreleased]: https://github.com/fastly/http-compute-js/compare/v1.1.5...HEAD
[1.1.5]: https://github.com/fastly/http-compute-js/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/fastly/http-compute-js/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/fastly/http-compute-js/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/fastly/http-compute-js/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/fastly/http-compute-js/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/fastly/http-compute-js/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/fastly/http-compute-js/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/fastly/http-compute-js/compare/v0.3.2...v0.4.0
[0.3.2]: https://github.com/fastly/http-compute-js/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/fastly/http-compute-js/releases/tag/v0.3.1
