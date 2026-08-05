type MessageTemplate = {
  name: string;
  copy: string;
};
export const TEMPLATES_SINGLE: MessageTemplate[] = [
  {
    name: "Dinner tonight",
    copy: "I've booked this restaurant for dinner tonight at X.XXpm - {link}.",
  },
  {
    name: "Go here tonight?",
    copy: "Do you want to go here tonight? {link}",
  },
  {
    name: "Been before?",
    copy: "Have you been here before? I would like to go. {link}",
  },
  {
    name: "Lunch",
    copy: "I was thinking to go here for lunch today/tomorrow. Would you like to come? {link}",
  },
  {
    name: "Birthday",
    copy: "You're invited to my birthday this weekend on Saturday/Sunday @ 8pm. Here's the link: {link}",
  },
];
export const TEMPLATES_MULTIPLE: MessageTemplate[] = [
  {
    name: "Dinner tonight",
    copy: "Here's the recommendations for tonight: \n\n1. {link}\n\n2. {link}.",
  },
  {
    name: "Lunch today",
    copy: "Do you want to go for lunch today? Here are some options: \n\n1. {link}\n\n2. {link}.",
  },
];
export const FAKE_LINK = "https://maps.app.goo.gl/a1b2c3d4e5f6";
