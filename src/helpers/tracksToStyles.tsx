const trackToStyles = (track: Track, animation: AnimationProperties) => {
  return `
    ${track.selectors.join(',')} {
      animation-name: animation-${track.id};
      animation-duration: ${animation.duration}ms;
      animation-timing-function: ${animation.easing};
      animation-iteration-count: ${animation.iterations};
      animation-direction: ${animation.direction};
    }

    @keyframes animation-${track.id} {
      ${track.keyframes
        .map(
          (keyframe) => `
        ${keyframe.percentages.map((p) => `${p}%`).join(',')} {
          ${Object.entries(keyframe.styles)
            .map(([property, value]) => `${property}: ${value};`)
            .join('/n')}
        }
      `
        )
        .join('\n')}
    }
  `;
};

export const tracksToStyles = (
  tracks: Track[],
  animation: AnimationProperties
) => {
  return tracks.map((track) => trackToStyles(track, animation)).join('\n');
};
