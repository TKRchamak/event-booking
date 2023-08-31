import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { uploadToCloudinary } from './Cloudinary';
// let assets = {
//     assetId: null
//     base64: "/9j/4QUiRXhpZgAATU0AKgAAAAgAEAEDAAMAAAABAAYAAAIBA
//     duration: null
//     exif: null
//     height: 1842
//     rotation: null
//     type: "image"
//     uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fevent-ticket-booking-bb671b75-27b9-46db-900a-757e70e27ea6/ImagePicker/a27a96d4-9566-4c95-b4f3-3c0e04424d09.jpeg"
//     width: 1842
// }

export const allTypeImgPickFrom = async (ratio = [4, 4], quality = 1) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        allowsMultipleSelection: true,
        aspect: [ratio[0], ratio[1]],
        quality: 1,
    });

    if (!result.canceled) {
        console.log(result);
    }
};

export const singleImage = async (ratio = [3, 4], quality = 1) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [ratio[0], ratio[1]],
        base64: true,
        quality: quality,
    });

    if (!result.canceled) {
        let imgUrl = await uploadToCloudinary(result.assets[0].base64);
        return imgUrl; //single image
    } else {
        // throw new Error("image not selected");
        return "image not selected";
    }
};

export const multipleImage = async (ratio = [4, 4], quality = 1) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        allowsMultipleSelection: true,
        aspect: [ratio[0], ratio[1]],
        base64: true,
        quality: quality,
    });
    let imgList = result.assets;

    let imageBase64List = imgList.map(item => {
        return item.base64;
    })

    const uploadImagesInParallel = async (imageArray) => {
        const uploadPromises = imageArray.map(uploadToCloudinary);
        return await Promise.all(uploadPromises);
    };

    if (!result.canceled) {
        return await uploadImagesInParallel(imageBase64List); // img list
    } else {
        // throw new Error("image not selected");
        return "image not selected";
    }
};