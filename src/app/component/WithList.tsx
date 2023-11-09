import React, { isValidElement } from "react";

export default function WithList(array: any[]) {
  const List = (props: any) => {
    return (
      <ul {...props}>
        {array.map((Item, index) => (
          <li key={index}>{isValidElement(<Item />) ? <Item /> : Item}</li>
        ))}
      </ul>
    );
  };

  return List;
}
