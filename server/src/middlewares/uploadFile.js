const multer = require("multer");

exports.uploadFile = (imageFile, epubFile) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === imageFile) {
        cb(null, "uploads/images");
      } else if (file.fieldname === epubFile) {
        cb(null, "uploads/epub");
      }
    },
    filename: (req, file, cb) => {
      if (file.fieldname === imageFile) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      } else if (file.fieldname === epubFile) {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
      }
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.filename === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    } else if (file.filename === epubFile) {
      if (!file.originalname.match(/\.(epub|EPUB)$/)) {
        req.epubValidationError = {
          message: "Only epub files are allowed",
        };
        return cb(new Error("Only epub files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: imageFile, maxCount: 1 },
    { name: epubFile, maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, function (error) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (req.epubValidationError) {
        return res.status(400).send(req.epubValidationError);
      }

      if (!req.files && !error) {
        return res.status(400).send({
          message: "Please select your files to upload",
        });
      }

      if (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file size is ${sizeInMb}Mb`,
          });
        }
        return res.status(400).send(error);
      }
      return next();
    });
  };
};

exports.uploadImage = (imageFile) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.filename === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMb = 10;
  const maxSize = sizeInMb * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  return (req, res, next) => {
    upload(req, res, function (error) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      if (!req.file && !error) {
        return res.status(400).send({
          message: "Please select your image to upload",
        });
      }

      if (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: `Max file size is ${sizeInMb}Mb`,
          });
        }
        return res.status(400).send(error);
      }
      return next();
    });
  };
};
