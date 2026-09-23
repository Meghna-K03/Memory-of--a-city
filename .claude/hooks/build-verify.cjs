#!/usr/bin/env node
// PostToolUse hook (Edit|Write) — runs `npm run build` after a relevant source
// file changes, and logs a PASS/FAIL line so the hook's firing is observable.
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..', '..');
const LOG_FILE = path.join(__dirname, '..', 'build-hook.log');
const RELEVANT_EXT = /\.(tsx?|jsx?|css)$/i;

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  let filePath = '';
  try {
    const payload = JSON.parse(input || '{}');
    filePath = (payload.tool_input && payload.tool_input.file_path) || '';
  } catch {
    // No parseable stdin payload — nothing to verify against.
  }

  if (!RELEVANT_EXT.test(filePath)) {
    process.exit(0);
  }

  const timestamp = new Date().toISOString();
  let result = 'PASS';
  let detail = '';
  try {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
  } catch (err) {
    result = 'FAIL';
    detail = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    detail = detail.slice(-2000);
  }

  const line = `[${timestamp}] BUILD_HOOK fired for "${filePath}" -> ${result}\n`;
  fs.appendFileSync(LOG_FILE, line + (detail ? detail + '\n' : ''));
  console.log(`BUILD_HOOK: ${result} (file: ${filePath})`);
  process.exit(result === 'PASS' ? 0 : 1);
});
