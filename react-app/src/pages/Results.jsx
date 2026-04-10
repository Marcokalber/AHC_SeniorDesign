import React from "react";

const PROPERTY_ARRAY_KEYS = [
    "properties",
    "matched_properties",
    "matching_properties",
    "matches",
    "results",
    "data",
    "items",
    "listings",
];

const LINK_KEYS = [
    "url",
    "link",
    "website",
    "property_url",
    "propertyLink",
    "application_url",
    "apply_url",
];

const IMAGE_KEYS = [
    "image",
    "thumbnail",
    "photo",
    "image_url",
    "thumbnail_url",
    "photos",
    "images",
    "media",
];

function normalizeObject(value) {
    if (!value) return null;
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    }

    return typeof value === "object" ? value : null;
}

function pickLink(item) {
    for (const key of LINK_KEYS) {
        if (typeof item?.[key] === "string" && item[key].trim()) {
            return item[key].trim();
        }
    }

    return "";
}

function pickImage(item) {
    if (!item) return "";

    for (const key of IMAGE_KEYS) {
        const v = item[key];
        if (!v) continue;

        if (typeof v === "string" && v.trim()) return v.trim();

        if (Array.isArray(v) && v.length > 0) {
            const firstStr = v.find((el) => typeof el === "string" && el.trim());
            if (firstStr) return firstStr.trim();

            const firstObj = v.find((el) => typeof el === "object" && el);
            if (firstObj) {
                if (typeof firstObj.url === "string" && firstObj.url.trim()) return firstObj.url.trim();
                if (typeof firstObj.src === "string" && firstObj.src.trim()) return firstObj.src.trim();
            }
        }

        if (typeof v === "object") {
            if (typeof v.url === "string" && v.url.trim()) return v.url.trim();
            if (typeof v.src === "string" && v.src.trim()) return v.src.trim();
        }
    }

    if (item.media && Array.isArray(item.media.photos) && item.media.photos.length) {
        const m = item.media.photos[0];
        if (typeof m === "string") return m;
        if (m && typeof m.url === "string") return m.url;
    }

    return "";
}

// When no image URL is found in the payload, build a friendly Unsplash fallback
// using the city or property name. This is illustrative (not the real property)
// and doesn't require any API key.
function fallbackImage(item) {
    if (!item) return "";

    // try explicit city fields first
    const city = (item.city && String(item.city).trim()) ||
        (item.town && String(item.town).trim()) ||
        // fall back to parsing the address (comma separated) and taking the 2nd token
        (typeof item.address === "string" && item.address.split(",")[1] && item.address.split(",")[1].trim());

    const seed = city || item.name || "apartment";
    const query = encodeURIComponent(`apartment,${seed}`);
    // use Unsplash Source for a simple illustrative image; no API key required
    return `https://source.unsplash.com/640x360/?${query}`;
}

function buildFallbackLink(name, address) {
    const query = [name, address].filter(Boolean).join(" ").trim();
    if (!query) return "";
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function formatAmiPercent(value) {
    if (value === null || value === undefined || value === "") return "N/A";

    if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed) return "N/A";
        if (trimmed.includes("%")) return trimmed;

        const numericFromString = Number(trimmed);
        if (Number.isNaN(numericFromString)) return trimmed;

        const percentValue = numericFromString > 0 && numericFromString <= 1 ? numericFromString * 100 : numericFromString;
        return `${percentValue}%`;
    }

    if (typeof value === "number") {
        if (!Number.isFinite(value)) return "N/A";
        const percentValue = value > 0 && value <= 1 ? value * 100 : value;
        return `${percentValue}%`;
    }

    return String(value);
}

function toPropertyCards(payload) {
    if (!payload || typeof payload !== "object") return [];

    const candidates = [];

    if (Array.isArray(payload)) {
        candidates.push(...payload);
    }

    for (const key of PROPERTY_ARRAY_KEYS) {
        const value = normalizeObject(payload[key]);
        if (Array.isArray(value)) candidates.push(...value);
    }

    if (Array.isArray(payload.results)) {
        candidates.push(...payload.results);
    }

    if (candidates.length === 0 && (payload.name || payload.property_name || payload.address)) {
        candidates.push(payload);
    }

    return candidates
        .filter((item) => item && typeof item === "object")
        .map((item, index) => {
            const name =
                item.property_name ||
                item.propertyName ||
                item.name ||
                item.development_name ||
                `Property ${index + 1}`;

            const address =
                item.address ||
                [item.street, item.city, item.state, item.zip].filter(Boolean).join(", ") ||
                item.location ||
                "Address not provided";

            const ami = item.ami_level || item.ami || item.ami_limit_percent || item.ami_percentage || item.income_limit;

            const units = item.units_available || item.units || item.bedrooms || "N/A";
            const rent = item.rent || item.monthly_rent || item.price || "N/A";
            const link = pickLink(item);
            const fallbackLink = buildFallbackLink(name, address);
            const image = pickImage(item) || fallbackImage(item);

            return {
                id: item.id || item.property_id || `${name}-${index}`,
                name,
                address,
                ami: formatAmiPercent(ami),
                units,
                rent,
                link: link || fallbackLink,
                image,
            };
        });
}

/**
 * Read persisted `housingResults` from localStorage and return normalized property cards.
 */
export function getStoredProperties() {
    let raw = null;
    try {
        raw = localStorage.getItem("housingResults");
    } catch (e) {
        return [];
    }

    let data = null;
    try {
        data = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error("Error parsing housingResults:", err);
        data = null;
    }

    let parsedResults = data?.results;
    if (typeof parsedResults === "string") {
        try {
            parsedResults = JSON.parse(parsedResults);
        } catch {
            // keep as-is
        }
    }

    const displayData = data
        ? {
                ...data,
                ...(data.results !== undefined ? { results: parsedResults } : {}),
            }
        : null;

    return toPropertyCards(displayData);
}

// re-export the parser so other modules can import it
export { toPropertyCards };

export default function Results() {
    const raw = localStorage.getItem("housingResults");
    let data = null;

    try {
        data = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.error("Error parsing housingResults:", err);
    }

    return (
        <div className="container py-5">
            <h2>Results</h2>
            {data ? (
                <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>No hay resultados guardados (localStorage vacío)</p>
            )}
        </div>
    );
}
