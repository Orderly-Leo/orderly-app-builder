import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

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
  const [wallet, setWallet] = useState(formData.wallet);

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
    <Flex direction="column" gap="6">
      <Text size="5" weight="bold">
        Select Wallet Connector
      </Text>
      <Flex direction="column" gap="3">
        {wallets.map((w) => (
          <Box
            key={w.id}
            onClick={() => setWallet(w.id)}
            style={{
              padding: "16px",
              border: `1px solid ${
                wallet === w.id ? "var(--accent-9)" : "var(--gray-6)"
              }`,
              borderRadius: "var(--radius-3)",
              cursor: "pointer",
              backgroundColor:
                wallet === w.id ? "var(--accent-3)" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <Flex align="center" gap="3">
              <Box className="w-6 h-6">{/* 如果有图标可以在这里添加 */}</Box>
              <Text size="3" weight={wallet === w.id ? "bold" : "regular"}>
                {w.name}
              </Text>
            </Flex>
          </Box>
        ))}
      </Flex>
      <Flex gap="3" justify="between">
        <Button variant="soft" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!wallet}>
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
