import pkg from 'package.json';

export default function Footer() {
    const version = pkg.version;

    return (
        <div className="layout-footer">
            <div>
                <span>OpenTech Interview Test sent by </span>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    Allan Onsomu.
                </a>
                <span> Developed Using Next Js, Express Js and Primereact version {version}</span>
            </div>
        </div>
    );
}
