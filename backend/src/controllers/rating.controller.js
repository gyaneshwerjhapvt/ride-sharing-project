import { Rating } from "../models/index.js";

export const create_rating = async (req, res) => {
  try {
    const { ride_id, given_by, given_to, score } = req.body;
    if (!ride_id || !given_by || !given_to || !score) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const rating = await Rating.create(req.body);
    res.status(201).json(rating);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const list_ratings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.json(ratings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const list_ratings_by_ride = async (req, res) => {
  try {
    const { ride_id } = req.params;
    const ratings = await Rating.findAll({ where: { ride_id } });
    res.json(ratings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const list_ratings_by_user = async (req, res) => {
  try {
    const { user_id } = req.params;
    const ratings = await Rating.findAll({ where: { given_to: user_id } });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
