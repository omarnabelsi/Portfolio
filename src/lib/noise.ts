/**
 * Compact 3D simplex noise (after Stefan Gustavson's public-domain reference).
 * Deterministic for a given seed; returns values in roughly [-1, 1].
 */
const grad3 = new Float32Array([
  1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1,
]);

export function createNoise3D(seed = 7) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed >>> 0;
  for (let i = 255; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const r = s % (i + 1);
    [p[i], p[r]] = [p[r], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const F3 = 1 / 3;
  const G3 = 1 / 6;

  return function noise(x: number, y: number, z: number) {
    const t = (x + y + z) * F3;
    const i = Math.floor(x + t);
    const j = Math.floor(y + t);
    const k = Math.floor(z + t);
    const t0 = (i + j + k) * G3;
    const x0 = x - (i - t0);
    const y0 = y - (j - t0);
    const z0 = z - (k - t0);
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
      else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
    } else {
      if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
      else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
      else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];
    }
    const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3, y2 = y0 - j2 + 2 * G3, z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3, y3 = y0 - 1 + 3 * G3, z3 = z0 - 1 + 3 * G3;
    const ii = i & 255, jj = j & 255, kk = k & 255;

    const corner = (gi: number, cx: number, cy: number, cz: number) => {
      let tt = 0.6 - cx * cx - cy * cy - cz * cz;
      if (tt < 0) return 0;
      const g = (gi % 12) * 3;
      tt *= tt;
      return tt * tt * (grad3[g] * cx + grad3[g + 1] * cy + grad3[g + 2] * cz);
    };

    return (
      32 *
      (corner(perm[ii + perm[jj + perm[kk]]], x0, y0, z0) +
        corner(perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]], x1, y1, z1) +
        corner(perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]], x2, y2, z2) +
        corner(perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]], x3, y3, z3))
    );
  };
}
