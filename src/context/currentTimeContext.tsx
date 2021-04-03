import React, {
  createContext,
  DOMElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface CurrentTimeProperties {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  addAnimation: (element: HTMLElement, keyframes: Keyframe[]) => void;
}

interface CurrentTimeProviderProps {
  children: React.ReactNode;
  animationProperties: AnimationProperties;
}

const CurrentTimeContext = createContext<CurrentTimeProperties | undefined>(
  undefined
);

export const CurrentTimeProvider = ({
  children,
  animationProperties,
}: CurrentTimeProviderProps) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const animations = useRef<Animation[]>([]);

  const animationTiming = {
    duration: animationProperties.duration,
    iterations: Infinity,
  };

  const addAnimation = (element: Element, keyframes: Keyframe[]) => {
    const animation = element.animate(keyframes, animationTiming);
    if (animations.current.length) {
      //sync animations here
    }

    animations.current = [...animations.current, animation];
  };

  return (
    <CurrentTimeContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        addAnimation,
      }}
    >
      {children}
    </CurrentTimeContext.Provider>
  );
};

export const useCurrentTime = (): CurrentTimeProperties => {
  const context = useContext(CurrentTimeContext);
  if (context === undefined) {
    throw new Error(
      'useCurrentTime context can only be used inside a CurrentTimeProvider'
    );
  }
  return context;
};
