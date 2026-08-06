/**
 * Image slots.
 *
 * Every slot renders a visible, labelled placeholder until the file exists and
 * `available` is flipped to true. Nothing here fabricates a screenshot or a
 * mockup — an empty slot says what belongs in it.
 *
 * To fill one: drop the file at the given path, set `available: true`, and
 * write real alt text. See README.md → "Replacing images".
 */

export type MediaSlot = {
  src: string;
  alt: string;
  available: boolean;
  /** Shown inside the placeholder frame so the missing file is unambiguous. */
  note: string;
  ratio: string;
};

export const portrait: MediaSlot = {
  src: "/images/profile/evode-manirahari.jpg",
  alt: "Evode Manirahari",
  available: false,
  note: "Portrait — documentary style, working or on site. Not a headshot on a plain background.",
  ratio: "4 / 5",
};

export const aboutPortrait: MediaSlot = {
  src: "/images/profile/evode-manirahari-about.jpg",
  alt: "Evode Manirahari",
  available: false,
  note: "Second portrait or working photograph for the about page.",
  ratio: "3 / 2",
};
