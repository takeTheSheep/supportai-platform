import sanitizeHtml from "sanitize-html";

export const sanitizeText = (input: string) =>
  sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: "discard"
  }).trim();

