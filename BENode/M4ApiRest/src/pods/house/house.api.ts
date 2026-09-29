import { Router } from 'express';
import { houseRepository } from '#dals/index.js';
import {
  authenticationMiddleware,
  authorizationMiddleware,
} from '#core/security/index.js';
import {
  mapHouseListFromModelToApi,
  mapHouseFromModelToApi,
  mapHouseFromApiToModel,
  mapReviewFromApiToModel,
  mapReviewFromModelToApi,
} from './house.mappers.js';

export const houseApi = Router();

const isNotEmptyString = (value: unknown): boolean =>
  typeof value === 'string' && value.trim() !== '';

houseApi
  .get('/', async (req, res, next) => {
    try {
      const country = req.query.country as string;
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const houseList = await houseRepository.getHouseList(
        country,
        page,
        pageSize
      );
      res.send(mapHouseListFromModelToApi(houseList));
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const house = await houseRepository.getHouse(id);
      if (house) {
        res.send(mapHouseFromModelToApi(house));
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  })
  .post('/:id/reviews', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, comment } = req.body ?? {};
      if (!isNotEmptyString(name) || !isNotEmptyString(comment)) {
        res.sendStatus(400);
        return;
      }

      const review = mapReviewFromApiToModel(req.body);
      const newReview = await houseRepository.insertReview(id, review);
      if (newReview) {
        res.status(201).send(mapReviewFromModelToApi(newReview));
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  })
  .put(
    '/:id',
    authenticationMiddleware,
    authorizationMiddleware(['admin']),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        if (await houseRepository.getHouse(id)) {
          const house = mapHouseFromApiToModel({ ...req.body, id });
          await houseRepository.updateHouse(house);
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        next(error);
      }
    }
  );
