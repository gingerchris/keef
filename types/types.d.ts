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
