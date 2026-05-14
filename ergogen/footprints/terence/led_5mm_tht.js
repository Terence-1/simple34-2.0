module.exports = {
  params: {
    designator: 'LED',
    side: 'F',
    reversible: false,
    led_3dmodel_filename: '',
    led_3dmodel_xyz_offset: [0, 0, 0],
    led_3dmodel_xyz_rotation: [0, 0, 0],
    led_3dmodel_xyz_scale: [1, 1, 1],
    anode: { type: 'net', value: undefined },
    cathode: { type: 'net', value: undefined },
  },
  body: p => {
    const layer = p.reversible ? 'F' : p.side;

    const opening = `
    (footprint "terence:led_5mm_tht"
      (layer "${layer}.Cu")
      ${p.at}
      (property "Reference" "${p.ref}"
        (at 0 -3.6 ${p.r})
        (layer "${layer}.SilkS")
        ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
    `;

    const front_silkscreen = `
      (fp_circle (center 0 0) (end 2.5 0) (layer "F.SilkS") (stroke (width 0.12) (type solid)) (fill none))
      (fp_text user "-" (at -1.27 3.1 ${p.r}) (layer "F.SilkS")
        (effects (font (size 0.8 0.8) (thickness 0.12)))
      )
      (fp_text user "+" (at 1.27 3.1 ${p.r}) (layer "F.SilkS")
        (effects (font (size 0.8 0.8) (thickness 0.12)))
      )
    `;

    const back_silkscreen = `
      (fp_circle (center 0 0) (end 2.5 0) (layer "B.SilkS") (stroke (width 0.12) (type solid)) (fill none))
      (fp_text user "-" (at -1.27 3.1 ${180 + p.r}) (layer "B.SilkS")
        (effects (font (size 0.8 0.8) (thickness 0.12)) (justify mirror))
      )
      (fp_text user "+" (at 1.27 3.1 ${180 + p.r}) (layer "B.SilkS")
        (effects (font (size 0.8 0.8) (thickness 0.12)) (justify mirror))
      )
    `;

    const pads = `
      (pad "1" thru_hole rect (at -1.27 0 ${p.r}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.cathode.str})
      (pad "2" thru_hole circle (at 1.27 0 ${p.r}) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.anode.str})
    `;

    const closing = `
    )
    `;

    const led_3dmodel = `
      (model ${p.led_3dmodel_filename}
        (offset (xyz ${p.led_3dmodel_xyz_offset[0]} ${p.led_3dmodel_xyz_offset[1]} ${p.led_3dmodel_xyz_offset[2]}))
        (scale (xyz ${p.led_3dmodel_xyz_scale[0]} ${p.led_3dmodel_xyz_scale[1]} ${p.led_3dmodel_xyz_scale[2]}))
        (rotate (xyz ${p.led_3dmodel_xyz_rotation[0]} ${p.led_3dmodel_xyz_rotation[1]} ${p.led_3dmodel_xyz_rotation[2]}))
      )
    `;

    let final = opening;

    if (p.reversible || p.side == 'F') {
      final += front_silkscreen;
    }
    if (p.reversible || p.side == 'B') {
      final += back_silkscreen;
    }

    final += pads;
    if (p.led_3dmodel_filename) {
      final += led_3dmodel;
    }
    final += closing;

    return final;
  }
}
