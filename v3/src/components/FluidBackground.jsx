import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const isMobileDevice = typeof window !== 'undefined' && (
  window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
);

/**
 * FluidBackground
 *
 * Real-time GPU fluid simulation adapted from Pavel Dobryakov's
 * WebGL-Fluid-Simulation, styled as cosmic star dust and nebula gas.
 * The display shader uses noise-based grain and fbm cloud textures to
 * break up smooth liquid flow into particulate, wispy gas. Star dust
 * sparkles appear as fine-grain bright specks throughout the nebula.
 *
 * Palette: deep space purple → rose gas → cream star dust core.
 * Transparent where there is no dye, so the site's dark background shows through.
 */

/* =========================================================================
 * SHADERS  (verbatim from Dobryakov, GLSL ES 3.00)
 * ========================================================================= */

const baseVertexShader = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;

void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const copyShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
uniform sampler2D uTexture;
out highp vec4 pc_fragColor;
void main(){ pc_fragColor = texture(uTexture, vUv); }`;

const clearShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out highp vec4 pc_fragColor;
void main () { pc_fragColor = value * texture(uTexture, vUv); }`;

// DISPLAY — cosmic star dust and nebula gas, not liquid.
// Renders stars + nebula gradients as the permanent background,
// then overlays fluid dye as luminous dust/gas.
const displayShaderSource = `#version 300 es
precision highp float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
uniform float uTime;
out highp vec4 pc_fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(269.5, 183.3))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

vec3 starDustColor(float seed) {
  // Website accent palette: rose, rose-deep, nebula-purple, nebula-light, star-white
  float r = seed;
  if (r < 0.25) return vec3(0.91, 0.71, 0.78);
  if (r < 0.45) return vec3(0.77, 0.55, 0.62);
  if (r < 0.65) return vec3(0.42, 0.35, 0.55);
  if (r < 0.82) return vec3(0.65, 0.52, 0.72);
  return vec3(0.88, 0.85, 0.94);
}

void main () {
  if (vUv.x < 0.0 || vUv.y < 0.0 || vUv.x > 1.0 || vUv.y > 1.0)
    return;

  // Static star field — always visible, slowly drifting, no twinkle
  vec2 starUV = vUv * vec2(80.0, 60.0) + uTime * 0.015;
  vec2 starCell = floor(starUV);
  vec2 starF = fract(starUV) - 0.5;
  float starRand = hash(starCell);
  float starBright = step(0.975, starRand);
  float starDist = length(starF);
  float star = starBright * smoothstep(0.10, 0.0, starDist);
  vec3 starCol = starDustColor(hash2(starCell));
  vec3 stars = star * starCol * 0.45;

  vec3 dye = texture(uTexture, vUv).rgb;
  float density = length(dye);

  if (density < 0.005) {
    pc_fragColor = vec4(stars, max(star * 0.5, 0.0));
    return;
  }

  float t = uTime;

  // Star dust within the gas — sparse, multi-colored
  float dust = noise(vUv * 700.0 + density * 10.0);
  float dustSharp = pow(dust, 30.0) * 0.4;

  float glow = noise(vUv * 250.0 + density * 8.0);
  float dustSoft = pow(glow, 11.0) * 0.15;

  float twinkle = 0.7 + 0.3 * sin(t * 2.0 + dust * 25.0);

  float cloud = fbm(vUv * 50.0 + density * 8.0);

  vec3 nebula  = vec3(0.30, 0.24, 0.44);
  vec3 rose    = vec3(0.80, 0.56, 0.66);

  float t_d = smoothstep(0.0, 0.7, density);
  vec3 gasColor = mix(nebula, rose, t_d);

  vec3 dustColor = starDustColor(hash(floor(vUv * 500.0)));
  float sparkTotal = dustSharp * twinkle + dustSoft;

  vec3 color = gasColor * (0.55 + cloud * 0.55);
  color += dustColor * sparkTotal;
  color += stars * 0.3;

  float emission = smoothstep(0.0, 0.8, density);

  float a = clamp(density * 1.6 + sparkTotal * 0.3 + star * 0.12, 0.0, 0.85);
  pc_fragColor = vec4(color * emission, a);
}`;

const splatShader = `#version 300 es
precision highp float;
precision highp sampler2D;
in highp vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out highp vec4 pc_fragColor;

void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  pc_fragColor = vec4(base + splat, 1.0);
}`;

const advectionShader = `#version 300 es
precision highp float;
precision highp sampler2D;
in highp vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
out highp vec4 pc_fragColor;

vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

void main () {
  vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
  vec4 result = bilerp(uSource, coord, dyeTexelSize);
  float decay = 1.0 + dissipation * dt;
  pc_fragColor = result / decay;
}`;

const divergenceShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uVelocity;
out highp vec4 pc_fragColor;

void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;

  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }

  float div = 0.5 * (R - L + T - B);
  pc_fragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const curlShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uVelocity;
out highp vec4 pc_fragColor;

void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  pc_fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`;

const vorticityShader = `#version 300 es
precision highp float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
out highp vec4 pc_fragColor;

void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;

  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;

  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  pc_fragColor = vec4(velocity, 0.0, 1.0);
}`;

const pressureShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out highp vec4 pc_fragColor;

void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float C = texture(uPressure, vUv).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  pc_fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

const gradientSubtractShader = `#version 300 es
precision mediump float;
precision highp sampler2D;
in highp vec2 vUv;
in highp vec2 vL;
in highp vec2 vR;
in highp vec2 vT;
in highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out highp vec4 pc_fragColor;

void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  pc_fragColor = vec4(velocity, 0.0, 1.0);
}`;

/* =========================================================================
 * GL HELPERS
 * ========================================================================= */

function compileShader(gl, type, source, name) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    const numbered = source.split('\n').map((l, i) => `${String(i + 1).padStart(3)}| ${l}`).join('\n');
    // eslint-disable-next-line no-console
    console.error(`[FluidBackground] shader "${name}" compile failed:\n${log}\n--- source ---\n${numbered}`);
    throw new Error(`shader "${name}" compile failed: ${log}`);
  }
  return shader;
}

function createProgram(gl, vertexShader, fragmentShader, name) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`link ${name}: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

function getUniforms(gl, program) {
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const name = gl.getActiveUniform(program, i).name;
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return uniforms;
}

class Program {
  constructor(gl, vsSrc, fsSrc, name) {
    this.gl = gl;
    const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc, name + '.vert');
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc, name + '.frag');
    this.program = createProgram(gl, vs, fs, name);
    this.uniforms = getUniforms(gl, this.program);
  }
  bind() { this.gl.useProgram(this.program); }
}

/* =========================================================================
 * CONFIG  — tuned for cosmic star dust and nebula gas:
 * wider splats (diffuse clouds), faster velocity decay (gas disperses),
 * gentler curl (soft swirls, not liquid eddies).
 * ========================================================================= */

const config = {
  SIM_RESOLUTION: isMobileDevice ? 96 : 160,
  DYE_RESOLUTION: isMobileDevice ? 512 : 1024,
  DENSITY_DISSIPATION: 0.50,   // lingers visibly but doesn't pile up
  VELOCITY_DISSIPATION: 0.22,
  PRESSURE: 0.80,
  PRESSURE_ITERATIONS: isMobileDevice ? 12 : 20,
  CURL: 12,
  SPLAT_RADIUS: 0.18,          // smaller brush
  SPLAT_FORCE: 1800,           // lighter touch — cursor leaves a trace, not a blob
};

// Cosmic dust palette — intentionally bright; DYE_DARKEN + reservoir brightness
// multiply these down to the final visible level.
const PALETTE = [
  { r: 0.91, g: 0.71, b: 0.78 }, // rose soft
  { r: 0.77, g: 0.55, b: 0.62 }, // rose deep
  { r: 0.55, g: 0.42, b: 0.68 }, // nebula violet
  { r: 0.40, g: 0.32, b: 0.62 }, // deep purple
  { r: 0.88, g: 0.85, b: 0.94 }, // starlight
];
const DYE_DARKEN = 0.35;

// Sample a palette color with small per-channel jitter so every splat isn't
// identical, but the whole field stays tonally cohesive and on-brand.
function generateColor() {
  const base = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const jitter = () => 1.0 + (Math.random() - 0.5) * 0.22;
  return {
    r: Math.max(0, base.r * DYE_DARKEN * jitter()),
    g: Math.max(0, base.g * DYE_DARKEN * jitter()),
    b: Math.max(0, base.b * DYE_DARKEN * jitter()),
  };
}

/* =========================================================================
 * COMPONENT
 * ========================================================================= */

const FluidBackground = () => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const [showHint, setShowHint] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2) {
      gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    }
    if (!gl) {
      console.error('[FluidBackground] WebGL not available');
      return null;
    }

    let supportLinearFiltering = false;
    const halfFloat = gl.getExtension('OES_texture_half_float');
    const supportLinearFilteringExt = isWebGL2
      ? gl.getExtension('OES_texture_float_linear')
      : (gl.getExtension('OES_texture_half_float_linear') || gl.getExtension('OES_texture_float_linear'));
    if (supportLinearFilteringExt) supportLinearFiltering = true;

    if (isWebGL2) {
      gl.getExtension('EXT_color_buffer_float');
      supportLinearFiltering = !!gl.getExtension('OES_texture_float_linear');
    }

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);
    let formatRGBA, formatRG, formatR;
    if (isWebGL2) {
      formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F: return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F: return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default: return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      return status;
    }

    /* ----- programs ----- */
    gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float');
    const programs = {
      copy: new Program(gl, baseVertexShader, copyShader, 'copy'),
      clear: new Program(gl, baseVertexShader, clearShader, 'clear'),
      display: new Program(gl, baseVertexShader, displayShaderSource, 'display'),
      splat: new Program(gl, baseVertexShader, splatShader, 'splat'),
      advection: new Program(gl, baseVertexShader, advectionShader, 'advection'),
      divergence: new Program(gl, baseVertexShader, divergenceShader, 'divergence'),
      curl: new Program(gl, baseVertexShader, curlShader, 'curl'),
      vorticity: new Program(gl, baseVertexShader, vorticityShader, 'vorticity'),
      pressure: new Program(gl, baseVertexShader, pressureShader, 'pressure'),
      gradient: new Program(gl, baseVertexShader, gradientSubtractShader, 'gradient'),
    };

    /* ----- fullscreen quad blit ----- */
    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (target, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 0.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    /* ----- framebuffers ----- */
    let dye, velocity, divergence, curl, pressure;

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;
      return {
        texture, fbo, width: w, height: h, texelSizeX, texelSizeY,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w, height: h,
        texelSizeX: fbo1.texelSizeX, texelSizeY: fbo1.texelSizeY,
        get read() { return fbo1; },
        set read(v) { fbo1 = v; },
        get write() { return fbo2; },
        set write(v) { fbo2 = v; },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; },
      };
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      return { width: min, height: max };
    }

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = halfFloatTexType;
      const rgba = formatRGBA;
      const rg = formatRG;
      const r = formatR;
      const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);

      if (!dye)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

      if (!velocity)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      programs.copy.bind();
      gl.uniform1i(programs.copy.uniforms.uTexture, target.attach(0));
      blit(newFBO);
      return newFBO;
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    /* ----- pointer ----- */
    const pointer = {
      id: -1,
      texcoordX: 0.5, texcoordY: 0.5,
      deltaX: 0, deltaY: 0,
      down: false, moved: false,
      color: { r: 0, g: 0, b: 0 },
    };

    /* ----- splat ----- */
    function splat(x, y, dx, dy, color) {
      programs.splat.bind();
      gl.uniform1i(programs.splat.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(programs.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(programs.splat.uniforms.point, x, y);
      gl.uniform3f(programs.splat.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(programs.splat.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(programs.splat.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(programs.splat.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function splatPointer(p) {
      const dx = p.deltaX * config.SPLAT_FORCE;
      const dy = p.deltaY * config.SPLAT_FORCE;
      splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
    }

    /* ----- step ----- */
    let lastUpdateTime = Date.now();
    let calcDeltaTime = () => {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    };

    function step(dt) {
      gl.disable(gl.BLEND);

      // curl
      programs.curl.bind();
      gl.uniform2f(programs.curl.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.curl.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      // vorticity
      programs.vorticity.bind();
      gl.uniform2f(programs.vorticity.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.vorticity.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.vorticity.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(programs.vorticity.uniforms.curl, config.CURL);
      gl.uniform1f(programs.vorticity.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // divergence
      programs.divergence.bind();
      gl.uniform2f(programs.divergence.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.divergence.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // clear pressure
      programs.clear.bind();
      gl.uniform1i(programs.clear.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(programs.clear.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      // pressure (Jacobi)
      programs.pressure.bind();
      gl.uniform2f(programs.pressure.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.pressure.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(programs.pressure.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      // gradient subtract
      programs.gradient.bind();
      gl.uniform2f(programs.gradient.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(programs.gradient.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(programs.gradient.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // advect velocity
      programs.advection.bind();
      gl.uniform2f(programs.advection.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!supportLinearFiltering)
        gl.uniform2f(programs.advection.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      else
        gl.uniform2f(programs.advection.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velocityId = velocity.read.attach(0);
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocityId);
      gl.uniform1i(programs.advection.uniforms.uSource, velocityId);
      gl.uniform1f(programs.advection.uniforms.dt, dt);
      gl.uniform1f(programs.advection.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      // advect dye
      if (!supportLinearFiltering)
        gl.uniform2f(programs.advection.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      else
        gl.uniform2f(programs.advection.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(programs.advection.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(programs.advection.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(programs.advection.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target) {
      const width = target == null ? gl.drawingBufferWidth : target.width;
      const height = target == null ? gl.drawingBufferHeight : target.height;
      programs.display.bind();
      gl.uniform2f(programs.display.uniforms.texelSize, 1.0 / width, 1.0 / height);
      gl.uniform1i(programs.display.uniforms.uTexture, dye.read.attach(0));
      if (programs.display.uniforms.uTime)
        gl.uniform1f(programs.display.uniforms.uTime, performance.now() / 1000);
      if (programs.display.uniforms.uResolution)
        gl.uniform2f(programs.display.uniforms.uResolution, width, height);
      blit(target, false);
    }

    /* ----- input handlers ----- */
    const updatePointerDownData = (p, id, posX, posY) => {
      p.id = id;
      p.down = true;
      p.moved = false;
      p.texcoordX = posX / window.innerWidth;
      p.texcoordY = 1.0 - posY / window.innerHeight;
      p.deltaX = 0;
      p.deltaY = 0;
      p.color = generateColor();
    };

    const updatePointerMoveData = (p, posX, posY) => {
      p.moved = true;
      const prevX = p.texcoordX;
      const prevY = p.texcoordY;
      p.texcoordX = posX / window.innerWidth;
      p.texcoordY = 1.0 - posY / window.innerHeight;
      p.deltaX = correctDeltaX(p.texcoordX - prevX);
      p.deltaY = correctDeltaY(p.texcoordY - prevY);
      p.color = generateColor();
    };

    function correctDeltaX(delta) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }
    function correctDeltaY(delta) {
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    pointer.color = generateColor();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const posX = scaleByPixelRatio(e.clientX - rect.left);
      const posY = scaleByPixelRatio(e.clientY - rect.top);
      if (pointer.down) {
        // dragging handled elsewhere if needed
      }
      updatePointerMoveData(pointer, posX, posY);
    };
    const onMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const posX = scaleByPixelRatio(e.clientX - rect.left);
      const posY = scaleByPixelRatio(e.clientY - rect.top);
      updatePointerDownData(pointer, -1, posX, posY);
    };
    const onMouseUp = () => { pointer.down = false; };
    const onTouchStart = (e) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        const posX = scaleByPixelRatio(e.touches[0].clientX - rect.left);
        const posY = scaleByPixelRatio(e.touches[0].clientY - rect.top);
        updatePointerDownData(pointer, e.touches[0].identifier, posX, posY);
      }
    };
    const onTouchMove = (e) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        const posX = scaleByPixelRatio(e.touches[0].clientX - rect.left);
        const posY = scaleByPixelRatio(e.touches[0].clientY - rect.top);
        updatePointerMoveData(pointer, posX, posY);
      }
    };
    const onTouchEnd = () => { pointer.down = false; };

    function scaleByPixelRatio(input) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    /* ----- resize ----- */
    const resizeCanvas = () => {
      const w = Math.floor(window.innerWidth * Math.min(window.devicePixelRatio, 1));
      const h = Math.floor(window.innerHeight * Math.min(window.devicePixelRatio, 1));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        return true;
      }
      return false;
    };

    /* ----- init + animation loop ----- */
    resizeCanvas();
    initFramebuffers();

    let update = () => {
      if (resizeCanvas()) initFramebuffers();
      const dt = calcDeltaTime();
      if (!reduceMotion) {
        if (pointer.moved) {
          pointer.moved = false;
          splatPointer(pointer);
        }
        step(dt);
      }
      render(null);
      requestAnimationFrame(update);
    };
    const rafId = requestAnimationFrame(update);

    /* ----- listeners ----- */
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowHint(true), 1500);
    if (isMobile) {
      const hideTimer = setTimeout(() => setShowHint(false), 12000);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
    let moves = 0;
    const dismiss = () => {
      moves++;
      if (moves >= 2) setShowHint(false);
    };
    window.addEventListener('mousemove', dismiss);
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('mousemove', dismiss);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{ width: '100vw', height: '100vh' }}
        aria-hidden="true"
      />
      {showHint && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full pointer-events-none"
          style={{
            zIndex: 2147483647,
            background: 'rgba(15, 15, 20, 0.6)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(232, 180, 200, 0.25)',
            boxShadow: '0 0 20px rgba(232, 180, 200, 0.1), 0 0 40px rgba(107, 90, 125, 0.08)',
            color: 'var(--color-star-white)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            letterSpacing: '0.04em',
            animation: 'hintPulse 2.5s ease-in-out infinite',
          }}
        >
          {isMobile ? 'Best viewed on desktop btw' : 'Move your cursor and see the magic ✦'}
        </div>
      )}
    </>
  );
};

export default FluidBackground;
