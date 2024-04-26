"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface SignupStepContextValue {
  step: number;
  setCurrentStep: (step: number) => void;
}

const initialValue: SignupStepContextValue = {
  step: 0,
  setCurrentStep: () => {},
};

const SignupStepContext = createContext<SignupStepContextValue>(initialValue);

export const useSignupStep = () => useContext(SignupStepContext);

export const SignupStepProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(0);

  const setCurrentStep = useCallback((step: number) => {
    setStep(step);
  }, []);

  const value: SignupStepContextValue = useMemo(
    () => ({ step, setCurrentStep }),
    [step, setCurrentStep],
  );

  return (
    <SignupStepContext.Provider value={value}>
      {children}
    </SignupStepContext.Provider>
  );
};
