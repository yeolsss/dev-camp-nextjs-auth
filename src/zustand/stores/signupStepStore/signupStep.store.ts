import { create } from "zustand";
import createSelectors from "@/zustand/config";

interface SignupStepState {
  step: number;
}

interface SignupStepAction {
  setCurrentStep: (test: SignupStepState["step"]) => void;
}

const signupStepStore = create<SignupStepState & SignupStepAction>()((set) => ({
  step: 0,
  setCurrentStep: (step) => set(() => ({ step: step })),
}));

const useSignupStepStore = createSelectors(signupStepStore);
export default useSignupStepStore;
