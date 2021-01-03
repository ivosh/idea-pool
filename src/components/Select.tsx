import React, { CSSProperties } from 'react';
import { useField } from 'formik';
import ReactSelect from 'react-select';

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];

interface SelectProps {
  name: string;
  value: number;
}

const customStyles = {
  container: (base: CSSProperties): CSSProperties => ({
    ...base,
    width: '65px',
  }),
};

export default function Select(props: SelectProps): JSX.Element {
  const { name, value } = props;
  const foundOption = options.find((element) => element.value === value);

  const [, , helpers] = useField(name);
  const { setValue } = helpers;

  return (
    <ReactSelect
      components={{ IndicatorSeparator: null }}
      isClearable={false}
      name={name}
      onChange={(option) => setValue(option?.value)}
      options={options}
      styles={customStyles}
      value={foundOption}
    />
  );
}
