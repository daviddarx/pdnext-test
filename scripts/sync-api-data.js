#!/usr/bin/env node

/**
 * API Sync Script for Porny Days
 *
 * This script fetches data from the festicine.pro API and creates/updates
 * JSON files for events and entries, preserving manual edits from Netlify CMS.
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// Initialize German country name converter
const regionNames = new Intl.DisplayNames(['de'], { type: 'region' });

// Load environment variables from .env.local file (for local development)
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  try {
    const envContent = require('fs').readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
    console.log('📁 Loaded environment variables from .env.local');
  } catch (error) {
    // .env.local file doesn't exist, that's okay for production
    console.log('📁 No .env.local file found, using system environment variables');
  }
}

// Load environment variables (only in local development)
if (process.env.NODE_ENV !== 'production') {
  loadEnvFile();
}

// Configuration
const API_BASE_URL = 'https://api2.festicine.pro/pornydays';
const API_CREDENTIALS = {
  username: process.env.FESTICINE_API_USERNAME,
  password: process.env.FESTICINE_API_PASSWORD,
};

const CONTENT_DIR = path.join(__dirname, '..', '_content');
const EVENTS_DIR = path.join(CONTENT_DIR, 'events');
const ENTRIES_DIR = path.join(CONTENT_DIR, 'entries');

// Ensure directories exist
async function ensureDirectories() {
  await fs.mkdir(EVENTS_DIR, { recursive: true });
  await fs.mkdir(ENTRIES_DIR, { recursive: true });
}

// HTTP request helper with authentication
function makeApiRequest(url) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${API_CREDENTIALS.username}:${API_CREDENTIALS.password}`).toString(
      'base64',
    );

    const options = {
      headers: {
        Authorization: `Basic ${auth}`,
        'User-Agent': 'PornyDays-Sync-Script/1.0',
      },
    };

    https
      .get(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Fetch all pages from a paginated API endpoint
async function fetchAllPages(endpoint, params = {}) {
  let allData = [];
  let currentPage = 1;
  let hasMorePages = true;

  console.log(`📡 Fetching ${endpoint}...`);

  while (hasMorePages) {
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      ...params,
    });

    const url = `${API_BASE_URL}${endpoint}?${queryParams}`;

    try {
      const response = await makeApiRequest(url);

      // Debug: log the response structure for the first page
      if (currentPage === 1) {
        console.log(`  🔍 Debug - Response keys: ${Object.keys(response).join(', ')}`);
      }

      let pageData = [];
      if (response.program) {
        pageData = response.program;
        allData = allData.concat(pageData);
      } else if (response.films) {
        pageData = Object.values(response.films);
        allData = allData.concat(pageData);
      } else if (response.talents) {
        pageData = response.talents;
        allData = allData.concat(pageData);
      } else if (Array.isArray(response)) {
        pageData = response;
        allData = allData.concat(pageData);
      } else {
        console.log(`  ⚠️  Unexpected response structure for ${endpoint}`);
        hasMorePages = false;
        break;
      }

      // Check if there are more pages
      if (response.paging && response.paging.number_of_pages) {
        hasMorePages = currentPage < parseInt(response.paging.number_of_pages);
      } else {
        // If no paging info, assume single page
        hasMorePages = false;
      }

      console.log(`  📄 Page ${currentPage}: ${pageData.length} items`);

      // If we got no data on this page, stop fetching
      if (pageData.length === 0) {
        hasMorePages = false;
      }

      currentPage++;
    } catch (error) {
      console.error(`❌ Error fetching page ${currentPage} of ${endpoint}:`, error.message);
      // If it's a pagination error, try to continue with what we have
      if (currentPage > 1) {
        console.log(`  ⚠️  Continuing with ${allData.length} items already fetched`);
        break;
      } else {
        // If first page fails, re-throw the error
        throw error;
      }
    }
  }

  console.log(`✅ Fetched ${allData.length} total items from ${endpoint}`);
  return allData;
}

// Convert country code to German country name
function convertCountryCodeToGerman(countryCode) {
  if (!countryCode || typeof countryCode !== 'string') {
    return countryCode;
  }

  try {
    // Convert to uppercase and get German name
    const germanName = regionNames.of(countryCode.toUpperCase());
    return germanName || countryCode; // Fallback to original if conversion fails
  } catch (error) {
    console.log(`  ⚠️  Could not convert country code "${countryCode}" to German`);
    return countryCode; // Fallback to original
  }
}

// Create a slug from a title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Map program data to event structure
function mapProgramToEvent(programItem) {
  const eventDate = new Date(`${programItem.day}T${programItem.starting_time}`);

  return {
    layout: 'event',
    title: programItem.title_l2 || programItem.title_l1 || 'Untitled Event',
    eventlocation: programItem.theater || programItem.place || '',
    eventlocationcomplement: '',
    eventlocationlink: '',
    eventdate: eventDate.toISOString(),
    desc: '',
    ticketsLink: '',
    ticketsLinkTitle: '',
    timetable: [],
    price: '',
    hideReducedPrice: false,
    entries: [], // Will be populated later
    deactivated: false,
  };
}

// Map film data to entry structure
function mapFilmToEntry(filmItem) {
  const title = filmItem.international_title || filmItem.original_title || 'untitled';
  const readableSlug = createSlug(title);
  return {
    uuid: `${readableSlug}--film-${filmItem.id_film}`,
    title: filmItem.international_title || filmItem.original_title || 'Untitled Film',
    entryType: 'Film', // Default to Film, can be updated manually
    authorName: filmItem.directors || '',
    authorCountry: convertCountryCodeToGerman(filmItem.country) || '',
    yearOfProduction: filmItem.year_of_production || null,
    duration: filmItem.film_length ? `${filmItem.film_length} Minutes` : '',
    desc: filmItem.synopsis_long_l1 || filmItem.synopsis_short_l1 || '',
    warning: '',
    image: '',
    additionalImages: [],
    videourl: '',
    forceBlank: false,
    deactivated: false,
  };
}

// Check if a file exists and read it
async function readExistingFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

// Write JSON file with proper formatting
async function writeJsonFile(filePath, data) {
  const jsonContent = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonContent, 'utf8');
}

// Merge API data with existing manual edits
function mergeEntryData(apiData, existingData) {
  if (!existingData) {
    return apiData;
  }

  // Fields that come from API (can be updated)
  const apiFields = ['title', 'authorName', 'authorCountry', 'yearOfProduction', 'duration'];

  // Fields that are manually edited (preserve existing values)
  const manualFields = [
    'uuid',
    'desc',
    'warning',
    'image',
    'additionalImages',
    'videourl',
    'forceBlank',
    'entryType',
    'typeComplement',
    'pornypickof',
    'deactivated',
  ];

  const merged = { ...existingData };

  // Update API fields
  apiFields.forEach((field) => {
    if (apiData[field] !== undefined && apiData[field] !== null && apiData[field] !== '') {
      merged[field] = apiData[field];
    }
  });

  // Preserve manual fields
  manualFields.forEach((field) => {
    if (existingData[field] !== undefined) {
      merged[field] = existingData[field];
    }
  });

  return merged;
}

// Merge API data with existing manual edits for events
function mergeEventData(apiData, existingData) {
  if (!existingData) {
    return apiData;
  }

  // Fields that come from API (can be updated)
  const apiFields = ['title', 'eventlocation', 'eventdate', 'desc'];

  // Fields that are manually edited (preserve existing values)
  const manualFields = [
    'eventlocationcomplement',
    'eventlocationlink',
    'ticketsLink',
    'ticketsLinkTitle',
    'timetable',
    'price',
    'hideReducedPrice',
    'subtitle',
    'specialstate',
    'entries',
    'deactivated',
  ];

  const merged = { ...existingData };

  // Update API fields
  apiFields.forEach((field) => {
    if (apiData[field] !== undefined && apiData[field] !== null && apiData[field] !== '') {
      merged[field] = apiData[field];
    }
  });

  // Preserve manual fields
  manualFields.forEach((field) => {
    if (existingData[field] !== undefined) {
      merged[field] = existingData[field];
    }
  });

  return merged;
}

// Process and save events
async function processEvents(programData) {
  console.log('\n🎬 Processing events...');

  for (const programItem of programData) {
    const slug = createSlug(programItem.title_l1 || programItem.title_l2 || 'untitled');
    const filename = `${programItem.day}--Event-${slug}.json`;
    const filePath = path.join(EVENTS_DIR, filename);

    const apiEventData = mapProgramToEvent(programItem);
    const existingEventData = await readExistingFile(filePath);

    const finalEventData = mergeEventData(apiEventData, existingEventData);

    await writeJsonFile(filePath, finalEventData);
    console.log(`  📝 ${existingEventData ? 'Updated' : 'Created'}: ${filename}`);
  }
}

// Process and save entries
async function processEntries(filmsData, talentsData) {
  console.log('\n🎭 Processing entries...');

  // Create talents lookup map
  const talentsMap = {};
  talentsData.forEach((talent) => {
    const key = `${talent.firstname} ${talent.name}`.trim();
    talentsMap[key] = talent;
  });

  for (const filmItem of filmsData) {
    const slug = createSlug(filmItem.international_title || filmItem.original_title || 'untitled');
    const filename = `entry-${slug}.json`;
    const filePath = path.join(ENTRIES_DIR, filename);

    const apiEntryData = mapFilmToEntry(filmItem);
    const existingEntryData = await readExistingFile(filePath);

    const finalEntryData = mergeEntryData(apiEntryData, existingEntryData);

    await writeJsonFile(filePath, finalEntryData);
    console.log(`  📝 ${existingEntryData ? 'Updated' : 'Created'}: ${filename}`);
  }
}

// Main execution function
async function main() {
  console.log('🚀 Starting API sync...\n');

  // Validate environment variables
  if (!process.env.FESTICINE_API_USERNAME || !process.env.FESTICINE_API_PASSWORD) {
    console.log('❌ Error: API credentials not found in environment variables.');
    console.log('');
    console.log('   For LOCAL DEVELOPMENT:');
    console.log('   Create a .env.local file in the project root with:');
    console.log('   FESTICINE_API_USERNAME=pornydays');
    console.log('   FESTICINE_API_PASSWORD=your_password_here');
    console.log('');
    console.log('   For NETLIFY DEPLOYMENT:');
    console.log('   Set environment variables in Netlify dashboard or netlify.toml:');
    console.log('   FESTICINE_API_USERNAME=pornydays');
    console.log('   FESTICINE_API_PASSWORD=your_password_here');
    console.log('');
    process.exit(1);
  }

  try {
    // Ensure directories exist
    await ensureDirectories();

    // Fetch all data from APIs
    const [programData, filmsData, talentsData] = await Promise.all([
      fetchAllPages('/program'),
      fetchAllPages('/v2/film'),
      fetchAllPages('/talents'),
    ]);

    // Process the data
    await processEvents(programData);
    await processEntries(filmsData, talentsData);

    console.log('\n✅ API sync completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Events: ${programData.length}`);
    console.log(`   - Films: ${filmsData.length}`);
    console.log(`   - Talents: ${talentsData.length}`);
  } catch (error) {
    console.error('❌ API sync failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, fetchAllPages, mapProgramToEvent, mapFilmToEntry };
