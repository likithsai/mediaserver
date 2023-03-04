//  HeaderModal.js

interface headerMenuOptions {
    menuOptionTitle: string;
    menuOptionIcon: string;
}

export interface headerProps {
    title: string;
    menuOptions: headerMenuOptions[];
}