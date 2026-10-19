// Refreshes the project screenshots shown on the portfolio.
// Reads every <img src=".../screenshots/<slug>.jpg" data-screenshot="<live url>"> in index.html,
// asks Microlink for a fresh 1280x800 JPEG of each live site, and writes <slug>.jpg into the output folder.
// A screenshot that fails keeps the previous file, so the site never loses an image.
//
// Usage: node scripts/update-screenshots.mjs <index.html> <output dir>
// Optional env: MICROLINK_API_KEY (uses the Pro endpoint and its higher limit)

import { readFile, writeFile, readdir, unlink, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const [htmlPath = 'index.html', outDir = 'shots'] = process.argv.slice(2);
const apiKey = process.env.MICROLINK_API_KEY;
const MIN_BYTES = 15_000; // smaller than this is a Microlink placeholder, not a real page

const html = await readFile(htmlPath, 'utf8');
const shots = [...html.matchAll(/src="[^"]*\/screenshots\/([a-z0-9-]+)\.jpg"\s+data-screenshot="([^"]+)"/g)]
    .map(([, slug, url]) => ({ slug, url }));

if (shots.length === 0) {
    console.error('No screenshot images found in', htmlPath);
    process.exit(1);
}

await mkdir(outDir, { recursive: true });

async function capture(pageUrl) {
    const endpoint = new URL(apiKey ? 'https://pro.microlink.io/' : 'https://api.microlink.io/');
    endpoint.searchParams.set('url', pageUrl);
    endpoint.searchParams.set('screenshot', 'true');
    endpoint.searchParams.set('meta', 'false');
    endpoint.searchParams.set('force', 'true');
    endpoint.searchParams.set('viewport.width', '1280');
    endpoint.searchParams.set('viewport.height', '800');
    endpoint.searchParams.set('viewport.deviceScaleFactor', '1');
    endpoint.searchParams.set('screenshot.type', 'jpeg');

    const response = await fetch(endpoint, { headers: apiKey ? { 'x-api-key': apiKey } : {} });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload.status !== 'success' || !payload.data?.screenshot?.url) {
        throw new Error(`Microlink ${response.status} ${payload.code ?? ''} ${payload.message ?? ''}`.trim());
    }

    const image = await fetch(payload.data.screenshot.url);
    if (!image.ok) throw new Error(`image download ${image.status}`);
    const bytes = Buffer.from(await image.arrayBuffer());
    if (bytes.length < MIN_BYTES) throw new Error(`image too small (${bytes.length} bytes)`);
    return bytes;
}

let failures = 0;
for (const { slug, url } of shots) {
    let lastError;
    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            const bytes = await capture(url);
            await writeFile(join(outDir, `${slug}.jpg`), bytes);
            console.log(`ok    ${slug}  ${Math.round(bytes.length / 1024)} KB  ${url}`);
            lastError = null;
            break;
        } catch (error) {
            lastError = error;
            if (attempt === 1) await new Promise(r => setTimeout(r, 5000));
        }
    }
    if (lastError) {
        failures++;
        console.warn(`keep  ${slug}  (${lastError.message})`);
    }
}

// Drop screenshots for projects no longer on the page
const wanted = new Set(shots.map(s => `${s.slug}.jpg`));
for (const file of await readdir(outDir)) {
    if (file.endsWith('.jpg') && !wanted.has(file)) {
        await unlink(join(outDir, file));
        console.log(`drop  ${file}`);
    }
}

console.log(`${shots.length - failures}/${shots.length} screenshots refreshed`);
