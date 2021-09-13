interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="text-red-500 my-1 font-medium text-center">
    {errorMessage}
  </span>
);
