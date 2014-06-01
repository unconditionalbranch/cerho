void main(void)
{
	vec2 uv = gl_FragCoord.xy / iResolution.xy;
	vec2 pos=vec2(sin(iGlobalTime)*2.0+cos(uv.x*3.2+uv.y*sin(uv.x*10.)+iGlobalTime)*3.1, sin(iGlobalTime)*2.0+cos(uv.y*3.2+2.*sin(uv.x*10.+iGlobalTime)+iGlobalTime)*3.1);
	float fader=1.0-mod(iGlobalTime*0.5,2.0);
	gl_FragColor = fader*texture2D(iChannel0, pos);
}