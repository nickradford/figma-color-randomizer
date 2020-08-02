type FigmaPluginCommandHandler = (args?: any) => void;

type FigmaPluginCommandValidator = (
  fn: FigmaPluginCommandHandler,
  ...args: any[]
) => void;
