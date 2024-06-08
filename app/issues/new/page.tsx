'use client';


import { TextField, Button} from '@radix-ui/themes';
import { useState} from "react";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}


const NewIssuePage = () => {

    const router = useRouter()

    const {register, control, handleSubmit} = useForm<IssueForm>()

    const [error, setError] = useState('')

    const submitForm = async(data: object) => {
        try {
            const response = await axios.post("/api/issues", data);
            console.log(response, data)
            router.push('/issues');
        } catch (error) {
            alert("An error occurred while submitting the form. Please try again later.");
        }
    }

    return ( 
        <form 
            className='max-w-xl space-y-3' 
            onSubmit={handleSubmit((data) => {
                submitForm(data)
            }
        )}>
            <TextField.Root placeholder='Title' {...register('title')}>
                <TextField.Slot />
            </TextField.Root>
            <Controller 
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage
