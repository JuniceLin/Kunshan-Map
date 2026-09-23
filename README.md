# Kunshan Map / 昆山文化地图数据集

This repository is the source-grounded working dataset behind **Kunshan Cultural Constellation**, an interactive HCI/data-visualisation course project for visitors to Kunshan.

It consolidates official public records into five interface categories:

- `Places`
- `Artifacts`
- `Food`
- `Traditions`
- `Stories`

## Current coverage

- **82** curated interactive cultural entities
- **67** evidence-linked relationships
- **13** official or institutional source collections
- **212** protected Wu-culture place names retained as a complete raw official list
- geographic anchors with an explicit precision label for every interactive entity
- cached real photographs with source-page attribution
- one locally cached OpenStreetMap/HOT basemap covering Kunshan and its surrounding context

The interactive entity set is deliberately curated; it is not claimed to be a complete inventory of everything cultural in Kunshan. The 212-name official list is retained separately so the project can grow without making the interface unusably dense.

## Files

| File | Purpose |
|---|---|
| `data/kunshan-cultural-dataset.json` | Complete graph used by the web prototype |
| `data/kunshan-cultural-entities.csv` | Flat entity table |
| `data/kunshan-cultural-relations.csv` | Evidence-linked edge table |
| `data/sources.json` | Source registry |
| `data/official/wu-cultural-place-names-2024.csv` | Complete 212-entry official protected place-name list |
| `maps/kunshan-osm-z11.jpg` | Cached composite basemap for fast, offline interaction |
| `assets/cards/` | Cached documentary/contextual photographs used by the prototype |
| `scripts/build-dataset.mjs` | Reproducible dataset builder |

Run `node scripts/build-dataset.mjs` after editing the source arrays to rebuild the JSON and CSV exports.

## Spatial and evidence boundaries

`locationPrecision` distinguishes specific-site coordinates from town, district, regional, landscape and associated-site anchors. Approximate anchors must not be presented as surveyed entrances or used for live navigation.

Relations are included only when an official/institutional source supports the association, or when they are explicitly labelled as an interpretive route prompt. “Not represented” never means “no relationship exists.”

This dataset does **not** claim that visitors generally overlook lesser-known places, that current cultural promotion is ineffective, or that this interface improves cultural understanding. Those are research hypotheses that require user studies.

## Images and map attribution

The photographs are cached from the cited Kunshan Government tourism/food pages and one Wikimedia Commons Kunqu source. They are included for an educational prototype; underlying rights remain with their original publishers and creators. See each entity's `imageSource` and `imageCredit` fields. No AI-generated image is presented as documentary evidence.

The basemap is assembled from Humanitarian OpenStreetMap Team tiles and contains map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), available under the ODbL. Tile style: Humanitarian OpenStreetMap Team.

## Source highlights

- [Kunshan Government tourism destinations](https://www.ks.gov.cn/kss/Tourism/enlist_tt_hd.shtml)
- [Sixth Kunshan intangible-cultural-heritage batch](https://www.ks.gov.cn/kss/c112598/202406/154c05692c0e41e4b9503059cd0614b9.shtml)
- [212 protected Wu-culture place names](https://www.ks.gov.cn/kss/c112598/202411/f07e2e41857040d7a1920a6353aeb24c.shtml)
- [Kunshan cultural-relic protection overview](https://www.ks.gov.cn/kss/c113206pu/202206/c405f8247cc64b2bb8b1e10d1dd01433.shtml)
- [Five documented Kunshan foods](https://www.ks.gov.cn/kss/ttxw/202407/da6fe60d561c49deadce176ec2019bfb.shtml)
- [UNESCO: Kun Qu Opera](https://ich.unesco.org/en/RL/kun-qu-opera-00004)

## Licensing

Repository code and original data structure follow the MIT license in `LICENSE`. Source facts, photographs, map data and third-party text remain subject to their original terms and attribution requirements.
