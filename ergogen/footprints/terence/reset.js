module.exports = {
  params: {
    designator: 'SW',
    side: 'F',
    reversible: false,
    from: { type: 'net', value: 'GND' },
    to: { type: 'net', value: 'RST' },
  },
  body: p => {
    const standard_opening = `
    (footprint "local:reset_smd"
        (layer "${p.reversible ? 'F' : p.side}.Cu")
        ${p.at}
        (property "Reference" "${p.ref}"
            (at 0 0 ${p.r})
            (layer "${p.reversible ? 'F' : p.side}.SilkS")
            ${p.ref_hide}
            (effects (font (size 1 1) (thickness 0.15)))
        )
    `

    const via_in_pad_description = `
      (property "Description" "Thru-hole SMD pads, *NOT* via-in-pad (do not plug or tent)."
        (at 0 0 0)
        (unlocked yes)
        (layer "F.Fab")
        (hide yes)
        (effects (font (size 1.27 1.27)))
      )
    `

    const front_silk = `
      (fp_line (start -1.5 -1.2) (end 1.5 -1.2) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.5  1.2) (end 1.5  1.2) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.5 -1.2) (end -1.5 1.2) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start  1.5 -1.2) (end  1.5 1.2) (layer "F.SilkS") (stroke (width 0.1) (type solid)))
    `

    const front_smd_pads = `
      (pad "1" smd rect (at -2.225 0 ${p.r}) (size 1.05 2) (layers "F.Cu" "F.Paste" "F.Mask") (clearance 0.1905) ${p.from.str})
      (pad "2" smd rect (at  2.225 0 ${p.r}) (size 1.05 2) (layers "F.Cu" "F.Paste" "F.Mask") (clearance 0.1905) ${p.to.str})
    `

    const back_silk = `
      (fp_line (start -1.5 -1.2) (end 1.5 -1.2) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.5  1.2) (end 1.5  1.2) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start -1.5 -1.2) (end -1.5 1.2) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
      (fp_line (start  1.5 -1.2) (end  1.5 1.2) (layer "B.SilkS") (stroke (width 0.1) (type solid)))
    `

    const back_smd_pads = `
      (pad "1" smd rect (at -2.225 0 ${p.r}) (size 1.05 2) (layers "B.Cu" "B.Paste" "B.Mask") (clearance 0.1905) ${p.from.str})
      (pad "2" smd rect (at  2.225 0 ${p.r}) (size 1.05 2) (layers "B.Cu" "B.Paste" "B.Mask") (clearance 0.1905) ${p.to.str})
    `

    const reversible_via_in_pads = `
      (pad "1" thru_hole rect (at -2.225 0 ${p.r}) (size 1.05 2) (drill 0.4) (layers "*.Cu" "*.Paste" "*.Mask") (clearance 0.1905) ${p.from.str})
      (pad "2" thru_hole rect (at  2.225 0 ${p.r}) (size 1.05 2) (drill 0.4) (layers "*.Cu" "*.Paste" "*.Mask") (clearance 0.1905) ${p.to.str})
    `

    const standard_closing = `
    )
    `

    let final = standard_opening;

    if (p.reversible) {
      final += via_in_pad_description;
      final += front_silk;
      final += back_silk;
      final += reversible_via_in_pads;
    } else {
      if (p.side == 'F') {
        final += front_silk;
        final += front_smd_pads;
      } else {
        final += back_silk;
        final += back_smd_pads;
      }
    }

    final += standard_closing;

    return final;
  }
}