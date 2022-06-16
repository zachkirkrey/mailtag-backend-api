import aws from 'aws-sdk';
import sharp from 'sharp';

// aws.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: process.env.AWS_REGION,
// });

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

enum FileType {
  profile = 'profile',
  documents = 'documents',
}

// enum ImageSizes {
//     sm = "sm",
//     md = "md",
//     lg = "md",
//     xl = "xl",
// }

const ImageDimensions = {
  sm: {
    key: 'sm',
    width: 100,
  },
  md: {
    key: 'md',
    width: 480,
  },
  lg: {
    key: 'lg',
    width: 860,
  },
  xl: {
    key: 'xl',
    width: 1280,
  },
} as const;

const resize = async (
  file,
  type: FileType
): Promise<
  {
    width: number;
    buffer: Buffer;
  }[]
> => {
  const config: {
    profile;
    documents;
  } = {
    profile: [ImageDimensions.sm, ImageDimensions.md],
    documents: [ImageDimensions.lg, ImageDimensions.xl],
  };

  return await Promise.all(
    config[type].map(async (width) => ({
      width,
      buffer: await sharp().resize(width).toBuffer(),
    }))
  );
};

const upload = async (
  body: Buffer,
  bucket: string,
  key: string,
  mimeType: string,
  file: any,
  type: FileType,
  extensions: string
): Promise<void> => {
  const params = {
    Bucket: bucket,
    ACL: 'public-read',
    ContentType: mimeType,
    Key: key,
  };

  const files = await resize(file, type);
  await Promise.all(
    files.map(
      async ({ width, buffer }) =>
        await s3
          .upload({
            ...params,
            Key: `${key}-${width}.${extensions}`,
            Body: buffer,
          })
          .promise()
    )
  );
};

export default upload;
