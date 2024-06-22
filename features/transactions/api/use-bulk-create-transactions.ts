import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";

import {client} from "@/lib/hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    ResponseType,
    unknown,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json})
      return await response.json();
    },
    onSuccess: () => {
        toast.success("Transaction(s) created successfully");
        queryClient.invalidateQueries({queryKey: ["transactions"]});
    },
    onError: () => {
      toast.error("Failed to create transaction(s)");
    }
  });
  return mutation;
};

