import { useEffect, useRef, useState } from 'react';

/**
 * SVG filters used by `.title-effect` to render titles as liquid chrome.
 * The glyph alpha is blurred into a height map, lit like a bevelled surface,
 * and the shading is folded through a transfer table to get the contrasted
 * light/dark bands of polished metal that follow each letter's contour.
 * A thin outline is drawn below the chrome for readability on light backgrounds.
 * The light slowly orbits to animate the reflections.
 *
 * Filter primitives are sized in px, not em, so one filter per font-size step
 * is generated and each title gets the closest one through `--chrome-filter`
 * (and `--chrome-filter-dark` for dark pages).
 *
 * The amount of chrome is driven by the text color, so it can be faded with a
 * CSS color transition: titles are colored with the theme color whose blue
 * channel is shifted by MIX_DELTA (`--title-chrome-color[-dark]`). The filter
 * reads that shift back as a 0–1 mix between chrome and the plain text, so
 * transitioning to the plain theme color fades the chrome out. Without filter
 * support, the shifted color is visually the same as the theme color.
 */

// Elements rendered as chrome, keep in sync with the `.title-effect` rule in styles/layers.css.
const CHROME_SELECTOR = '.title-effect, .content-slot__title, .content-page .text-content h2';

const SIZE_STEP = 22; // px of font-size per filter step
const STEPS = [1, 2, 3, 4, 5, 6];
const BLUR_PER_STEP = 0.95;
const SURFACE_PER_BLUR = 2.2;
const OUTLINE_PER_STEP = 0.45;
const LIGHT_AZIMUTH = '235;305;200;235';
const LIGHT_DURATION = '8s';

const MIX_DELTA = 40; // blue channel shift (0–255) that means "full chrome"
const MIX_DEAD_ZONE = 12; // shift below which the text renders fully plain (absorbs filter precision)

const VARIANTS = [
  // Outline uses currentColor, so it follows the theme's brown (`text-black`).
  {
    id: 'chrome',
    className: 'text-black',
    themeColorClass: 'text-black',
    colorVar: '--title-chrome-color',
    outlineColor: 'currentColor',
    outlineOpacity: 1,
  },
  {
    id: 'chrome-dark',
    className: '',
    themeColorClass: 'text-white',
    colorVar: '--title-chrome-color-dark',
    outlineColor: '#000',
    outlineOpacity: 0.55,
  },
];

type MixParams = { slope: number; intercept: number };

const getMixParams = (themeBlue: number, delta: number): MixParams => {
  const dead = Math.sign(delta) * MIX_DEAD_ZONE;
  return { slope: 255 / (delta - dead), intercept: -(themeBlue + dead) / (delta - dead) };
};

// Fallbacks matching the current theme (black #3B1F0A, white #E5D2D4) until the real colors are read.
const DEFAULT_MIX: Record<string, MixParams> = {
  chrome: getMixParams(0x0a, MIX_DELTA),
  'chrome-dark': getMixParams(0xd4, MIX_DELTA),
};

/**
 * Reads a theme color from a probe element, publishes its "chrome" variant
 * (blue channel shifted towards the middle of the range) as a CSS variable,
 * and returns the filter coefficients mapping that blue value back to a 0–1 mix.
 */
const setupChromeColor = (themeColorClass: string, colorVar: string): MixParams => {
  const probe = document.createElement('span');
  probe.className = themeColorClass;
  document.body.appendChild(probe);
  const [r, g, b] = (getComputedStyle(probe).color.match(/[\d.]+/g) ?? []).map(Number);
  probe.remove();

  const delta = b <= 255 - MIX_DELTA ? MIX_DELTA : -MIX_DELTA;
  document.documentElement.style.setProperty(colorVar, `rgb(${r} ${g} ${b + delta})`);

  return getMixParams(b, delta);
};

const getStep = (fontSize: number) =>
  Math.min(STEPS.length, Math.max(1, Math.round(fontSize / SIZE_STEP)));

const applyChromeFilters = () => {
  document.querySelectorAll<HTMLElement>(CHROME_SELECTOR).forEach((el) => {
    const step = getStep(parseFloat(getComputedStyle(el).fontSize));
    el.style.setProperty('--chrome-filter', `url(#chrome-${step})`);
    el.style.setProperty('--chrome-filter-dark', `url(#chrome-dark-${step})`);
  });
};

const ChromeFilter = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mix, setMix] = useState(DEFAULT_MIX);

  useEffect(() => {
    setMix(
      Object.fromEntries(
        VARIANTS.map((variant) => [
          variant.id,
          setupChromeColor(variant.themeColorClass, variant.colorVar),
        ]),
      ),
    );
  }, []);

  useEffect(() => {
    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyChromeFilters);
    };

    scheduleUpdate();

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', scheduleUpdate);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      if (reducedMotion.matches) {
        svgRef.current?.pauseAnimations();
      } else {
        svgRef.current?.unpauseAnimations();
      }
    };
    updateMotion();
    reducedMotion.addEventListener('change', updateMotion);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden='true'
      width='0'
      height='0'
      className='absolute pointer-events-none'
    >
      <defs>
        {VARIANTS.map((variant) =>
          STEPS.map((step) => {
            const blur = step * BLUR_PER_STEP;
            const surfaceScale = blur * SURFACE_PER_BLUR;
            const outlineRadius = step * OUTLINE_PER_STEP;
            const { slope, intercept } = mix[variant.id];

            return (
              <filter
                key={`${variant.id}-${step}`}
                id={`${variant.id}-${step}`}
                className={variant.className}
                x='-5%'
                y='-15%'
                width='110%'
                height='130%'
                colorInterpolationFilters='sRGB'
              >
                <feGaussianBlur in='SourceAlpha' stdDeviation={blur} result='height' />

                <feDiffuseLighting
                  in='height'
                  surfaceScale={surfaceScale}
                  diffuseConstant='1.1'
                  lightingColor='#fff'
                  result='diffuse'
                >
                  <feDistantLight azimuth='235' elevation='42'>
                    <animate
                      attributeName='azimuth'
                      values={LIGHT_AZIMUTH}
                      dur={LIGHT_DURATION}
                      repeatCount='indefinite'
                    />
                  </feDistantLight>
                </feDiffuseLighting>

                <feSpecularLighting
                  in='height'
                  surfaceScale={surfaceScale}
                  specularConstant='1.3'
                  specularExponent='28'
                  lightingColor='#fff'
                  result='specular'
                >
                  <feDistantLight azimuth='235' elevation='38'>
                    <animate
                      attributeName='azimuth'
                      values={LIGHT_AZIMUTH}
                      dur={LIGHT_DURATION}
                      repeatCount='indefinite'
                    />
                  </feDistantLight>
                </feSpecularLighting>

                <feComposite
                  in='diffuse'
                  in2='specular'
                  operator='arithmetic'
                  k2='1'
                  k3='1'
                  result='lit'
                />

                {/* Fold the shading into metallic bands, tinted towards the poster's pink silver. */}
                <feComponentTransfer in='lit' result='chrome'>
                  <feFuncR type='table' tableValues='0.24 0.95 0.5 1 0.78 1' />
                  <feFuncG type='table' tableValues='0.17 0.89 0.43 0.97 0.7 1' />
                  <feFuncB type='table' tableValues='0.18 0.9 0.45 0.97 0.72 1' />
                </feComponentTransfer>

                <feComposite in='chrome' in2='SourceAlpha' operator='in' result='chromeGlyphs' />

                {/* Thin outline around the glyphs, drawn below the chrome. */}
                <feMorphology
                  in='SourceAlpha'
                  operator='dilate'
                  radius={outlineRadius}
                  result='outlineShape'
                />
                <feFlood
                  floodColor={variant.outlineColor}
                  floodOpacity={variant.outlineOpacity}
                  result='outlineColor'
                />
                <feComposite in='outlineColor' in2='outlineShape' operator='in' result='outline' />

                <feMerge result='chromeFull'>
                  <feMergeNode in='outline' />
                  <feMergeNode in='chromeGlyphs' />
                </feMerge>

                {/* Chrome amount (0–1) decoded from the text's blue channel, spread to cover the outline. */}
                <feColorMatrix
                  in='SourceGraphic'
                  type='matrix'
                  values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 ${slope} 0 ${intercept}`}
                  result='mixRaw'
                />
                <feComposite in='mixRaw' in2='SourceAlpha' operator='in' result='mixGlyphs' />
                <feMorphology
                  in='mixGlyphs'
                  operator='dilate'
                  radius={outlineRadius + 1}
                  result='mix'
                />

                <feComposite in='chromeFull' in2='mix' operator='in' result='chromePart' />
                <feComposite in='SourceGraphic' in2='mix' operator='out' result='plainPart' />
                <feComposite in='chromePart' in2='plainPart' operator='arithmetic' k2='1' k3='1' />
              </filter>
            );
          }),
        )}
      </defs>
    </svg>
  );
};

export default ChromeFilter;
