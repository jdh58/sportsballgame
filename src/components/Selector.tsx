import React, { useEffect, useState } from 'react';

export default function Selector({
  name,
  options,
}: {
  name: string;
  options: string[];
}) {
  const [optionElements, setOptionElements] = useState<React.ReactElement[]>(
    []
  );

  useEffect(() => {
    const tempOptionElementArray = options.map((option) => {
      return <option value={Clean(option)}>{option}</option>;
    });

    setOptionElements(tempOptionElementArray);
  }, [options]);

  const Clean = (string: string) =>
    string.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');

  return (
    <select name={name} id={name} className="selector">
      {optionElements}
    </select>
  );
}
