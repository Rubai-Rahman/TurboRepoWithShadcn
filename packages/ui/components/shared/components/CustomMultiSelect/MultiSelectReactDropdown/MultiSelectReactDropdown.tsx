import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

const MultiSelectReactDropdown = () => {
  const options = [
    { name: 'Team Facebook', id: 1 },
    { name: 'Team Twitter', id: 2 },
    { name: 'Team Whatsapp', id: 3 },
    { name: 'Team Messenger', id: 4 },
  ];
  const onSelect = (selectedList, selectedItem) => {};

  const onRemove = (selectedList, removedItem) => {};
  return (
    <div className="w-1/4">
      {/*       <Multiselect
        displayValue="key"
        onKeyPressFn={function noRefCheck() {}}
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={[
          {
            cat: "Group 1",
            key: "Option 1",
          },
          {
            cat: "Group 1",
            key: "Option 2",
          },
          {
            cat: "Group 1",
            key: "Option 3",
          },
          {
            cat: "Group 2",
            key: "Option 4",
          },
          {
            cat: "Group 2",
            key: "Option 5",
          },
          {
            cat: "Group 2",
            key: "Option 6",
          },
          {
            cat: "Group 2",
            key: "Option 7",
          },
        ]}
        showCheckbox
      /> */}

      <Multiselect
        options={options} // Options to display in the dropdown
        // selectedValues={options[0].name} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
        showCheckbox
      />
    </div>
  );
};

export default MultiSelectReactDropdown;
