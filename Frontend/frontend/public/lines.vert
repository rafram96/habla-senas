attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform float uAngle;
uniform float uAspectRatio;
uniform vec2 uCenter;

vec2 rotate(vec2 point, float rads, vec2 pivot) {
    float radAngle = -rads;
    float x = point.x;
    float y = point.y;
    float rX = pivot.x + (x - pivot.x) * cos(radAngle) - (y - pivot.y) * sin(radAngle);
    float rY = pivot.y + (x - pivot.x) * sin(radAngle) + (y - pivot.y) * cos(radAngle);
    return vec2(rX, rY);
}

void main() {
    vec2 adjustedTexCoord = aTexCoord;
    vec2 center = uCenter;
    if (uAspectRatio > 1.0) {
        adjustedTexCoord.x = adjustedTexCoord.x / uAspectRatio;
        center.x = center.x / uAspectRatio;
    } else {
        adjustedTexCoord.y = adjustedTexCoord.y * uAspectRatio;
        center.y = center.y * uAspectRatio;
    }

    vTexCoord = rotate(adjustedTexCoord, 3.1415 * uAngle, center);

    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    gl_Position = positionVec4;
}