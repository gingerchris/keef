import React, { createContext, useContext } from 'react';

interface AnimationManagerValues {
  addAnimation: (element: Element, keyframes: Keyframe[]) => void;
  pause: () => void;
  resume: () => void;
}

interface AnimationManagerProviderProps {
  children: React.ReactNode;
  animationProperties: AnimationProperties;
}

const AnimationManagerContext = createContext<
  AnimationManagerValues | undefined
>(undefined);

export const AnimationManagerProvider = ({
  children,
  animationProperties,
}: AnimationManagerProviderProps) => {
  const animationTiming = {
    duration: animationProperties.duration,
    iterations: Infinity,
  };

  const addAnimation = (element: Element, keyframes: Keyframe[]) => {
    const existingAnimation = document.getAnimations().find((animation) => {
      const effect = animation.effect as KeyframeEffect;
      return effect?.target === element;
    });
    if (existingAnimation) existingAnimation.cancel();

    element.animate(keyframes, animationTiming);
  };

  const pause = () => {
    document.getAnimations().forEach((animation) => animation.pause());
  };

  const resume = () => {
    document.getAnimations().forEach((animation) => animation.play());
  };

  return (
    <AnimationManagerContext.Provider
      value={{
        addAnimation,
        pause,
        resume,
      }}
    >
      {children}
    </AnimationManagerContext.Provider>
  );
};

export const useAnimationManager = (): AnimationManagerValues => {
  const context = useContext(AnimationManagerContext);
  if (context === undefined) {
    throw new Error(
      'useAnimationManager can only be called from inside an AnimationManagerProvider'
    );
  }
  return context;
};
