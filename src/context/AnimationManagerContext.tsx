import React, { createContext, useContext, useRef } from 'react';

interface AnimationManagerValues {
  addAnimation: (element: Element, keyframes: Keyframe[]) => void;
  pause: () => void;
  resume: () => void;
  stepForward: () => void;
  stepBackward: () => void;
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
  const animations = useRef<Animation[]>([]);

  const animationTiming = {
    duration: animationProperties.duration,
    iterations: Infinity,
  };

  const addAnimation = (element: Element, keyframes: Keyframe[]) => {
    let { current } = animations;
    const existingAnimation = current.find((animation) => {
      const effect = animation.effect as KeyframeEffect;
      return effect?.target === element;
    });
    if (existingAnimation) {
      existingAnimation.cancel();
      current = current.filter((animation) => animation !== existingAnimation);
    }

    const animation = element.animate(keyframes, animationTiming);
    current.push(animation);
    animations.current = current;
  };

  const pause = () => {
    animations.current.forEach((animation) => animation.pause());
  };

  const resume = () => {
    animations.current.forEach((animation) => animation.play());
  };

  const stepForward = () => {
    const currentTime = animations.current[0].currentTime;
    animations.current.forEach(
      (animation) => (animation.currentTime = Math.floor(currentTime || 0) + 10)
    );
  };

  const stepBackward = () => {
    const currentTime = animations.current[0].currentTime;
    animations.current.forEach(
      (animation) => (animation.currentTime = Math.floor(currentTime || 0) - 10)
    );
  };

  return (
    <AnimationManagerContext.Provider
      value={{
        addAnimation,
        pause,
        resume,
        stepForward,
        stepBackward,
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
