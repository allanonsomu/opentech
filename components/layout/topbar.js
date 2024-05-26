import { classNames } from '@/components/lib/utils/Utils';
import Link from 'next/link';
import pkg from 'package.json';
import { useEffect, useRef } from 'react';

export default function Topbar(props) {
    const versionsRef = useRef(null);
    const versions = [
        {
            name: `v${pkg.version.split('.')[0]}`,
            version: pkg.version,
            url: 'https://www.primereact.org'
        },
        {
            name: 'v9',
            version: '9.6.3',
            url: 'https://v9.primereact.org'
        }
    ];

    {
        /* doc https://docsearch.algolia.com/docs/api/#transformitems */
    }

    function handleDocSearchTransformItems(items) {
        const isLocalhost = process.env.NODE_ENV !== 'production';

        return items.map((item) => {
            if (isLocalhost) {
                const url = new URL(item.url);

                url.protocol = window.location.protocol;
                url.hostname = window.location.hostname;
                url.port = window.location.port;
                item.url = url.toString();
            }

            return item;
        });
    }

    const onMenuButtonClick = () => {
        props.onMenuButtonClick();
    };

    const onConfigButtonClick = () => {
        props.onConfigButtonClick();
    };

    const containerElement = useRef(null);
    const scrollListener = useRef();

    const bindScrollListener = () => {
        scrollListener.current = () => {
            if (containerElement && containerElement.current) {
                if (window.scrollY > 0) {
                    containerElement.current.classList.add('layout-topbar-sticky');
                } else {
                    containerElement.current.classList.remove('layout-topbar-sticky');
                }
            }
        };

        window.addEventListener('scroll', scrollListener.current);
    };

    const unbindScrollListener = () => {
        if (scrollListener.current) {
            window.removeEventListener('scroll', scrollListener.current);
            scrollListener.current = null;
        }
    };

    useEffect(() => {
        bindScrollListener();

        return function unbind() {
            unbindScrollListener();
        };
    }, []);

    const toggleDarkMode = () => {
        props.onDarkSwitchClick();
    };

    return (
        <div ref={containerElement} className="layout-topbar">
            <div className="layout-topbar-inner">

                <ul className="flex list-none m-0 p-0 gap-2 align-items-center">
                    <li>
                        Theme
                    </li>
                    <li>
                        <button
                            type="button"
                            className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary"
                            onClick={toggleDarkMode}
                        >
                            <i className={classNames('pi text-700', { 'pi-moon': props.dark, 'pi-sun': !props.dark })} />
                        </button>
                    </li>

                    {props.showMenuButton && (
                        <li className="menu-button">
                            <button
                                type="button"
                                className="flex flex-shrink-0 px-link border-1 border-solid w-2rem h-2rem surface-border border-round surface-card align-items-center justify-content-center transition-all transition-duration-300 hover:border-primary menu-button"
                                onClick={onMenuButtonClick}
                                aria-haspopup
                                aria-label="Menu"
                            >
                                <i className="pi pi-bars text-700" />
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
