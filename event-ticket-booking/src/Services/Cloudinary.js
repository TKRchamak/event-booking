import axios from "axios";

export const uploadToCloudinary = async (file) => {
    const api = `https://api.cloudinary.com/v1_1/dlqrqkxn4/image/upload`;

    if (!file) throw new Error("Please select a file");
    try {
        const { data } = await axios.post(api, {
            file: "data:image/png;base64," + file,
            upload_preset: "event-ticket-booking",
        });
        // console.log(data);
        return data.secure_url;
    } catch (error) {
        console.log(error);
        return error;
    }
};


// export const handleImageUpload = async () => {
//     try {
//         const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name
//         const apiKey = 'your_api_key'; // Replace with your Cloudinary API key
//         const apiSecret = 'your_api_secret'; // Replace with your Cloudinary API secret

//         const folderName = 'myfolder'; // Replace with your desired folder name
//         const timestamp = Math.floor(Date.now() / 1000);
//         const publicId = `${folderName}/image_${timestamp}`; // Creating a unique public ID

//         const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//         const signature = sha1(signaturePayload); // Use your preferred hash function here

//         const imageBase64 = 'base64_encoded_image_data_here'; // Replace with your image data

//         const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
//             file: `data:image/jpeg;base64,${imageBase64}`,
//             public_id: publicId,
//             timestamp,
//             api_key: apiKey,
//             signature,
//         });

//         console.log('Image uploaded successfully:', response.data);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// }

// export const handleImageDelete = async () => {
//     try {
//         const publicId = 'your_image_public_id'; // Replace with the actual public ID of the image
//         const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name
//         const apiKey = 'your_api_key'; // Replace with your Cloudinary API key
//         const apiSecret = 'your_api_secret'; // Replace with your Cloudinary API secret

//         const timestamp = Math.floor(Date.now() / 1000);
//         const signaturePayload = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//         const signature = sha1(signaturePayload); // Use your preferred hash function here

//         const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`, {
//             public_id: publicId,
//             timestamp,
//             api_key: apiKey,
//             signature,
//         });

//         console.log('Image deleted successfully:', response.data);
//     } catch (error) {
//         console.error('Error deleting image:', error);
//     }
// }



// const handleImageUpload = async () => {
//     try {
//         const cloudName = 'your_cloud_name'; // Replace with your Cloudinary cloud name
//         const unsignedPreset = 'your_unsigned_upload_preset'; // Replace with your unsigned upload preset name

//         const folderName = 'myfolder'; // Replace with your desired folder name
//         const timestamp = Math.floor(Date.now() / 1000);
//         const publicId = `${folderName}/image_${timestamp}`; // Creating a unique public ID

//         const imageBase64 = 'base64_encoded_image_data_here'; // Replace with your image data

//         const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
//             file: `data:image/jpeg;base64,${imageBase64}`,
//             public_id: publicId,
//             upload_preset: unsignedPreset,
//         });

//         console.log('Image uploaded successfully:', response.data);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// }