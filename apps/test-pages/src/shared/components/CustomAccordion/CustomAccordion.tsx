import Image from "next/image";
import { ReactElement, ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@shadcn/accordion";

const CustomAccordion = ({
  title,
  subTitle,
  count,
  buttonClass = "w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium",
  titleClass,
  subTitleClass,
  rightSideIcon,
  rightSideIconClass,
  rightSideIconRotation,
  rightSideTitle,
  rightSideTitleClass,
  children,
  leftSideIcon,
  leftSideIconParentClass,
  imageSrc,
  imageHeight,
  imageWidth,
}: {
  /** 
         @param title - should only pass string, number or span tag 
        */
  title?: any;
  count?: number;
  buttonClass?: string;
  titleClass?: string;
  subTitle?: string;
  subTitleClass?: string;
  rightSideIcon?: ReactElement;
  rightSideIconClass?: string;
  rightSideTitle?: string;
  rightSideTitleClass?: string;
  rightSideIconRotation?: string;
  children: ReactNode;
  leftSideIcon?: ReactElement;
  leftSideIconParentClass?: string;
  imageSrc?: string;
  imageHeight?: number;
  imageWidth?: number;
}) => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-x-4 items-center">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt=""
                  height={imageHeight}
                  width={imageWidth}
                />
              )}
              {leftSideIcon && (
                <div className={leftSideIconParentClass}>{leftSideIcon}</div>
              )}
              <div>
                <div className="flex items-center gap-x-4">
                  {title ? (
                    <p
                      className={`text-normal leading-6 font-semibold text-textDark capitalize ${titleClass}`}
                    >
                      {title}
                    </p>
                  ) : (
                    "Click Me"
                  )}
                  {count && (
                    <p className="bg-blueCustom/10 text-blueCustom text-xs h-5 w-5 rounded-full flex justify-center items-center">
                      {count}
                    </p>
                  )}
                </div>

                {subTitle && <p className={subTitleClass}>{subTitle}</p>}
              </div>
            </div>

            <div className="flex gap-x-4 items-center">
              {rightSideTitle && (
                <p className={rightSideTitleClass}>{rightSideTitle}</p>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
