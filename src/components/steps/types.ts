export interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: {
    wallet?: string;
    broker?: string;
    pages?: Array<{
      type: string;
      name: string;
      route: string;
    }>;
    // ... other data fields
  };
}
