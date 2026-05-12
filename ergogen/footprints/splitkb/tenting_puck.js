// Ergogen footprint: Tenting Puck (No Centre Hole)
// Converted from splitkb Aurora TentingPuck_NoHole KiCad footprint
//
// The puck is a ~41.1 mm diameter disc.
// Four M2.2 mounting holes sit at 90° intervals on a 19.05 mm radius.
//
// Params:
//   side: 'F' (front) or 'B' (back) — default 'B'

module.exports = {
  params: {
    designator: 'TP',
    side: 'B',
  },

  body: p => {
    const side = p.side === 'F' ? 'F' : 'B';
    const silk = `${side}.SilkS`;
    const fab  = `${side}.Fab`;

    // ── Mounting holes ────────────────────────────────────────────────────────
    // Four thru-hole pads, M2.2 drill, 4.4 mm pad, at ±19.05 on each axis.
    const holes = `
    (pad "" thru_hole circle (at 0 19.05)   (size 4.4 4.4) (drill 2.2) (layers *.Cu *.Mask))
    (pad "" thru_hole circle (at 0 -19.05)  (size 4.4 4.4) (drill 2.2) (layers *.Cu *.Mask))
    (pad "" thru_hole circle (at 19.05 0)   (size 4.4 4.4) (drill 2.2) (layers *.Cu *.Mask))
    (pad "" thru_hole circle (at -19.05 0)  (size 4.4 4.4) (drill 2.2) (layers *.Cu *.Mask))`;

    // ── Courtyard / reference outline ─────────────────────────────────────────
    // Circle on Dwgs.User, radius 20.55 mm
    const outline = `
    (fp_circle (center 0 0) (end 20.55 0) (layer "Dwgs.User") (width 0.55) (fill none))`;

    // ── Silkscreen arcs (12 arcs forming the octagonal ring) ──────────────────
    const arc_data = [
      [ 2.8575,    -20.32,      4.959786,  -19.91151,   7.008047,  -19.286134],
      [19.286135,   -7.008045,  19.91151,   -4.959785,  20.32,      -2.8575  ],
      [20.32,        2.8575,    19.91151,    4.959785,  19.286135,   7.008046 ],
      [-2.8575,     20.32,     -4.959785,   19.91151,  -7.008046,   19.286135],
      [ 1.128385,   10.735864,   0.564967,  10.780206,   0,         10.795   ],
      [ 0,          10.795,     -0.564967,  10.780206,  -1.128385,  10.735864],
      [ 0,         -10.795,      0.564967, -10.780206,   1.128385, -10.735864],
      [-1.128385,  -10.735864,  -0.564967, -10.780206,   0,        -10.795   ],
      [-19.286134,   7.008047,  -19.91151,   4.959786, -20.32,       2.8575  ],
      [ 7.008047,   19.286134,   4.959786,  19.91151,   2.8575,     20.32    ],
      [-7.008048,  -19.286134,  -4.959786, -19.91151,  -2.8575,    -20.32   ],
      [-20.32,      -2.8575,   -19.91151,  -4.959786, -19.286134,  -7.008048],
    ];

    const arcs = arc_data.map(([sx, sy, mx, my, ex, ey]) => `
    (fp_arc
      (start ${sx} ${sy})
      (mid   ${mx} ${my})
      (end   ${ex} ${ey})
      (layer "${silk}")
      (width 0.2)
    )`).join('');

    // ── Reference / value ─────────────────────────────────────────────────────
    const texts = `
    (fp_text reference "${p.ref}" (at 0 0) (layer "${fab}") hide
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text value "Tenting Puck, no hole" (at 0 1.5) (layer "${fab}") hide
      (effects (font (size 1 1) (thickness 0.15)))
    )`;

    // ── Assemble ──────────────────────────────────────────────────────────────
    return `
  (footprint "TentingPuck_NoHole"
    (layer "${side}.Cu")
    ${p.at}
    (attr exclude_from_pos_files exclude_from_bom)
    ${texts}
    ${outline}
    ${arcs}
    ${holes}
  )`;
  },
};