//  HeaderModal.js

interface headerMenuOptions {
    title: string;
    icon: string;
    href: String;
}

export interface headerProps {
    title: string;
    headerOptions: headerMenuOptions[];
}