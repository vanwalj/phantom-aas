'use strict';
import test from 'ava';

import phantom from '../';

test('Generate a PDF', async () => {
  await phantom('<div>Hello !</div>');
});
