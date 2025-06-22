precision mediump float;

varying vec2 vTexCoord;

uniform float uTime;
uniform float uLineWidth;
uniform float uLineScale;
uniform vec3 uRgb0;
uniform vec3 uRgb1;

void main() {
    vec2 uv = vTexCoord;
    float osc = cos(mix(uv.y, pow(uv.y, uv.y * 2.), 0.2) * uLineScale * 100. + uTime);
    osc = smoothstep(-0.05 + uLineWidth, 0.05 + uLineWidth, osc);
    vec3 finalRgb = mix(uRgb0, uRgb1, osc);
    gl_FragColor = vec4(finalRgb, 1.);
}