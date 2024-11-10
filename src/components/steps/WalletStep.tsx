import { RadioGroup, Button, Heading, Box, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface WalletStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export const WalletStep: React.FC<WalletStepProps> = ({ onNext, onBack }) => {
  const [wallet, setWallet] = useState("");

  const wallets = [
    { id: "metamask", name: "MetaMask" },
    { id: "walletconnect", name: "WalletConnect" },
    { id: "coinbase", name: "Coinbase Wallet" },
  ];

  const handleSubmit = () => {
    if (wallet) {
      onNext({ wallet });
    }
  };

  return (
    <Box>
      <Heading size="4" className="mb-4">
        Select Wallet Connector
      </Heading>
      <RadioGroup.Root value={wallet} onValueChange={setWallet}>
        <Flex direction="column" className="gap-3 mb-4">
          {wallets.map((w) => (
            <RadioGroup.Item key={w.id} value={w.id}>
              {w.name}
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>
      <Flex className="gap-3 justify-between">
        <Button onClick={onBack} variant="soft">
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!wallet}>
          Complete
        </Button>
      </Flex>
    </Box>
  );
};
