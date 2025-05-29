import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.settings.account)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.settings.account)["$post"]
>;

export const updateAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.settings.account["$post"]({ json });
      return await response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Something went wrong while updating profile"
      );
    },
  });
  return mutation;
};
