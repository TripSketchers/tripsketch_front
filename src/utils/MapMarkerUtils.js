export const createPinMarkerIcon = (number, color = "#1976d2") => ({
	url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="70" viewBox="0 0 40 60">
            <path d="M20 0C9 0 0 9 0 20c0 11.6 18 38.5 19.1 40.2a1.2 1.2 0 002 0C22 58.5 40 31.6 40 20c0-11-9-20-20-20z" fill="${color}"/>
            <circle cx="20" cy="20" r="15" fill="white"/>
            <text x="20" y="25" text-anchor="middle" font-size="16" fill="${color}" font-weight="bold" font-family="Arial">${number}</text>
        </svg>
    `)}`,
	scaledSize: new window.google.maps.Size(28, 48),
	anchor: new window.google.maps.Point(14, 48),
});

export const createBedMarkerIcon = (color = "#1976d2") => ({
	url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="70" viewBox="0 0 40 60">
            <path d="M20 0C9 0 0 9 0 20c0 11.6 18 38.5 19.1 40.2a1.2 1.2 0 002 0C22 58.5 40 31.6 40 20c0-11-9-20-20-20z" fill="${color}" />
            <circle cx="20" cy="20" r="15" fill="white" />
            <g transform="translate(12, 14)" fill="${color}">
                <rect x="0" y="5" width="16" height="5" rx="1" />
                <rect x="0" y="1" width="7" height="4" rx="1" />
                <rect x="0" y="10" width="2" height="2" />
                <rect x="14" y="10" width="2" height="2" />
            </g>
        </svg>
    `)}`,
	scaledSize: new window.google.maps.Size(30, 70),
	anchor: new window.google.maps.Point(15, 70),
});

export const createPinMarkerIconWithDayAndIndex = (
	day,
	index,
	color = "#1976d2"
) => ({
	url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="70" viewBox="0 0 40 60">
            <path d="M20 0C9 0 0 9 0 20c0 11.6 18 38.5 19.1 40.2a1.2 1.2 0 002 0C22 58.5 40 31.6 40 20c0-11-9-20-20-20z" fill="${color}" />
            <circle cx="20" cy="20" r="15" fill="white" />
            <text x="20" y="25" text-anchor="middle" font-size="14" fill="${color}" font-family="Arial" font-weight="bold">${day}-${index}</text>
        </svg>
    `)}`,
	scaledSize: new window.google.maps.Size(30, 70),
	anchor: new window.google.maps.Point(15, 70),
});

export const dayColors = [
	"#d21919", // 1일차
	"#eb751c", // 2일차
	"#fbc02d", // 3일차
	"#79d32f", // 4일차
	"#1fa297", // 5일차
	"#0288d1", // 6일차
	"#7e18c2", // 7일차
	"#ff00e1", // 8일차
	"#8e384c", // 9일차
	"#455a64", // 10일차
];
