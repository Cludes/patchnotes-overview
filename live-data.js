/*
 * LIVE weekly-reset class tuning - SEPARATE from the 12.1 "Curse of Ula'tek" PTR.
 * This is hotfix tuning applied to the CURRENT live patch (Midnight Season 1) at
 * weekly maintenance. It is NOT part of the 12.1 PTR notes and deliberately kept
 * on its own page so the two patches are never conflated.
 *
 * Source: Blizzard "Upcoming Class Tuning with the Weekly Reset" via Wowhead.
 * Verbatim copy in SOURCE-live-weekly-tuning.txt. Same math convention as the
 * main dataset: percentages computed from stated old/new, never hand-typed.
 */
window.LIVE = {
  name: "Live weekly-reset tuning",
  patch: "Current live patch (Midnight Season 1)",
  source: "https://www.wowhead.com/news/upcoming-class-tuning-with-the-weekly-reset-balance-druid-arcane-mage-and-holy-priest-382023",
  captured: "2026-06-26",
  intro: [
    "Applied at weekly maintenance to the LIVE game, primarily targeting specs underperforming in group content. This is a different patch from the 12.1 PTR - some lines even tune abilities (e.g. Double Tap) that 12.1 removes.",
    "Split into PvE adjustments and a separate PvP-only block."
  ],
  pve: [
    { cls:"Druid", color:"#FF7C0A", spec:"Balance", changes:[
      { a:"All damage", m:"damage", r:4, d:"buff", k:"tune" }
    ]},
    { cls:"Druid", color:"#FF7C0A", spec:"Feral", note:"Strong in M+, low in raid; shoring up single-target and total raid damage.", changes:[
      { a:"All damage", m:"damage", r:3, d:"buff", k:"tune", t:"Does not apply to PvP." },
      { a:"Melee auto-attack", m:"damage", r:15, d:"buff", k:"tune" },
      { a:"Rip", m:"damage", r:5, d:"buff", k:"tune", t:"Does not apply to PvP." },
      { a:"Rampant Ferocity", m:"damage", r:-15, d:"nerf", k:"tune", t:"Does not apply to PvP." }
    ]},
    { cls:"Druid", color:"#FF7C0A", spec:"Restoration", note:"Healer damage was low; rebalancing out of Thrash into the rest of the kit.", changes:[
      { a:"All damage", m:"damage", r:15, d:"buff", k:"tune" },
      { a:"Bear Form Thrash", m:"damage", r:-25, d:"nerf", k:"tune" }
    ]},
    { cls:"Evoker", color:"#33937F", spec:"Devastation", changes:[
      { a:"All ability damage", m:"damage", r:3, d:"buff", k:"tune" }
    ]},
    { cls:"Mage", color:"#3FC7EB", spec:"Arcane", changes:[
      { a:"All ability damage", m:"damage", r:3, d:"buff", k:"tune" }
    ]},
    { cls:"Priest", color:"#FFFFFF", spec:"Holy", changes:[
      { a:"Holy Word: Serenity", m:"healing", r:20, d:"buff", k:"tune" },
      { a:"Holy Word: Sanctify", m:"healing", r:20, d:"buff", k:"tune" }
    ]},
    { cls:"Shaman", color:"#0070DD", spec:"Restoration", changes:[
      { a:"All healing", m:"healing", r:4, d:"buff", k:"tune", t:"Does not apply to PvP." }
    ]}
  ],
  pvp: [
    { cls:"Demon Hunter", color:"#A330C9", spec:"Devourer", note:"Over-performing defensively; self-healing reduced.", changes:[
      { a:"Shattered Souls", m:"self-heal % max HP per fragment", o:1, n:0.5, u:"%", d:"nerf", k:"tune" }
    ]},
    { cls:"Demon Hunter", color:"#A330C9", spec:"Havoc", note:"Hard to kill but underperforming overall; damage up, sustain down.", changes:[
      { a:"All ability damage", m:"damage", r:4, d:"buff", k:"tune" },
      { a:"Soul Rending", m:"Leech (and bonus in Meta)", o:5, n:3, u:"%", d:"nerf", k:"tune" },
      { a:"Desperate Instincts", m:"Blur extra damage reduction", o:10, n:5, u:"%", d:"nerf", k:"tune" }
    ]},
    { cls:"Death Knight", color:"#C41E3A", spec:"Unholy", note:"Burst too frequent; shifting damage from burst into Dread Plague.", changes:[
      { a:"Putrify", m:"damage", r:-15, d:"nerf", k:"tune" },
      { a:"Soul Reaper", m:"damage", r:-15, d:"nerf", k:"tune" },
      { a:"Dread Plague", m:"damage", r:15, d:"buff", k:"tune" }
    ]},
    { cls:"Druid", color:"#FF7C0A", spec:"Guardian", note:"Apex burst too high for a tank in PvP.", changes:[
      { a:"Wild Guardian", m:"echo effectiveness", o:200, n:50, u:"%", d:"nerf", k:"tune" }
    ]},
    { cls:"Evoker", color:"#33937F", spec:"Augmentation", changes:[
      { a:"All damage", m:"damage", r:8, d:"buff", k:"tune" }
    ]},
    { cls:"Evoker", color:"#33937F", spec:"Preservation", note:"Slightly overperforming; Temporal Burst made casts hard to react to.", changes:[
      { a:"Temporal Burst", m:"haste / speed / CDR bonus", o:30, n:15, u:"%", d:"nerf", k:"tune" }
    ]},
    { cls:"Hunter", color:"#AAD372", spec:"Marksmanship", note:"Reducing burst so enemies have more time to react.", changes:[
      { a:"Double Tap", m:"effectiveness", o:40, n:16, u:"%", d:"nerf", k:"tune", t:"Aimed Shot fires at this effectiveness / Rapid Fire extra shots." }
    ]},
    { cls:"Hunter", color:"#AAD372", spec:"Survival", changes:[
      { a:"All damage", m:"damage", r:3, d:"buff", k:"tune" }
    ]},
    { cls:"Mage", color:"#3FC7EB", spec:"Frost", note:"Redistributing out of Ray of Frost into the rest of the kit.", changes:[
      { a:"Ray of Frost", m:"damage", r:-20, d:"nerf", k:"tune" },
      { a:"All damage", m:"damage", r:3, d:"buff", k:"tune" }
    ]},
    { cls:"Paladin", color:"#F48CBA", spec:"Protection", note:"Templar burst made Prot too offensive in PvP.", changes:[
      { a:"Divine Exaction", m:"Divine Toll effectiveness", o:75, n:25, u:"%", d:"nerf", k:"tune" },
      { a:"Hammer of Light", m:"damage", r:-30, d:"nerf", k:"tune" }
    ]},
    { cls:"Paladin", color:"#F48CBA", spec:"Retribution", note:"Performing better than expected; small reduction.", changes:[
      { a:"All ability damage", m:"damage", r:-3, d:"nerf", k:"tune" }
    ]},
    { cls:"Priest", color:"#FFFFFF", spec:"Discipline", note:"Voidweaver dealing too much; damage down, healing up.", changes:[
      { a:"Expiation", m:"damage % of consumed SW:Pain", o:300, n:200, u:"%", d:"nerf", k:"tune" },
      { a:"Inescapable Torment", m:"damage", r:-25, d:"nerf", k:"tune" },
      { a:"Shadow Word: Pain", m:"damage", r:-10, d:"nerf", k:"tune" },
      { a:"Voidweaver: Atonement", m:"healing", r:15, d:"buff", k:"tune" },
      { a:"Oracle: Preventive Measures", m:"Penance/Smite/Holy Nova damage bonus", o:15, n:20, u:"%", d:"buff", k:"tune" },
      { a:"Ultimate Penitence", m:"healing", r:25, d:"buff", k:"tune" }
    ]},
    { cls:"Priest", color:"#FFFFFF", spec:"Shadow", note:"Overall damage boost; SW:Death made worthwhile in execute.", changes:[
      { a:"All ability damage", m:"damage", r:4, d:"buff", k:"tune" },
      { a:"Shadow Word: Death", m:"damage", r:45, d:"buff", k:"tune" }
    ]},
    { cls:"Shaman", color:"#0070DD", spec:"Restoration", note:"Farseer behind Totemic in PvP; boosting Farseer throughput.", changes:[
      { a:"Farseer: Maelstrom Supremacy", m:"healing bonus of affected spells", o:15, n:20, u:"%", d:"buff", k:"tune" },
      { a:"Farseer: Hydrobubble", d:"buff", k:"rework", t:"Effectiveness no longer reduced in PvP (was a 20% reduction)." },
      { a:"Farseer: Call of the Ancestors", m:"heal bonus", o:20, n:30, u:"%", d:"buff", k:"tune" }
    ]},
    { cls:"Warrior", color:"#C69B6D", spec:"Arms / Protection", note:"Reducing Colossus tankiness to make them a more viable kill target.", changes:[
      { a:"Mountain of Muscle and Scars", m:"damage reduction", o:5, n:3, u:"%", d:"nerf", k:"tune" }
    ]},
    { cls:"Warlock", color:"#8788EE", spec:"Affliction", changes:[
      { a:"All damage", m:"damage", r:3, d:"buff", k:"tune" }
    ]},
    { cls:"Warlock", color:"#8788EE", spec:"Demonology", note:"Freecasting underperforming; punishing chain-casts.", changes:[
      { a:"Shadow Bolt", m:"damage", r:200, d:"buff", k:"tune" },
      { a:"Demonbolt", m:"damage", r:30, d:"buff", k:"tune" }
    ]},
    { cls:"Warlock", color:"#8788EE", spec:"Destruction", changes:[
      { a:"Incinerate", m:"damage", r:50, d:"buff", k:"tune" }
    ]}
  ]
};
