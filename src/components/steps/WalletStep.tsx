import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface WalletStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  formData: any;
}

export const WalletStep: React.FC<WalletStepProps> = ({
  onNext,
  onBack,
  formData,
}) => {
  const [wallet, setWallet] = useState(formData.walletConnector);

  const wallets = [
    {
      id: "orderly",
      name: "Orderly Wallet Connector",
      description:
        "The wallet connection component provided by the SDK is built on top of BlockNative.",
    },
    {
      id: "custom",
      name: "Custom",
      description: "Your can implement your own wallet connector",
    },
  ];

  const handleSubmit = () => {
    if (wallet) {
      onNext({ walletConnector: wallet });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* <Text size="5" weight="bold">
        Select Wallet Connector
      </Text> */}
      <div className="flex flex-col gap-3">
        {wallets.map((w) => (
          <div
            key={w.id}
            onClick={() => setWallet(w.id)}
            className={cn(
              "p-4 rounded-md cursor-pointer border transition-all duration-200 ease-in-out",
              wallet === w.id && "border-purple-600 bg-purple-50"
            )}
            // style={{
            //   border: `1px solid ${
            //     wallet === w.id ? "#6b21a8" : "var(--gray-6)"
            //   }`,
            //   backgroundColor: wallet === w.id ? "#f3e8ff" : "transparent",
            //   transition: "all 0.2s ease",
            // }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">{/* 如果有图标可以在这里添加 */}</div>
              <div className="flex flex-col gap-2">
                <div>{w.name}</div>
                <div className="text-xs text-gray-500">{w.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 pt-5">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!wallet}>
          Next
        </Button>
      </div>
    </div>
  );
};
