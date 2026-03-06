# Changelog 📜

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2026-03-07 🛡️

### Added
- Created a comprehensive `.gitignore` for cleaner repositories.
- Added `CONTRIBUTING.md` to encourage open-source collaboration.
- Added `LICENSE` (MIT) file.
- Added `CHANGELOG.md`.
- Integrated professional badges for GitHub Profile and Repository in `README.md`.

### Fixed
- Updated GitHub repository and tracker links in `package.json`.

---

## [1.2.0] - 2026-03-07 🚀

### Added
- **Enterprise-Grade Naming:** Renamed core utilities for industry standards (`asyncHandler`, `parseError`, `expressErrorMiddleware`).
- **Internationalization (i18n):** Support for Hindi (`hi`), Spanish (`es`), and French (`fr`).
- **Data Masking:** Automatic redaction of sensitive fields like `password`, `token`, and `credit_card`.
- **Webhooks:** Automated error reporting to external services (Sentry, Slack, Discord) for 500+ errors.
- **BaseError Classes:** Dedicated classes for `BadRequest`, `Unauthorized`, `NotFound`, etc.
- **ORM Parsing:** Support for `Zod`, `Prisma`, `Mongoose`, and `Sequelize` error normalization.
- **Automated Testing:** Setup `Jest` for unit testing logic.
- **Professional Branding:** Rewrote README for enterprise applications.

---

## [1.0.0] - Initial Release 🟢

### Added
- Initial implementation of universal error handling.
- Basic mapping of HTTP status codes and patterns.
