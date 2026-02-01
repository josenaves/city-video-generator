---
name: brazilian_knowledge
description: The single source of truth for Brazilian geographic knowledge inside Antigravity agents.
---

# BrazilianCitiesKnowledge Skill

## Overview

This skill is the single source of truth for Brazilian geographic knowledge inside Antigravity agents.

Its main responsibility is to **know everything about Brazilian cities and states** and expose this knowledge in a deterministic way so other agents can:

* Validate Brazilian city names
* Discover which state (UF) a city belongs to
* Normalize city names (accents, casing)
* Resolve file-system paths for assets (e.g. images)

---

## Core Capabilities

### State Knowledge

The skill must know all Brazilian states, including:

* Full state name (e.g. `Minas Gerais`)
* UF acronym (e.g. `MG`)
* Optional metadata (region, capital)

---

### City Knowledge

For **every Brazilian city**, the skill must store:

* City name (with accents)
* Normalized name (lowercase, no accents)
* State name
* State UF
* First letter of the normalized city name

Example:

```
Guaxupé
State: Minas Gerais
UF: MG
Initial: g
```

---

### Normalization Rules

The skill applies consistent normalization rules:

* Remove accents (`Guaxupé → Guaxupe`)
* Convert to lowercase
* Trim whitespace
* Accept common variations (e.g. `São Paulo` / `Sao Paulo`)

---

## Path Resolution Convention

The skill is responsible for **resolving where files should live**, not for moving them.

### Folder Structure

```
public/images/cities/{uf}/{first-letter}/{city-name}/
```

### Example

```
resolveCityImagePath("Guaxupé")
→ public/images/cities/mg/g/guaxupe/
```

---

## Skill Interface (Conceptual)

### getCityInfo(cityName)

Returns structured information about a city.

### resolveCityImagePath(cityName)

Returns the canonical folder path for city assets.

### validateCity(cityName)

Checks if a city exists and suggests corrections if needed.

### listCitiesByState(uf)

Lists all cities from a given state.

---

## Internal Architecture

### Suggested Structure

```
skills/
└── BrazilianCitiesKnowledge/
    ├── index
    ├── cities
    ├── states
    ├── normalize
    └── resolver
```

---

## Design Decisions (Open Questions)

### 🗂️ Internal Data Source

How should the list of Brazilian cities be stored?

Options:

* Static dataset (e.g. IBGE-based JSON)
* Hybrid (static base + optional enrichment)

**Decision:** Hybrid approach — a static IBGE-based dataset as the foundation, with optional enrichment layers allowed in the future.

---

### 🧠 Source of Truth

Should this skill be considered:

* Fully authoritative (no external calls allowed)
* Authoritative but extendable

**Decision:** Authoritative but extendable — this skill is the canonical base, but other skills may enrich or augment its data.

---

### 🧩 Error Handling

When a city is not found, should the skill:

* Fail hard
* Return suggestions (fuzzy search)

**Decision:** Return suggestions using fuzzy matching when an exact city is not found.

---

### 📦 Scope Limits

Should the skill handle only:

* Cities and states

Or also:

* Regions
* Microregions
* Neighborhoods (future)

**Decision:** Cities and states only for v1. Other geographic layers are explicitly out of scope for now.

---

## Usage Guideline for Agents

Antigravity agents must use this skill whenever dealing with:

* Brazilian city names
* State acronyms (UF)
* File paths or assets organized by Brazilian geography

This avoids duplicated logic and inconsistent city/state handling across the system.
