/*
 * Patch 12.1 "Curse of Ula'tek" - structured class change dataset.
 *
 * Source of truth: the official Blizzard developer notes for the first 12.1 PTR
 * build, as transcribed verbatim in SOURCE-blizzard-notes.txt (mirrored from the
 * Wowhead news post). Every numeric change below is copied directly from that text.
 *
 * Math convention (see methodology on the page):
 *   - When a change states an old and new value, the page computes the relative
 *     change of that value as (new - old) / old * 100. Percentages are NOT typed
 *     by hand; they are derived in app.js from o/n so they cannot drift.
 *   - When a change is stated directly as "increased/decreased by X%", we store
 *     that X as `r` and use it as-is.
 *   - `d` (direction) is the gameplay direction: a shorter cooldown or lower mana
 *     cost is a "buff" even though the number goes down. Direction is judged per
 *     line, never inferred from the sign.
 *   - Pure redesigns / new / removed / quality-of-life lines carry no number.
 *
 * Field keys: a=ability, m=metric, o=old, n=new, r=relative%%, u=unit,
 *             d=direction(buff|nerf|neutral), k=kind(tune|rework|new|removed|qol), t=note
 */

window.PATCH = {
  name: "Curse of Ula'tek",
  patch: "Patch 12.1",
  build: "First 12.1 PTR build",
  expansion: "World of Warcraft: Midnight",
  source: "https://www.wowhead.com/news/class-changes-for-first-patch-12-1-ptr-build-dps-cooldowns-nerfed-381912",
  captured: "2026-06-20",
  global: [
    "Player health and creature damage increased by 25% at max level. Health consumable values adjusted to match. Several DPS/Tank healing and absorb spells are being buffed so they keep their relative impact against the larger health pool.",
    "Throughput of major DPS cooldowns is being lowered for several specs, with their steady-state (non-cooldown) damage increased to compensate. Stated intent is roughly net-neutral total damage with a flatter damage profile.",
    "All class interrupts (Kick, Pummel, Counterspell, etc.) now show a \"missed\" visual and play a distinct sound if used while the target was not casting."
  ]
};

window.CLASSES = [
  {
    name: "Death Knight", color: "#C41E3A",
    specs: [
      { name: "Blood", role: "Tank", changes: [
        { a:"Permafrost", m:"shield % of damage dealt", o:40, n:50, d:"buff", k:"tune" },
        { a:"Voracious", m:"Leech granted", o:12, n:15, u:"%", d:"buff", k:"tune" },
        { a:"Relish in Blood", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Rapid Decomposition", m:"Blood Plague healing bonus", o:50, n:85, u:"%", d:"buff", k:"tune" },
        { a:"Sanguinary Burst", m:"heal % of damage dealt", o:15, n:18, d:"buff", k:"tune" },
        { a:"Umbilicus Eternus", m:"absorb multiplier of Blood Plague dmg", o:5, n:6, u:"x", d:"buff", k:"tune" }
      ]},
      { name: "Frost", role: "DPS (melee)", changes: [
        { a:"Permafrost", m:"shield % of damage dealt", o:30, n:35, d:"buff", k:"tune", t:"Defensive only; no offensive changes this build." }
      ]},
      { name: "Unholy", role: "DPS (melee)", note:"Cooldown/steady redistribution plus a summon-density cleanup (fewer pets overall).", changes: [
        { a:"Reanimation -> Lord of the Dead", d:"neutral", k:"rework", t:"Renamed; secondary effect redesigned (sacrifice 3 Magus to summon Lord of the Dead for 15s)." },
        { a:"Forbidden Knowledge (R3)", m:"Putrefy effectiveness", o:60, n:100, u:"%", d:"buff", k:"tune", t:"Also no longer grants Magus stacking damage to Necrotic Coil/Graveyard." },
        { a:"Soul Reaper", d:"neutral", k:"rework", t:"No longer consumes Putrefy; now consumes up to 3 Lesser Ghoul stacks." },
        { a:"Army of the Dead", d:"neutral", k:"rework", t:"Now an 8-ghoul army for 30s commanded via Scourge Strike (Death/Epidemic Orders)." },
        { a:"Lesser Ghoul", m:"damage", r:10, d:"buff", k:"tune" },
        { a:"Army of the Dead Lesser Ghoul", m:"damage", r:-20, d:"nerf", k:"tune" },
        { a:"Necrotic Coil", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Graveyard", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Commander of the Dead", m:"summoned-creature damage bonus (R1/R2)", o:15, n:10, u:"%", d:"nerf", k:"tune", t:"Per rank: 15%->10% and 30%->20% (same -33% each)." },
        { a:"Ruptured Viscera", d:"nerf", k:"tune", t:"Now deals reduced damage beyond 5 targets (AoE cap)." },
        { a:"Permafrost", m:"shield % of damage dealt", o:30, n:35, d:"buff", k:"tune" }
      ]}
    ]
  },
  {
    name: "Demon Hunter", color: "#A330C9",
    specs: [
      { name: "Devourer", role: "DPS (melee)", note:"Classic squish: Void Metamorphosis window cut, steady damage raised. Dev note: in-meta slightly down, out-of-meta significantly up.", changes: [
        { a:"Mastery: Monster Within", m:"bonus damage during Void Metamorphosis", r:-66, d:"nerf", k:"tune" },
        { a:"All ability damage", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Void Metamorphosis", m:"Void Ray damage bonus", o:67, n:40, u:"%", d:"nerf", k:"tune" },
        { a:"Impending Apocalypse", m:"Collapsing Star stacking bonus", o:30, n:20, u:"%", d:"nerf", k:"tune" },
        { a:"Consume", m:"damage", r:60, d:"buff", k:"tune", t:"Does not affect Devour." }
      ]},
      { name: "Havoc", role: "DPS (melee)", changes: [
        { a:"Demon Blades / Blade Dance / Chaos Strike", d:"neutral", k:"qol", t:"Now require Warglaives, Axes, Swords or Fist Weapons (itemization)." },
        { a:"Never Say Die (new)", d:"buff", k:"new", t:"+3% damage above 50% HP; +5% Leech below 50% HP." },
        { a:"Dash of Chaos", d:"neutral", k:"removed", t:"Removed (mobility/defensive)." }
      ]},
      { name: "Vengeance", role: "Tank", changes: [
        { a:"Charred Warblades", m:"heal % of Fire damage", o:4, n:5, d:"buff", k:"tune" },
        { a:"Soul Cleave", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Fel Devastation", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Frailty", m:"heal % of damage to afflicted", o:8, n:10, d:"buff", k:"tune" },
        { a:"Feast of Souls", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Revel in Pain", m:"shield % of Fire damage", o:5, n:6, d:"buff", k:"tune" },
        { a:"Fracture / Soul Cleave", d:"neutral", k:"qol", t:"Now require Warglaives, Axes, Swords or Fist Weapons." }
      ]}
    ]
  },
  {
    name: "Druid", color: "#FF7C0A",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Matted Fur", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"Heart of the Wild", m:"empowered Wild Growth healing", r:25, d:"buff", k:"tune" }
      ]},
      { name: "Balance", role: "DPS (ranged)", note:"Less Astral Power generation and fewer free spenders, bigger spenders. Net ~flat; emphasis on pooling AP for Eclipse.", changes: [
        { a:"Stellar Protection (new, lvl 42)", d:"neutral", k:"new", t:"Anti-dispel: reapplies Stellar Flare and generates 12 Astral Power." },
        { a:"Umbral Intensity", d:"buff", k:"rework", t:"Now increases Wrath & Starfire damage by 10% at all times." },
        { a:"Ascendant Eclipses (R2) - Astral Smolder", m:"crit damage (R1/R2)", o:12, n:10, u:"%", d:"nerf", k:"tune", t:"Per rank 12%->10% and 24%->20%." },
        { a:"Ascendant Eclipses (R2) - Astral Smolder", m:"duration", o:6, n:8, u:"s", d:"buff", k:"tune" },
        { a:"All damage", m:"damage", r:4, d:"buff", k:"tune" },
        { a:"Starsurge", m:"damage", r:10, d:"buff", k:"tune" },
        { a:"Starfall", m:"damage", r:10, d:"buff", k:"tune" },
        { a:"Celestial Fire", m:"Moonfire/Sunfire/Shooting Stars bonus", o:8, n:10, u:"%", d:"buff", k:"tune" },
        { a:"Orbit Breaker", m:"effectiveness", o:60, n:50, u:"%", d:"nerf", k:"tune" },
        { a:"Touch the Cosmos", m:"trigger chance from Wrath", o:15, n:12, u:"%", d:"nerf", k:"tune" },
        { a:"Touch the Cosmos", m:"trigger chance from Starfire", o:20, n:15, u:"%", d:"nerf", k:"tune" },
        { a:"Total Eclipse", m:"trigger chance (R1/R2)", o:10, n:15, u:"%", d:"buff", k:"tune", t:"Per rank 10%->15% and 20%->30%." },
        { a:"Sculpt the Stars", m:"Eclipse cooldown reduction", o:2, n:3, u:"s", d:"buff", k:"tune" },
        { a:"Lunar Calling (Elune's Chosen)", m:"Starfire primary-target bonus", o:120, n:100, u:"%", d:"nerf", k:"tune" },
        { a:"Bounteous Bloom (Keeper of the Grove)", d:"neutral", k:"rework", t:"Now +4s Treant duration instead of a 4th Treant." },
        { a:"Cenarius' Might (Keeper of the Grove)", m:"Haste", o:8, n:6, u:"%", d:"nerf", k:"tune" },
        { a:"Potent Enchantments (Keeper of the Grove)", m:"Haste", o:10, n:6, u:"%", d:"nerf", k:"tune" },
        { a:"Rejuvenation", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Wild Growth", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Regrowth", m:"healing", r:25, d:"buff", k:"tune" }
      ]},
      { name: "Feral", role: "DPS (melee)", note:"Talent diversity pass; net ~flat, build-dependent.", changes: [
        { a:"Saber Jaws", m:"damage bonus per point", o:50, n:60, u:"%", d:"buff", k:"tune" },
        { a:"Focused Frenzy", m:"damage bonus", o:20, n:15, u:"%", d:"nerf", k:"tune" },
        { a:"Rip and Tear", m:"damage bonus", o:15, n:20, u:"%", d:"buff", k:"tune" },
        { a:"Chomp", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Apex Predator's Craving", m:"base trigger chance", o:5, n:4, u:"%", d:"nerf", k:"tune" },
        { a:"Rejuvenation", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Wild Growth", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Regrowth", m:"healing", r:25, d:"buff", k:"tune" }
      ]},
      { name: "Restoration", role: "Healer", note:"QoL reworks plus a net healing/efficiency increase.", changes: [
        { a:"Overgrowth (new)", d:"buff", k:"new", t:"Nature's Swiftness Regrowth also applies Lifebloom/Rejuv/Wild Growth HoT." },
        { a:"Flash of Clarity (new)", m:"Omen of Clarity Regrowth healing", r:40, d:"buff", k:"new" },
        { a:"Innervate", d:"neutral", k:"rework", t:"Now regens 25% max mana over 8s instead of free spells." },
        { a:"Abundance", d:"neutral", k:"rework", t:"At 5+ Rejuvs: Regrowth +50% crit chance and -50% mana cost." },
        { a:"Tranquility", d:"buff", k:"rework", t:"Now also roots-absorb 60% of your health and prevents knockbacks." },
        { a:"Incarnation: Tree of Life", d:"buff", k:"rework", t:"Now casts Regrowth on up to 3 injured allies on shift." },
        { a:"Swiftmend", d:"buff", k:"tune", t:"Now heals for an extra 40% of the consumed HoT effect." },
        { a:"Verdant Infusion", d:"nerf", k:"tune", t:"No longer extends HoT effects." },
        { a:"Germination", d:"nerf", k:"tune", t:"No longer increases Rejuvenation duration by 2s." },
        { a:"All spell and ability healing", m:"healing", r:6, d:"buff", k:"tune" },
        { a:"Wild Growth", m:"healing", r:20, d:"buff", k:"tune" },
        { a:"Wild Growth", m:"mana cost", r:15, d:"nerf", k:"tune", t:"Cost increased (number up = worse)." },
        { a:"Verdancy", m:"healing", r:40, d:"buff", k:"tune" },
        { a:"Rejuvenation", m:"mana cost", r:-10, d:"buff", k:"tune", t:"Cheaper." },
        { a:"Regrowth", m:"mana cost", r:-10, d:"buff", k:"tune", t:"Cheaper." },
        { a:"Lifebloom", m:"mana cost", r:-20, d:"buff", k:"tune", t:"Cheaper." },
        { a:"Passing Seasons", m:"Nature's Swiftness cooldown reduction", o:12, n:15, u:"s", d:"buff", k:"tune" },
        { a:"Nature's Splendor", d:"nerf", k:"removed" }
      ]},
      { name: "Guardian", role: "Tank", note:"Reworks to Lunation/Gory Fur/Wild Guardian plus defensive buffs.", changes: [
        { a:"Gory Fur", d:"neutral", k:"rework", t:"Ironfur procs free Maul/Raze/Ravage and vice-versa." },
        { a:"Wild Guardian", d:"neutral", k:"rework", t:"Redesigned around 8s Guardian Spirit summons (not yet implemented)." },
        { a:"Brambles", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"After the Wildfire", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Ursoc's Fury", m:"absorb % of Thrash/Maul damage", o:30, n:35, u:"%", d:"buff", k:"tune" },
        { a:"Elune's Favored", m:"heal % of Arcane damage", o:15, n:18, u:"%", d:"buff", k:"tune" },
        { a:"Lunar Beam", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Lunation", d:"neutral", k:"rework", t:"Now -20s flat to Lunar Beam CD (was 3s per Arcane ability)." },
        { a:"Boundless Moonlight (Elune's Chosen)", m:"Lunar Beam Leech", o:10, n:12, u:"%", d:"buff", k:"tune" }
      ]}
    ]
  },
  {
    name: "Evoker", color: "#33937F",
    specs: [
      { name: "Augmentation", role: "DPS (ranged support)", changes: [
        { a:"Duplicate - Upheaval", d:"buff", k:"qol", t:"Duplicate Upheavals no longer knock enemies into the air (dungeon QoL)." },
        { a:"Living Flame", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Verdant Embrace", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Emerald Blossom", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Double-time (Chronowarden)", d:"neutral", k:"rework", t:"Ebon Might crit stat bonus now lasts 15s." }
      ]},
      { name: "Devastation", role: "DPS (ranged)", note:"Apex reworked to extend the Dragonrage window via new Unbound Flame. Profile change, ~flat.", changes: [
        { a:"Rising Fury (R3)", d:"neutral", k:"rework", t:"After Dragonrage ends, persists 4s/stack; Dragonrage becomes Unbound Flame (4 casts)." },
        { a:"Unbound Flame (new spell)", d:"buff", k:"new", t:"Instant guaranteed-crit Fire AoE, reduced beyond 5 targets, 1 Essence Burst." },
        { a:"Tyranny", d:"buff", k:"rework", t:"Now makes Unbound Flame always gain max Giantkiller benefit." },
        { a:"Living Flame", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Verdant Embrace", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Emerald Blossom", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Risen Fury", d:"neutral", k:"removed", t:"Merged into Rising Fury." }
      ]},
      { name: "Preservation", role: "Healer", note:"Dream Breath shifted from front-loaded burst to a HoT. Redistribution.", changes: [
        { a:"Merithra's Blessing", m:"Dream Breath healing bonus", o:250, n:60, u:"%", d:"nerf", k:"rework", t:"Redesign: now applies to ALL Dream Breath healing, not just the instant. The -76% is to the coefficient, scope widened." },
        { a:"Font of Magic", m:"Dream Breath / Fire Breath empower time", r:-20, d:"buff", k:"tune", t:"Faster empower." },
        { a:"Dream Breath", m:"instant healing", r:-50, d:"nerf", k:"tune" },
        { a:"Dream Breath", m:"periodic healing", r:118, d:"buff", k:"tune" },
        { a:"Temporal Barrier", m:"absorption", r:30, d:"buff", k:"tune" }
      ]}
    ]
  },
  {
    name: "Hunter", color: "#AAD372",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Ranged auto-shot", m:"damage", r:600, d:"buff", k:"tune", t:"Large %, but auto-shot is a small share of total DPS, so real impact is a modest baseline/downtime smoothing buff." },
        { a:"Hunter's Mark", m:"max targets", o:1, n:5, d:"buff", k:"qol", t:"Multi-boss application without stacking Hunters." },
        { a:"Bleak Arrows (Dark Ranger)", m:"damage", r:300, d:"buff", k:"tune" },
        { a:"Withering Fire's Black Arrow (Dark Ranger)", m:"damage", r:-40, d:"nerf", k:"tune" }
      ]},
      { name: "Beast Mastery", role: "DPS (ranged)", note:"Dev note states BM 'felt weak outside Bestial Wrath' - steady single-target buffed, AoE cleave trimmed. Likely net single-target buff.", changes: [
        { a:"Heart of the Pack -> Razor Sharp", d:"buff", k:"rework", t:"Redesigned: +100% pet Bite/Claw/Smack damage." },
        { a:"Piercing Fangs", m:"Kill Command crit damage", r:15, d:"buff", k:"rework" },
        { a:"Bloody Frenzy", m:"Barbed Shot periodic rate reduction", o:50, n:33, u:"%", d:"neutral", k:"tune", t:"Mechanic change, not a clean buff/nerf." },
        { a:"Kill Cleave", m:"Kill Command cleave during Beast Cleave", o:40, n:20, u:"%", d:"nerf", k:"tune" },
        { a:"Barbed Shot", m:"damage", r:25, d:"buff", k:"tune" },
        { a:"Kill Command", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Cobra Shot", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Beast Cleave", m:"duration", o:8, n:10, u:"s", d:"buff", k:"tune" },
        { a:"Wild Instincts", d:"nerf", k:"removed" }
      ]},
      { name: "Marksmanship", role: "DPS (ranged)", note:"Heavy rework of Explosive Shot/Deathblow; core shots all +20% but Apex no longer guarantees Aimed Shot crits and several talents trimmed.", changes: [
        { a:"Unstable Trigger (new)", d:"buff", k:"new", t:"Explosive Shot usable a 2nd time within 3s." },
        { a:"Explosive Shot", d:"neutral", k:"rework", t:"Now ticks every 1s for 3s, AoE within 8yd, reduced beyond 5 targets." },
        { a:"Precision Detonation", d:"buff", k:"rework", t:"Explosive Shot lasts 1 additional second." },
        { a:"Shrapnel Shot -> Incendiary Ammunition", d:"buff", k:"rework", t:"Explosive Shot cooldown -10s." },
        { a:"Take Aim (R2)", d:"neutral", k:"rework", t:"Now +5%/10% crit damage and +3%/6% ranged damage (no longer guaranteed Aimed crit)." },
        { a:"Take Aim (R3)", d:"buff", k:"rework", t:"Spotter's Mark now boosts next Aimed Shot AND Rapid Fire." },
        { a:"Bulletstorm", d:"neutral", k:"rework", t:"Rapid Fire now buffs next Aimed Shot by 20%." },
        { a:"Aspect of the Hydra", d:"nerf", k:"tune", t:"Arcane Shot no longer cleaves (AoE loss)." },
        { a:"Aimed Shot", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Rapid Fire", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Arcane Shot", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Multi-Shot", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Kill Shot", m:"damage", r:20, d:"buff", k:"tune" },
        { a:"Eagle's Accuracy", m:"Aimed Shot damage", o:10, n:5, u:"%", d:"nerf", k:"tune", t:"Now a 1-point talent." },
        { a:"Eagle's Accuracy", m:"Rapid Fire damage", o:20, n:10, u:"%", d:"nerf", k:"tune" },
        { a:"Focused Aim", m:"Aimed Shot cooldown reduction", o:2, n:1, u:"s", d:"nerf", k:"tune", t:"Less CDR." },
        { a:"Through the Eyes (Dark Ranger)", m:"Kill Shot & Black Arrow damage", r:10, d:"buff", k:"rework" },
        { a:"Black Arrow direct damage (Dark Ranger)", m:"damage", r:-40, d:"nerf", k:"tune" },
        { a:"Moon's Blessing (Sentinel)", m:"Aimed Shot cooldown reduction", o:2, n:1, u:"s", d:"nerf", k:"tune" },
        { a:"Double Tap", d:"nerf", k:"removed" },
        { a:"Headshot", d:"neutral", k:"removed" }
      ]},
      { name: "Survival", role: "DPS (melee)", changes: [
        { a:"Razor Edge (new)", d:"buff", k:"new", t:"Raptor Strike/Swipe & Kill Command +10% crit chance and +10% crit damage." },
        { a:"Primal Surge", d:"neutral", k:"qol", t:"Moved to an easier talent location." },
        { a:"Shower of Blood", d:"neutral", k:"removed" },
        { a:"Lethal Barbs (Sentinel)", d:"neutral", k:"rework", t:"Autos now have a very high chance to give 3 Focus (was 1/auto)." }
      ]}
    ]
  },
  {
    name: "Mage", color: "#3FC7EB",
    specs: [
      { name: "Class-wide", role: "All", note:"Defensive pass, slight Glacial Bulwark pullback.", changes: [
        { a:"Improved Warding (new)", m:"AoE damage taken", r:-4, d:"buff", k:"new" },
        { a:"Improved Prismatic Barrier", d:"buff", k:"tune", t:"Now grants an extra Prismatic Barrier charge." },
        { a:"Temporal Realignment", d:"buff", k:"rework", t:"Now heals 20% instantly + 30% over 6s." },
        { a:"Rondurmancy (Sunfury)", d:"neutral", k:"rework", t:"3 stronger orbs instead of 5; +6%/12% sphere chance, +1% spell dmg per sphere." },
        { a:"Memory of Al'ar (Sunfury)", d:"nerf", k:"tune", t:"Combustion/Arcane Surge no longer double Mana Cascade stacks." },
        { a:"Spellfire Spheres (Sunfury) - Arcane", m:"orb generation chance", o:12, n:6, u:"%", d:"nerf", k:"tune" },
        { a:"Spellfire Spheres (Sunfury) - Fire", m:"orb generation chance", o:25, n:12, u:"%", d:"nerf", k:"tune" },
        { a:"Mana Cascade (Sunfury)", d:"buff", k:"tune", t:"Stack cap removed; also gained from Arcane Pulse/Prismatic Bolt." }
      ]},
      { name: "Arcane", role: "DPS (ranged)", note:"Apex (Prismatic Bolt) and Arcane Pulse reworked; damage-neutral redesign.", changes: [
        { a:"Prismatic Bolt (new Apex)", d:"buff", k:"new", t:"Arcane Barrage can trigger a big AoE bolt; ranks add Clearcasting and +Arcane Missiles/Barrage damage." },
        { a:"Arcane Pulse", m:"cast time", o:2.25, n:2.0, u:"s", d:"buff", k:"rework", t:"Faster. Also reworked: 8yd radius, 15s CD, generates a charge per enemy." },
        { a:"Arcane Pulse", m:"radius", o:2, n:8, u:"yd", d:"buff", k:"rework" },
        { a:"Expanded Mind", d:"buff", k:"rework", t:"Prismatic Bolt now grants 4 Arcane Salvo stacks." },
        { a:"Touch of the Archmage", d:"neutral", k:"removed" }
      ]},
      { name: "Fire", role: "DPS (ranged)", note:"Combustion burst shifted into steady damage.", changes: [
        { a:"Pyroblast", m:"damage", r:15, d:"buff", k:"tune" },
        { a:"Flamestrike", m:"damage", r:15, d:"buff", k:"tune" },
        { a:"Fired Up (R1)", m:"Fire damage bonus", o:4, n:2, u:"%", d:"nerf", k:"tune", t:"Combustion burst pullback." },
        { a:"Fired Up (R1)", m:"buff duration", o:12, n:8, u:"s", d:"nerf", k:"tune" },
        { a:"Fired Up (R2)", m:"Fire damage (R1/R2)", o:3, n:5, u:"%", d:"buff", k:"tune", t:"Per rank 3%->5% and 6%->10%." },
        { a:"Fired Up (R3)", d:"nerf", k:"tune", t:"Chance during Combustion slightly reduced." }
      ]},
      { name: "Frost", role: "DPS (ranged)", changes: [
        { a:"Glacial Bulwark", d:"nerf", k:"tune", t:"No longer grants an extra Ice Barrier charge (defensive)." },
        { a:"All damage", m:"damage", r:4, d:"buff", k:"tune" },
        { a:"Hand of Frost (R2)", m:"spell damage (R1/R2)", o:1, n:0.5, u:"%", d:"nerf", k:"tune", t:"Per rank 1%->0.5% and 2%->1%; trims Hero-talent burst." }
      ]}
    ]
  },
  {
    name: "Monk", color: "#00FF98",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Chi Transfer", m:"Touch of Death self-heal % of damage", o:50, n:60, d:"buff", k:"tune" },
        { a:"Vigorous Expulsion", m:"Expel Harm healing bonus", o:5, n:6, u:"%", d:"buff", k:"tune" }
      ]},
      { name: "Brewmaster", role: "Tank", changes: [
        { a:"Staggering Strikes", m:"Stagger reduction", r:25, d:"buff", k:"tune" },
        { a:"Spirit of the Ox", m:"healing sphere chance", r:20, d:"buff", k:"tune" },
        { a:"Celestial Brew / Celestial Infusion", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"Awakening Spirit", m:"max absorb value", r:25, d:"buff", k:"tune" },
        { a:"Vital Flame", m:"heal % of Fire/Nature damage", o:40, n:50, d:"buff", k:"tune" }
      ]},
      { name: "Mistweaver", role: "Healer", note:"The only spec with an across-the-board healing reduction this build; throughput shifted toward Mastery/Ancient Teachings.", changes: [
        { a:"Vital Expenditure (new)", d:"neutral", k:"new", t:"Choice node: Soothing Mist +300% healing, +200% mana." },
        { a:"All healing", m:"healing", r:-3, d:"nerf", k:"tune" },
        { a:"Mastery: Gust of Mist", m:"healing", r:50, d:"buff", k:"tune" },
        { a:"Spinning Crane Kick", m:"damage", r:-15, d:"nerf", k:"tune" },
        { a:"Way of the Crane", m:"damage transferred", o:340, n:280, u:"%", d:"nerf", k:"tune" },
        { a:"Jadefire Teachings", m:"Ancient Teaching transfer", o:270, n:320, u:"%", d:"buff", k:"tune" }
      ]},
      { name: "Windwalker", role: "DPS (melee)", note:"Strong burst->steady shift: big filler buffs, cooldown burst trimmed. ~Flat net, large profile change.", changes: [
        { a:"Melee auto-attack", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Zenith Stomp", m:"damage", r:-30, d:"nerf", k:"tune" },
        { a:"Blackout Kick", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Tiger Palm", m:"damage", r:200, d:"buff", k:"tune" },
        { a:"Dual Threat", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Weapon of Wind", m:"damage during Zenith", o:10, n:5, u:"%", d:"nerf", k:"tune" },
        { a:"Tigereye Brew", m:"crit damage (R1/R2)", o:10, n:5, u:"%", d:"nerf", k:"tune", t:"Per rank 10%->5% and 20%->10%." },
        { a:"Vivify", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Celestial Conduit (Conduit of the Celestials)", m:"damage", r:-25, d:"nerf", k:"tune" },
        { a:"Temple Training (Conduit of the Celestials)", m:"Fists of Fury & SCK damage", o:10, n:30, u:"%", d:"buff", k:"tune" }
      ]}
    ]
  },
  {
    name: "Paladin", color: "#F48CBA",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Golden Path", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Lightforged Blessing", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Brought to Light", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Rite of Adjuration (Lightsmith)", m:"healing", r:25, d:"buff", k:"tune" }
      ]},
      { name: "Protection", role: "Tank", note:"Large transfer of power out of cooldowns into baseline damage (threat fix) plus defensive reworks. Baseline damage hugely up.", changes: [
        { a:"Blessed Word (new)", d:"buff", k:"new", t:"Word of Glory can't crit but scales healing with crit and shields you with 80% of its overheal." },
        { a:"Improved Ardent Defender", d:"buff", k:"rework", t:"Now +20% max HP while active and no longer ends on fatal damage." },
        { a:"Seal of Reprisal", d:"buff", k:"rework", t:"Blessed Hammer now -10% enemy damage to you for 8s." },
        { a:"Judgment", m:"damage", r:100, d:"buff", k:"tune" },
        { a:"Consecration", m:"damage", r:100, d:"buff", k:"tune" },
        { a:"Shield of the Righteous", m:"damage", r:150, d:"buff", k:"tune" },
        { a:"Hammer of the Righteous", m:"primary damage", r:50, d:"buff", k:"tune" },
        { a:"Avenging Wrath", d:"nerf", k:"rework", t:"Now +10% damage/healing and +10% crit (reduced from prior value; no 'was' given - power moved to baseline)." },
        { a:"Avenger's Shield", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Lesser Weapon", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Hammer of Light", m:"damage", r:-33, d:"nerf", k:"tune" },
        { a:"Empyrean Hammer", m:"damage", r:-33, d:"nerf", k:"tune" },
        { a:"Divine Exaction", m:"Divine Toll effectiveness", o:150, n:80, u:"%", d:"nerf", k:"tune" },
        { a:"Undying Embers", m:"heal % of Refining Fire damage", o:100, n:125, u:"%", d:"buff", k:"tune" },
        { a:"Bulwark of Order", m:"absorb % of Avenger's Shield damage", o:60, n:75, u:"%", d:"buff", k:"tune" },
        { a:"Solace", m:"Consecration self-heal % of damage", o:300, n:375, u:"%", d:"buff", k:"tune" },
        { a:"Sentinel", d:"buff", k:"rework", t:"Duration increased to 20s; moved; now inherits Avenging Wrath crit bonus." },
        { a:"Sanctified Wrath", d:"neutral", k:"removed" }
      ]},
      { name: "Retribution", role: "DPS (melee)", note:"Cooldown burst trimmed, baseline strikes raised; rotation de-pressured. ~Flat net.", changes: [
        { a:"Light Within (R1)", d:"buff", k:"rework", t:"Art of War and Righteous Cause can each accumulate one more." },
        { a:"Art of War", m:"Blade of Justice damage bonus", o:150, n:80, u:"%", d:"nerf", k:"tune" },
        { a:"Blade of Justice", m:"damage", r:40, d:"buff", k:"tune" },
        { a:"Final Verdict", m:"damage", r:15, d:"buff", k:"tune" },
        { a:"Divine Storm", m:"damage", r:15, d:"buff", k:"tune" },
        { a:"Avenging Wrath", m:"damage & crit bonus", o:20, n:15, u:"%", d:"nerf", k:"tune" },
        { a:"Templar Strike", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Templar Slash", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Judgment", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Hammer of Wrath", m:"damage", r:50, d:"buff", k:"tune" },
        { a:"Divine Toll", m:"Judgment damage bonus", o:100, n:50, u:"%", d:"nerf", k:"tune" },
        { a:"Light Within (R3)", m:"damage", r:-25, d:"nerf", k:"tune" },
        { a:"Crusading Strikes", d:"buff", k:"rework", t:"Now +15% auto-attack speed (was -20%)." },
        { a:"Execution Sentence", m:"radius", o:8, n:10, u:"yd", d:"buff", k:"tune" },
        { a:"Flash of Light", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Word of Glory", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Eternal Flame", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Hammer of Light (Templar)", m:"damage", r:-30, d:"nerf", k:"tune", t:"PvE only." },
        { a:"Hammer of Light (Templar)", m:"Holy Power cost", o:5, n:3, d:"buff", k:"tune", t:"Cheaper." }
      ]}
    ]
  },
  {
    name: "Priest", color: "#FFFFFF",
    specs: [
      { name: "Discipline", role: "Healer", note:"Less proc reliance, more consistent damage. Voidweaver lines are shared with Shadow.", changes: [
        { a:"Grim Deliverance (new)", d:"neutral", k:"new", t:"Shadow Mend +30% healing & +4s Atonement, +0.5s cast." },
        { a:"Shadow Mend", d:"neutral", k:"rework", t:"Now a passive upgrade to Flash Heal instead of an SW:Pain-based proc." },
        { a:"Master the Darkness (R3)", m:"Void Shield proc chance from Penance", o:33, n:25, u:"%", d:"nerf", k:"tune" },
        { a:"Master the Darkness (R3)", m:"Void Shield damage reflect", o:25, n:15, u:"%", d:"nerf", k:"tune" },
        { a:"Master the Darkness", d:"buff", k:"tune", t:"Can now hold up to 2 charges." },
        { a:"Flash Heal", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Smite", m:"damage", r:40, d:"buff", k:"tune" },
        { a:"Inescapable Torment", m:"damage", r:-30, d:"nerf", k:"tune" },
        { a:"Penance", d:"nerf", k:"rework", t:"No longer applies Atonement when cast on an ally." },
        { a:"Void Blast (Voidweaver)", m:"damage", r:25, d:"buff", k:"tune" },
        { a:"Voidwraith (Voidweaver)", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Void Infusion (Voidweaver)", m:"Atonement healing from Void Blast/Penance", o:50, n:75, u:"%", d:"buff", k:"tune" }
      ]},
      { name: "Holy", role: "Healer", changes: [
        { a:"Resonant Energy (Archon)", d:"buff", k:"rework", t:"Halo now +2% healing for 10s, stacking 4x." },
        { a:"Divine Hymn", d:"buff", k:"rework", t:"Now also grants Guardian Spirit while channeled." }
      ]},
      { name: "Shadow", role: "DPS (ranged)", note:"Voidform/Void Volley rework plus a new AoE source (Shadeburst). Leans neutral-to-up for AoE.", changes: [
        { a:"Shadeburst (new)", d:"buff", k:"new", t:"Shadowy Apparitions explode for 8yd AoE, reduced beyond 5 targets." },
        { a:"Improved Voidform", d:"buff", k:"rework", t:"Voidform +5% spell damage and +2 Void Volley uses." },
        { a:"Ancient Madness", d:"neutral", k:"rework", t:"SW:Madness +2% Haste & +1.5s Voidform, stacking 5x." },
        { a:"Voidform", d:"neutral", k:"rework", t:"Now grants 3 uses of Void Volley instead of Void Volley having a CD." },
        { a:"Power Word: Shield", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"Focused Outburst (Archon)", m:"Void Volley damage", r:15, d:"buff", k:"rework" },
        { a:"Phantom Menace", d:"neutral", k:"removed" }
      ]}
    ]
  },
  {
    name: "Rogue", color: "#FFF468",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Thistle Tea", d:"neutral", k:"rework", t:"Now a choice between auto-cast and active-only versions." },
        { a:"Atrophic Poison", m:"damage reduction on target", o:3, n:4, u:"%", d:"buff", k:"tune" },
        { a:"Atrophic Poison", m:"duration", o:10, n:60, u:"s", d:"buff", k:"qol", t:"PvE only." },
        { a:"Deal Fate (Fatebound)", m:"extra combo point chance on Seal Fate", o:100, n:60, u:"%", d:"nerf", k:"tune" }
      ]},
      { name: "Assassination", role: "DPS (melee)", note:"Energy-economy update; Deathmark burst trimmed, baseline raised. ~Flat net.", changes: [
        { a:"Unstable Toxin (new)", m:"Envenom damage", r:18, d:"neutral", k:"new", t:"+18% Envenom damage but -2s duration." },
        { a:"Implacable (R1)", m:"Envenom damage", r:10, d:"buff", k:"rework", t:"Also restores 2 Energy per combo point spent." },
        { a:"Internal Bleeding", m:"damage", r:10, d:"buff", k:"rework", t:"New triggers from Kidney Shot & Rupture." },
        { a:"Dashing Scoundrel", m:"weapon-poison crit chance from Envenom", o:5, n:10, u:"%", d:"buff", k:"tune", t:"Also +4% Energy gen per lethal poison." },
        { a:"All damage", m:"damage", r:3, d:"buff", k:"tune" },
        { a:"Deathmark", m:"Rupture/Garrote/Lethal Poison damage bonus", o:100, n:75, u:"%", d:"nerf", k:"tune" },
        { a:"Kingsbane", m:"damage", r:-15, d:"nerf", k:"tune" },
        { a:"Shrouded Suffocation", m:"Garrote damage bonus", o:20, n:30, u:"%", d:"buff", k:"tune" },
        { a:"Avulsion", m:"Rupture damage bonus", o:20, n:25, u:"%", d:"buff", k:"tune" },
        { a:"Motivated Murderer", m:"Energy", o:20, n:30, u:"%", d:"buff", k:"tune" },
        { a:"Rapid Injection", m:"damage bonus (R1/R2)", o:15, n:20, u:"%", d:"buff", k:"tune", t:"Per rank 15%->20% and 30%->40%." },
        { a:"Blindside", m:"trigger chance", o:15, n:10, u:"%", d:"nerf", k:"tune" },
        { a:"Blindside", m:"trigger chance (low HP)", o:30, n:20, u:"%", d:"nerf", k:"tune" },
        { a:"Deadly Momentum", d:"neutral", k:"removed" }
      ]},
      { name: "Outlaw", role: "DPS (melee)", note:"Build-diversity pass; net ~flat.", changes: [
        { a:"Improved Between the Eyes", m:"BtE crit damage multiplier", o:3, n:2.5, u:"x", d:"nerf", k:"tune" },
        { a:"Fast Action", m:"Between the Eyes cooldown reduction", o:5, n:8, u:"s", d:"buff", k:"tune", t:"Also +1% damage per BtE stack." },
        { a:"Killing Spree", m:"damage", r:60, d:"buff", k:"tune" },
        { a:"Heavy Hitter", m:"combo-point ability damage (R1/R2)", o:10, n:15, u:"%", d:"buff", k:"tune", t:"Per rank 10%->15% and 20%->30%." },
        { a:"Zero In", m:"value per stack", o:3, n:2, u:"%", d:"nerf", k:"tune" },
        { a:"Hidden Opportunity", m:"Ambush -> Opportunity chance", o:80, n:100, u:"%", d:"buff", k:"tune" }
      ]},
      { name: "Subtlety", role: "DPS (melee)", note:"Anti-overcap resource trims during cooldowns; ~flat.", changes: [
        { a:"Relentless Strikes", m:"Energy per combo point", o:5, n:4, d:"nerf", k:"tune" },
        { a:"Shadowcraft", m:"auto-attack frequency bonus", o:40, n:75, u:"%", d:"buff", k:"rework", t:"But no longer stores 1 extra combo point." },
        { a:"Lingering Shadow", d:"buff", k:"tune", t:"Now also applies to Shuriken Storm (AoE)." },
        { a:"Ancient Arts", d:"buff", k:"rework", t:"Now considers total Secret Technique damage for shadow clone." }
      ]}
    ]
  },
  {
    name: "Shaman", color: "#0070DD",
    specs: [
      { name: "Farseer (hero)", role: "Shared", changes: [
        { a:"Chain Lightning", m:"max targets", o:3, n:5, d:"buff", k:"tune" },
        { a:"Lava Burst", d:"buff", k:"tune", t:"Now also gains damage equal to your crit chance." }
      ]},
      { name: "Elemental", role: "DPS (ranged)", note:"Hardest cooldown squish in the patch: Ascendance burst slashed, baseline (and AoE) damage raised a lot.", changes: [
        { a:"Power of the Maelstrom", d:"neutral", k:"rework", t:"Now: LB/CL 15% chance to make next Lava Burst +20%, stacking 2x." },
        { a:"Stormkeeper", d:"neutral", k:"rework", t:"Next 2 LB instant +150%, or next 2 CL instant + Overload all." },
        { a:"Lava Burst", m:"damage", r:30, d:"buff", k:"tune", t:"PvE only." },
        { a:"Lightning Bolt", m:"damage", r:30, d:"buff", k:"tune", t:"PvE only." },
        { a:"Chain Lightning", m:"damage", r:60, d:"buff", k:"tune" },
        { a:"Flame Shock", m:"damage", r:60, d:"buff", k:"tune" },
        { a:"Tempest", m:"direct damage", r:-20, d:"nerf", k:"tune" },
        { a:"Ascendance", m:"Elemental Overload damage bonus", o:75, n:30, u:"%", d:"nerf", k:"tune" },
        { a:"Ascendance", m:"bonus Lava Bursts on activation", o:100, n:50, u:"%", d:"nerf", k:"tune" },
        { a:"Molten Wrath", m:"Lava Burst damage bonus", o:15, n:10, u:"%", d:"nerf", k:"tune" },
        { a:"Feedback Loop (R1)", m:"Elemental Overload damage bonus", o:35, n:10, u:"%", d:"nerf", k:"tune", t:"Now also +10% Elemental damage done." },
        { a:"Feedback Loop (R2)", m:"crit damage bonus (R1/R2)", o:25, n:15, u:"%", d:"nerf", k:"tune", t:"Per rank 25%->15% and 50%->30%." },
        { a:"Fusion of the Elements", m:"Elemental Blast stat buff duration", o:100, n:40, u:"%", d:"nerf", k:"tune" },
        { a:"Healing Surge", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Earth Shield", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Healing Stream Totem", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Supercharge (Stormbringer)", d:"neutral", k:"rework", t:"LB/CL/Tempest overloads now +10% damage." }
      ]},
      { name: "Enhancement", role: "DPS (melee)", note:"Only healing buffs this build; offense unchanged.", changes: [
        { a:"Healing Surge", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Earth Shield", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Healing Stream Totem", m:"healing", r:25, d:"buff", k:"tune" }
      ]},
      { name: "Restoration", role: "Healer", changes: [
        { a:"Healing Rain", d:"neutral", k:"qol", t:"Now 12s CD / 18s duration; recasting despawns the old one." }
      ]}
    ]
  },
  {
    name: "Warlock", color: "#8788EE",
    specs: [
      { name: "Class / Hellcaller", role: "Shared", note:"Only Destruction and the Hellcaller hero tree changed; Affliction and Demonology are untouched this build.", changes: [
        { a:"Summon Demonic Gateway", d:"neutral", k:"qol", t:"Now a Utility spell by default in the Cooldown Manager." },
        { a:"Blackened Soul (Hellcaller)", d:"neutral", k:"rework", t:"Chaos Bolt/Shadowburn now add Wither stacks for priority-target focus." },
        { a:"Mark of Peroth'arn (Hellcaller) - Wither", m:"critical strike damage", o:200, n:215, u:"%", d:"buff", k:"tune" },
        { a:"Mark of Peroth'arn (Hellcaller) - Blackened Soul", m:"critical strike damage", o:200, n:225, u:"%", d:"buff", k:"tune" }
      ]},
      { name: "Destruction", role: "DPS (ranged)", changes: [
        { a:"Conflagration of Chaos", d:"buff", k:"rework", t:"Conflagrate & Shadowburn now always crit and scale damage with crit chance." },
        { a:"Embers of Nihilam (R1)", d:"neutral", k:"qol", t:"Tooltip now shows the Echo of Sargeras proc chance." }
      ]}
    ]
  },
  {
    name: "Warrior", color: "#C69B6D",
    specs: [
      { name: "Class-wide", role: "All", note:"Rend reworked per spec.", changes: [
        { a:"Rend", d:"neutral", k:"rework", t:"Now Arms-exclusive, single-target, 10 Rage. Cleave spreads it." },
        { a:"Storm of Blood (new, Fury)", d:"buff", k:"new", t:"Whirlwind applies Rend to all targets." },
        { a:"Blood and Thunder (new, Protection)", d:"buff", k:"new", t:"Thunder Clap applies Rend to all targets." },
        { a:"Thunder Clap", d:"neutral", k:"rework", t:"No longer innately applies Rend." }
      ]},
      { name: "Arms", role: "DPS (melee)", note:"Ravager and Demolish improvements lean slightly net positive.", changes: [
        { a:"Ravager", m:"damage", r:50, d:"buff", k:"tune", t:"Also redesigned: now a +25% Bleed-taken debuff for 12s instead of buffing Cleave/Whirlwind." },
        { a:"Ravager", d:"buff", k:"rework", t:"Duration no longer reduced by Haste." },
        { a:"Bloodletting", d:"buff", k:"rework", t:"+5% crit vs Rend targets; Mortal Strike auto-Rends below 35% HP; Deep Wounds +33% duration." },
        { a:"Broad Strokes", d:"neutral", k:"rework", t:"Colossus Smash now grants 6 Sweeping Strikes stacks." },
        { a:"Improved Sweeping Strikes", d:"neutral", k:"removed" },
        { a:"Tide of Battle (Colossus)", d:"buff", k:"rework", t:"Now boosts Overpower AND Execute." },
        { a:"Demolish (Colossus)", m:"cooldown", o:45, n:30, u:"s", d:"buff", k:"tune", t:"More frequent (Dominance no longer reduces it)." }
      ]},
      { name: "Fury", role: "DPS (melee)", note:"Whirlwind made useful in single target; mostly reworks/QoL.", changes: [
        { a:"Whirlwind", d:"buff", k:"rework", t:"Now generates 3 Rage innately." },
        { a:"Carving Blades (new)", m:"Whirlwind single-target damage", r:50, d:"buff", k:"new" },
        { a:"Rampaging Ruin", d:"neutral", k:"rework", t:"Rampage's final strike now slams for 8yd AoE while Improved Whirlwind is active." },
        { a:"Hack and Slash", d:"neutral", k:"rework", t:"Rampage now 75% chance to refund Raging Blow and +20% next Raging Blow." },
        { a:"Thunder Blast (Mountain Thane)", m:"damage", r:40, d:"buff", k:"tune" },
        { a:"Crashing Thunder (Mountain Thane)", m:"Thunder Clap damage bonus", o:30, n:10, u:"%", d:"nerf", k:"tune", t:"Power moved into Thunder Blast." }
      ]},
      { name: "Protection", role: "Tank", note:"Defensive buffs plus more frequent Demolish and bigger Ravager.", changes: [
        { a:"Devastating Focus", d:"buff", k:"rework", t:"Now boosts Revenge AND Execute." },
        { a:"Bloodborne", d:"buff", k:"rework", t:"Now boosts all Bleed damage (was Rend & Deep Wounds only)." },
        { a:"Fueled by Violence", m:"heal % of Bleed damage", o:110, n:125, u:"%", d:"buff", k:"tune" },
        { a:"Ignore Pain", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"Brutal Vitality", m:"damage added to Ignore Pain", o:8, n:10, u:"%", d:"buff", k:"tune" },
        { a:"Ravager", m:"damage", r:50, d:"buff", k:"tune", t:"Also redesigned: +25% Bleed-taken debuff." },
        { a:"Demolish (Colossus)", m:"cooldown", o:45, n:30, u:"s", d:"buff", k:"tune" },
        { a:"Tide of Battle (Colossus)", d:"buff", k:"rework", t:"Now boosts Revenge AND Execute." },
        { a:"Thunder Blast (Mountain Thane)", m:"damage", r:40, d:"buff", k:"tune" },
        { a:"Crashing Thunder (Mountain Thane)", m:"Thunder Clap damage bonus", o:30, n:10, u:"%", d:"nerf", k:"tune" }
      ]}
    ]
  }
];
