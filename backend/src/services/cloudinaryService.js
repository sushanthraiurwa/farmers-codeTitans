import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (fileBuffer, folder = 'farmlink/general') => {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${fileBuffer.toString('base64')}`,
      {
        folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      }
    );

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error('Image deletion failed');
  }
};

export const uploadMultipleImages = async (files, folder = 'farmlink/general') => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    throw new Error('Multiple image upload failed');
  }
};
