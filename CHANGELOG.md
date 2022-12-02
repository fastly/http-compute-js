# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2022-12-02

### Changed

- Updated to js-compute@0.5.12
- Removed polyfills for setTimeout and clearTimeout, as they are now supported natively in js-compute

## [0.3.1] - 2022-10-22

### Changed

- Changed to use TextEncoder instead of Buffer.from() for converting UTF-8 text streams to binary, giving massive performance improvement

[unreleased]: https://github.com/fastly/http-compute-js/compare/v0.3.2...HEAD
[0.3.2]: https://github.com/fastly/http-compute-js/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/fastly/http-compute-js/releases/tag/v0.3.1
