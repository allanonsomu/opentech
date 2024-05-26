import { classNames } from '@/components/lib/utils/Utils';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DocSectionNav } from './docsectionnav';
import { DocSections } from './docsections';

export function DocComponent(props) {
    const [tab, setTab] = useState(0);
    const router = useRouter();
    let header;

    if (props.header.startsWith('use')) {
        header = 'HOOK';
    } else if (props.header === 'PassThrough' || props.header === 'Configuration') {
        header = 'OVERVIEW';
    } else {
        header = 'FEATURES';
    }

    const activateTab = (i) => {
        setTab(i);
        router.replace(router.pathname);
    };

    useEffect(() => {
        if (router.asPath.includes('#api')) {
            setTab(1);
        }

        if (router.asPath.includes('#pt')) {
            setTab(3);
        }
    }, [router.asPath]);

    return (
        <div className={classNames(props.className, 'doc-component')}>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <div className="doc-tabpanels">
                {tab === 0 ? (
                    <div className="doc-tabpanel">
                        <div className="doc-main">
                            <div className="doc-intro">
                                <h1>{props.header}</h1>
                                <p dangerouslySetInnerHTML={{ __html: props.description }} />
                            </div>
                            <DocSections docs={props.componentDocs} />
                        </div>
                        <DocSectionNav docs={props.componentDocs} />
                    </div>
                ) : null}
                {tab === 2 ? (
                    <>
                        {props.themingDocs ? (
                            <div className="doc-tabpanel">
                                <div className="doc-main">
                                    <div className="doc-intro">
                                        <h1>{props.header} Theming</h1>
                                    </div>
                                    <DocSections docs={props.themingDocs} />
                                </div>
                                <DocSectionNav docs={props.themingDocs} />
                            </div>
                        ) : null}
                    </>
                ) : null}
                {tab === 3 ? (
                    <>
                        {props.ptDocs ? (
                            <div className="doc-tabpanel">
                                <div className="doc-main">
                                    <div className="doc-intro">
                                        <h1>{props.header} Pass Through</h1>
                                        <p>{props.ptDescription}</p>
                                    </div>
                                    <DocSections docs={props.ptDocs} />
                                </div>
                                <DocSectionNav docs={props.ptDocs} />
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
        </div>
    );
}
