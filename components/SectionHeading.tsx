interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, light, className }: Props) {
  return (
    <div className={`text-center mb-12 ${className ?? ''}`}>
      <h2
        className={`font-heading text-4xl md:text-5xl font-semibold mb-4 leading-tight ${
          light ? 'text-brand-600' : 'text-brand-800'
        }`}
      >
        {title}
      </h2>
      <div className="w-10 h-[1px] bg-gold-400/50 mx-auto mb-4" />
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            light ? 'text-brand-500' : 'text-brand-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
