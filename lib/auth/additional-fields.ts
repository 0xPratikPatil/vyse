export const additionalUserFields = {
  timezone: {
    type: "string",
    required: false,
  },
  language: {
    type: "string",
    required: false,
  },
  urls: {
    type: "string[]",
    required: false,
  },
  pronouns: {
    type: "string",
    required: false,
  },
  bio: {
    type: "string",
    required: false,
  },
} as const;
