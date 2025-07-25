import { FlipWords } from '@/components/ui/flip-words';
import { PointerHighlight } from '../components/ui/pointer-highlight';
import { AnimatedTooltip } from '../components/ui/animated-tooltip';

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
          <h1 className="text-2xl font-bold tracking-tight md:text-5xl ">
            Hello, I'm Imann 👋🏻
          </h1>
          <p className="text-xl">
            {' '}
            And I think I am a{' '}
            <FlipWords
              className="px-0 text-pink-500"
              words={words}
              duration={5000}
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
        <p className="text-slate-700 text-sm">
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
        </p>
      </section>
    </>
  );
}
