declare module 'prismjs/components/prism-core';

interface TrackKeyframe {
  id: number;
  percentages: number[];
  styles: {
    [property: string]: string;
  };
}

interface Track {
  id: number;
  selectors: string[];
  keyframes: TrackKeyframe[];
}

interface AnimationProperties {
  duration: number;
  easing: string;
  iterations: number | string;
  direction: string;
}
