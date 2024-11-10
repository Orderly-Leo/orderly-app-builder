import { Button, FormGroup, RadioGroup, Icon } from "@blueprintjs/core";
import { ChangeEvent, useState } from "react";

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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Select Wallet Connector</h2>
      <FormGroup>
        <RadioGroup
          selectedValue={wallet}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setWallet(e.currentTarget.value)
          }
        >
          <div className="grid grid-cols-3 gap-4">
            {wallets.map((w) => (
              <label
                key={w.id}
                htmlFor={`wallet-${w.id}`}
                className={`
                  relative p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all
                  ${
                    wallet === w.id
                      ? "border-2 border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200"
                  }
                `}
              >
                <input
                  id={`wallet-${w.id}`}
                  name="wallet"
                  type="radio"
                  value={w.id}
                  checked={wallet === w.id}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWallet(e.target.value)
                  }
                  className="hidden"
                />
                {wallet === w.id && (
                  <div className="absolute top-2 right-2">
                    <Icon icon="small-tick" intent="primary" size={16} />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-3 pt-2">
                  <img
                    src={`/icons/${w.id}.svg`}
                    alt={w.name}
                    className={`w-8 h-8 ${
                      wallet === w.id ? "text-blue-500" : ""
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      wallet === w.id ? "text-blue-600" : ""
                    }`}
                  >
                    {w.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </RadioGroup>
      </FormGroup>
      <div className="flex justify-between">
        <Button minimal onClick={onBack}>
          Back
        </Button>
        <Button intent="primary" onClick={handleSubmit} disabled={!wallet}>
          Complete
        </Button>
      </div>
    </div>
  );
};
