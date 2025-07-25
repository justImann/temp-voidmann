import { FlipWords } from '@/components/ui/flip-words';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/ui/accordion';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { LinkPreview } from '@/components/ui/link-preview';
import { skills } from '@/lib/skills';
import { Badge } from '@/components/ui/badge';

const bgHero = {
  backgroundImage: 'url(/imann.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
const words = [
  'programmer',
  'good student',
  'yapper',
  'designer',
  'human',
  'prodigy',
  'batman',
];

export default function Home() {
  return (
    <>
      <section id="hero" className="flex gap-2">
        <div id="hero-title" className="w-full">
          <h1 className="text-2xl font-bold tracking-tight md:text-5xl flex items-center gap-2">
            Hello, I'm Imann👋🏻{' '}
          </h1>
          <p className="text-xl">
            {' '}
            And I think I am a{' '}
            <FlipWords
              className="px-0 text-pink-500"
              words={words}
              duration={4000}
            />
          </p>
        </div>
        <div
          id="hero-image"
          className="flex shrink-0 size-32 rounded-full"
          style={bgHero}
        />
      </section>

      <section id="about" className="flex-col mt-10">
        <h2 className="text-xl font-bold">Talk about me</h2>
        <div className="text-slate-600 text-sm">
          An information system student on a quest to find himself through the
          lines of code he writes. Active in campus organizations. Famously
          known as a{' '}
          <PointerHighlight
            rectangleClassName="bg-blue-100 border-blue-300 leading-loose"
            // rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block pl-0.5"
          >
            <span className="relative z-10">
              <div className="pr-5">
                <AnimatedTooltip item={{ name: 'prodigy' }} />
              </div>
            </span>
          </PointerHighlight>
          in software engineering by those around him.
        </div>
      </section>
      <section id="experience" className="flex-col mt-10">
        <h2 className="text-xl font-bold">Let's see my experience</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex">
              Product Information
            </AccordionTrigger>
            <AccordionContent className="text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="flex">
              Product Information
            </AccordionTrigger>
            <AccordionContent className="text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section id="certification" className="flex-col mt-4">
        <h2 className="text-xl font-bold">I have a few certifications too!</h2>
        <div id="certification-list" className="">
          <Link
            target="_blank"
            href={'https://instagram.com'}
            className="border-b last:border-b-0 flex flex-1 items-start justify-between py-4 text-left text-sm font-medium transition-all group"
          >
            <LinkPreview url={'https://instagram.com'} className="flex">
              <div className="size-10 rounded-lg border mr-2"></div>
              <div className="flex flex-col ">
                <div className="font-semibold flex items-center [&[data-state=open]>svg]:rotate-90">
                  Delloite
                  <IconArrowRight className="text-blue-500 group-hover:text-orange-400 size-4 shrink-0 -translate-x-1 translate-y-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-rotate-45 " />{' '}
                </div>
                <p className="text-xs text-slate-500">Front-end & UI/UX</p>
              </div>
            </LinkPreview>
            <p className="text-sm text-slate-500">17 Agustus</p>
          </Link>
        </div>
      </section>

      <section id="education" className="flex-col mt-4">
        <h2 className="text-xl font-bold">My Educationnn</h2>
        <div id="education-list" className="">
          <Link
            target="_blank"
            href={'https://instagram.com'}
            className="border-b last:border-b-0 flex flex-1 items-start justify-between py-4 text-left text-sm font-medium transition-all group"
          >
            <LinkPreview url={'https://instagram.com'} className="flex">
              <div className="size-10 rounded-lg border mr-2"></div>
              <div className="flex flex-col ">
                <div className="font-semibold flex items-center [&[data-state=open]>svg]:rotate-90">
                  Delloite
                  <IconArrowRight className="text-blue-500 group-hover:text-orange-400 size-4 shrink-0 -translate-x-1 translate-y-0.5 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-rotate-45 " />{' '}
                </div>
                <p className="text-xs text-slate-500">Front-end & UI/UX</p>
              </div>
            </LinkPreview>
            <p className="text-sm text-slate-500">17 Agustus</p>
          </Link>
        </div>
      </section>

      <section id="skills" className="mt-4 mb-40">
        <h2 className="text-xl font-bold">I'm sure i can work with</h2>
        <div className="flex gap-2 flex-wrap mt-2">
          {skills.map((item) => (
            <Badge
              className="flex items-center justify-center gap-1 pointer-events-none"
              variant={'secondary'}
              key={item.name}
            >
              {item.icon} {item.name}
            </Badge>
          ))}
        </div>
      </section>
    </>
  );
}
