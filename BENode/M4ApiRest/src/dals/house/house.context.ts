import { dbServer } from '#core/servers/index.js';
import { House } from './house.model.js';

export const getHouseContext = () =>
  dbServer.db?.collection<House>('listingsAndReviews');
