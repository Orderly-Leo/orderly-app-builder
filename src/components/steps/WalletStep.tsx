import { Box, Text } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "../ui/button";

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
    { id: "metamask", name: "MetaMask" },
    { id: "walletconnect", name: "WalletConnect" },
    { id: "coinbase", name: "Coinbase Wallet" },
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
            className="p-4 rounded-md cursor-pointer"
            style={{
              border: `1px solid ${
                wallet === w.id ? "#6b21a8" : "var(--gray-6)"
              }`,
              backgroundColor: wallet === w.id ? "#f3e8ff" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <div className="flex items-center gap-3">
              <Box className="w-6 h-6">{/* 如果有图标可以在这里添加 */}</Box>
              <Text size="3" weight={wallet === w.id ? "bold" : "regular"}>
                {w.name}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
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
