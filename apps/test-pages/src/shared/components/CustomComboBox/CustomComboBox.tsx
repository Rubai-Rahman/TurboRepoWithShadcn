import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover';
import { Check } from 'lucide-react';
import { Command, CommandGroup, CommandItem } from '@shadcn/command';
import { cn } from '@lib/utils';
import { IoIosArrowDown } from 'react-icons/io';

function CustomComboBox({
  maxWidth = 'w-full',
  label,
  labelClass,
  buttonClass = 'border border-gray-300 py-1 w-full',
  staticPlaceholder = 'Please Select...',
  data,
  showIcon,
  showSelectedIcon,
  buttonIconHide = false,
  dropdownClass = 'w-[380px]',
}: {
  maxWidth?: string;
  label?: string;
  labelClass?: string;
  buttonClass?: string;
  staticPlaceholder?: string;
  data: { value: string; label: string }[];
  buttonIconHide?: boolean;
  dropdownClass?: string;
  showIcon?: boolean;
  showSelectedIcon?: boolean;
}) {
  const [open, setOpen] = useState(false);

  //! main state
  const [selected, setSelected] = useState(
    staticPlaceholder ? staticPlaceholder : data[0].label
  );

  return (
    <div className={`${maxWidth && maxWidth}`}>
      {label ? (
        <p
          className={`text-small font-medium leading-4 text-grayCustom px-4 my-1 ${labelClass}`}
        >
          {label}
        </p>
      ) : null}
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          asChild
          className={`relative pl-3 pr-10 text-left text-grayCustom ${buttonClass}`}
          defaultValue="astro"
        >
          <span
            className={`${maxWidth} border border-gray-300 rounded-md px-3 py-1 flex justify-between items-center cursor-pointer`}
          >
            {selected}
            {!buttonIconHide && (
              <IoIosArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </span>
        </PopoverTrigger>
        <PopoverContent className={`p-0 ${dropdownClass}`}>
          <Command>
            <CommandGroup className="p-0">
              {data.map(
                (item: { value: string; label: string }, index: number) => (
                  <CommandItem
                    key={index}
                    onSelect={(currentValue) => {
                      setSelected(
                        currentValue === label ? selected : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selected === item.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />

                    {item.label}
                  </CommandItem>
                )
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CustomComboBox;
