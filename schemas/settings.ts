import { z } from "zod";

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  pronouns: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) =>
        value === null ||
        ["unspecified", "he/him", "she/her", "they/them"].includes(
          value as string
        ),
      {
        message: "Please select a valid pronoun option",
      }
    ),
  bio: z.string().max(160).min(4).nullable().optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .nullable()
    .optional(),
});

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  timezone: z
    .string()
    .min(3, "Please select valid timezone.")
    .nullable()
    .optional(),

  // dob: z.date({
  //     required_error: "A date of birth is required.",
  // }).nullable().optional(),

  language: z
    .string({
      required_error: "Please select a language.",
    })
    .nullable()
    .optional(),
});

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const submitTicketFormSchema = z.object({
  category: z.string({
    required_error: "Please select a category.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  // attachments: z
  //   .custom<FileList>()
  //   .refine((files) => files.length <= 3, "You can upload up to 3 files.")
  //   .refine(
  //     (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
  //     `Each file size should be less than 5MB.`
  //   )
  //   .refine(
  //     (files) =>
  //       Array.from(files).every((file) =>
  //         ACCEPTED_FILE_TYPES.includes(file.type)
  //       ),
  //     "Only .jpg, .jpeg, .png, .pdf, .doc and .docx formats are supported."
  //   )
  //   .optional(),
  priority: z.string({
    required_error: "Please select a priority.",
  }),
});
