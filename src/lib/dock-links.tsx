import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
  IconCode,
  IconUser,
  IconMail,
} from '@tabler/icons-react';

export const portfolioLinks = [
  {
    title: 'LinkedIn',
    icon: (
      <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://www.linkedin.com/in/YOUR_PROFILE/',
  },
  {
    title: 'GitHub',
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://github.com/YOUR_USERNAME',
  },
  {
    title: 'Instagram',
    icon: (
      <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: 'https://www.instagram.com/YOUR_USERNAME/',
  },
  {
    title: 'Projects',
    icon: (
      <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: '#projects',
  },
  {
    title: 'About Me',
    icon: (
      <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: '#about',
  },
  {
    title: 'Contact',
    icon: (
      <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: '#contact',
  },
];
