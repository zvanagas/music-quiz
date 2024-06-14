type Props = {
  text: string;
  type?: 'success' | 'error';
};

export const Toast = ({ text, type = 'success' }: Props) => {
  if (!text) {
    return null;
  }

  const getClasses = () => {
    let classes = 'absolute bottom-0 p-2 w-full rounded-t';
    switch (type) {
      case 'success': {
        classes += ' bg-green-500';
        break;
      }
      case 'error': {
        classes += ' bg-red-500';
        break;
      }
    }

    return classes;
  };

  return <div className={getClasses()}>{text}</div>;
};
