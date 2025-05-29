import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";
import APIResponse from "@/helper/apiResponse";

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isShared: boolean;
  shareLink?: string | null;
  description?: string | null;
  tags: string[];
}

export const useDocument = (id: string | null) => {
  return useQuery<APIResponse, Error>({
    queryKey: ["document", id],
    queryFn: async () => {
      if (!id) throw new Error("Document ID is required");
      try {
        const response = await client.api.documents["document-by-id"]["$get"]({
          query: { id },
        });
        return response.json();
      } catch (error) {
        throw new Error("Failed to fetch document");
      }
    },
  });
};

export const useDocuments = () => {
  return useQuery<APIResponse, Error>({
    queryKey: ["documents"],
    queryFn: async () => {
      const response = await client.api.documents["all-documents"]["$get"]();
      return response.json();
    },
  });
};

type CreateDocumentResponseType = InferResponseType<
  (typeof client.api.documents)["create-document"]["$post"]
>;
type CreateDocumentRequestType = InferRequestType<
  (typeof client.api.documents)["create-document"]["$post"]
>;
export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateDocumentResponseType,
    Error,
    CreateDocumentRequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.documents["create-document"]["$post"]({
        json,
      });
      return response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success(response.message);
      return response;
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Something went wrong while creating document"
      );
    },
  });
};

type UpdateDocumentResponseType = InferResponseType<
  (typeof client.api.documents)["update-document-by-id"]["$post"]
>;
type UpdateDocumentRequestType = InferRequestType<
  (typeof client.api.documents)["update-document-by-id"]["$post"]
>;
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateDocumentResponseType,
    Error,
    UpdateDocumentRequestType
  >({
    mutationFn: async ({ json }) => {
      console.log("Updating document with data:", {
        id: json.id,
        hasContent: !!json.content,
        contentLength: json.content?.length,
        hasTitle: !!json.title,
      });

      const response = await client.api.documents["update-document-by-id"][
        "$post"
      ]({ json });
      return response.json();
    },
    onSuccess: (response, variables) => {
      // Invalidate both the documents list and the specific document
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      if (variables.json.id) {
        queryClient.invalidateQueries({
          queryKey: ["document", variables.json.id],
        });
      }

      // Don't show toast for auto-save to avoid distractions
      if (variables.json.title) {
        toast.success(response.message);
      }
      return response;
    },
    onError: (error: Error) => {
      console.error("Document update failed:", error);
      toast.error(
        error.message || "Something went wrong while updating document"
      );
    },
  });
};

type DeleteDocumentResponseType = InferResponseType<
  (typeof client.api.documents)["delete-document-by-id"]["$post"]
>;
type DeleteDocumentRequestType = InferRequestType<
  (typeof client.api.documents)["delete-document-by-id"]["$post"]
>;
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DeleteDocumentResponseType,
    Error,
    DeleteDocumentRequestType
  >({
    mutationFn: async ({ json }) => {
      const response = await client.api.documents["delete-document-by-id"][
        "$post"
      ]({ json });
      return response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success(response.message);
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Something went wrong while deleting document"
      );
    },
  });
};
