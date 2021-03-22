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

interface TrackWithMarkers extends Track {
  markers: Marker[];
}

interface AnimationProperties {
  duration: number;
  easing: string;
  iterations: number | string;
  direction: string;
}

interface Marker {
  trackId: number;
  keyframeId: number;
  percentage: number;
}
