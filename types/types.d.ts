interface Keyframe {
  id: number;
  percentages: number[];
  styles: string;
}

interface Track {
  id: number;
  selectors: string[];
  keyframes: Keyframe[];
}
