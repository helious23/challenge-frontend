interface IFormErrorProps {
  errorMessage: string;
  options?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({
  errorMessage,
  options,
}) => (
  <span className={`text-red-500 my-1 font-medium text-center ${options}`}>
    {errorMessage}
  </span>
);
