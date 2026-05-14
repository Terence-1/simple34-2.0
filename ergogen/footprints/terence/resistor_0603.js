module.exports = {
  params: {
    designator: 'R',
    side: 'F',
    reversible: false,
    resistor_3dmodel_filename: '',
    resistor_3dmodel_xyz_offset: [0, 0, 0],
    resistor_3dmodel_xyz_rotation: [0, 0, 0],
    resistor_3dmodel_xyz_scale: [1, 1, 1],
    from: { type: 'net', value: undefined },
    to: { type: 'net', value: undefined },
  },
  body: p => {
    const layer = p.reversible ? 'F' : p.side;

    const opening = `
    (footprint "terence:resistor_0603"
      (layer "${layer}.Cu")
      ${p.at}
      (property "Reference" "${p.ref}"
        (at 0 -1.4 ${p.r})
        (layer "${layer}.SilkS")
        ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
    `;

    const front = `
      (fp_rect (start -1 -0.55) (end 1 0.55) (layer "F.Fab") (stroke (width 0.1) (type solid)) (fill none))
      (pad "1" smd roundrect (at -0.8 0 ${p.r}) (size 0.9 0.95) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.from.str})
      (pad "2" smd roundrect (at 0.8 0 ${p.r}) (size 0.9 0.95) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.25) ${p.to.str})
    `;

    const back = `
      (fp_rect (start -1 -0.55) (end 1 0.55) (layer "B.Fab") (stroke (width 0.1) (type solid)) (fill none))
      (pad "1" smd roundrect (at -0.8 0 ${p.r}) (size 0.9 0.95) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.from.str})
      (pad "2" smd roundrect (at 0.8 0 ${p.r}) (size 0.9 0.95) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.25) ${p.to.str})
    `;

    const closing = `
    )
    `;

    const resistor_3dmodel = `
      (model ${p.resistor_3dmodel_filename}
        (offset (xyz ${p.resistor_3dmodel_xyz_offset[0]} ${p.resistor_3dmodel_xyz_offset[1]} ${p.resistor_3dmodel_xyz_offset[2]}))
        (scale (xyz ${p.resistor_3dmodel_xyz_scale[0]} ${p.resistor_3dmodel_xyz_scale[1]} ${p.resistor_3dmodel_xyz_scale[2]}))
        (rotate (xyz ${p.resistor_3dmodel_xyz_rotation[0]} ${p.resistor_3dmodel_xyz_rotation[1]} ${p.resistor_3dmodel_xyz_rotation[2]}))
      )
    `;

    let final = opening;

    if (p.reversible || p.side == 'F') {
      final += front;
    }
    if (p.reversible || p.side == 'B') {
      final += back;
    }

    if (p.resistor_3dmodel_filename) {
      final += resistor_3dmodel;
    }

    final += closing;

    return final;
  }
}
