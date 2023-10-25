import { useState } from 'react';
import { API } from '../lib/api';
import { useHooks } from './useHooks';

export function useThreadDeletion() {
    const [isLoading, setIsLoading] = useState(false);
    //   const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { fetchData } = useHooks()


    const deleteThread = async (threadId: any) => {
        setIsLoading(true);
        // setError(null);

        try {
            const response = await API.delete(`/threads/${threadId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            });
            fetchData()
            setIsLoading(false);
            setSuccess(true);
            return response.data; 
        } catch (error) {
            setIsLoading(false);
            //   setError("An error occurred while deleting the thread.");
            setSuccess(false);
        }
    };

    return { isLoading, success, deleteThread };
}
