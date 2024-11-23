import { Box, Flex, Text } from "@radix-ui/themes";
import { motion, AnimatePresence } from "motion/react";

interface CompletedItem {
  id: string;
  text: string;
}

interface StepProgressProps {
  progress: number; // 0-100
  completedItems: CompletedItem[];
}

export const CircleProgress = ({ progress }: { progress: number }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Box className="relative w-32 h-32">
      {/* Background circle */}
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="var(--gray-4)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="var(--accent-9)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      {/* Center percentage text */}
      <Flex
        className="absolute inset-0"
        align="center"
        justify="center"
        direction="column"
      >
        <Text size="6" weight="bold">
          {Math.round(progress)}%
        </Text>
      </Flex>
    </Box>
  );
};

export const StepProgress: React.FC<StepProgressProps> = ({
  progress = 0,
  completedItems = [],
}) => {
  return (
    <Flex direction="column" align="center" gap="6">
      {/* Progress Circle */}
      <CircleProgress progress={progress} />

      {/* Completed Items List */}
      <Box className="w-full max-w-sm">
        <AnimatePresence mode="popLayout">
          {completedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Flex
                align="center"
                gap="2"
                className="py-2 px-4 my-1 bg-blue-50 rounded-lg"
              >
                <Box className="w-2 h-2 rounded-full bg-blue-500" />
                <Text size="2">{item.text}</Text>
              </Flex>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Flex>
  );
};
