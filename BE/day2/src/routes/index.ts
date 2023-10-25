import { Request, Response } from "express";
import * as express from "express";
import ThreadController from "../controllers/ThreadController";
import UserController from "../controllers/UserController";
import authenticate from "../middlewares/UserMw";
import { upload } from "../middlewares/Uploads";
import LikesController from "../controllers/LikesController";
import ReplyController from "../controllers/ReplyController";
import ThreadsQueue from "../queues/ThreadsQueue";
import FollowController from "../controllers/FollowController";

const router = express.Router();

router.get("/", (req: Request, res: Response) =>{
    res.send("Hello From v1!")
});

// getAll
router.get("/threads", authenticate, ThreadController.find)

// create
router.post("/threads", authenticate, upload('image'), ThreadsQueue.create)

// update
router.patch("/threads/:id", ThreadController.update)

// threadById
router.get("/threads/:id", authenticate, ThreadController.findOne)

// deleteById
router.delete("/threads/:id", authenticate, ThreadController.delete)

// --------------------------------------------------------

//getAll Reply
router.get('/reply', authenticate, ReplyController.find)

//Create Reply
router.post('/reply', authenticate, ReplyController.create)

// -------------------------------------------------------

//Like
router.post('/like', authenticate, LikesController.create)

//delete Like
router.delete('/like/:threadById', authenticate, LikesController.delete)

// --------------------------------------------------------

//register
router.post("/auth/register", UserController.create)

//login
router.post("/auth/login", UserController.Login)

//Check
router.get("/auth/check", authenticate, UserController.Checking)

//GetAllUser
router.get("/users", authenticate, UserController.GetAll)

// getUserId
router.get("/user/:id", authenticate, UserController.Profile)

// updateProfile
router.patch("/user/:id", authenticate, upload('picture'), UserController.Update)

// --------------------------------------------------------

// getAll follow
router.get("/follow", authenticate, FollowController.find);

// create Follow
router.post("/follow", authenticate, FollowController.create);

// unfollow
router.delete(
  "/follow/:followed_user_id",
  authenticate,
  FollowController.delete
);


export default router;