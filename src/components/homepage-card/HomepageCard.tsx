type HomepageCardProps = {
  href: string;
  title: string;
  description: string;
};

export const HomepageCard = ({
  href,
  title,
  description,
}: HomepageCardProps) => (
  <a
    href={href}
    className="m-4 max-w-[300px] rounded-xl border border-slate-200 p-6 text-left text-inherit no-underline transition-colors hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 active:border-blue-600 active:text-blue-600"
    target="_blank"
    rel="noreferrer"
  >
    <h2 className="mb-4 text-2xl">{title} &rarr;</h2>
    <p className="m-0 text-xl leading-6">{description}</p>
  </a>
);
