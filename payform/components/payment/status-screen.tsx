export function StatusScreen({
  icon,
  iconClassName,
  title,
  message,
  action,
  children,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  message: string;
  action?: { label: string; href?: string; onClick?: () => void };
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconClassName}`}>{icon}</div>
      <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {children}
      {action && (
        <a
          href={action.href ?? "#"}
          onClick={action.onClick}
          className="mt-6 flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-foreground"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
