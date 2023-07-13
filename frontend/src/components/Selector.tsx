import React, { useEffect, useState } from 'react';

import '../styles/Selector.css';

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

  const [dropdownElements, setDropdownElements] = useState<
    React.ReactElement[]
  >([]);

  useEffect(() => {
    // Set the option element to make the site more accessible
    const tempOptionElementArray = options.map((option) => {
      return (
        <option value={Clean(option)} className="hide-element">
          {option}
        </option>
      );
    });

    setOptionElements(tempOptionElementArray);

    // Now create the elements the user will actually see
    const tempDropdownElementArray = options.map((option) => {
      return (
        <span className={`dropdownElement ${Clean(option)}`}>{option}</span>
      );
    });

    setDropdownElements(tempDropdownElementArray);
  }, [options]);

  const Clean = (string: string) =>
    string.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '');

  return (
    <>
      <div className="selector">{dropdownElements}</div>

      <select name={name} id={name} className="hide-element">
        {optionElements}
      </select>
    </>
  );
}
