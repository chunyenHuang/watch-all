/* eslint-disable require-jsdoc */
import csvText from './data/taiwan-2026-election-streams.csv?raw';

const CUSTOM_KEY = 'electionCatalogCustom';

export function parseElectionCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, '');

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char !== '\r') {
      cell += char;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [header, ...body] = rows.filter((record) => record.some((value) => value.trim()));
  return body.map((cols, index) => {
    const record = {};
    header.forEach((key, colIndex) => {
      record[key] = cols[colIndex] || '';
    });
    const url = (record.watch_url || record.youtube_url || '').trim();
    const videoId = (record.video_id || '').trim();
    const iframe = (record.iframe_src || '').trim();
    const schedule = (record.scheduled_start_taipei || '').replace('T', ' ').replace(/:00\+08:00$/, '');
    const notes = [schedule, record.notes].filter(Boolean).join(' · ');
    return {
      id: videoId || `builtin-${index}`,
      name: record.channel,
      url,
      notes,
      streamType: record.stream_type || 'news_fallback',
      custom: false,
      available: url.startsWith('http') && videoId.length > 0 && iframe.startsWith('http'),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
}

export const builtinItems = parseElectionCsv(csvText);

const isYouTubeUrl = (url) => /(?:youtube\.com|youtu\.be)/i.test(url);

export function pickOnePerStation(items, failedUrls = {}) {
  const chosen = [];
  const seen = new Set();
  items.forEach((item) => {
    if (chosen.length >= 9 || !item || seen.has(item.name)) return;
    seen.add(item.name);
    const candidates = items.filter((other) => (
      other.name === item.name &&
      other.available &&
      other.url &&
      !failedUrls[other.url]
    ));
    if (!candidates.length) return;
    const youtube = candidates.find((other) => isYouTubeUrl(other.url));
    chosen.push(youtube || candidates[0]);
  });
  return chosen;
}

export function defaultGridUrls() {
  const picked = pickOnePerStation(builtinItems);
  return Array.from({ length: 9 }, (_, index) => (
    picked[index] ? picked[index].url : ''
  ));
}

export function loadCustomItems() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && item.name && item.url).map((item) => ({
      id: String(item.id),
      name: String(item.name),
      url: String(item.url),
      notes: item.notes ? String(item.notes) : '',
      streamType: 'custom',
      custom: true,
      available: true,
    }));
  } catch (ignored) {
    return [];
  }
}

export function saveCustomItems(items) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(items));
}
