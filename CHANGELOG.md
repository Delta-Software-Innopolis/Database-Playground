# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
Changes not yet assigned to any particular release

### Added
*...*

### Changed 
*...*

### Fixed
*...*

### Deprecated
*...*

### Removed
*...*


## [0.2.1] MVP 2.5 - 2025-07-13
The version encorporates the consequences of the **Great Merge**  
The main points where bugfixes, JWT tweaking and frontend Redesign

### Added
- Support for CSV data uploading on backend
- Frontend Redesign in Figma ([see prototype](https://www.figma.com/proto/H0JTjoIeRSe5CWU8q16h81/Database-Playground-UI?node-id=712-155&starting-point-node-id=712%3A155))
- JWT Logic from Team 46 (only backend)
- Classrooms Logic from Team 46 (only backend)
- Redesign changes implemented on Frontend:
    - Main Page
    - Results Panel
    - Login/Register modals
### Changed
- Frontend migrated to the new feature-sliced-like architecture
- Frontend migrated from JavaScript to TypeScript
- Frontend hugely refactored: naming, CSS, codestyle
- Prettier formatting tool properly configured

### Fixed
- Frontend bug with results panel not displaying all results

## [0.2.0] MVP 2 (Pre Merge) - 2025-07-06
The version is a save before the **Great Merge**  
It encorparates main changes of Team 37 for **MVP 2**

### Added
- Support for MongoDB (via `MongoEngine`)
- Frontend page for MongoDB

### Changed 
- Rename `SQLEngine` to `DBEngine`

### Fixed
- Frontend bugs with Results Panel
- Frontend playground top bar not displaying current template name
- Moved from `JavaScript` to `TypeScript`
- Migrated to new feature-sliced-like architecture
- Changed naming of components and stores

## [0.1.0] MVP 1 - 2025-06-23
The first version with some kind of functionality

### Added
- Idea of replacable database engines as architectural basis
- Interface `SQLEngine`, depicting main functionality, like:
    - Getting list of existing Databases
    - Creating Databases
    - Dropping Databases
    - Getting snapshot of Databases (by getting their dump)
    - Executing SQL queries
- Support for `PostgreSQL` in Playground via `PostgresEngine` (implements `SQLEngine`)
- Database **Templates System** for saving the state of databases  
    The idea is that *Template is a snapshot* of database.  
    Basically it's an object that contains information required to recreate the existing database from a blank one.
- Basic structure of an API on `Django` and `DjangoREST`
- Basic frontend on `React`
- Basic **CI/CD** and `Docker` to deploy easily
- Some testing of `PostgresEngine` done using `pytest`


## [0.0.1] MVP 0 - 2025-06-11
The deploy-first version, nothing more

### Added
- Minimal Frontend Page
- Deployed via Docker Compose to server
