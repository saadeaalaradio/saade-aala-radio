export interface SocialLink {
  platform: string;
  url: string;
}

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  journey: string;
  quote: string;
  socials: SocialLink[];
}

export interface StoryPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  thumbnailUrl: string;
  summary: string;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
  searchTags: string[];
}

export interface SiteConfig {
  headerLogoUrl: string;
  footerLogoUrl: string;
  mainSocials: SocialLink[];
  hosts: Record<string, HostProfile>;
  stories: StoryPost[];
}

export const initialSiteConfig: SiteConfig = {
  headerLogoUrl: "/logo-placeholder.png",
  footerLogoUrl: "/logo-placeholder.png",
  mainSocials: [
    { platform: "YouTube", url: "https://www.youtube.com/@SaadeAalaRadio" },
    { platform: "Spotify", url: "https://open.spotify.com/show/3voSKp0xDQSbzMNVxf239H" },
    { platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" },
    { platform: "Facebook", url: "https://www.facebook.com/SaadeAalaRadio" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/showcase/saade-aala-radio" },
    { platform: "Snapchat", url: "https://www.snapchat.com/add/saadeaalaradio" },
  ],
  hosts: {
    harshdeep: {
      id: "harshdeep",
      name: "Harshdeep Singh",
      role: "Lead Anchor & Chaos Director",
      photoUrl: "/hosts/harshdeep.png",
      journey: "From running wild production sets to co-founding Saade Aala Radio, Harshdeep brings the unfiltered energy and chaotic stories that keep every episode completely unpredictable.",
      quote: "Tension nahi leni, story poori sun ke jaani aa!",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
    sarabjeet: {
      id: "sarabjeet",
      name: "Sarabjeet Singh",
      role: "Co-Host & Comeback King",
      photoUrl: "/hosts/sarabjeet.png",
      journey: "Sarabjeet is the anchor of reality—until he snaps with one-liners that shatter the room. Known for his sharp timing and hilarious comebacks.",
      quote: "Ehne gall shuru kiti si, khatam main karunga!",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
    sandeep: {
      id: "sandeep",
      name: "Sandeep Singh",
      role: "Co-Host & Cunning Strategist",
      photoUrl: "/hosts/sandeep.png",
      journey: "The quiet genius behind the craziest takes. Sandeep sits back, observes the chaos, and drops punchlines when you least expect it.",
      quote: "Dimaag thoda ghumaya karo, mazaa fir hi aaunda.",
      socials: [{ platform: "Instagram", url: "https://www.instagram.com/saadeaalaradio" }],
    },
  },
  stories: [],
};