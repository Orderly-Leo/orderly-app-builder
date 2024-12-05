import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface BrokerStepProps {
  onNext: (data: any) => void;
  formData: any;
}

const formSchema = z.object({
  brokerId: z.string().min(3),
  brokerName: z.string().min(3),
});

export const BrokerStep: React.FC<BrokerStepProps> = ({ formData, onNext }) => {
  // const { updateFormData,  formData } = useStepWizard();
  // const [brokerId, setBrokerId] = useState(formData.brokerId || "");
  // const [brokerName, setBrokerName] = useState(formData.brokerName || "");

  const form = useForm({
    defaultValues: {
      brokerId: formData.brokerId || "",
      brokerName: formData.brokerName || "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onNext(values);
    // if (brokerId.trim() && brokerName.trim()) {
    //   // updateFormData({ brokerId, brokerName });
    //   // setCurrentStep(1);
    //   onNext({ brokerId, brokerName });
    // }
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="brokerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broker ID</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your broker ID" {...field} />
                </FormControl>
                <FormDescription>
                  This is your broker ID, if you have not already created one
                  please create one.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brokerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broker Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter your broker name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your broker name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              // disabled={!brokerId.trim() || !brokerName.trim()}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
      {/* <div>
        <InputLabel>Broker ID</InputLabel>
        <Input
          value={brokerId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerId(e.target.value)
          }
          placeholder="Enter your broker ID"
        />
      </div>
      <div>
        <InputLabel>Broker Name</InputLabel>

        <Input
          value={brokerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerName(e.target.value)
          }
          placeholder="Enter your broker name"
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!brokerId.trim() || !brokerName.trim()}
        >
          Next
        </Button>
      </div> */}
    </div>
  );
};
