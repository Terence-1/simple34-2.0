module.exports = {
  params: {
    designator: 'BAT',
    side: 'F',
    reversible: false,
    spacing: 14,
    pad_size: 1.4,
    drill: 0.8,
    include_silkscreen: true,
    BAT_P: { type: 'net', value: 'BAT_P' },
    BAT_N: { type: 'net', value: 'GND' },
  },
  body: p => {
    const x = p.spacing / 2;
    const layer = p.reversible ? 'F' : p.side;
    const box = 2.1;
    const label_offset = 2.5;

    const opening = `
    (footprint "terence:battery_socket_tht"
      (layer "${layer}.Cu")
      ${p.at}
      (property "Reference" "${p.ref}"
        (at 0 -2.4 ${p.r})
        (layer "${layer}.SilkS")
        ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
    `;

    const front_silkscreen = `
      (fp_text user "B-" (at ${-x + label_offset} 0 ${p.r}) (layer "F.SilkS")
        (effects (font (size 0.6 0.6) (thickness 0.1)))
      )
      (fp_text user "B+" (at ${x - label_offset} 0 ${p.r}) (layer "F.SilkS")
        (effects (font (size 0.6 0.6) (thickness 0.1)))
      )
      (fp_rect (start ${-x - box / 2} ${-box / 2}) (end ${-x + box / 2} ${box / 2}) (layer "F.SilkS") (stroke (width 0.12) (type solid)) (fill none))
      (fp_rect (start ${x - box / 2} ${-box / 2}) (end ${x + box / 2} ${box / 2}) (layer "F.SilkS") (stroke (width 0.12) (type solid)) (fill none))
    `;

    const back_silkscreen = `
      (fp_text user "B-" (at ${-x + label_offset} 0 ${180 + p.r}) (layer "B.SilkS")
        (effects (font (size 0.6 0.6) (thickness 0.1)) (justify mirror))
      )
      (fp_text user "B+" (at ${x - label_offset} 0 ${180 + p.r}) (layer "B.SilkS")
        (effects (font (size 0.6 0.6) (thickness 0.1)) (justify mirror))
      )
      (fp_rect (start ${-x - box / 2} ${-box / 2}) (end ${-x + box / 2} ${box / 2}) (layer "B.SilkS") (stroke (width 0.12) (type solid)) (fill none))
      (fp_rect (start ${x - box / 2} ${-box / 2}) (end ${x + box / 2} ${box / 2}) (layer "B.SilkS") (stroke (width 0.12) (type solid)) (fill none))
    `;

    const pads = `
      (pad "1" thru_hole circle (at ${-x} 0 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.BAT_N.str})
      (pad "2" thru_hole circle (at ${x} 0 ${p.r}) (size ${p.pad_size} ${p.pad_size}) (drill ${p.drill}) (layers "*.Cu" "*.Mask") ${p.BAT_P.str})
    `;

    const closing = `
    )
    `;

    let final = opening;

    if (p.include_silkscreen) {
      if (p.reversible || p.side == 'F') {
        final += front_silkscreen;
      }
      if (p.reversible || p.side == 'B') {
        final += back_silkscreen;
      }
    }

    final += pads;
    final += closing;

    return final;
  }
}
