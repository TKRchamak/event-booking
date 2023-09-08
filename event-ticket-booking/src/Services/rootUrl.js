export default "http://192.168.1.106:7000"; // home
// export default "http://192.168.68.74:7000"; //project code


// const adminApprovalDecision = async (decision) => {
//     const headers = {
//         'X-Auth-Token': token
//     };
//     const requestData = {
//         "_id": item._id,
//         "status": decision
//     };

//     try {
//         const { data } = await axios.put(
//             `${rootUrl}/api/v1/organizer/admin-approval`, requestData,
//             {
//                 headers
//             }
//         );
//         if (data.status === "success") {
//             showDialog("This Event Organizer is Activated");
//             await getOrganizerList();
//             navigation.goBack();
//         } else {
//             throw data;
//         }
//     } catch (error) {
//         console.log(error);
//         showDialog("Something Wrong");
//     }
// }