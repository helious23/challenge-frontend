interface IDurationProps {
  options?: string;
  seconds: number;
}

export const Duration: React.FC<IDurationProps> = ({ options, seconds }) => {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={options}>
      {format(seconds)}
    </time>
  );
};

const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

const pad = (string: number) => {
  return ("0" + string).slice(-2);
};
