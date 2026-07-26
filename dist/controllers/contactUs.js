import dotenv from "dotenv";
dotenv.config();
const getContactInfo = (res) => {
    const contactInfo = {
        phone: "021-12345678",
        email: process.env.EMAIL,
        address: "",
        workingHours: "",
        socialMedia: {
            telegram: "https://t.me/dana-Company",
            instagram: "https://instagram.com/dana-Company"
        }
    };
    res.json(contactInfo);
};
export default getContactInfo;
