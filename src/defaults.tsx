export const markup = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1800 250" id="loader" aria-busy="true" aria-live="polite" aria-label="Loading indicator" role="img">
<defs>
  <clipPath id="clip">
    <rect x="0" y="0" width="666" height="250" />
  </clipPath>
  <g id="lines">
    <path id="red" d="M 0 0 L 0 250" fill="none" stroke="var(--col1)" />
    <path id="blue" d="M 0 0 L 0 250" fill="none" stroke="black" />
  </g>

</defs>

<g clip-path="url(#clip)">
  <use href="#lines" id="l1" x="100" />
  <use href="#lines" id="l2" x="250" />
  <use href="#lines" id="l3" x="417" />
  <use href="#lines" id="l4" x="515" />
</g>
<use href="#lines" id="l5" x="666" />
<use href="#lines" id="l6" x="837" />
<use href="#lines" id="l7" x="912" />
<use href="#lines" id="l8" x="1029" />
<use href="#lines" id="l9" x="1218" />
<use href="#lines" id="l10" x="1463" />
<use href="#lines" id="l11" x="1695" />
</svg>`;

export const duration = 3000;

export const tracks = [
  {
    id: 1,
    selectors: ['#loader'],
    keyframes: [
      {
        id: 11,
        percentages: [0, 38, 73, 100],
        styles: {
          filter: 'blur(0.05px)',
        },
      },
      {
        id: 12,
        percentages: [54],
        styles: {
          filter: 'blur(2px)',
        },
      },
    ],
  },
  {
    id: 2,
    selectors: ['#red'],
    keyframes: [
      {
        id: 21,
        percentages: [0, 47, 66],
        styles: { transform: 'none' },
      },
      {
        id: 22,
        percentages: [56],
        styles: { transform: 'scale(0.93)' },
      },
    ],
  },
  {
    id: 3,
    selectors: ['#blue'],
    keyframes: [
      {
        id: 31,
        percentages: [0, 40, 66, 100],
        styles: {
          stroke: 'black',
        },
      },
      {
        id: 32,
        percentages: [56],
        styles: {
          stroke: '#0094ac',
        },
      },
    ],
  },
];
