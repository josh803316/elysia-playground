import {afterAll} from 'bun:test';
import {TestDBUtils} from './utils/db-utils';

// TestDBUtils is a process-wide PGlite singleton shared by every test file (see
// db-utils.ts). Leaving it open after the run keeps Bun's process alive, which
// makes `bun test` exit with a non-zero code even when every test passes.
afterAll(async () => {
  const dbUtils = await TestDBUtils.getInstance();
  await dbUtils.close();
});
