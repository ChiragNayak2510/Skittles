import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser"
import axios from "axios";
import { useEffect,useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";

const EditModal = ()=>{
    const{data: currentUser} = useCurrentUser();
    const { mutate : mutateFetchedUser} = useUser(currentUser?.id)
    const editModal = useEditModal();

    const [profileImage,setProfileImage] = useState();
    const [coverImage,setCoverImage] = useState();
    const [name,setName] = useState();
    const [username,setUsername] = useState();
    const [bio,setBio] = useState();

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.setCoverImage);
        setName(currentUser?.name)
        setUsername(currentUser?.username);
        setBio(currentUser?.bio)
    },[currentUser]);

    const [isLoading,setIsLoading] = useState(false);
    const onSubmit = async()=>{
        try{
            setIsLoading(true);
            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success('Updated');
            editModal.onClose    
        }
        catch(error){
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <Modal 
        disabled = {isLoading}
        isOpen = {editModal.isOpen}
        title =  "Edit your profile"
        actionLabel = "Save"
        onClose = {editModal.onClose}
        onSubmit = {onSubmit}
        />
    );
}

export default EditModal;