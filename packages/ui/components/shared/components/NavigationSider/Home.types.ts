import { ReactElement } from 'react';

// export interface NavigationType {
//     defaultTitle:string;
//     defaultIcon: ReactElement;
//     defaultValue:[
//         { name: string, icon: ReactElement, href: ReactElement, current: boolean },
//     ]
//     inboxTitle:string;
//     inboxValue:[
//         { name: string, icon: ReactElement, href: ReactElement, current: boolean, count: number },
//     ]
//     teamsTitile:string;
//     folderTitle:string;
//     primary_color: string;
//     addIcon:ReactElement;
//   }

export interface NavigationSidebarType {
  // closeIcon:ReactElement;
  // plusIcon:ReactElement;
  // searchIcon?:ReactElement;
  firstBlockTitle: string;
  firstBlock: [
    {
      name: string;
      icon: ReactElement;
      href: ReactElement;
      current: boolean;
      children?: [{ name: ReactElement; href: ReactElement }];
    }
  ];
  secondBlockTitle?: string;
  secondBlock?: [
    { name: string; icon: ReactElement; href: ReactElement; current: boolean }
  ];
  thirdBlockTitle?: string;
  thirdBlock?: [
    {
      name: string;
      icon: ReactElement;
      href: ReactElement;
      color: string;
      current: boolean;
    }
  ];
  fourthBlockTitle?: string;
  fourthBlock?: [
    { name: string; icon: ReactElement; href: ReactElement; current: boolean }
  ];
  fiveBlockTitle?: string;
  fiveBlock?: [
    { name: string; icon: ReactElement; href: ReactElement; current: boolean }
  ];
}
