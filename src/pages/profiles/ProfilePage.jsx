import React from 'react'
import { useEffect, useState } from 'react'
import { axiosResponse } from '../../api/axiosDefaults'
import { useParams } from 'react-router-dom'
import ProfileCard from '../../components/profiles/ProfileCard'
import Asset from '../../components/utilities/Asset'

const ProfilePage = () => {
    const profile_id = useParams().id;

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axiosResponse.get(`/profiles/${profile_id}/`)
                    .then(({ data }) => setProfile(data)
                )
                    .then(() => setLoading(false));
            } catch (error) {
                console.error("An error occurred:", error.response);
            }
        };
        handleMount();
    }, [profile_id]);

    return (
        loading?
            <Asset src="/loading.gif" /> :
            <ProfileCard profile={profile} />
    )
}

export default ProfilePage