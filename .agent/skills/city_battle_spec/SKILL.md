---
name: City Battle Video Specification
description: Standard specification for creating city battle videos (Shorts vs Long), including categories, formatting, and data requirements.
---

# City Battle Video Specification

This skill defines the standard structure for City Battle videos.

## Video Types

### 1. Battle Shorts (Vertical/Fast)
Optimized for TikTok/Reels/Shorts. ~60 seconds.
**Focus**: High impact, core metrics.

**Standard Rounds:**
1. **POPULAÇÃO**
   - Field: `populacao`
   - Format: `integer`
   - Unit: `hab`
   
2. **ÁREA**
   - Field: `areaKm2`
   - Format: `number`
   - Unit: `km²`

3. **PIB/CAPITA**
   - Field: `pibPerCapita`
   - Format: `currency`
   - Unit: `R$`

4. **IDH**
   - Field: `idh`
   - Format: `decimal3`
   - Unit: ``

### 2. Battle Long (Horizontal/Detailed)
Optimized for YouTube. 3-5 minutes.
**Focus**: Complete comparison, deep dive.

**Standard Rounds:**
1. **POPULAÇÃO**
   - Field: `populacao`
   - Format: `integer`
   - Unit: `hab`

2. **ÁREA**
   - Field: `areaKm2`
   - Format: `number`
   - Unit: `km²`

3. **PIB/CAPITA**
   - Field: `pibPerCapita`
   - Format: `currency`
   - Unit: `R$`

4. **LEITOS/1K**
   - Field: `leitos`
   - Format: `decimal`
   - Unit: ``

5. **IDH**
   - Field: `idh`
   - Format: `decimal3`
   - Unit: ``

6. **ENSINO SUPERIOR**
   - Field: `ensinoSuperior`
   - Format: `decimal`
   - Unit: `%`

7. **SANEAMENTO**
   - Field: `esgotamentoSanitario`
   - Format: `decimal`
   - Unit: `%`

8. **ÁREA VERDE (Optional)**
   - Field: `areaVerde`
   - Format: `decimal`
   - Unit: `%` or `m²`

9. **FUNDAÇÃO (ANO)**
   - Field: `fundacao`
   - Format: `year`
   - Unit: ``
   - Inverse: `true` (Older wins)

## Data Formatting Standards

- **integer**: Whole numbers with thousand separators (e.g. `11.084`). Used for Population, Fleet.
- **year**: Raw year without separators (e.g. `1912`). Used for Foundation.
- **number**: Standard localized formatting (e.g. `220,4`). Used for Area.
- **currency**: BRL Currency (e.g. `R$ 35.000`).
- **decimal3**: 3 decimal places (e.g. `0.753`). Used for IDH.
- **decimal**: 1 decimal place (e.g. `1.5`). Used for Rate/Percentage.

## Implementation Guide

When creating a new battle JSON:
1. Determine if it is a **Short** or **Long** battle.
2. Select the appropriate rounds from the list above.
3. Ensure the `format` field matches the specification.
