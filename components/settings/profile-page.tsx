"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Loader2, X, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileFormSchema } from "@/schemas/settings";
import { Session } from "@/types/auth";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/auth-client";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/features/settings/api/update-profile";

const SettingsProfilePage = ({ session }: { session: Session }) => {
  if (!session) return redirect("/login");

  const { mutate } = updateProfile();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session.user.name,
      pronouns: session.user.pronouns,
      bio: session.user.bio ?? "",
      urls: session.user.urls?.map((url) => ({ value: url })) as {
        value: string;
      }[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    mutate({ json: values });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 sm:flex ">
              <AvatarImage
                src={session.user.image || "#"}
                alt="Avatar"
                className="object-cover"
              />
              <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-sm">{session.user.email}</p>
            </div>
          </div>
          <EditAvatar />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile and
                    in emails.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="pronouns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your pronouns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unspecified">
                          Don&apos;t specify
                        </SelectItem>
                        <SelectItem value="he/him">he/him</SelectItem>
                        <SelectItem value="she/her">she/her</SelectItem>
                        <SelectItem value="they/them">they/them</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Please specify your preferred pronouns for identification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief professional summary."
                      className="resize-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a concise summary of your professional background.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>URLs</FormLabel>
              <FormDescription>
                Include links to relevant professional profiles or websites.
              </FormDescription>
              {/* URL input fields */}
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormControl className="flex-1">
                          <Input {...field} />
                        </FormControl>
                        <span
                          className="cursor-pointer text-red-600 ml-2"
                          onClick={() => remove(index)}
                        >
                          <Trash2 size={20} />
                        </span>
                      </div>
                      <FormDescription>
                        Enter a valid URL for your professional online presence.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {/* Add URL button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: "" })}
              >
                Add URL
              </Button>
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsProfilePage;

const EditAvatar = () => {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2" variant="secondary">
          <Edit size={13} />
          <span className="hidden sm:inline">Edit Avatar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-full max-w-xs sm:w-11/12 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Edit Avatar</DialogTitle>
          <DialogDescription>Edit profile image</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image</Label>
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 w-full">
              {imagePreview && (
                <div className="relative w-20 h-20 rounded-sm overflow-hidden mb-2 sm:mb-0">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-muted-foreground"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
          <Button
            className="w-full sm:w-auto"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await authClient.updateUser({
                image: image ? await convertImageToBase64(image) : undefined,
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("User profile updated successfully");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              });
              router.refresh();
              setImage(null);
              setImagePreview(null);
              setIsLoading(false);
              setOpen(false);
            }}
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant="destructive"
            onClick={async () => {
              setIsLoading(true);
              await authClient.updateUser({
                image: undefined,
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Avatar removed successfully");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              });
              router.refresh();
              setImage(null);
              setImagePreview(null);
              setIsLoading(false);
              setOpen(false);
            }}
          >
            {isLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              "Remove Avatar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const convertImageToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
