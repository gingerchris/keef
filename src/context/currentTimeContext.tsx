import React, { createContext, useContext, useState } from 'react';

interface CurrentTimeProperties {
  currentTime: number;
  animationProperties: AnimationProperties;
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

  return (
    <CurrentTimeContext.Provider value={{ currentTime, animationProperties }}>
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
