uniform float haha;
void main(void)
{
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	uv.y*=-1.;
	uv*=iGlobalTime;
	gl_FragColor = vec4( vec3(1.0-mod(iGlobalTime*2.*haha,2.0)), 1.0)*texture2D(iChannel0, uv);
}