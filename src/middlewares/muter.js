const multer = require('multer');
const path = require('path');
const {
    error_400
} = require('../message');
const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/images')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`)
    }
})
const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Only Image is Allowed..'))
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
})
const videoStorage = multer.diskStorage({
    destination: 'videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() +
            path.extname(file.originalname))
    }
});
const size = 300000000 //// 300 MB
const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: size // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return cb(new Error('Please upload a video'))
        }
        // console.log(req);
        // error_400(res,"user too")
        cb(undefined, true)
    }
})
const videoUser = videoUpload.single('video')
exports.uploadVideo = (req, res, next) => {
    videoUser(req, res, function (err) {
        if (err) return error_400(res, `File too large [${size} Bytes]`)
        next()
    })
}
const photoUser = upload.single('photo')
exports.uploadPhoto = (req, res, next) => {
    photoUser(req, res, function (err) {
        if (err) return error_400(res, `You haven't uploaded a picture yet`)
        next()
    })
}

exports.uploadImage = upload.array('photo', 3)
exports.uploadAvatar = upload.single('avatar')