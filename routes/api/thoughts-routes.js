const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtbyId,
  addThought,
  updateThought, 
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(addThought);

// /api/thoughts:id
router
  .route('/:id')
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reaction:Id
router
  .route('/:thoughtId/reactions/:reaction:Id')
  .delete(deleteReaction)

module.exports = router;
