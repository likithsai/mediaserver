//  Header.js

import React from "react";

const Header = (props) => {
    return (
        <header>
            <nav class="tw-bg-white tw-border-gray-200 tw-px-4 lg:tw-px-6 tw-py-2.5 dark:tw-bg-gray-800">
                <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mx-auto tw-max-w-screen-xl">
                    <a href="https://flowbite.com" class="tw-flex tw-items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" class="tw-mr-3 tw-h-6 sm:tw-h-9" alt="Flowbite Logo" />
                        <span class="tw-self-center tw-text-xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white">Flowbite</span>
                    </a>
                    <div class="tw-flex tw-items-center lg:tw-order-2">
                        <a href="#" class="tw-text-gray-800 dark:tw-text-white hover:tw-bg-gray-50 focus:tw-ring-4 focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                        <a href="#" class="tw-text-white tw-bg-primary-700 hover:tw-bg-primary-800 focus:tw-ring-4 focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
                        <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span class="tw-sr-only">Open main menu</span>
                            <svg class="tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            <svg class="tw-hidden tw-w-6 tw-h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div class="tw-hidden tw-justify-between tw-items-center tw-w-full lg:tw-flex lg:tw-w-auto lg:tw-order-1" id="mobile-menu-2">
                        <ul class="tw-flex tw-flex-col tw-mt-4 tw-font-medium lg:tw-flex-row lg:tw-space-x-8 lg:tw-mt-0">
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-white tw-rounded tw-bg-primary-700 lg:tw-bg-transparent lg:tw-text-primary-700 lg:tw-p-0 dark:tw-text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-gray-700 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 lg:hover:tw-bg-transparent lg:tw-border-0 lg:hover:tw-text-primary-700 lg:tw-p-0 dark:tw-text-gray-400 lg:dark:hover:tw-text-white dark:hover:tw-bg-gray-700 dark:hover:tw-text-white lg:dark:hover:tw-bg-transparent dark:tw-border-gray-700">Company</a>
                            </li>
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-gray-700 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 lg:hover:tw-bg-transparent lg:tw-border-0 lg:hover:tw-text-primary-700 lg:tw-p-0 dark:tw-text-gray-400 lg:dark:hover:tw-text-white dark:hover:tw-bg-gray-700 dark:hover:tw-text-white lg:dark:hover:tw-bg-transparent dark:tw-border-gray-700">Marketplace</a>
                            </li>
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-gray-700 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 lg:hover:tw-bg-transparent lg:tw-border-0 lg:hover:tw-text-primary-700 lg:tw-p-0 dark:tw-text-gray-400 lg:dark:hover:tw-text-white dark:hover:tw-bg-gray-700 dark:hover:tw-text-white lg:dark:hover:tw-bg-transparent dark:tw-border-gray-700">Features</a>
                            </li>
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-gray-700 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 lg:hover:tw-bg-transparent lg:tw-border-0 lg:hover:tw-text-primary-700 lg:tw-p-0 dark:tw-text-gray-400 lg:dark:hover:tw-text-white dark:hover:tw-bg-gray-700 dark:hover:tw-text-white lg:dark:hover:tw-bg-transparent dark:tw-border-gray-700">Team</a>
                            </li>
                            <li>
                                <a href="#" class="tw-block tw-py-2 tw-pr-4 tw-pl-3 tw-text-gray-700 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 lg:hover:tw-bg-transparent lg:tw-border-0 lg:hover:tw-text-primary-700 lg:tw-p-0 dark:tw-text-gray-400 lg:dark:hover:tw-text-white dark:hover:tw-bg-gray-700 dark:hover:tw-text-white lg:dark:hover:tw-bg-transparent dark:tw-border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;