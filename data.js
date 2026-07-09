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
  build: "12.1 PTR builds 1-3 (through the July 8 weekly notes)",
  expansion: "World of Warcraft: Midnight",
  source: "https://www.wowhead.com/news/class-changes-for-first-patch-12-1-ptr-build-dps-cooldowns-nerfed-381912",
  source2: "https://www.wowhead.com/news/earthen-racial-experience-nerfs-and-class-tuning-weekly-patch-12-1-ptr-381979",
  source3: "https://www.wowhead.com/news/patch-12-1-ptr-official-development-notes-protection-paladin-talent-adjustments-382118",
  captured: "2026-07-09",
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
        { a:"Umbilicus Eternus", m:"absorb multiplier of Blood Plague dmg", o:5, n:6, u:"x", d:"buff", k:"tune" },
        { a:"Venomous Abyss tier set", d:"neutral", k:"rework", b:3, t:"New design implemented: Death Strike stacks Blood Debt (+0.5% Str, up to 5%); at 10 stacks Marrowrend consumes it for +10% Str/10s (2pc) and +3 Bone Shield + Shadow AoE (4pc)." }
      ]},
      { name: "Frost", role: "DPS (melee)", note:"Build 1 only touched Permafrost; Week 2 brought a major retune - Obliteration/Pillar burst trimmed, steady abilities raised hard. Most lines are PvE-only.", changes: [
        { a:"Permafrost", m:"shield % of damage dealt", o:30, n:35, d:"buff", k:"tune" },
        { a:"Pillar of Frost", m:"Strength bonus", o:30, n:20, u:"%", d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Howling Blast", m:"damage", r:100, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Empower Rune Weapon", m:"damage", r:30, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Glacial Advance", m:"damage", r:30, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Icy Death Torrent", m:"damage", r:100, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Frost Fever", m:"damage", r:100, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Remorseless Winter", m:"damage", r:100, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Frostscythe", m:"damage", r:20, d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Frost Strike", m:"damage", r:25, d:"buff", k:"tune", b:2, t:"Does not affect Frostbane. PvE only." },
        { a:"Obliterate", m:"damage", r:-25, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Breath of Sindragosa", m:"damage", r:-20, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Frostbane", m:"damage", r:-30, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Frostwyrm's Fury", m:"damage", r:-20, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Wither Away (Deathbringer)", m:"Frost Fever tick-rate bonus", o:100, n:75, u:"%", d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Deathly Blows (Deathbringer)", m:"Frost Strike damage bonus", o:15, n:35, u:"%", d:"buff", k:"tune", b:2, t:"PvE only." },
        { a:"Reaper's Mark (Deathbringer)", m:"cast & explosion damage", r:-25, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Exterminate (Deathbringer)", m:"damage", r:-17, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"Whitemane's Undeath (Rider of the Apocalypse)", m:"damage", r:-30, d:"nerf", k:"tune", b:2, t:"PvE only." },
        { a:"All ability damage", m:"damage", r:-10, d:"nerf", k:"tune", b:3, t:"Week 3: pull-back after the Week 2 buffs, from Heroic raid test data." },
        { a:"Melee damage", m:"damage", r:-20, d:"nerf", k:"tune", b:3 },
        { a:"Icy Death Torrent", m:"damage", r:-35, d:"nerf", k:"tune", b:3 },
        { a:"Remorseless Winter", m:"damage", r:-30, d:"nerf", k:"tune", b:3 },
        { a:"Obliterate", m:"damage", r:-10, d:"nerf", k:"tune", b:3 }
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
        { a:"Permafrost", m:"shield % of damage dealt", o:30, n:35, d:"buff", k:"tune" },
        { a:"Blightburst", m:"Putrefy plague-duration extension", o:4.5, n:3, u:"s", d:"nerf", k:"tune", b:2 },
        { a:"Runic Power spenders", m:"plague-duration extension", o:1.5, n:1, u:"s", d:"nerf", k:"tune", b:2 },
        { a:"Dread Plague", d:"buff", k:"rework", b:2, t:"Now keeps its extended duration when re-applied to a new target within 40yd (fixes target-swapping)." },
        { a:"All damage", m:"damage", r:-3, d:"nerf", k:"tune", b:3, t:"Posted as -8% in the Week 3 notes, then hotfix-adjusted to -3% (a bug had skewed the tuning)." },
        { a:"Lord of the Dead", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Magus of the Dead", m:"damage", r:-15, d:"nerf", k:"tune", b:3 },
        { a:"Lesser Ghoul (all)", m:"damage", r:-15, d:"nerf", k:"tune", b:3 },
        { a:"Putrefy", m:"damage", r:-15, d:"nerf", k:"tune", b:3 },
        { a:"Necrotic Coil", m:"damage", r:-18, d:"nerf", k:"tune", b:3 },
        { a:"Pestilence", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Infected Claw", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Virulent Plague", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Whitemane Death Coil (Rider of the Apocalypse)", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Whitemane Undeath (Rider of the Apocalypse)", m:"damage", r:-25, d:"nerf", k:"tune", b:3 },
        { a:"Nazgrim's Conquest", d:"neutral", k:"qol", b:3, t:"Bug fixes: no longer gains extra Strength from Lord of the Dead sacrifice, critters or low-level targets." }
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
        { a:"Consume", m:"damage", r:60, d:"buff", k:"tune", t:"Does not affect Devour." },
        { a:"All ability damage", m:"damage", r:10, d:"buff", k:"tune", b:3, t:"Week 3: on top of the build-1 +20%." }
      ]},
      { name: "Havoc", role: "DPS (melee)", changes: [
        { a:"Demon Blades / Blade Dance / Chaos Strike", d:"neutral", k:"qol", t:"Now require Warglaives, Axes, Swords or Fist Weapons (itemization)." },
        { a:"Never Say Die (new)", d:"buff", k:"new", t:"+3% damage above 50% HP; +5% Leech below 50% HP." },
        { a:"Dash of Chaos", d:"neutral", k:"removed", t:"Removed (mobility/defensive)." },
        { a:"Trail of Ruin", d:"neutral", k:"rework", b:2, t:"Damage now applied immediately instead of a 4s damage-over-time." },
        { a:"Serrated Glaive", d:"neutral", k:"rework", b:2, t:"Now a 12s buff on you instead of a 15s debuff on the target." },
        { a:"Blind Fury", m:"Eye Beam Fury per second (R1/R2)", o:15, n:10, d:"nerf", k:"tune", b:2, t:"Per rank 15->10 and 30->20." },
        { a:"Inner Demon", d:"neutral", k:"rework", b:2, t:"Now a choice node with Chaos Theory." },
        { a:"All ability damage", m:"damage", r:-5, d:"nerf", k:"tune", b:3, t:"PvE only." }
      ]},
      { name: "Vengeance", role: "Tank", changes: [
        { a:"Charred Warblades", m:"heal % of Fire damage", o:4, n:5, d:"buff", k:"tune" },
        { a:"Soul Cleave", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Fel Devastation", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Frailty", m:"heal % of damage to afflicted", o:8, n:10, d:"buff", k:"tune" },
        { a:"Feast of Souls", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Revel in Pain", m:"shield % of Fire damage", o:5, n:6, d:"buff", k:"tune" },
        { a:"Fracture / Soul Cleave", d:"neutral", k:"qol", t:"Now require Warglaives, Axes, Swords or Fist Weapons." },
        { a:"Sigil of Chains", d:"buff", k:"rework", b:2, t:"Now learned at level 35, no longer a talent (frees a talent point)." },
        { a:"Roaring Fire / Sigil of Silence / Feed the Demon", d:"neutral", k:"qol", b:2, t:"Talent positions changed." }
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
        { a:"Regrowth", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"All damage", m:"damage", r:3.5, d:"buff", k:"tune", b:3, t:"Week 3: DoT/builder catch-up now that spenders hit harder." },
        { a:"Moonfire", m:"damage", r:10, d:"buff", k:"tune", b:3 },
        { a:"Sunfire", m:"damage", r:10, d:"buff", k:"tune", b:3 },
        { a:"Shooting Stars", m:"damage", r:10, d:"buff", k:"tune", b:3 },
        { a:"Wrath", m:"damage", r:10, d:"buff", k:"tune", b:3 },
        { a:"Starfire", m:"damage", r:20, d:"buff", k:"tune", b:3 },
        { a:"Umbral Intensity", m:"Wrath & Starfire damage bonus", o:10, n:12, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Meteorites", m:"damage", r:15, d:"buff", k:"tune", b:3 },
        { a:"Ascendant Eclipses - Solar/Lunar Bolt", m:"damage", r:10, d:"buff", k:"tune", b:3 },
        { a:"Venomous Abyss 2-Set", m:"instant Starfall damage", r:15, d:"buff", k:"tune", b:3, t:"Tier set tuning." },
        { a:"Sylvan Beckoning (Keeper of the Grove)", m:"Dryad Starfall effectiveness", o:200, n:250, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Spirit of the Thicket (Keeper of the Grove)", m:"Starfall damage bonus", o:12, n:18, u:"%", d:"buff", k:"tune", b:3 }
      ]},
      { name: "Feral", role: "DPS (melee)", note:"Talent diversity pass; net ~flat, build-dependent.", changes: [
        { a:"Saber Jaws", m:"damage bonus per point", o:50, n:60, u:"%", d:"buff", k:"tune" },
        { a:"Focused Frenzy", m:"damage bonus", o:20, n:15, u:"%", d:"nerf", k:"tune" },
        { a:"Rip and Tear", m:"damage bonus", o:15, n:20, u:"%", d:"buff", k:"tune" },
        { a:"Chomp", m:"damage", r:30, d:"buff", k:"tune" },
        { a:"Apex Predator's Craving", m:"base trigger chance", o:5, n:4, u:"%", d:"nerf", k:"tune" },
        { a:"Cooldown Manager", d:"neutral", k:"qol", b:3, t:"Rake/Rip empowered by Tiger's Fury now show 'empowered' icons." },
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
        { a:"Nature's Splendor", d:"nerf", k:"removed" },
        { a:"Mastery: Harmony", m:"healing bonus", r:15, d:"buff", k:"tune", b:3 },
        { a:"Venomous Abyss 2-Set", m:"Genesis HoT bonus", o:25, n:15, u:"%", d:"nerf", k:"tune", b:3, t:"Tier set tuning." },
        { a:"Venomous Abyss 4-Set", d:"neutral", k:"rework", b:3, t:"Redesigned: Nature's Swiftness, Tranquility and Ironbark now have a 100% chance to grant Genesis; +4s duration." }
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
        { a:"Boundless Moonlight (Elune's Chosen)", m:"Lunar Beam Leech", o:10, n:12, u:"%", d:"buff", k:"tune" },
        { a:"Wild Guardian (updated)", d:"neutral", k:"rework", b:2, t:"Week 2: base proc chance 10%, spirit Rage generation 8, bonus Rage moved to rank 3; rank 3 now grants a guaranteed spirit and boosts Thrash/Mangle while a spirit is active." }
      ]}
    ]
  },
  {
    name: "Evoker", color: "#33937F",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Panacea", m:"healing", r:25, d:"buff", k:"tune", b:2 },
        { a:"Wingleader (Scalecommander)", d:"nerf", k:"rework", b:3, t:"Redesigned: Mass Disintegrate/Eruption now reduces Deep Breath/Breath of Eons CD by 0.5s/1s per target struck. A large net nerf to the old per-Bombardment CDR." },
        { a:"Command Squadron (Scalecommander)", m:"Pyre damage", r:40, d:"buff", k:"tune", b:3, t:"Compensation for the Wingleader nerf." },
        { a:"Maneuverability (Scalecommander)", m:"damage over time", r:40, d:"buff", k:"tune", b:3 }
      ]},
      { name: "Augmentation", role: "DPS (ranged support)", changes: [
        { a:"Duplicate - Upheaval", d:"buff", k:"qol", t:"Duplicate Upheavals no longer knock enemies into the air (dungeon QoL)." },
        { a:"Living Flame", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Verdant Embrace", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Emerald Blossom", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Double-time (Chronowarden)", d:"neutral", k:"rework", t:"Ebon Might crit stat bonus now lasts 15s." },
        { a:"Defy Fate", m:"healing", r:25, d:"buff", k:"tune", b:2 },
        { a:"Molten Blood", m:"healing", r:25, d:"buff", k:"tune", b:2 },
        { a:"Double-time (Chronowarden)", d:"buff", k:"rework", b:3, t:"Re-applying while active now extends Double-time instead of overwriting it." }
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
        { a:"Temporal Barrier", m:"absorption", r:30, d:"buff", k:"tune" },
        { a:"Inner Flame", m:"periodic healing bonus", o:60, n:50, u:"%", d:"nerf", k:"tune", b:3, t:"Dream Breath had become too dominant after the build-1 HoT buff." },
        { a:"Spiritual Clarity", m:"Dream Breath cooldown reduction", o:10, n:6, u:"s", d:"nerf", k:"tune", b:3 },
        { a:"Expanded Lungs (Flameshaper)", m:"Dream Breath healing bonus", o:30, n:20, u:"%", d:"nerf", k:"tune", b:3 },
        { a:"Conduit of Flame (Flameshaper)", m:"crit chance bonus", o:15, n:10, u:"%", d:"nerf", k:"tune", b:3, t:"Does not affect Devastation." },
        { a:"Fulminous Roar (Flameshaper)", m:"Fire/Dream Breath tick-rate bonus", o:20, n:15, u:"%", d:"nerf", k:"tune", b:3, t:"Does not affect Devastation." },
        { a:"Consume Flame (Flameshaper)", m:"heal % of amount consumed", o:200, n:300, u:"%", d:"buff", k:"tune", b:3, t:"Also: Fluttering Seedlings can now trigger it; Emerald Blossom/Seedlings prefer injured allies with Dream Breath." }
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
        { a:"Wild Instincts", d:"nerf", k:"removed" },
        { a:"Auto Shot", m:"damage", r:20, d:"buff", k:"tune", b:3 },
        { a:"Cobra Shot", m:"damage", r:30, d:"buff", k:"tune", b:3, t:"Base spell up, talent modifiers down (below)." },
        { a:"Serpentine Strikes", m:"Cobra Shot crit damage bonus", o:50, n:20, u:"%", d:"nerf", k:"tune", b:3 },
        { a:"Cobra Senses", m:"Cobra Shot damage bonus", o:35, n:10, u:"%", d:"nerf", k:"tune", b:3 },
        { a:"Barbed Shot", m:"damage", r:-12, d:"nerf", k:"tune", b:3, t:"Partial pull-back of the build-1 +25%." },
        { a:"Venomous Abyss 4-Set", m:"Cobra Shot single-target bonus per stack", o:30, n:15, u:"%", d:"nerf", k:"tune", b:3, t:"Tier set tuning." },
        { a:"Hogstrider (Pack Leader)", m:"next Cobra Shot damage bonus", o:200, n:100, u:"%", d:"nerf", k:"tune", b:3 },
        { a:"Hoof and Blade (Pack Leader)", m:"Hogstrider bonus damage", o:50, n:25, u:"%", d:"nerf", k:"tune", b:3 }
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
        { a:"Headshot", d:"neutral", k:"removed" },
        { a:"Auto Shot", m:"damage", r:20, d:"buff", k:"tune", b:3, t:"Week 3: catch-up buffs after MM's damage lagged on the PTR." },
        { a:"Rapid Fire", m:"damage", r:20, d:"buff", k:"tune", b:3, t:"Stacks on the build-1 +20%." },
        { a:"Steady Shot", m:"damage", r:50, d:"buff", k:"tune", b:3 },
        { a:"Volley", m:"damage", r:20, d:"buff", k:"tune", b:3 },
        { a:"Arcane Shot", m:"damage", r:15, d:"buff", k:"tune", b:3 },
        { a:"Multi-Shot", m:"damage", r:80, d:"buff", k:"tune", b:3 },
        { a:"Kill Shot", m:"damage", r:25, d:"buff", k:"tune", b:3 },
        { a:"Black Arrow (Dark Ranger)", m:"damage", r:25, d:"buff", k:"tune", b:3, t:"Partial reversal of the build-1 -40% direct damage." }
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
        { a:"Fired Up (R3)", d:"nerf", k:"tune", t:"Chance during Combustion slightly reduced." },
        { a:"All ability damage", m:"damage", r:12, d:"buff", k:"tune", b:3 },
        { a:"Pyroclasm", m:"duration", o:15, n:20, u:"s", d:"buff", k:"tune", b:3 }
      ]},
      { name: "Frost", role: "DPS (ranged)", changes: [
        { a:"Glacial Bulwark", d:"nerf", k:"tune", t:"No longer grants an extra Ice Barrier charge (defensive)." },
        { a:"All damage", m:"damage", r:4, d:"buff", k:"tune" },
        { a:"Hand of Frost (R2)", m:"spell damage (R1/R2)", o:1, n:0.5, u:"%", d:"nerf", k:"tune", t:"Per rank 1%->0.5% and 2%->1%; trims Hero-talent burst." },
        { a:"Venomous Abyss 4-Set", d:"neutral", k:"rework", b:3, t:"Now generates 5 Icicles over 1s instead of instant Glacial Spike!; proc rate doubled (RPPM 1.00->2.00); Shatter bonus 15%->10%." }
      ]}
    ]
  },
  {
    name: "Monk", color: "#00FF98",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Chi Transfer", m:"Touch of Death self-heal % of damage", o:50, n:60, d:"buff", k:"tune" },
        { a:"Vigorous Expulsion", m:"Expel Harm healing bonus", o:5, n:6, u:"%", d:"buff", k:"tune" },
        { a:"Silent Sanctuary", m:"healing", r:25, d:"buff", k:"tune", b:2 }
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
        { a:"Jadefire Teachings", m:"Ancient Teaching transfer", o:270, n:320, u:"%", d:"buff", k:"tune" },
        { a:"Spinning Crane Kick", m:"damage", r:10, d:"buff", k:"tune", b:3, t:"Partial reversal of the build-1 -15%. Also fixed Temple Training wrongly applying to Mistweaver." }
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
        { a:"Temple Training (Conduit of the Celestials)", m:"Fists of Fury & SCK damage", o:10, n:30, u:"%", d:"buff", k:"tune" },
        { a:"Expel Harm", m:"healing", r:25, d:"buff", k:"tune", b:2 },
        { a:"Combat Wisdom", m:"Stamina", r:5, d:"buff", k:"tune", b:3, t:"Week 3 defensive buffs (WW was 'still weak defensively')." },
        { a:"Calming Presence", m:"damage taken reduction", o:6, n:10, u:"%", d:"buff", k:"tune", b:3 }
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
        { a:"Rite of Adjuration (Lightsmith)", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Divine Guidance (Lightsmith)", d:"neutral", k:"rework", b:3, t:"Now: each Holy Power ability makes your next Consecration deal immediate Holy damage split across enemies, healing up to 3 allies for a share." }
      ]},
      { name: "Holy", role: "Healer", note:"First changes of the PTR for Holy, in Week 3: broad talent-diversity and throughput buffs.", changes: [
        { a:"All healing", m:"healing", r:8, d:"buff", k:"tune", b:3 },
        { a:"Word of Glory", m:"healing", r:5, d:"buff", k:"tune", b:3 },
        { a:"Eternal Flame", m:"healing", r:5, d:"buff", k:"tune", b:3 },
        { a:"Holy Shock", m:"healing", r:10, d:"buff", k:"tune", b:3 },
        { a:"Ringing of the Heavens", m:"Divine Toll effectiveness", o:100, n:200, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Truth Prevails", m:"healing", r:30, d:"buff", k:"tune", b:3 },
        { a:"Saved by the Light", m:"absorb", r:50, d:"buff", k:"tune", b:3 },
        { a:"Tirion's Devotion", m:"Lay on Hands cooldown reduction", o:30, n:40, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Awakening", m:"activation chance", o:10, n:15, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Glistening Radiance", m:"absorb % of max HP (per stack/cap)", o:1, n:2, u:"%", d:"buff", k:"tune", b:3, t:"Cap 5%->6%." },
        { a:"Overflowing Light", m:"Holy Shock healing transferred", o:30, n:50, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Call of the Righteous", m:"Avenging Wrath duration cut", o:4, n:3, u:"s", d:"buff", k:"tune", b:3, t:"Also Avenging Crusader 2.5s->2s per point (smaller downside)." },
        { a:"Venomous Abyss 2-Set", m:"Infusion of Light effectiveness bonus", o:75, n:100, u:"%", d:"buff", k:"tune", b:3, t:"Tier set tuning." }
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
        { a:"Sanctified Wrath", d:"neutral", k:"removed" },
        { a:"Cooldown Manager tracking", d:"neutral", k:"qol", b:2, t:"Hammer of Light, Divine Resonance, Sacrosanct Crusade, Bulwark of Order, Blessed Word, Empyreal Ward, Strength in Adversity and Seal of Reprisal are now trackable." },
        { a:"Guardian of Ancient Kings", m:"initial cooldown", d:"nerf", k:"tune", b:3, t:"Initial cooldown increased to 8 seconds." },
        { a:"Blessed Word", d:"buff", k:"tune", b:3, t:"Overhealing effect now works on any target; also fixed it applying untalented." },
        { a:"Valiant Crusade", d:"buff", k:"tune", b:3, t:"No longer cancels on death." },
        { a:"Talent positions", d:"neutral", k:"qol", b:3, t:"Many Protection talent locations adjusted; Improved Ardent Defender now shows a debuff after fatal damage is absorbed." }
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
        { a:"Hammer of Light (Templar)", m:"Holy Power cost", o:5, n:3, d:"buff", k:"tune", t:"Cheaper." },
        { a:"Radiance of the Concentrated Flame (4-set)", d:"neutral", k:"rework", b:2, t:"Tier set: consuming Divine Purpose with Divine Storm now empowers your next 2 Templar's Verdicts with Divine Arbiter (was free Templar's Verdict casts)." },
        { a:"All damage", m:"damage", r:-6, d:"nerf", k:"tune", b:3, t:"Week 3: pull-back from Heroic raid test data." },
        { a:"Venomous Abyss 4-Set", d:"neutral", k:"rework", b:3, t:"Iterated again: Divine Purpose now grants Divine Arbiter empowering other Holy Power spenders; can't re-occur while active. Divine Arbiter damage +35%." }
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
        { a:"Void Infusion (Voidweaver)", m:"Atonement healing from Void Blast/Penance", o:50, n:75, u:"%", d:"buff", k:"tune" },
        { a:"Void Shield", m:"absorption", r:-30, d:"nerf", k:"tune", b:3, t:"Week 3: reducing the overbearing focus on triggering Void Shield." },
        { a:"Ultimate Penitence", m:"damage & healing", r:30, d:"buff", k:"tune", b:3 },
        { a:"Greater Smite", m:"duration", o:2, n:4, u:"s", d:"buff", k:"tune", b:3 },
        { a:"All healing and absorption", m:"healing", r:10, d:"buff", k:"tune", b:3 },
        { a:"Atonement", m:"heal % of damage done", o:30, n:32, d:"buff", k:"tune", b:3 }
      ]},
      { name: "Holy", role: "Healer", changes: [
        { a:"Resonant Energy (Archon)", d:"buff", k:"rework", t:"Halo now +2% healing for 10s, stacking 4x." },
        { a:"Divine Hymn", d:"buff", k:"rework", t:"Now also grants Guardian Spirit while channeled." },
        { a:"All healing", m:"healing", r:10, d:"buff", k:"tune", b:3 },
        { a:"Benediction", m:"mana cost", r:-30, d:"buff", k:"tune", b:3, t:"Cheaper." },
        { a:"Apotheosis", m:"Holy Word mana cost reduction", o:50, n:70, u:"%", d:"buff", k:"tune", b:3 }
      ]},
      { name: "Shadow", role: "DPS (ranged)", note:"Voidform/Void Volley rework plus a new AoE source (Shadeburst). Leans neutral-to-up for AoE.", changes: [
        { a:"Shadeburst (new)", d:"buff", k:"new", t:"Shadowy Apparitions explode for 8yd AoE, reduced beyond 5 targets." },
        { a:"Improved Voidform", d:"buff", k:"rework", t:"Voidform +5% spell damage and +2 Void Volley uses." },
        { a:"Ancient Madness", d:"neutral", k:"rework", t:"SW:Madness +2% Haste & +1.5s Voidform, stacking 5x." },
        { a:"Voidform", d:"neutral", k:"rework", t:"Now grants 3 uses of Void Volley instead of Void Volley having a CD." },
        { a:"Power Word: Shield", m:"absorb", r:25, d:"buff", k:"tune" },
        { a:"Focused Outburst (Archon)", m:"Void Volley damage", r:15, d:"buff", k:"rework" },
        { a:"Phantom Menace", d:"neutral", k:"removed" },
        { a:"All ability damage", m:"damage", r:8, d:"buff", k:"tune", b:3 }
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
        { a:"Ancient Arts", d:"buff", k:"rework", t:"Now considers total Secret Technique damage for shadow clone." },
        { a:"All ability damage", m:"damage", r:-8, d:"nerf", k:"tune", b:3, t:"PvE only; from Heroic raid test data." }
      ]}
    ]
  },
  {
    name: "Shaman", color: "#0070DD",
    specs: [
      { name: "Class-wide", role: "All", changes: [
        { a:"Reactive Warding", m:"healing", r:25, d:"buff", k:"tune", b:2 }
      ]},
      { name: "Farseer (hero)", role: "Shared", changes: [
        { a:"Chain Lightning", m:"max targets", o:3, n:5, d:"buff", k:"tune" },
        { a:"Lava Burst", d:"buff", k:"tune", t:"Now also gains damage equal to your crit chance." }
      ]},
      { name: "Elemental", role: "DPS (ranged)", note:"Hardest cooldown squish in the patch: Ascendance burst slashed, baseline (and AoE) damage raised a lot.", changes: [
        { a:"Power of the Maelstrom", d:"neutral", k:"rework", t:"Now: LB/CL 15% chance to make next Lava Burst +20%, stacking 2x." },
        { a:"Stormkeeper", d:"neutral", k:"rework", b:2, t:"Corrected in Week 2: last week's 'redesigned' note was a mistake. The only change from 12.0.7 is that Stormkeeper no longer makes Lightning Bolt generate an extra Elemental Overload." },
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
      { name: "Enhancement", role: "DPS (melee)", note:"Build 1 only had healing buffs; Week 2 added a real retune - steady melee/spell damage up, Doom Winds and Tempest/Totemic burst trimmed.", changes: [
        { a:"Healing Surge", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Earth Shield", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Healing Stream Totem", m:"healing", r:25, d:"buff", k:"tune" },
        { a:"Lightning Bolt", m:"damage", r:20, d:"buff", k:"tune", b:2 },
        { a:"Chain Lightning", m:"damage", r:20, d:"buff", k:"tune", b:2 },
        { a:"Lava Lash", m:"damage", r:15, d:"buff", k:"tune", b:2 },
        { a:"Stormstrike", m:"damage", r:15, d:"buff", k:"tune", b:2 },
        { a:"Melee damage", m:"damage", r:15, d:"buff", k:"tune", b:2 },
        { a:"Doom Winds", m:"Windfury Weapon activation chance bonus", o:100, n:50, u:"%", d:"nerf", k:"tune", b:2 },
        { a:"Tempest (Stormbringer)", m:"main-target damage", r:-10, d:"nerf", k:"tune", b:2 },
        { a:"Tempest (Stormbringer)", m:"secondary-target damage", r:-30, d:"nerf", k:"tune", b:2 },
        { a:"Surging Totem Tremor (Totemic)", m:"damage", r:-15, d:"nerf", k:"tune", b:2 },
        { a:"Surging Totem Surging Bolt (Totemic)", m:"damage", r:-10, d:"nerf", k:"tune", b:2 },
        { a:"Venomous Abyss 4-Set (Short Circuit)", d:"neutral", k:"qol", b:3, t:"Fixed the aura not being consumed and Crash Lightning (Unleashed) single-targeting; multi-stack bonus now averaged." }
      ]},
      { name: "Restoration", role: "Healer", changes: [
        { a:"Healing Rain", d:"neutral", k:"qol", t:"Now 12s CD / 18s duration; recasting despawns the old one." },
        { a:"Acid Rain", m:"damage", r:50, d:"buff", k:"tune", b:3, t:"But now ticks every 2s (was 1s) - roughly net-neutral throughput, bigger ticks." },
        { a:"Healing Rain / Acid Rain fixes", d:"buff", k:"qol", b:3, t:"Fixed missing immediate healing on cast and missing partial tick on natural expiry." }
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
        { a:"Mark of Peroth'arn (Hellcaller) - Blackened Soul", m:"critical strike damage", o:200, n:225, u:"%", d:"buff", k:"tune" },
        { a:"Drain Life", m:"health drained", r:25, d:"buff", k:"tune", b:2 },
        { a:"Zevrim's Resilience", m:"healing", r:25, d:"buff", k:"tune", b:2 }
      ]},
      { name: "Affliction", role: "DPS (ranged)", note:"First Affliction-specific change of the PTR, in Week 3 (tier set tuning).", changes: [
        { a:"Venomous Abyss 2-Set", m:"Seed of Corruption UA effectiveness", o:50, n:20, u:"%", d:"nerf", k:"tune", b:3, t:"So Seed doesn't become the universal Soul Shard spender." }
      ]},
      { name: "Destruction", role: "DPS (ranged)", changes: [
        { a:"Conflagration of Chaos", d:"buff", k:"rework", t:"Conflagrate & Shadowburn now always crit and scale damage with crit chance." },
        { a:"Embers of Nihilam (R1)", d:"neutral", k:"qol", t:"Tooltip now shows the Echo of Sargeras proc chance." },
        { a:"All damage", m:"damage", r:10, d:"buff", k:"tune", b:3 }
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
        { a:"Demolish (Colossus)", m:"cooldown", o:45, n:30, u:"s", d:"buff", k:"tune", t:"More frequent (Dominance no longer reduces it)." },
        { a:"Ignore Pain", m:"absorb", r:25, d:"buff", k:"tune", b:2 },
        { a:"Melee auto-attack", m:"damage", r:100, d:"buff", k:"tune", b:3, t:"Week 3: Arms trailing in single-target, especially Slayer." },
        { a:"Venomous Abyss 2-Set", d:"buff", k:"tune", b:3, t:"Now buffs Mortal Strike AND Execute damage by 10% (was Mortal Strike only)." },
        { a:"No Stranger to Pain (Colossus)", m:"Ignore Pain damage prevented", o:20, n:30, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Dominance of the Colossus (Colossus)", m:"Demolish enemy-damage reduction", o:10, n:20, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Slayer's Dominance (Slayer)", m:"Slayer's strike trigger chance", o:15, n:25, u:"%", d:"buff", k:"tune", b:3 }
      ]},
      { name: "Fury", role: "DPS (melee)", note:"Whirlwind made useful in single target; mostly reworks/QoL.", changes: [
        { a:"Whirlwind", d:"buff", k:"rework", t:"Now generates 3 Rage innately." },
        { a:"Carving Blades (new)", m:"Whirlwind single-target damage", r:50, d:"buff", k:"new" },
        { a:"Rampaging Ruin", d:"neutral", k:"rework", t:"Rampage's final strike now slams for 8yd AoE while Improved Whirlwind is active." },
        { a:"Hack and Slash", d:"neutral", k:"rework", t:"Rampage now 75% chance to refund Raging Blow and +20% next Raging Blow." },
        { a:"Thunder Blast (Mountain Thane)", m:"damage", r:40, d:"buff", k:"tune" },
        { a:"Crashing Thunder (Mountain Thane)", m:"Thunder Clap damage bonus", o:30, n:10, u:"%", d:"nerf", k:"tune", t:"Power moved into Thunder Blast." },
        { a:"Bloodbath", m:"initial damage", r:-12, d:"nerf", k:"tune", b:3, t:"Stated net-neutral: power moved into the bleed." },
        { a:"Bloodbath", m:"bleed damage", r:300, d:"buff", k:"tune", b:3 }
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
        { a:"Crashing Thunder (Mountain Thane)", m:"Thunder Clap damage bonus", o:30, n:10, u:"%", d:"nerf", k:"tune" },
        { a:"Venomous Abyss 4-Set", m:"Bloody Rebuke bleed damage", r:100, d:"buff", k:"tune", b:3, t:"Tier set tuning." },
        { a:"Unyielding", m:"Defensive Stance damage reduction bonus", o:4, n:6, u:"%", d:"buff", k:"tune", b:3 },
        { a:"No Stranger to Pain (Colossus)", m:"Ignore Pain damage prevented", o:20, n:30, u:"%", d:"buff", k:"tune", b:3 },
        { a:"Practiced Strikes (Colossus)", m:"extra Rage from Shield Slam", o:3, n:4, d:"buff", k:"tune", b:3 },
        { a:"Dominance of the Colossus (Colossus)", m:"Demolish enemy-damage reduction", o:10, n:20, u:"%", d:"buff", k:"tune", b:3 }
      ]}
    ]
  }
];
