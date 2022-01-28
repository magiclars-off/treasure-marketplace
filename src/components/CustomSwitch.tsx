import { Switch } from "@headlessui/react";
import { FC, useState } from "react";

interface ISwitch {
  label?: string;
  defaultValue: boolean;
  toggled: (boolean) => void;
}

const CustomSwitch: FC<ISwitch> = ({ label, defaultValue, toggled }) => {
  const [checked, isChecked] = useState(defaultValue);

  const handleToggle = (checked: boolean) => {
    isChecked(checked);
    toggled(checked);
  };

  return (
    <Switch.Group>
      <div className="flex items-center justify-between py-6 w-full">
        {label && (
          <Switch.Label className="text-sm font-medium mr-1" passive>
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={checked}
          onChange={handleToggle}
          className={`${
            checked ? "bg-red-500" : "bg-gray-200"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } transition ease-in-out duration-200 inline-flex w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default CustomSwitch;
