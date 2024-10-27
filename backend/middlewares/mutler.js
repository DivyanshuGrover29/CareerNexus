//used multer only for file uplaod such as images and document , then i calle dthis file in user.route.js
import multer from "multer";

//yaha se hme ek storage mil jaegi
const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");